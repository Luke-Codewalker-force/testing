<!-- TODO: ADD SCRIPTS -->

# Playwright Test Automation Sandbox

An automated E2E and API testing project built for the [Restful-Booker Platform](https://automationintesting.online/). This repository contains a test automation framework designed to validate the core features, input boundaries, and API endpoints of the platform.

---

## 🛠️ Tech Stack & Architecture

* **Automation Engine:** Playwright
* **Language:** Javascript & TypeScript
* **Design Pattern:** Page Object Model (POM) with custom Playwright Fixtures for clean dependency injection.
* **CI/CD:** GitHub Actions workflow configured to run test suites on code push.

---

## 📋 Project Structure & QA Documentation

The automation phase was preceded by manual analysis and exploratory testing. All structured test scenarios are documented in a separate file:
👉 **[View Test Cases](./TEST_CASES.md)**

* `@smoke` – Basic happy path verification for critical paths.
* `@regression` – Detailed functional validation, boundary tests, and API verification.

---

## 📦 How to Run the Tests Locally

To get this framework up and running on your local machine, follow these steps sequentially:

### 1. Installation

```bash
# Clone the repository
git clone https://github.com/Luke-Codewalker-force/testing
cd testing

# Install npm dependencies
npm install

# Install Playwright browser engines
npx playwright install
```

### 2. Run scripts

```bash
# Run all automated tests (UI + API)
npm run test:all

# Run only critical Smoke tests
npm run test:smoke

# Run full Regression suite
npm run test:regression

# Open Playwright Interactive UI Mode for local debugging
npm run test:ui
