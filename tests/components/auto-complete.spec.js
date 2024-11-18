const { test, expect } = require('@playwright/test');
const { validKeyword, invalidKeyword } = require('../../data/components/auto-complete-test-data');

let inputXpath = "//input[@role='combobox']";

async function fillThenSelect(page, keyword, itemOption) {
    let itemOptionXpath = `//div[@aria-selected='false']//div[normalize-space(text())='${itemOption}']`;
    await page.locator(inputXpath).fill(keyword);
    await page.locator(itemOptionXpath).click();
}

validKeyword.forEach(({ keyword, itemOption }) => {
    test(`Verify selecting ${itemOption} with keyword ${keyword}`, async ({ page }) => {
        await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/components/auto-complete');
        await fillThenSelect(page, keyword, itemOption);
        let valueLabelXpath = "//div[normalize-space(text())='Value:']";
        await expect(page.locator(valueLabelXpath)).toHaveText(`Value: ${itemOption} was selected!`);
    });
})

invalidKeyword.forEach(keyword => {
    test(`Verify no item display when searching with keyword ${keyword}`, async ({ page }) => {
        await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/components/auto-complete');
        await page.locator(inputXpath).fill(keyword);
        let listItemsXpath = "//div[contains(concat(' ',normalize-space(@class),' '),' rc-virtual-list ')]";
        await expect(page.locator(listItemsXpath)).toBeHidden();
    });
}) 