const { test, expect } = require('@playwright/test');

['Yes','No'].forEach(button => {
    test(`Verify pop confirm when clicking '${button}' button`, async ({ page }) => {
        await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/components/pop-confirm');
        let btnDeleteXpath = "(//div[./span[normalize-space(text())='Pop confirm']]/following::button[.//text()[normalize-space()='Delete']])[1]";
        await page.locator(btnDeleteXpath).click();
        let btnOnDialogXpath = `//div[.//div[contains(concat(' ',@class,' '),' ant-popconfirm-title ') and text()[normalize-space()='Delete the task']]]//button[.//text()[normalize-space()='${button}']]`;
        await page.locator(btnOnDialogXpath).click();
        let labelStatusXpath = `//div[contains(concat(' ',@class,' '), ' ant-message-notice-content ')]//span[.//text()[normalize-space()='Click on ${button}']]`;
        await expect(page.locator(labelStatusXpath)).toBeVisible();
    });
});
