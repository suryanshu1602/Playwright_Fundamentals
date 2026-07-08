import {chromium, Browser, BrowserContext, Page} from "playwright";

async function run() {

    let browser: Browser = await chromium.launch({headless: false});
    console.log("Browser Launched");

    let context: BrowserContext = await browser.newContext();
    console.log("Context Created");

    let page: Page = await context.newPage();
    console.log("Page Opened");

    await page.goto("https://app.vwo.com", { waitUntil: "networkidle", timeout: 15000 });
    console.log("Navigated to VWO");

    await page.screenshot({ path: "screenshots/BCP_TEST_PW/01-vwo-login-page.png", fullPage: true });
    console.log("Screenshot captured");

    let title = await page.title();
    console.log("Page Title:", title);

    let url = page.url();
    console.log("Page URL:", url);

    await page.close();
    await context.close();
    await browser.close();

    console.log("Browser closed successfully");
}

run();
