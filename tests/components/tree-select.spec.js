const { test, expect } = require('@playwright/test');
const { treeSelectTestData } = require('../../data/components/tree-select-test-data');

let urlTree = 'https://test-with-me-app.vercel.app/learning/web-elements/components/tree-select';
async function selectItemInTree(page, tree) {
    let treeItem = tree.split(',');
    for (let i = 0; i < treeItem.length; i++) {
        let itemXpath = `//span[./span[text()[normalize-space()='${treeItem[i].trim()}']]][last()]`;
        if (i != treeItem.length - 1) {
            let status = await page.locator(itemXpath).getAttribute('class');
            if (status.includes('close')) {
                itemXpath += "/preceding-sibling::span[contains(concat(' ',@class,' '), ' ant-select-tree-switcher ant-select-tree-switcher_close ' )]";
            }
            await page.locator(itemXpath).click();
        } else {
            await page.locator(itemXpath).click();
        }
    }
}

treeSelectTestData.forEach(({ input, expectedResult }) => {
    test(`Verify select ${expectedResult} in Tree`, async ({ page }) => {
        await page.goto(urlTree);
        let treeSelectXpath = "//div[.//text()[normalize-space()='TreeSelect']]//following-sibling::div[.//input[@role='combobox']]/div";
        await page.locator(treeSelectXpath).click();
        await selectItemInTree(page, input);
        let currentValueLabelXpath = `//div[./span[normalize-space(text())='TreeSelect']]/following::div[normalize-space(text())='Current value:']`;
        await expect(page.locator(currentValueLabelXpath)).toHaveText(`Current value: ${expectedResult}`);
    })
})