# VWO Free Trial Signup — Email Validation (PW Locators)

**Test File:** `tests/Locators_Commands/Project_3_Singup_VWO_PW_Locator.spec.ts`  
**Application URL:** https://vwo.com/free-trial/  
**Browser:** Chromium  

## Objective

Verify the VWO free trial signup form shows a validation error when an invalid email is entered, using Playwright's built-in locators (`getByRole`, `getByText`).

## Test Steps

| Step | Action | Screenshot |
|------|--------|------------|
| 1 | Navigate to VWO free trial page | ![Landing Page](01-landing-page.png) |
| 2 | Fill email field with incorrect value `"abcd"` | ![Filled Email](02-filled-email.png) |
| 3 | Check the GDPR consent checkbox | ![Checkbox Checked](03-checkbox-checked.png) |
| 4 | Click "Create a Free Trial Account" button | ![After Submit](04-after-submit.png) |
| 5 | Verify error message contains "The email address you entered is incorrect." | ![Error Verified](05-error-message-verified.png) |

## Locators Used

- `getByRole('textbox', { name: "email" })` — email input field
- `getByRole('checkbox')` — consent checkbox
- `getByRole('button', { name: "Create a Free Trial Account" })` — submit button
- `locator("xpath=//div[contains(@class,'invalid-reason')]")` — error message element

## Expected Result

After submitting the form with an invalid email, the error message **"The email address you entered is incorrect."** should be displayed.
