import { test, expect } from '@playwright/test';

test.describe('Web Table Tests', () => {

    test('test_web_table_login - structured extraction', async ({ page }) => {

        await test.step('Navigate to the web table page', async () => {
            await page.goto('https://awesomeqa.com/webtable1.html');
            await page.screenshot({ path: 'screenshots/webtable-homepage.png', fullPage: true });
        });

        await test.step('Get row count and log it', async () => {
            const rows = page.locator('table[summary="Sample Table"] tbody tr');
            const rowCount = await rows.count();
            console.log('Total rows:', rowCount);
            expect(rowCount).toBeGreaterThan(0);
        });

        await test.step('Extract and print each row data', async () => {
            const rows = page.locator('table[summary="Sample Table"] tbody tr');
            const rowCount = await rows.count();

            for (let i = 0; i < rowCount; i++) {
                await page.waitForTimeout(1000);
                const rowData = await rows.nth(i).locator('td').allInnerTexts();
                console.log(`Row ${i + 1}:`, rowData);
            }

            await page.screenshot({ path: 'screenshots/webtable-data-extracted.png', fullPage: true });
        });

    })
});