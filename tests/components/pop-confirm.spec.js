const { test, expect } = require('@playwright/test');

['Yes','No'].forEach(button => {
    test(`Verify pop confirm when clicking '${button}' button`, async ({ page }) => {
        await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/components/pop-confirm');
        let btnDeleteXpath = "(//div[./span[normalize-space(text())='Pop confirm']]/following::button[.//text()[normalize-space()='Delete']])[1]";
        await page.locator(btnDeleteXpath).click();
        let popupTitleXpath = "//div[@role='tooltip']//div[contains(concat(' ',@class,' '),' ant-popconfirm-title ')]";
        await expect.soft(page.locator(popupTitleXpath)).toHaveText('Delete the task');
        let popupDescriptionXpath = "//div[@role='tooltip']//div[contains(concat(' ',@class,' '),' ant-popconfirm-description ')]";
        await expect.soft(page.locator(popupDescriptionXpath)).toHaveText('Are you sure to delete this task?');
        let btnOnDialogXpath = `//div[@role='tooltip']//button[.//text()[normalize-space()='${button}']]`;
        await page.locator(btnOnDialogXpath).click();
        let labelStatusXpath = `//div[contains(concat(' ',@class,' '), ' ant-message-notice-content ')]//span[.//text()[normalize-space()='Click on ${button}']]`;
        await expect(page.locator(labelStatusXpath)).toBeVisible();
    });
});
