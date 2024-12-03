const { test, expect, errors } = require('@playwright/test');
const { formTestDataFailureCases, formTestDataSuccessCases } = require('../../data/form/form-v2-test-data');

let urlForm = 'https://test-with-me-app.vercel.app/learning/web-elements/form';
formTestDataFailureCases.forEach(({ testCaseName, tags, data }) => {
    test(`${testCaseName}`, { tag: tags }, async ({ page }, testInfo) => {
        await page.goto(urlForm);
        for (let field in data) {
            if (data.hasOwnProperty(field)) {
                await fillFormField(field, data[field].input, page);
            }
        }
        let btnSubmitXpath = "//button[.//text()[normalize-space()='Submit']]";
        await page.locator(btnSubmitXpath).click();
        for (let field in data) {
            if (data.hasOwnProperty(field)) {
                let genericXpathForErrorMessage = `(//label[normalize-space(text())='${field}']/following::div[@role='alert'])[1]`;
                await expect.soft(page.locator(genericXpathForErrorMessage)).toHaveText(data[field].error);
            }
        }
        expect(testInfo.errors).toEqual([]);
    });
});

formTestDataSuccessCases.forEach(({ testCaseName, tags, data }) => {
    test(`${testCaseName}`, { tag: tags }, async ({ page }, testInfo) => {
        await page.goto(urlForm);
        for (let field in data) {
            if (data.hasOwnProperty(field)) {
                await fillFormField(field, data[field], page);
            }
        }
        let btnSubmitXpath = "//button[.//text()[normalize-space()='Submit']]";
        await page.locator(btnSubmitXpath).click();
        let notificationMessageXpath = "//div[@role='alert']/div[contains(concat(' ',@class,' '), ' ant-notification-notice-message ')]";
        await expect.soft(page.locator(notificationMessageXpath)).toHaveText(`Application of "${data['Full Name']}"`);
        let notificationDescriptionXpath = "//div[@role='alert']/div[contains(concat(' ',@class,' '), ' ant-notification-notice-description ')]";
        await expect.soft(page.locator(notificationDescriptionXpath)).toHaveText(`Your application has been submitted successfully.`);
    });
});

async function fillFormField(field, value, page) {
    let genericXpathForInput = `(//label[normalize-space(text())='${field}']/following::input)[1]`;
    await page.locator(genericXpathForInput).fill(value);
}