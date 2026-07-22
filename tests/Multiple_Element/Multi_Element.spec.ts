import { test, expect } from "@playwright/test";
import path from "path";

test("Basic verify how to handle multiple elements in a page", async ({ page }) => {

    await test.step("Navigate to the page", async () => {
        await page.goto("https://app.thetestingacademy.com/playwright/multiple_element_filter");
        await page.screenshot({ path: "screenshots/multi-element-homepage.png", fullPage: true });
    });

    await test.step("Get all right panel link texts", async () => {
        const rightPanelLinksTexts: string[] = await page.locator("a.list-group-item").allInnerTexts();
        console.log("Total links:", rightPanelLinksTexts.length);

        for (const link of rightPanelLinksTexts) {
            console.log(link);
        }

        expect(rightPanelLinksTexts.length).toBeGreaterThan(0);
    });

    await test.step("Click on 'Forgot Password' link", async () => {
        const rightPanelLinksTexts: string[] = await page.locator("a.list-group-item").allInnerTexts();

        for (let i = 0; i < rightPanelLinksTexts.length; i++) {
            const linkText = rightPanelLinksTexts[i];

            if (linkText === "Forgotten Password") {
                await page.getByText(linkText).first().click();
                break;
            }
        }

        await page.screenshot({ path: "screenshots/multi-element-after-click.png", fullPage: true });
    });

    await test.step("Get href attributes of all right panel links", async () => {
        const rightPanelLinks = await page.locator('a.list-group-item').all();

        for (const link of rightPanelLinks) {
            console.log(await link.getAttribute('href'));
        }
    });

});


        
        

