import { test, expect, Page } from '@playwright/test';

async function findRowByName(page: Page, name: string) {

    while (true) {
        const row = page.locator('#employee-body tr').filter({ hasText: name });

        if (await row.count()) return row;

        const next = page.getByTestId('next-page');
        if (await next.isDisabled()) throw new Error(`Row not found: ${name}`);
        await next.click();
    }
}

test('Verify Element by Filter', async ({ page }) => {

    await page.goto('https://app.thetestingacademy.com/playwright/webtable');

    // Find row by name using the helper function
    const row = await findRowByName(page, 'Rohan.Mehta');

    // Get all cell data from that row
    const cellData = await row.locator('td').allInnerTexts();
    console.log('Rohan.Mehta row data:', cellData);

    // Verify key data points
    expect(cellData.length).toBeGreaterThan(0);
    expect(cellData).toContain('Rohan.Mehta');

    await page.waitForTimeout(2000);

});
