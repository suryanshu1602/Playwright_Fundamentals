import {test, expect} from '@playwright/test';
import path from 'path';

const screenshotDir = path.resolve('screenshots', 'Locators_Commands', 'Project_3_Singup_VWO');

test('Verify the signup page has an error with incorrect email ID.', async ({ page }) => {

await page.goto("https://vwo.com/free-trial/");
await page.screenshot({ path: path.join(screenshotDir, '01-navigate-to-free-trial.png'), fullPage: true });

let inputBox = page.locator("#page-v1-step1-email");
await inputBox.fill("abccs");
await page.screenshot({ path: path.join(screenshotDir, '02-email-filled.png'), fullPage: true });

await page.locator("#page-free-trial-step1-cu-gdpr-consent-checkbox").click();
await page.locator("[data-qa='page-su-submit']").first().click();
await page.screenshot({ path: path.join(screenshotDir, '03-form-submitted.png'), fullPage: true });

let error_msg = await page.locator("//div[contains(@class,'invalid-reason')]").first().textContent();
await page.screenshot({ path: path.join(screenshotDir, '04-error-message-visible.png'), fullPage: true });

 expect(error_msg).toContain("The email address you entered is incorrect.");

});
