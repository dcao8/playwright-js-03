const { test, expect } = require('@playwright/test');
const { tableTestData } = require('../../data/components/table-test-data');

let urlTable = 'https://test-with-me-app.vercel.app/learning/web-elements/components/table';

test(`Verify table`, async ({ page }) => {
    await page.goto(urlTable);
    await page.waitForTimeout(3000);
    let headerXpath = "(//div[./span[normalize-space(text())='Table']]/following::table)[1]//thead//th";
    let heardersName = await page.locator(headerXpath).allTextContents();
    let rowXpath = "(//div[./span[normalize-space(text())='Table']]/following::table)[1]//tbody//tr";
    let rows;
    let actualData = [];
    let isBtnNextIsDisabled;
    let columnNeeded = ['Name', 'Age', 'Address', 'Tags'];
    do {
        rows = await page.locator(rowXpath).all();
        for (let row of rows) {
            let rowData = {};
            for (let column of columnNeeded) {
                rowData[column] = await getCellData(heardersName, column, row)
            }
            actualData.push(rowData);
        }
        let btnNextPageXpath = "(//div[./span[normalize-space(text())='Table']]/following::div[contains(concat(' ',@class,' '),' ant-table-wrapper ')])[1]//li[@title='Next Page']";
        let isDisabled = await page.locator(btnNextPageXpath).getAttribute('aria-disabled');
        isBtnNextIsDisabled = isDisabled == 'false';
        if (isBtnNextIsDisabled) {
            await page.locator(btnNextPageXpath).click();
        }
    } while (isBtnNextIsDisabled);
    expect(actualData.length).toEqual(tableTestData.length);
    expect(actualData).toEqual(expect.arrayContaining(tableTestData));
    expect(tableTestData).toEqual(expect.arrayContaining(actualData));
});

async function getCellData(heardersName, columnName, row) {
    let indexName = heardersName.indexOf(columnName);
    let cells = await row.locator(`//td[${indexName + 1}]`).textContent();
    return cells.trim();
}

