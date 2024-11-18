const { test, expect } = require('@playwright/test');
const { rateTestData, haftRateTestData } = require('../../data/components/rate-test-data');

let urlRate = 'https://test-with-me-app.vercel.app/learning/web-elements/components/rating';

async function selectRating(page, rateType, input) {
    //get Star to click
    let firstOrSecond = input < Math.ceil(input) ? ' ant-rate-star-first ' : ' ant-rate-star-second ';
    let rateStarXpath = `//span[./text()[normalize-space()='${rateType}']]/following::ul[1]//div[@role='radio' and @aria-posinset='${Math.ceil(input)}']/div[contains(concat(' ',normalize-space(@class),' '),'${firstOrSecond}')]`;
    //get default rate
    let defaultRate = await page.locator(`//span[./text()[normalize-space()='${rateType}']]/following::ul[1]//li[contains(concat(' ',normalize-space(@class),' '),' ant-rate-star-full ')]`).count();
    let haftStarXpath = await page.locator(`//span[./text()[normalize-space()='${rateType}']]/following::ul[1]//li[contains(concat(' ',normalize-space(@class),' '),' ant-rate-star-half ')]`).count();
    if (haftStarXpath != 0) {
        defaultRate += 0.5;
    }
    //check before rate
    if (input != defaultRate) {
        await page.locator(rateStarXpath).click();
    }
}

rateTestData.forEach(({ input, currentRatingExpected }) => {
    test(`Verify rating ${input} and expected result ${currentRatingExpected}`, async ({ page }) => {
        await page.goto(urlRate);
        await selectRating(page, 'Rate', input);
        let valueLabelXpath = "//div[normalize-space(text())='Current rating:'][1]";
        await expect(page.locator(valueLabelXpath)).toHaveText(`Current rating: ${currentRatingExpected}`);
    })
})

haftRateTestData.forEach(input => {
    test(`Verify haft rating ${input}`, async ({ page }) => {
        await page.goto(urlRate);
        await selectRating(page, 'Haft Rate', input);
        let valueLabelXpath = "//div[normalize-space(text())='Current rating:'][2]";
        await expect(page.locator(valueLabelXpath)).toHaveText(`Current rating: ${input}`);
    })
})