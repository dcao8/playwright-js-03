const { test, expect } = require('@playwright/test');
const { transferTestData } = require('../../data/components/transfer-test-data');

let urlTransfer = 'https://test-with-me-app.vercel.app/learning/web-elements/components/transfer';

function buildCheckboxXpath(label, panel) {
    return `//div[contains(concat(' ',@class,' '), ' ant-transfer-list ' ) and .//span[contains(concat(' ',@class,' '), ' ant-transfer-list-header-title ') and normalize-space(text())='${panel}']]//li[.//text()[normalize-space()='${label}']]//input[@type='checkbox']`;
}

async function selectCheckbox(label, panel, page) {
    //Select checkbox
    let isChecked = await page.locator(buildCheckboxXpath(label, panel)).isChecked();
    if (!isChecked) {
        await page.locator(buildCheckboxXpath(label, panel)).click();
    }
}

transferTestData.forEach(({ items, button, fromPanel, toPanel }) => {
    test(`Verify transfer ${items} `, async ({ page }) => {
        await page.goto(urlTransfer);
        //select item to transfer
        await transferItem(items, button, fromPanel, page);
        //verify Source and Target items
        let allTargetItems = await getListItems(toPanel, page);
        expect(allTargetItems).toEqual(expect.arrayContaining(items));
        let allSourceItems = await getListItems(fromPanel, page);
        expect(allSourceItems).not.toEqual(expect.arrayContaining(items));
    });
});

async function transferItem(items, button, panel, page) {
    for (let i = 0; i < items.length; i++) {
        await selectCheckbox(items[i], panel, page);
    }
    //select transfer button
    let actionButtonXpath = `//div[contains(concat(' ',@class,' '), ' ant-transfer-operation ' )]//button[.//span[@aria-label='${button}']]`;
    await page.locator(actionButtonXpath).click();
}

async function getListItems(panel, page) {
    let allItemsXpath = `//div[contains(concat(' ',@class,' '), ' ant-transfer-list ' ) and .//span[contains(concat(' ',@class,' '), ' ant-transfer-list-header-title ') and normalize-space(text())='${panel}']]//li`;
    let allItems = await page.locator(allItemsXpath).all();
    let allItemsString = [];
    for (let item of allItems) {
        let value = await item.textContent();
        allItemsString.push(value);
    }
    return allItemsString;
}