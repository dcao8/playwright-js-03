const { test, expect } = require('@playwright/test');
const { tableTestData } = require('../../data/components/table-test-data');

let urlTable = 'https://test-with-me-app.vercel.app/learning/web-elements/components/table';
let indexNameColumn;
let indexAgeColumn;
let indexAddressColumn;
let indexTagsColumn;
let indexActionColumn;

tableTestData.forEach(({ name, address, age, tags, action }) => {
    test(`Verify table with name: '${name}'`, async ({ page }) => {
        await page.goto(urlTable);
        let headerXpath = "//thead[contains(concat(' ',@class,' '),' ant-table-thead ')]//th[@scope='col']";
        await getColumnsIndex(headerXpath, page);
        let expectedRowXpath = `//tr[.//text()[normalize-space()='${name}']]`;
        await findRowByName(expectedRowXpath, page);
        let expectedRow = page.locator(expectedRowXpath);
        expect.soft(await getAddress(expectedRow)).toBe(address);
        expect.soft(await getAge(expectedRow)).toBe(age);
        expect.soft(await getTags(expectedRow)).toEqual(expect.arrayContaining(tags));
        await clickActionButton(expectedRow, action);
    });
})

async function findRowByName(expectedRowXpath, page) {
    while (await page.locator(expectedRowXpath).count() < 1) {
        try {
            let btnNextPageXpath = "//li[.//span[@aria-label='right'] and @aria-disabled='false']";
            await page.locator(btnNextPageXpath).click();
        } catch {
            throw new Error(`Could not found element with xPath: ${expectedRowXpath}`);
        }
    }
}

async function getAddress(row) {
    let cellsInRow = await row.locator("td");
    return await cellsInRow.nth(indexAddressColumn).textContent();
}

async function getAge(row) {
    let cellsInRow = row.locator("td");
    return await cellsInRow.nth(indexAgeColumn).textContent();
}

async function getTags(row) {
    let cellsInRow = await row.locator("//td");
    let tags = [];
    for (let tag of await cellsInRow.nth(indexTagsColumn).locator("//span").all()) {
        tags.push(await tag.textContent());
    }
    return tags;
}

async function clickActionButton(row, action) {
    let cellsInRow = await row.locator("//td");
    await cellsInRow.nth(indexActionColumn).locator(`//a[contains(text(),'${action}')]`).click();
}

async function getColumnsIndex(headerXpath, page) {
    let allColumnNames = await page.locator(headerXpath).allTextContents();
    indexNameColumn = allColumnNames.indexOf("Name");
    indexAgeColumn = allColumnNames.indexOf("Age");
    indexAddressColumn = allColumnNames.indexOf("Address");
    indexTagsColumn = allColumnNames.indexOf("Tags");
    indexActionColumn = allColumnNames.indexOf("Action");
}