import {test, except } from '@playwright/test';

test("Verify the title of the page", async ({ page }) => {
    await page.goto("https://app.vwo.com");
    await except(page).toHaveTitle("Login - Winify");
    //page -fixture (injected by Playwright)

});


