import { test, expect } from "@playwright/test";

test.describe("OrangeHRM PIM - Terminated User Delete Verification", () => {
    test("Search for terminated user and verify delete dialog without deleting", async ({ page }) => {
        await test.step("Navigate to OrangeHRM Employee List page", async () => {
            await page.goto(
                "https://awesomeqa.com/hr/web/index.php/pim/viewEmployeeList",
                { waitUntil: "load" }
            );
            await page.screenshot({
                path: "screenshots/OrangeHRM/Terminated_User_Delete/01_login_page.png",
                fullPage: true,
            });
        });

        await test.step("Login with admin credentials", async () => {
            await expect(page.locator('input[name="username"]')).toBeVisible();
            await page.locator('input[name="username"]').fill("admin");
            await page.locator('input[name="password"]').fill("Awesomeqa@4321s");
            await page.locator('button[type="submit"]').click();
            await page.waitForLoadState("networkidle");
            await page.screenshot({
                path: "screenshots/OrangeHRM/Terminated_User_Delete/02_dashboard.png",
                fullPage: true,
            });
            await expect(page).toHaveURL(/dashboard/);
        });

        await test.step("Navigate to PIM Employee List", async () => {
            await page.goto(
                "https://awesomeqa.com/hr/web/index.php/pim/viewEmployeeList",
                { waitUntil: "load" }
            );
            await page.screenshot({
                path: "screenshots/OrangeHRM/Terminated_User_Delete/03_employee_list.png",
                fullPage: true,
            });
            await expect(page.locator(".oxd-table")).toBeVisible();
        });

        await test.step("Search for terminated employees using Employment Status filter", async () => {
            await page.locator(".oxd-select-text--active").first().click();
            const terminatedOption = page
                .locator(".oxd-select-dropdown .oxd-select-option")
                .filter({ hasText: "Terminated" });
            await terminatedOption.click();
            await page.locator('button[type="submit"]').click();
            await page.waitForTimeout(2000);
            await page.screenshot({
                path: "screenshots/OrangeHRM/Terminated_User_Delete/04_search_results.png",
                fullPage: true,
            });
        });

        await test.step("Verify terminated users are displayed in the table", async () => {
            const rows = page.locator(".oxd-table-body .oxd-table-card");
            const rowCount = await rows.count();
            console.log(`Number of rows found: ${rowCount}`);
            expect(rowCount).toBeGreaterThanOrEqual(1);
        });

        await test.step("Click the delete button on the first terminated user", async () => {
            const deleteButton = page
                .locator(".oxd-table-body .oxd-table-card")
                .first()
                .locator(".oxd-table-cell-actions button")
                .last();
            await deleteButton.click();
            await page.waitForTimeout(500);
            await page.screenshot({
                path: "screenshots/OrangeHRM/Terminated_User_Delete/05_delete_confirmation_dialog.png",
                fullPage: true,
            });
        });

        await test.step("Verify the delete confirmation dialog is visible", async () => {
            const dialog = page.locator(".oxd-dialog-container-default");
            await expect(dialog).toBeVisible();
            await expect(dialog).toContainText(/delete|are you sure/i);
        });

        await test.step("Cancel the delete action - do NOT delete the user", async () => {
            await page.locator(".oxd-dialog-container-default button").filter({ hasText: /cancel|no/i }).click();
            await page.waitForTimeout(500);
            await page.screenshot({
                path: "screenshots/OrangeHRM/Terminated_User_Delete/06_after_cancel.png",
                fullPage: true,
            });
        });

        await test.step("Verify the dialog is closed and user still exists in the table", async () => {
            await expect(page.locator(".oxd-dialog-container-default")).not.toBeVisible();
            const rows = page.locator(".oxd-table-body .oxd-table-card");
            const rowCount = await rows.count();
            expect(rowCount).toBeGreaterThanOrEqual(1);
            console.log("Delete cancelled successfully. User remains in the table.");
        });
    });
});
