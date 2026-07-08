import {test, expect } from '@playwright/test';
import path from 'path';

const screenshotDir = path.resolve('screenshots', 'First_Running_Verify');

test('Verify our first TC', async ({page}) => {
    
    await page.goto ('https://app.vwo.com');
    await page.screenshot({ path: path.join(screenshotDir, '01-navigate-to-vwo.png'), fullPage: true });

    await expect(page).toHaveTitle('Login - Wingify');

    const logo_img = page.locator('#vow-login-logo');

    //id = vow-login-logo
    await expect(logo_img).toBeVisible();
    await page.screenshot({ path: path.join(screenshotDir, '02-logo-visible.png'), fullPage: true });

});

