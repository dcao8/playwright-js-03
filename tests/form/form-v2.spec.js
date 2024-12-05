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
        await clickButtonByText('Submit', page);
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
        await clickButtonByText('Submit', page);
        let notificationXpath = "//div[@role='alert']";
        await expect(page.locator(notificationXpath)).toHaveText(`Application of "${data['Full Name']}"Your application has been submitted successfully.`);
    });
});

async function fillFormField(field, value, page) {
    let genericXpathForInput = `(//label[normalize-space(text())='${field}']/following::input)[1]`;
    await page.locator(genericXpathForInput).fill(value);
}

async function clickButtonByText(text, page) {
    let btnSubmitXpath = `//button[.//text()[normalize-space()='${text}']]`;
    await page.locator(btnSubmitXpath).click();
}