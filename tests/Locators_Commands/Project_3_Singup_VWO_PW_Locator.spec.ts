import { test, expect } from '@playwright/test';
import path from 'path';

const screenshotDir = 'screenshots/Locators_Commands/Project_3_Singup_VWO_PW_Locator';

test('Verify the signup page has an error with the incorrect email ID. ', async ({ page }) => {

    // Step 1: Navigate to VWO free trial page
    await test.step('Navigate to VWO free trial signup page', async () => {
        await page.goto("https://vwo.com/free-trial/");
        await page.waitForLoadState('networkidle');
        await page.screenshot({ path: `${screenshotDir}/01-landing-page.png`, fullPage: true });
    });

    // Step 2: Fill the email field with an incorrect email
    await test.step('Fill email field with incorrect email', async () => {
        await page.getByRole('textbox', { name: "email" }).fill("abcd");
        await page.screenshot({ path: `${screenshotDir}/02-filled-email.png`, fullPage: true });
    });

    // Step 3: Check the checkbox
    await test.step('Check the agreement checkbox', async () => {
        await page.getByRole('checkbox').check();
        await page.screenshot({ path: `${screenshotDir}/03-checkbox-checked.png`, fullPage: true });
    });

    // Step 4: Click the submit button
    await test.step('Click Create a Free Trial Account button', async () => {
        await page.getByRole('button', { name: "Create a Free Trial Account" }).click();
        await page.waitForTimeout(2000);
        await page.screenshot({ path: `${screenshotDir}/04-after-submit.png`, fullPage: true });
    });

    // Step 5: Verify the error message is displayed
    await test.step('Verify the error message for incorrect email', async () => {
        let error_msg = await page.locator("xpath=//div[contains(@class,'invalid-reason')]").first().textContent();
        expect(error_msg).toContain("The email address you entered is incorrect.");
        await page.screenshot({ path: `${screenshotDir}/05-error-message-verified.png`, fullPage: true });
    });

    await page.waitForTimeout(5000);

});
