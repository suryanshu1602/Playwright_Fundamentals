// https://app.vwo.com/#/login

import { test, expect } from "@playwright/test";

const screenshotDir = 'screenshots/Locators_Commands/Project_VWO_Login';

test.describe("VWO Login Test Suite", () => {

    test("TC#1 - Invalid credentials shows error message", async ({ page }) => {

        await test.step("Navigate to VWO login page", async () => {
            await page.goto("https://app.vwo.com/#/login", { waitUntil: 'load' });
            await page.screenshot({ path: `${screenshotDir}/TC1-01-login-page.png`, fullPage: true });
        });

        await test.step("Fill invalid email and password", async () => {
            await page.waitForSelector('#login-username', { timeout: 10000 });
            await page.locator('#login-username').fill("admin@admin.com");
            await page.locator("#login-password").fill("pass123");
            await page.screenshot({ path: `${screenshotDir}/TC1-02-fields-filled.png`, fullPage: true });
        });

        await test.step("Click the Sign In button", async () => {
            await page.locator("#js-login-btn").click({ noWaitAfter: true });
        });

        await test.step("Verify error message appears", async () => {
            await expect(page.locator('#js-notification-box-msg')).toBeVisible({ timeout: 15000 });
            await page.screenshot({ path: `${screenshotDir}/TC1-03-error-message.png`, fullPage: true });
            await expect(page.locator('#js-notification-box-msg')).toContainText(
                "Your email, password, IP address or location did not match"
            );
        });
    });

    test("TC#2 - Empty email field validation", async ({ page }) => {

        await test.step("Navigate to VWO login page", async () => {
            await page.goto("https://app.vwo.com/#/login", { waitUntil: 'load' });
            await page.waitForSelector('#login-username', { timeout: 10000 });
            await page.screenshot({ path: `${screenshotDir}/TC2-01-login-page.png`, fullPage: true });
        });

        await test.step("Fill password only, leave email empty", async () => {
            await page.locator("#login-password").fill("pass123");
            await page.screenshot({ path: `${screenshotDir}/TC2-02-password-only-filled.png`, fullPage: true });
        });

        await test.step("Click the Sign In button", async () => {
            await page.locator("#js-login-btn").click({ noWaitAfter: true });
        });

        await test.step("Capture result after clicking sign in with empty email", async () => {
            await page.waitForTimeout(3000);
            await page.screenshot({ path: `${screenshotDir}/TC2-03-after-submit-empty-email.png`, fullPage: true });
        });
    });

    test("TC#3 - Wrong email format (missing domain)", async ({ page }) => {

        await test.step("Navigate to VWO login page", async () => {
            await page.goto("https://app.vwo.com/#/login", { waitUntil: 'load' });
            await page.waitForSelector('#login-username', { timeout: 10000 });
            await page.screenshot({ path: `${screenshotDir}/TC3-01-login-page.png`, fullPage: true });
        });

        await test.step("Fill email with invalid format", async () => {
            await page.locator('#login-username').fill("notanemail");
            await page.locator("#login-password").fill("pass123");
            await page.screenshot({ path: `${screenshotDir}/TC3-02-invalid-email-filled.png`, fullPage: true });
        });

        await test.step("Click the Sign In button", async () => {
            await page.locator("#js-login-btn").click({ noWaitAfter: true });
        });

        await test.step("Capture result after submitting invalid email format", async () => {
            await page.waitForTimeout(3000);
            await page.screenshot({ path: `${screenshotDir}/TC3-03-after-submit-invalid-email.png`, fullPage: true });
        });
    });
});
