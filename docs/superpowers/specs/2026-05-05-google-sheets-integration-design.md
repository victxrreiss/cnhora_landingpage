# Design Doc: Google Sheets Waitlist Integration
Date: 2026-05-05
Status: Approved

## Problem
The landing page needs a functional waitlist form that saves user data (email, city, state, role) to a Google Sheet. The endpoint for this integration is provided via a Google Apps Script web app URL.

## Goals
- Enable the waitlist form to send data to the Google Sheets endpoint.
- Securely store the endpoint URL in environment variables.

## Proposed Solution
We will create a `.env` file based on the existing `.env.example` template and configure the `VITE_WAITLIST_ENDPOINT` variable with the provided URL.

## Architecture & Data Flow
1. **Frontend:** `WaitlistForm.jsx` reads `VITE_WAITLIST_ENDPOINT` from `import.meta.env`.
2. **Action:** User submits the form.
3. **Execution:** `handleSubmit` function performs a `POST` request to the endpoint.
4. **Backend (Google Apps Script):** The script (documented in `scripts/google-sheets-waitlist.gs`) receives the JSON payload, validates it, and appends a row to the "Leads" sheet.

## Configuration Changes
- Create `.env` in the root directory.
- Set `VITE_WAITLIST_ENDPOINT=https://script.google.com/macros/s/AKfycbxxr3tXUxOjoRORy5Yv3K6A9iyxEtboELsQYmN5V7bhR2rAK_Jt0WXy-2rB1tc0Ezcl/exec`.

## Security
- The `.env` file is already listed in `.gitignore` to prevent leaking the URL (and other keys) to the repository.
- A honeypot field (`website`) is used in the form to mitigate bot submissions.

## Verification
- Submit the waitlist form locally.
- Verify that a success message appears.
- (Manual) Verify that the data appears in the Google Sheet.
