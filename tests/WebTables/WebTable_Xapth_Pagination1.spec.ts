import { test, expect } from '@playwright/test';

test('Verify XPath traversal on webtable', async ({ page }) => {

    await page.goto('https://app.thetestingacademy.com/playwright/webtable');

    // Click the checkbox for Aarav.Sharma using XPath preceding-sibling
    await page.locator("//td[text()='Aarav.Sharma']/preceding-sibling::td/input[@type='checkbox']").click();

    // Click first td in Rohan.Mehta's row using CSS :has()
    await page
        .locator("tr:has(td:text('Rohan.Mehta'))")
        .locator("td")
        .first()
        .click();

    // Get all data following Priya.Nair's username column using XPath following-sibling
    const userData = await page
        .locator("//td[text()='Priya.Nair']/following-sibling::td")
        .allInnerTexts();

    console.log('Priya.Nair data:', userData);
    expect(userData.length).toBe(5);

    // Collect all usernames to verify the table structure
    const allUsernames = await page.locator('td.username').allInnerTexts();
    console.log('All usernames:', allUsernames);
    expect(allUsernames).toContain('Aarav.Sharma');
    expect(allUsernames).toContain('Rohan.Mehta');
    expect(allUsernames).toContain('Priya.Nair');

});
