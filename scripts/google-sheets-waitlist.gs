/**
 * CNHora — waitlist endpoint backed by Google Sheets.
 *
 * Setup (manual, ~5 min):
 *   1. Create a new Google Sheet (call it "CNHora — Waitlist" or similar).
 *   2. Extensions → Apps Script. Replace the default Code.gs content with this file.
 *   3. Save (disk icon).
 *   4. Deploy → New deployment → Type: Web app.
 *      - Execute as: Me
 *      - Who has access: Anyone
 *      - Click "Deploy", authorize when prompted.
 *   5. Copy the deployment URL (looks like https://script.google.com/macros/s/AKfyc.../exec).
 *   6. Paste it into .env (or Vercel env vars) as VITE_WAITLIST_ENDPOINT.
 *   7. Redeploy the landing.
 *
 * Schema: a sheet named "Leads" is auto-created on first POST with these columns:
 *   Timestamp | Email | Cidade | UF | Tipo | Origem | UserAgent
 *
 * Security:
 *   - Honeypot field "website" (invisible to humans, bots fill it). If non-empty, request is silently dropped.
 *   - Email format validated (basic regex).
 *   - UF validated against the 27-state list.
 *   - Tipo validated to "aluno" or "instrutor".
 *   - No PII beyond email + city is stored.
 */

const SHEET_NAME = 'Leads';
const HEADERS = ['Timestamp', 'Email', 'Cidade', 'UF', 'Tipo', 'Origem', 'UserAgent'];
const VALID_UFS = new Set([
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG',
  'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
]);
const VALID_ROLES = new Set(['aluno', 'instrutor']);
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function jsonResponse(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}

function getOrCreateSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return jsonResponse({ ok: false, error: 'empty body' });
    }

    const body = JSON.parse(e.postData.contents);

    // Honeypot — silently drop bot submissions
    if (body.website) {
      return jsonResponse({ ok: true });
    }

    const email = String(body.email || '').trim().toLowerCase();
    const cidade = String(body.cidade || '').trim();
    const uf = String(body.uf || '').trim().toUpperCase();
    const role = String(body.role || '').trim().toLowerCase();
    const source = String(body.source || '').trim().slice(0, 500);
    const userAgent = String(body.userAgent || '').trim().slice(0, 500);

    if (!EMAIL_RE.test(email)) return jsonResponse({ ok: false, error: 'email inválido' });
    if (cidade.length < 2 || cidade.length > 100) return jsonResponse({ ok: false, error: 'cidade inválida' });
    if (!VALID_UFS.has(uf)) return jsonResponse({ ok: false, error: 'UF inválido' });
    if (!VALID_ROLES.has(role)) return jsonResponse({ ok: false, error: 'tipo inválido' });

    const sheet = getOrCreateSheet();
    sheet.appendRow([new Date(), email, cidade, uf, role, source, userAgent]);

    return jsonResponse({ ok: true });
  } catch (err) {
    return jsonResponse({ ok: false, error: 'server error: ' + err.message });
  }
}

function doGet() {
  return jsonResponse({ ok: true, service: 'CNHora waitlist', method: 'POST only' });
}
