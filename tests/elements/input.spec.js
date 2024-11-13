const { test, expect } = require('@playwright/test');
const { textInputTestData, numberInputTestData, increaseDescreaseTestData } = require('../../data/elements/input-element-test-data');

async function fillValue(page, xpath, value) {
    let locator = page.locator(xpath);
    await locator.clear();
    await locator.fill(value);
    await locator.press('Tab');
}

async function changeNumberInputValue(page, xpath, actionButtonXpath) {
    await page.locator(xpath).hover();
    await page.locator(actionButtonXpath).click();
}

textInputTestData.forEach(placeholder => {
    test(`Verify Input with '${placeholder}' placeholder`, async ({ page }) => {
        await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/elements/input');
        let inputXpath = `//*[@placeholder='${placeholder}']`;
        let textInput = "test"
        let expectedValueLabelXpath = `//div[./span[normalize-space(text())='${textInput}']]`;
        await fillValue(page, inputXpath, textInput);
        await expect(page.locator(expectedValueLabelXpath)).toBeVisible();
    });
});


numberInputTestData.forEach(({ input, expected }) => {
    test(`Verify that ${input} number will display as ${expected}`, async ({ page }) => {
        await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/elements/input');
        let inputXpath = "//input[@role='spinbutton']";
        let expectedValueLabelXpath = `//div[./span[normalize-space(text())='${expected}']]`;
        await fillValue(page, inputXpath, input.toString());
        await expect(page.locator(expectedValueLabelXpath)).toBeVisible();
    });
})

increaseDescreaseTestData.forEach(({ input, expected, action }) => {
    test(`Verify that ${input} number will display as ${expected} when clicking ${action} button`, async ({ page }) => {
        await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/elements/input');
        let inputXpath = "//input[@role='spinbutton']";
        let expectedValueLabelXpath = `//div[./span[normalize-space(text())='${expected}']]`;
        let actionButtonXpath = `//span[@role='button' and ./span[@aria-label='${action}']]`;
        await fillValue(page, inputXpath, input.toString());
        await changeNumberInputValue(page, inputXpath, actionButtonXpath);
        await expect(page.locator(expectedValueLabelXpath)).toBeVisible();
    });
})

test('Verify OTP box', async ({ page }) => {
    await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/elements/input');
    let inputXpath = "//div[./span[normalize-space(text())='OTP Box']]/following-sibling::div/input";
    let otp = "daycao";
    let expectedValueLabelXpath = `//div[./span[normalize-space(text())='${otp}']]`;
    for (let i = 0; i < 6; i++) {
        await fillValue(page, `${inputXpath}[${i + 1}]`, otp[i]);
    }
    await expect(page.locator(expectedValueLabelXpath)).toBeVisible();
});
