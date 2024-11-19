const { test, expect } = require('@playwright/test');
const { emptyFieldsTestData, invalidEmailTestData, invalidPhoneTestData, invalidDateOfBirthTestData } = require('../../data/form/form-test-date');

let urlForm = 'https://test-with-me-app.vercel.app/learning/web-elements/form';
let btnSubmitXpath = "//button[.//text()[normalize-space()='Submit']]";
let INVALID_EMAIL_ERROR = 'The input is not valid E-mail!';
let INVALID_PHONE_NUMBER_ERROR = 'Phone number must be 10 digits!';
let INVALID_DOB_ERROR = 'You must be at least 18 years old!';

async function fillInField(field, value, page) {
    let locator = page.locator(`//div[./label[.//text()[normalize-space()='${field}']]]//following-sibling::div//input[@type='text']`);
    await locator.clear();
    await locator.fill(value);
    await locator.press('Tab');
}

async function verifyError(field, error, page) {
    let errorXpath = `//div[./label[.//text()[normalize-space()='${field}']]]//following-sibling::div//div[contains(concat(' ',@class,' '), ' ant-form-item-explain-error ')]`;
    let numberOfError = await page.locator(errorXpath).count();
    if (numberOfError > 1) {
        for (let i = 1; i <= numberOfError; i++) {
            await expect.soft(page.locator(errorXpath + `[${i}]`)).toHaveText(error[i - 1]);
        }
    } else {
        await expect.soft(page.locator(errorXpath)).toHaveText(error);
    }
}

async function pickDate(timeData, page) {
    let parts = timeData.split('-');
    let yearToSelect = parts[0];
    let monthToSelect = parts[1];
    let dateToSelect = parts[2];
    let monthDisplayXpath = "//button[@aria-label='month panel']";
    let yearDisplayXpath = "//button[@aria-label='year panel']";
    let btnPrevMonthXpath = "//button[@aria-label='prev-year']";
    let btnPrevYearXpath = "//button[@aria-label='super-prev-year']";
    let btnNextYearXpath = "//button[@aria-label='super-next-year']";
    let btnChoosenDateXpath = `//td[contains(concat(' ',normalize-space(@class),' '),' ant-picker-cell-in-view ')][./div[normalize-space(text())='${dateToSelect}']]`;
    //select month
    let monthDisplay = await page.locator(monthDisplayXpath).textContent();
    while (monthToSelect != monthDisplay) {
        await page.locator(btnPrevMonthXpath).click();
        monthDisplay = await page.locator(monthDisplayXpath).textContent();
    }
    //select year
    let yearDisplay = await page.locator(yearDisplayXpath).textContent();
    let btnNavigateXpath = btnNextYearXpath;
    if (yearToSelect < yearDisplay) {
        btnNavigateXpath = btnPrevYearXpath;
    } while (yearToSelect != yearDisplay) {
        await page.locator(btnNavigateXpath).click();
        yearDisplay = await page.locator(yearDisplayXpath).textContent();
    }
    //select date
    await page.locator(btnChoosenDateXpath).click();
}

emptyFieldsTestData.forEach(({ fullNameError, emailError, phoneNumberError, dateOfBirthError, addressError }) => {
    test('Verify submitting the form without filling in any field', async ({ page }) => {
        await page.goto(urlForm);
        await page.locator(btnSubmitXpath).click();
        await verifyError('Full Name', fullNameError, page);
        await verifyError('Email', emailError, page);
        await verifyError('Phone Number', phoneNumberError, page);
        await verifyError('Date of Birth', dateOfBirthError, page);
        await verifyError('Address', addressError, page);
    });
});

invalidEmailTestData.forEach(invalidEmail => {
    test(`Validate Email field with '${invalidEmail}' value`, async ({ page }) => {
        await page.goto(urlForm);
        await fillInField('Email', invalidEmail, page);
        await verifyError('Email', INVALID_EMAIL_ERROR, page);
    });
})

invalidPhoneTestData.forEach(invalidPhoneNumber => {
    test(`Validate Email field with '${invalidPhoneNumber}' value`, async ({ page }) => {
        await page.goto(urlForm);
        await fillInField('Phone Number', invalidPhoneNumber, page);
        await verifyError('Phone Number', INVALID_PHONE_NUMBER_ERROR, page);
    });
})

invalidDateOfBirthTestData.forEach(invalidDateOfBirth => {
    test(`Validate Email field with '${invalidDateOfBirth}' value`, async ({ page }) => {
        await page.goto(urlForm);
        let dateOfBirthPickerXpath = "//div[./label[.//text()[normalize-space()='Date of Birth']]]//following-sibling::div//div[./input]";
        await page.locator(dateOfBirthPickerXpath).click();
        await pickDate(invalidDateOfBirth, page);
        await verifyError('Date of Birth', INVALID_DOB_ERROR, page);
    });
})



