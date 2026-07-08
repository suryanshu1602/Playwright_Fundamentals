import {chromium, Browser, BrowserContext, Page} from "playwright";
import path from "path";

async function run() {

    //LEVEL 1 : Launch browser - heaviest operation, do it once
    let browser : Browser = await chromium.launch({headless: false});
    console.log("Browser Launched", browser);

    // LEVEL 2 : Create context - fresh session, isolated, isolated cookies
    let context1: BrowserContext = await browser.newContext();
    console.log("Context Created", context1);

    // LEVEL 3 : Create page - tab in the browser
    let page: Page = await context1.newPage();
    console.log("Page opened");

    await page.goto("https://app.vwo.com");
    await page.screenshot({ path: "screenshots/BCP/01-navigate-to-vwo.png", fullPage: true });
    console.log("Title:", await page.title());

    //Cleanup - reverse order
    await page.close();
    await context1.close();
    await browser.close();

    console.log("Browser closed successfully");
}

run();
