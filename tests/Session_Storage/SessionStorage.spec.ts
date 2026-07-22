import { chromium } from "playwright";

async function saveSession() {

    let browser = await chromium.launch({ headless: false });
    let context = await browser.newContext();
    let page = await context.newPage();

    await page.goto("https://app.wingify.com/#/login");
    await page.waitForTimeout(2000);
    await page.fill("#login-username", "kumar.suryanshu@motorolasolutions.com");
    await page.fill("#login-password", "Tsunami@2501");
    await page.waitForTimeout(1500);
    await page.click("#js-login-btn");

    // Wait for login to actually complete before snapshotting storage —
    // otherwise the auth cookie isn't set yet and the saved state is empty.

    await page.waitForURL(/#\/(dashboard|home)/, { timeout: 15000 });
    await page.waitForTimeout(3000);

    await context.storageState({ path: "./user-session.json" });
    console.log("Session saved to user-session.json ✅");
    
    await page.waitForTimeout(2000);
    await browser.close();
}
saveSession();