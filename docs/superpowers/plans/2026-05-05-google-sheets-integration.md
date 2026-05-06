# Google Sheets Waitlist Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Configure the landing page to send waitlist submissions to a Google Sheets endpoint.

**Architecture:** Create a `.env` file to store the Google Apps Script URL, which will be consumed by the `WaitlistForm.jsx` component.

**Tech Stack:** React, Vite, Environment Variables (.env)

---

### Task 1: Initialize Environment Configuration

**Files:**
- Create: `.env`
- Reference: `.env.example`

- [ ] **Step 1: Create .env from .env.example**

Run: `cp .env.example .env`

- [ ] **Step 2: Update VITE_WAITLIST_ENDPOINT in .env**

Modify `.env` to set:
`VITE_WAITLIST_ENDPOINT=https://script.google.com/macros/s/AKfycbxxr3tXUxOjoRORy5Yv3K6A9iyxEtboELsQYmN5V7bhR2rAK_Jt0WXy-2rB1tc0Ezcl/exec`

- [ ] **Step 3: Verify .env exists and has the correct value**

Run: `grep VITE_WAITLIST_ENDPOINT .env`
Expected: `VITE_WAITLIST_ENDPOINT=https://script.google.com/macros/s/AKfycbxxr3tXUxOjoRORy5Yv3K6A9iyxEtboELsQYmN5V7bhR2rAK_Jt0WXy-2rB1tc0Ezcl/exec`

- [ ] **Step 4: Commit (Optional - .env is gitignored, so this is just a status check)**

Run: `git status`
Verify: `.env` is NOT listed (it's ignored).

---

### Task 2: Verification

**Files:**
- Reference: `src/components/ui/WaitlistForm.jsx`

- [ ] **Step 1: Start development server**

Run: `npm run dev`

- [ ] **Step 2: Manually test the form**

1. Open the local URL (usually http://localhost:5173).
2. Fill the waitlist form with test data.
3. Submit the form.
4. Verify that the "Você está na lista!" success message appears.

- [ ] **Step 3: Verify endpoint logic in code**

Read `src/components/ui/WaitlistForm.jsx` to ensure `import.meta.env.VITE_WAITLIST_ENDPOINT` is used. (Already verified in design phase).
