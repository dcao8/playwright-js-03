const { test, expect } = require('@playwright/test');

['Success', 'Info', 'Warning', 'Error'].forEach(label => {
    test(`Verify Notification when clicking '${label}' button`, async ({ page }) => {
        await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/components/notification');
        let btnNotificationXpath = `(//div[./span[normalize-space(text())='Notification']]/following::button[.//text()[normalize-space()='${label}']])[1]`;
        await page.locator(btnNotificationXpath).click();
        let notificationMessageXpath = "//div[@role='alert']/div[contains(concat(' ',@class,' '), ' ant-notification-notice-message ')]";
        await expect.soft(page.locator(notificationMessageXpath)).toHaveText(`Notification ${label.toUpperCase()}`);
        let notificationDescriptionXpath = "//div[@role='alert']/div[contains(concat(' ',@class,' '), ' ant-notification-notice-description ')]";
        await expect.soft(page.locator(notificationDescriptionXpath)).toHaveText(`You have clicked the ${label.toUpperCase()} button.`);
    });
});