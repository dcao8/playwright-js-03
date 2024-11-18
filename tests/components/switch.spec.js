const { test, expect } = require('@playwright/test');

["true", "false"].forEach(value => {
    test(`Verify selecting ${value}`, async ({ page }) => {
        await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/components/switch');
        let btnSwitchXpath = "//button[@role='switch']";
        let status = await page.locator(btnSwitchXpath).getAttribute('aria-checked');
        if (status != value) {
            await page.locator(btnSwitchXpath).click();
        }
        let currentValueLabelXpath = `//div[./span[normalize-space(text())='Switch']]/following::div[normalize-space(text())='Current Value:']`;
        await expect(page.locator(currentValueLabelXpath)).toHaveText(`Current Value: ${value}`);
    })
})
