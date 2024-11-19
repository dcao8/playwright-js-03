const { test, expect } = require('@playwright/test');
const { transferTestData } = require('../../data/components/transfer-test-data');

let urlTransfer = 'https://test-with-me-app.vercel.app/learning/web-elements/components/transfer';

function buildCheckboxXpath(label) {
    return `//li[.//text()[normalize-space()='${label}']]//input[@type='checkbox']`;
}

async function selectCheckbox(label, page) {
    //Select checkbox
    let isChecked = await page.locator(buildCheckboxXpath(label)).isChecked();
    if (!isChecked) {
        await page.locator(buildCheckboxXpath(label)).click();
    }
}

transferTestData.forEach(({ items, button, sourceItems, targetItems }) => {
    test(`Verify transfer ${items}`, async ({ page }) => {
        await page.goto(urlTransfer);
        //select item to transfer
        for (let i = 0; i < items.length; i++) {
            await selectCheckbox(items[i], page);
        }
        //select transfer button
        let actionButtonXpath = `//button[.//span[@aria-label='${button}']]`;
        await page.locator(actionButtonXpath).click();
        //verify Source and Target items
        let actualSourceItems = "//div[contains(concat(' ',@class,' '), ' ant-transfer-list ' ) and .//text()[normalize-space()='Source']]//span[contains(concat(' ',@class,' '), ' ant-transfer-list-content-item-text ')]";
        await expect.soft(page.locator(actualSourceItems)).toHaveText(sourceItems);
        let actualTargetItems = "//div[contains(concat(' ',@class,' '), ' ant-transfer-list ' ) and .//text()[normalize-space()='Target']]//span[contains(concat(' ',@class,' '), ' ant-transfer-list-content-item-text ')]";
        await expect.soft(page.locator(actualTargetItems)).toHaveText(targetItems);
    })
})
