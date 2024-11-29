const { test, expect } = require('@playwright/test');
const { modalTestData } = require('../../data/components/modal-test-data');

modalTestData.forEach(({ button, expectStatus }) => {
    test(`Verify modal when clicking '${button}' button`, async ({ page }) => {
        await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/components/modal');
        let btnShowModalXpath = "(//div[./span[normalize-space(text())='Modal / Popup']]/following::button[.//text()[normalize-space()='Show Confirm']])[1]";
        await page.locator(btnShowModalXpath).click();
        let notificationMessageXpath = "//div[@role='dialog']//span[contains(concat(' ',@class,' '),' ant-modal-confirm-title ')]";
        await expect(page.locator(notificationMessageXpath)).toHaveText('Are you sure delete this task?');
        let btnOnDialogXpath = `//div[@role='dialog']//button[.//text()[normalize-space()='${button}']]`;
        await page.locator(btnOnDialogXpath).click();
        let labelStatusXpath = "(//div[./span[normalize-space(text())='Modal / Popup']]/following::div[.//text()[normalize-space()='Status:']])[1]";
        await expect(page.locator(labelStatusXpath)).toHaveText(`Status: ${expectStatus}`);
    });
});
