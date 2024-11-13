const { test, expect } = require('@playwright/test');
const { rateTestData, haftRateTestData } = require('../../data/components/rate-test-data');

async function rate(page, number) {
    //get default rate
    let defaultRate = await page.locator(`//ul[1]//li[@class="ant-rate-star ant-rate-star-full"]`).count();
    //get Star to click
    let rateStarXpath;
    if (number.includes('.')) {
        rateStarXpath = `(//div[@role='radio' and @aria-posinset='${parseInt(number) + 1}']/div[@class='ant-rate-star-first'])[1]`;
    } else {
        rateStarXpath = `(//div[@role='radio' and @aria-posinset='${number}']/div[@class='ant-rate-star-second'])[1]`;
    }
    //check before rate
    if (number !== defaultRate.toString()) {
        await page.locator(rateStarXpath).click();
    }
}

async function haftRate(page, number) {
    //get default rate
    let defaultRate = await page.locator(`//ul[2]//li[@class="ant-rate-star ant-rate-star-full"]`).count();
    if (await page.locator(`//ul[2]//li[@class="ant-rate-star ant-rate-star-half ant-rate-star-active"]`).count() == 1) {
        defaultRate += 0.5;
    }
    //get Star to click
    let rateStarXpath;
    if (number.includes('.')) {
        rateStarXpath = `(//div[@role='radio' and @aria-posinset='${parseInt(number) + 1}']/div[@class='ant-rate-star-first'])[2]`;
    } else {
        rateStarXpath = `(//div[@role='radio' and @aria-posinset='${number}']/div[@class='ant-rate-star-second'])[2]`;
    }
    //check before rate
    if (number !== defaultRate.toString()) {
        await page.locator(rateStarXpath).click();
    }
}

rateTestData.forEach(({ number, currentRatingExpected }) => {
    test(`Verify rating ${number}`, async ({ page }) => {
        await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/components/rating');
        await rate(page, number);
        let valueLabelXpath = "//div[normalize-space(text())='Current rating:'][1]";
        await expect(page.locator(valueLabelXpath)).toHaveText(`Current rating: ${currentRatingExpected}`);
    })
})

haftRateTestData.forEach(number => {
    test(`Verify haft rating ${number}`, async ({ page }) => {
        await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/components/rating');
        await haftRate(page, number);
        let valueLabelXpath = "//div[normalize-space(text())='Current rating:'][2]";
        await expect(page.locator(valueLabelXpath)).toHaveText(`Current rating: ${number}`);
    })
})