import {chromium, Browser, BrowserContext, Page} from "playwright";

async function run() {

    let browser: Browser = await chromium.launch({headless: false});
    console.log("Browser Launched");

    let context: BrowserContext = await browser.newContext();
    console.log("Context Created");

    let page1: Page = await context.newPage();
    await page1.goto("https://app.vwo.com/login", { waitUntil: "networkidle", timeout: 15000 });
    await page1.screenshot({ path: "screenshots/BCP_Multiple_Pages/01-page1-vwo-login.png", fullPage: true });
    console.log("Page 1 - Title:", await page1.title());

    let page2: Page = await context.newPage();
    await page2.goto("https://example.com", { waitUntil: "networkidle", timeout: 15000 });
    await page2.screenshot({ path: "screenshots/BCP_Multiple_Pages/02-page2-example.png", fullPage: true });
    console.log("Page 2 - Title:", await page2.title());

    let page3: Page = await context.newPage();
    await page3.goto("https://www.wikipedia.org", { waitUntil: "networkidle", timeout: 15000 });
    await page3.screenshot({ path: "screenshots/BCP_Multiple_Pages/03-page3-wikipedia.png", fullPage: true });
    console.log("Page 3 - Title:", await page3.title());

    await page1.close();
    await page2.close();
    await page3.close();
    await context.close();
    await browser.close();

    console.log("Browser closed successfully");
}

run();
