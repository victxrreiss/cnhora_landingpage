# Waitlist — setup (Google Sheets backend)

Free, zero-infra captura de leads pra a landing pré-lançamento. Os dados caem direto numa Google Sheet.

## Como funciona

```
┌───────────────────┐     POST text/plain (no CORS preflight)     ┌──────────────────────┐
│ <WaitlistForm>    │ ─────────────────────────────────────────► │ Apps Script Web App  │
│ Hero / nova seção │   { email, cidade, uf, role, source }      │ doPost handler       │
└───────────────────┘                                              └──────────┬───────────┘
                                                                              │ appendRow
                                                                              ▼
                                                                  ┌──────────────────────┐
                                                                  │ Sheet "Leads"        │
                                                                  │ Timestamp │ Email    │
                                                                  │ Cidade │ UF │ Tipo  │
                                                                  │ Origem │ UserAgent  │
                                                                  └──────────────────────┘
```

## Setup (~5 min, uma vez)

1. **Crie uma Google Sheet** nova. Nomeie como `CNHora — Waitlist`.
2. No menu da Sheet: **Extensões → Apps Script**.
3. No editor que abrir, **apague o conteúdo padrão de `Code.gs`** e cole o conteúdo de [`scripts/google-sheets-waitlist.gs`](../scripts/google-sheets-waitlist.gs).
4. Salve (ícone de disco ou `Ctrl+S`).
5. Clique em **Deploy → Nova implantação**.
   - Tipo: **App da Web**
   - Descrição: `CNHora waitlist v1`
   - Executar como: **Eu** (a conta que vai receber os leads)
   - Quem pode acessar: **Qualquer pessoa** (não precisa de login)
6. Clique em **Implantar**, autorize quando pedir.
7. Copie a **URL do app da Web** (formato: `https://script.google.com/macros/s/AKfyc.../exec`).
8. Cole essa URL na variável de ambiente `VITE_WAITLIST_ENDPOINT`:
   - **Local**: edite `.env` na raiz do projeto.
   - **Vercel**: Settings → Environment Variables → adicione `VITE_WAITLIST_ENDPOINT`.
9. Redeploy.

## Validações server-side (já no Apps Script)

- **Honeypot** — campo invisível `website`. Se preenchido (bots), submissão é descartada silenciosamente.
- **Email** — regex básico.
- **Cidade** — 2-100 chars.
- **UF** — uma das 27 siglas válidas.
- **Tipo** — `aluno` ou `instrutor`.

## Schema da Sheet

A aba `Leads` é criada automaticamente no primeiro POST. Colunas:

| Coluna | Origem | Exemplo |
|---|---|---|
| Timestamp | server | `2026-05-05 10:32:11` |
| Email | form | `joao@gmail.com` |
| Cidade | form | `Campinas` |
| UF | form | `SP` |
| Tipo | form | `aluno` |
| Origem | form (auto) | `https://cnhora.com.br/?utm_source=instagram` |
| UserAgent | form (auto) | `Mozilla/5.0...` |

## Atualizar o Apps Script

Cada mudança no código exige **nova implantação**:

1. Edite o `Code.gs` na Sheet.
2. Salve.
3. **Deploy → Gerenciar implantações** → ícone de lápis → Versão: **Nova versão** → Implantar.
4. **Importante**: a URL do endpoint **não muda** se você atualizar a implantação existente. Se criar uma "Nova implantação" do zero, vira URL nova → atualizar `VITE_WAITLIST_ENDPOINT`.

## Backup / migração

Quando quiser sair do Sheets pra um banco próprio:

1. Mantém o endpoint Apps Script funcionando.
2. Adiciona um segundo handler que ALSO POST pro novo backend.
3. Quando o novo backend estiver estável, remove o Apps Script.

## Custo

Zero. Limites do Apps Script web app gratuito (mais que suficiente pra pré-lançamento):
- 20.000 emails/dia (não usamos)
- 90 minutos de execução de script/dia (cada POST roda ~50ms)
- Sem limite hard de chamadas
