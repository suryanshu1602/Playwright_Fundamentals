import {chromium, Browser, BrowserContext, Page} from "playwright";

async function run() {

    let browser: Browser = await chromium.launch({headless: false});
    console.log("Browser Launched");

    let context: BrowserContext = await browser.newContext();
    console.log("Context Created");

    let page: Page = await context.newPage();
    console.log("Page Opened");

    await page.goto("https://example.com", { waitUntil: "networkidle", timeout: 15000 });
    console.log("Navigated to example.com");

    await page.screenshot({ path: "screenshots/Test_Annotations/01-example-page.png", fullPage: true });
    console.log("Screenshot captured");

    let title = await page.title();
    console.log("Page Title:", title);

    console.log("Annotations demonstrate test metadata and filtering capabilities");

    await page.close();
    await context.close();
    await browser.close();

    console.log("Browser closed successfully");
}

run();
