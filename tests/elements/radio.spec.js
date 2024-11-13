const { test, expect } = require('@playwright/test');
const { radioTestData } = require('../../data/elements/radio-element-test-data');

radioTestData.forEach(({ style, value }) => {
    test(`Verify Radio button style '${style}'`, async ({ page }) => {
        await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/elements/radio');
        let rbXpath = `(//label[.//input[@type='radio' and @value='${value}']])[${style}]`;
        let valueLabelXpath = `(//div[normalize-space(text())='Value:'])[${style}]`;
        await page.locator(rbXpath).click();
        await expect(page.locator(valueLabelXpath)).toHaveText(`Value: ${value}`);
    });
})