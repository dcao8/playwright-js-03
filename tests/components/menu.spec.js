const { test, expect } = require('@playwright/test');
const { menuTestData } = require('../../data/components/menu-test-data');

menuTestData.forEach(({ item, option, expectedResult }) => {
    test(`Verify selecting ${option} in ${item}`, async ({ page }) => {
        await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/components/menu');
        let myMenuXpath = "//div[@role='menuitem' and .//text()[normalize-space()='My Menu']]";
        await page.locator(myMenuXpath).hover();
        let menuItemXpath = `//li[@role="presentation" and .//text()[normalize-space()='${item}']]//li[.//text()[normalize-space()='${option}']]`;
        await page.locator(menuItemXpath).click();
        let currentValueLabelXpath = `//div[./span[normalize-space(text())='Menu']]/following::div[normalize-space(text())='Current value:']`;
        await expect(page.locator(currentValueLabelXpath)).toHaveText(`Current value: ${expectedResult}`);
    })
})
