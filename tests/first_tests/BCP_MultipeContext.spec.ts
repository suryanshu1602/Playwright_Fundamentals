import {chromium, Browser, BrowserContext, Page} from "playwright";

async function multiUserTest() {

    let browser: Browser = await chromium.launch({headless: false});
    console.log("Browser Launched");

    // Admin Context
    let adminContext: BrowserContext = await browser.newContext();
    let adminPage: Page = await adminContext.newPage();
    await adminPage.goto("https://app.vwo.com/login");
    await adminPage.screenshot({ path: "screenshots/BCP_MultipeContext/01-admin-login-page.png", fullPage: true });
    console.log("Admin: on login page -", await adminPage.title());

    // Viewer Context
    let viewerContext: BrowserContext = await browser.newContext();
    let viewerPage: Page = await viewerContext.newPage();
    await viewerPage.goto("https://app.vwo.com/login");
    await viewerPage.screenshot({ path: "screenshots/BCP_MultipeContext/02-viewer-login-page.png", fullPage: true });
    console.log("Viewer: on login page -", await viewerPage.title());

    // Cleanup - reverse order
    await adminPage.close();
    await adminContext.close();
    await viewerPage.close();
    await viewerContext.close();
    await browser.close();

    console.log("Browser closed successfully");
}

multiUserTest();

