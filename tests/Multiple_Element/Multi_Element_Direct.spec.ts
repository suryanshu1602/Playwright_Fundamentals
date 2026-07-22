import {test, expect} from "@playwright/test";

test("Basic verify how to handle multiple elements in a page", async ({page}) => {

    await test.step("Navigate to the page", async () => {
        await page.goto("https://app.thetestingacademy.com/playwright/multiple_element_filter");
        await page.screenshot({ path: "screenshots/direct-homepage.png", fullPage: true });
    });

    await test.step("Click 'Forgotten Password' using getByRole", async () => {
        await page.getByRole('link', { name: 'Forgotten Password' }).click();
        await page.screenshot({ path: "screenshots/direct-after-click.png", fullPage: true });
    });

});

