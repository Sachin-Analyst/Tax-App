# Tax-App  TaxClarity
Welcome to TaxClarity. This repository presents a fully client side Indian income tax calculator built for salaried individuals. The app addresses a real everyday need  helping people instantly compare the old and new tax regimes for FY 2025-26, find out which one saves more money, and understand their TDS refund or payable status. Built with React (Vite), Tailwind CSS, and pure client-side JavaScript  no backend, no login, no data stored anywhere.

----

## Table of Contents
- [Introduction](#introduction)
- [Project Description](#project-description)
- [App Architecture](#app-architecture)
- [Folder Structure](#folder-structure)
- [Key Features](#key-features)
- [Installation](#installation)
- [Usage](#usage)
- [Live Demo](#live-demo)
- [License](#license)

## Introduction
---
*Project Title:* TaxClarity  Indian Income Tax Calculator FY 2025-26

*Created By:* [Sachin-Analyst](https://github.com/Sachin-Analyst)

*Tools Used:* React 18, Vite 6, Tailwind CSS 3, JSX  deployed on Vercel

*Focus Area:* Old vs New Regime Comparison, HRA Exemption, 80C / 80D / NPS Deductions, TDS Refund / Payable Status

----

## Project Description
TaxClarity is a 14-step wizard that walks salaried individuals through their income, salary components, investments, and deductions — then calculates their tax liability under both regimes and recommends the one that saves them more money.

The app targets non-CA salaried employees who want a plain-English answer: "Pick New Regime. You save ₹18,540. Your total tax is ₹42,600." It covers all major tax sections relevant to salaried income — Section 16, 10(13A), 80C, 80D, 80CCD(1B), 80CCD(2), 24(b), 80TTA, 80TTB, and Section 87A rebate including marginal relief. All computation runs entirely in the browser. Zero data is sent to any server.

----

## App Architecture
### 14-Step Wizard Flow

```
S01 Landing → S02 Financial Year → S03 Age Group → S04 Salary Details →
S05 Salary Components → S06 Other Income → S07 Pays Rent? →
S08 Rent Details → S09 Investments (80C + NPS) → S10 Health Insurance (80D) →
S11 Home Loan (24b) → S12 TDS Deducted → S13 Calculating → S14 Results
```

### Tax Engine (`taxEngine.js`)
The core computation module handles:
- **New Regime** — ₹75,000 standard deduction, progressive slabs (0%–30%), 87A rebate up to ₹60,000, marginal relief near the ₹12L boundary, employer NPS 80CCD(2) capped at 14% of basic
- **Old Regime** — ₹50,000 standard deduction, age-based slab exemptions (₹2.5L / ₹3L / ₹5L), all 80C / 80D / HRA / home loan deductions, 87A rebate up to ₹12,500 (not applicable to super seniors)
- **TDS Position** — employer TDS + bank TDS combined and compared against the recommended regime's total tax

----

## Folder Structure
- *src/components/steps/* — 14 step screens (S01_Landing.jsx through S14_Results.jsx), each handling its own validation and navigation logic
- *src/components/results/* — 5 result sections: Verdict, Tax Summary, Detailed Breakdown (accordion), Education (how we calculated this), and Next Steps
- *src/taxEngine.js* — Core tax computation: gross income, HRA exemption, deduction caps, slab tax, rebate, marginal relief, cess, TDS reconciliation
- *src/constants.js* — All FY 2025-26 tax constants: slab arrays for all three age groups, deduction caps, rebate limits, cess rate, HRA metro/non-metro percentages
- *src/utils.js* — Shared formatting helpers: `fmt()`, `fmtNum()`, `toNum()`, `calc80CTotal()`
- *src/components/* — Shared UI components: `NumberInput`, `FrequencyInput`, `ProgressBar`, `StepWrapper`, `TaxPreviewPanel`, `CommonQuestions`, `ConfusedLink`
- *taxprd.md* — Complete product specification document: every text string, Tailwind class, layout rule, validation logic, and tax law correctness note — detailed enough to regenerate the entire app from scratch

----

## Key Features
- *Old vs New Regime Comparison — Side-by-side tax calculation with a clear winner verdict and rupee savings amount*
- *Live Tax Preview Panel — Updates in real time on desktop as the user fills in their salary details, before they even reach the results page*
- *HRA Exemption Engine — Three-condition minimum calculation per Section 10(13A): annual HRA received, metro/non-metro percentage of basic, and rent paid minus 10% of basic*
- *Complete 80C Tracker — Supports all 7 eligible items (EPF, LIC, PPF, ELSS, tuition fees, home loan principal, NSC) with a running total bar and ₹1.5L cap indicator*
- *Section 87A Rebate + Marginal Relief — Correctly handles the ₹12L boundary for the new regime and the ₹5L boundary for the old regime, including the super senior exception*
- *TDS Reconciliation — Combines employer TDS and bank FD TDS, then shows refund / payable / settled status with advance tax warning when applicable*
- *Privacy-First Architecture — No backend, no login, no cookies, no data storage of any kind. All computation runs in the user's browser*

----

## Installation
To explore or run this project locally:

1. *Clone the repository:*
   ```bash
   git clone https://github.com/Sachin-Analyst/Tax-App
   ```
   - Open terminal and run the command

2. *Install dependencies:*
   ```bash
   cd Tax-App
   npm install
   ```

3. *Start the development server:*
   ```bash
   npm run dev
   ```
   - Open `http://localhost:5173` in your browser

4. *Build for production:*
   ```bash
   npm run build
   ```

> **Tech Stack:** React 18.3.1 · Vite 6.0.5 · Tailwind CSS 3.4.17 · PostCSS · Inter font (Google Fonts) · Deployed on Vercel

----

## Usage
1. Open the app and click **"Start calculation"** on the landing page
2. Work through the 14-step wizard — each step includes inline hints, common questions, and live validation
3. The **Live Tax Preview Panel** (desktop) updates your estimated tax in real time as you enter your salary
4. After the calculating animation, the **Results page** shows your recommended regime, how much you save, and a detailed rupee-by-rupee breakdown of every deduction and slab

> The app covers salaried individuals only. It does not handle surcharge (income above ₹50 lakh), capital gains, rental income, or freelance / business income. A disclaimer and CA referral are shown on the results page.

----

## Live Demo
Live App — https://tax-app-lime.vercel.app

Product Specification (taxprd.md) — [taxprd.md](taxprd.md)

----

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
