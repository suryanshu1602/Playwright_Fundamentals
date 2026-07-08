import {chromium, Browser, BrowserContext, Page} from "playwright";

async function run() {

    let browser: Browser = await chromium.launch({headless: false});
    console.log("Browser Launched");

    let context: BrowserContext = await browser.newContext({
        viewport: { width: 1280, height: 720 },
        locale: "en-US",
        geolocation: { latitude: 40.7128, longitude: -74.0060 },
        permissions: ["geolocation"]
    });
    console.log("Context Created with custom options");

    let page: Page = await context.newPage();
    console.log("Page Opened");

    await page.goto("https://example.com", { waitUntil: "networkidle", timeout: 15000 });
    console.log("Navigated to example.com");

    await page.screenshot({ path: "screenshots/BCP_Test_Options/01-custom-viewport.png", fullPage: true });
    console.log("Screenshot captured");

    let viewport = page.viewportSize();
    console.log("Viewport Size:", viewport?.width, "x", viewport?.height);

    let title = await page.title();
    console.log("Page Title:", title);

    await page.close();
    await context.close();
    await browser.close();

    console.log("Browser closed successfully");
}

run();
