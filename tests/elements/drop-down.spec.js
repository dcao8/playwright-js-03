const { test, expect } = require('@playwright/test');
const { dropDownTestData } = require('../../data/elements/drop-down-test-data');

dropDownTestData.forEach(value => {
    test(`Verify Radio button with value '${value}'`, async ({ page }) => {
        await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/elements/dropdown');
        let btnEllipsisXpath = "//button[.//span[@aria-label='ellipsis']]";
        let dropDownItemXpath = `//li[.//span[normalize-space(text())='${value}']]`;
        let valueLabelXpath = `//div[./span[normalize-space(text())='${value}']]`;
        await page.locator(btnEllipsisXpath).hover();
        await page.locator(dropDownItemXpath).click();
        await expect(page.locator(valueLabelXpath)).toBeVisible();
    });
})