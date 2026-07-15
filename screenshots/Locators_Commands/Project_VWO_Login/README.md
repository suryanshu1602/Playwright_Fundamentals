# VWO Login — Validation & Error Handling

**Test File:** `tests/Locators_Commands/Project_VWO_Login.spec.ts`  
**Application URL:** https://app.vwo.com/#/login  
**Browser:** Chromium  

## Objective

Test the VWO login form validation and error handling with various invalid input scenarios.

## Test Cases

### TC#1 — Invalid credentials shows error message

Verify that entering a wrong email/password combo displays the appropriate error.

| Step | Action | Screenshot |
|------|--------|------------|
| 1 | Navigate to VWO login page | ![Login Page](TC1-01-login-page.png) |
| 2 | Fill email and password with invalid credentials | ![Fields Filled](TC1-02-fields-filled.png) |
| 3 | Click Sign In and verify error message | ![Error Message](TC1-03-error-message.png) |

### TC#2 — Empty email field validation

Verify behavior when the email field is left empty.

| Step | Action | Screenshot |
|------|--------|------------|
| 1 | Navigate to VWO login page | ![Login Page](TC2-01-login-page.png) |
| 2 | Fill password only, leave email blank | ![Password Only](TC2-02-password-only-filled.png) |
| 3 | Click Sign In and capture result | ![After Submit](TC2-03-after-submit-empty-email.png) |

### TC#3 — Invalid email format (missing domain)

Verify behavior when the email doesn't contain a valid domain format.

| Step | Action | Screenshot |
|------|--------|------------|
| 1 | Navigate to VWO login page | ![Login Page](TC3-01-login-page.png) |
| 2 | Fill email with `"notanemail"` (no `@` domain) | ![Invalid Email](TC3-02-invalid-email-filled.png) |
| 3 | Click Sign In and capture result | ![After Submit](TC3-03-after-submit-invalid-email.png) |

## Locators Used

| Element | Locator |
|---------|---------|
| Email field | `#login-username` |
| Password field | `#login-password` |
| Sign In button | `#js-login-btn` |
| Error notification | `#js-notification-box-msg` |

## Expected Results

| TC# | Scenario | Expected |
|-----|----------|----------|
| 1 | Invalid credentials | Error message: *"Your email, password, IP address or location did not match"* |
| 2 | Empty email | Form fails to submit or shows validation |
| 3 | Invalid email format | Form fails to submit or shows validation |

## Run

```bash
npx playwright test "tests/Locators_Commands/Project_VWO_Login.spec.ts"
```
