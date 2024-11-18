const { test, expect } = require('@playwright/test');
const { cascaderTestData, multipleCascaderTestData } = require('../../data/components/cascader-test-data');

let urlCascader = 'https://test-with-me-app.vercel.app/learning/web-elements/components/cascader';
let cbCascaderXpath = "//div[./span[contains(concat(' ',normalize-space(@class),' '),' ant-select-selection-search ')]]";
let cbCascaderMultipleValuesXpath = "//div[./div[contains(concat(' ',normalize-space(@class),' '),' ant-select-selection-overflow ')]]";

async function selectCascader(page, listMenuItem) {
    let menuItem = listMenuItem.split(',');
    for (let i = 0; i < menuItem.length; i++) {
        await page.locator(`(//li[.//text()[normalize-space()='${menuItem[i].trim()}']])[last()]`).click();
    }
}

async function selectMultipleCascader(page, listMenuItem) {
    let menuItem = listMenuItem.split(',');
    for (let i = 0; i < menuItem.length; i++) {
        if (i == menuItem.length - 1) {
            let itemCheckboxXpath = `(//ul[@role='menu']/li[@role="menuitemcheckbox" and .//text()[normalize-space()='${menuItem[i].trim()}']]/span[contains(concat(' ',@class,' '), ' ant-cascader-checkbox ')])[last()]`;
            await page.locator(itemCheckboxXpath).click();
            await page.locator(itemCheckboxXpath).press('Tab');
        }else{
            let itemXpath = `(//ul[@role='menu']/li[@role="menuitemcheckbox" and .//text()[normalize-space()='${menuItem[i].trim()}']])[last()]`;
            await page.locator(itemXpath).click();
        }
    }
}

cascaderTestData.forEach(listMenuItem => {
    test(`Verify selecting Cascader ${listMenuItem}`, async ({ page }) => {
        await page.goto(urlCascader);
        await page.locator(cbCascaderXpath).click();
        await selectCascader(page, listMenuItem);
        let currentValueLabelXpath = `//div[./span[normalize-space(text())='Cascader']]/following::div[normalize-space(text())='Current value:'][1]`;
        await expect(page.locator(currentValueLabelXpath)).toHaveText(`Current value: ${listMenuItem}`);
    });
})

multipleCascaderTestData.forEach(({ input, expectResult }) => {
    test(`Verify select Multiple Cascader ${input}`, async ({ page }) => {
        await page.goto(urlCascader);
        await page.locator(cbCascaderMultipleValuesXpath).click();
        await selectMultipleCascader(page, input);
        let currentValueLabelXpath = `//div[./span[normalize-space(text())='Cascader multiple values']]/following::div[normalize-space(text())='Current value:'][1]`;
        await expect(page.locator(currentValueLabelXpath)).toHaveText(`Current value:${expectResult}`);
    })
})