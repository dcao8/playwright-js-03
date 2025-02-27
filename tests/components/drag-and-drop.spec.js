const { test, expect } = require('@playwright/test');
const { dragAndDropTestData } = require('../../data/components/drag-and-drop-test-data');

let urlDragAndDrop = 'https://test-with-me-app.vercel.app/learning/web-elements/components/drag-n-drop';

async function dragAndDropItem(itemTobeDragged, itemTobeDropAt, page) {
    let itemTobeDraggedXpath = `//button[.//text()[normalize-space()='${itemTobeDragged}']]`;
    let itemTobeDropAtXpath = `//button[.//text()[normalize-space()='${itemTobeDropAt}']]`;
    await page.locator(itemTobeDraggedXpath).dragTo(page.locator(itemTobeDropAtXpath));
}

dragAndDropTestData.forEach(({ itemToBeDragged, itemToBeDropAt, itemsInLeftPanel, itemsInRightPanel }) => {
    test(`Verify drag '${itemToBeDragged}' to '${itemToBeDropAt}'`, async ({ page }) => {
        await page.goto(urlDragAndDrop);
        await dragAndDropItem(itemToBeDragged, itemToBeDropAt, page);
        let actualItemsInLeftPanelXpath = "//div[contains(concat(' ',@class,' '), ' border-teal-500 ') and .//button[@type='button']]//span";
        await expect.soft(page.locator(actualItemsInLeftPanelXpath)).toHaveText(itemsInLeftPanel);
        let actualItemsInRightPanelXpath = "//div[contains(concat(' ',@class,' '), ' border-orange-500 ') and .//button[@type='button']]//span";
        await expect.soft(page.locator(actualItemsInRightPanelXpath)).toHaveText(itemsInRightPanel);
    })
})