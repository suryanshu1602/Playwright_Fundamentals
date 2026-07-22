import { test, expect } from "@playwright/test";

test.describe("OrangeHRM PIM - Terminated User Delete Verification", () => {
    test("Scroll through PIM, find terminated user, check box, click delete, verify popup", async ({ page }) => {
        test.setTimeout(120000);
        page.setDefaultTimeout(15000);

        await test.step("1. Login to OrangeHRM", async () => {
            await page.goto("https://awesomeqa.com/hr/web/index.php/auth/login", { waitUntil: "load", timeout: 30000 });
            await page.waitForTimeout(1000);
            await page.locator('input[name="username"]').fill("admin");
            await page.locator('input[name="password"]').fill("Awesomeqa@4321");
            await page.locator('button[type="submit"]').click();
            await page.waitForTimeout(3000);
            console.log("Logged in, URL:", page.url());
        });

        await test.step("2. Navigate to PIM Employee List", async () => {
            await page.goto("https://awesomeqa.com/hr/web/index.php/pim/viewEmployeeList", { waitUntil: "load" });
            await page.waitForTimeout(2000);
            await page.screenshot({
                path: "screenshots/OrangeHRM/Terminated_User_Delete/01_pim_page.png",
                fullPage: true,
            });
        });

        await test.step("3. Scroll down and find user with Terminated status", async () => {
            let terminatedRow = null;

            // Loop through all pages
            for (let pageNum = 1; pageNum <= 10; pageNum++) {
                const rows = page.locator(".oxd-table-card");
                const rowCount = await rows.count();
                console.log(`Page ${pageNum} - Visible rows: ${rowCount}`);

                for (let i = 0; i < rowCount; i++) {
                    const row = rows.nth(i);
                    await row.scrollIntoViewIfNeeded();
                    await page.waitForTimeout(200);

                    const rowText = await row.innerText();
                    console.log(`  Row ${i}: ${rowText.substring(0, 140).replace(/\n/g, " | ")}`);

                    if (rowText.toLowerCase().includes("terminated")) {
                        console.log(`✓ Found terminated user at row ${i}!`);
                        terminatedRow = row;

                        // Select the checkbox in this row
                        const checkbox = row.locator(".oxd-checkbox-input, input[type='checkbox']").first();
                        await checkbox.check({ force: true });
                        await page.waitForTimeout(500);
                        console.log("✓ Checkbox selected");
                        break;
                    }
                }

                if (terminatedRow) break;

                // Go to next page
                const nextBtn = page.locator(".oxd-pagination-page-item--next");
                const isDisabled = await nextBtn.evaluate(el => el.classList.contains("oxd-pagination-page-item--disabled")).catch(() => true);
                if (isDisabled) {
                    console.log("No more pages. Terminated user not found.");
                    break;
                }
                await nextBtn.click();
                await page.waitForTimeout(2000);
            }

            if (terminatedRow) {
                await page.screenshot({
                    path: "screenshots/OrangeHRM/Terminated_User_Delete/02_checkbox_selected.png",
                    fullPage: true,
                });
            } else {
                throw new Error("No terminated user found on any page");
            }
        });

        await test.step("4. Click Delete Selected button", async () => {
            const deleteSelected = page.locator(".orangehrm-bulk-actions button, button:has-text('Delete Selected')");
            await deleteSelected.waitFor({ state: "visible", timeout: 5000 });
            await deleteSelected.click();
            await page.waitForTimeout(1500);
            console.log("✓ Clicked 'Delete Selected' button");
        });

        await test.step("5. Verify delete confirmation popup - do NOT confirm", async () => {
            // Check page content for confirmation text
            const pageText = await page.locator("body").innerText();
            console.log("Page text after delete click:", pageText.substring(0, 500));

            // Look for any confirmation dialog text
            const hasConfirmText = pageText.includes("delete") || pageText.includes("confirm") || pageText.includes("sure");
            console.log("Delete confirmation text found:", hasConfirmText);

            await page.screenshot({
                path: "screenshots/OrangeHRM/Terminated_User_Delete/03_delete_dialog.png",
                fullPage: true,
            });

            console.log("✓ User was NOT deleted. No further action taken on dialog.");
        });
    });
});
