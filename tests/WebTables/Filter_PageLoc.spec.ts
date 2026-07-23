import { test, expect } from '@playwright/test';

test.describe('Filter & Page Locator Tests', () => {

    test('Filter elements by text using .filter() locator', async ({ page }) => {

        await test.step('Navigate to the multi-element filter page', async () => {
            await page.goto('https://app.thetestingacademy.com/playwright/multiple_element_filter');
            await page.screenshot({ path: 'screenshots/filter-homepage.png', fullPage: true });
        });

        await test.step('Filter list-group items by exact text and click', async () => {
            const forgottenPasswordLink = page.locator('a.list-group-item').filter({ hasText: 'Forgotten Password' });
            await expect(forgottenPasswordLink).toBeVisible();
            await forgottenPasswordLink.click();
            await page.screenshot({ path: 'screenshots/filter-after-click.png', fullPage: true });
        });

    });

    test('Filter footer links by text and verify attributes', async ({ page }) => {

        await test.step('Navigate and capture initial state', async () => {
            await page.goto('https://app.thetestingacademy.com/playwright/multiple_element_filter');
            await page.screenshot({ path: 'screenshots/filter-footer-homepage.png', fullPage: true });
        });

        await test.step('Find Privacy Policy link via filter and verify href', async () => {
            const privacyLink = page.locator('footer a').filter({ hasText: 'Privacy Policy' });
            await expect(privacyLink).toBeVisible();
            await expect(privacyLink).toHaveAttribute('href', '#privacy-policy');
            console.log('Privacy Policy href:', await privacyLink.getAttribute('href'));
        });

    });

    test('Collect and verify all filterable list items', async ({ page }) => {

        await test.step('Navigate to the page', async () => {
            await page.goto('https://app.thetestingacademy.com/playwright/multiple_element_filter');
        });

        await test.step('Collect all list-group-item texts and log them', async () => {
            const itemTexts = await page.locator('a.list-group-item').allInnerTexts();
            console.log('Total list items:', itemTexts.length);
            itemTexts.forEach((text, i) => console.log(`Item ${i + 1}: ${text}`));
            expect(itemTexts.length).toBeGreaterThan(0);
        });

        await test.step('Collect all href attributes from list links', async () => {
            const links = await page.locator('a.list-group-item').all();
            const hrefs: (string | null)[] = [];
            for (const link of links) {
                hrefs.push(await link.getAttribute('href'));
            }
            console.log('All link hrefs:', hrefs);
            expect(hrefs.every(h => h !== null)).toBeTruthy();
            await page.screenshot({ path: 'screenshots/filter-all-links.png', fullPage: true });
        });

    });

});
