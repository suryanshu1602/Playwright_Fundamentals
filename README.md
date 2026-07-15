# Playwright Fundamentals

Playwright test suite for web automation practice.

## Files

| File | Description |
|------|-------------|
| `tests/example.spec.ts` | Basic Playwright test — navigates to TTACart and verifies page title |
| `tests/Locators_Commands/Project_VWO_Login.spec.ts` | VWO login — 3 test cases for invalid credentials, empty email, and invalid email format |
| `tests/Locators_Commands/Project_3_Singup_VWO.spec.ts` | VWO free trial signup — validates error message for invalid email |
| `tests/Locators_Commands/Project_3_Singup_VWO_PW_Locator.spec.ts` | VWO free trial signup — validates error message for invalid email using Playwright built-in locators |

## Tests

| Test | Description |
|------|-------------|
| Verify the title of the TTA Cart | Opens `https://app.thetestingacademy.com/playwright/ttacart/` and asserts title is `TTACart - Login` |
| Verify VWO login with invalid credentials | Logs in with wrong credentials on `app.vwo.com` and asserts error message |
| Verify VWO signup error with incorrect email ID | Navigates to VWO free trial, fills invalid email, checks consent, submits, and verifies error message |

## Run

```bash
npx playwright test
```
