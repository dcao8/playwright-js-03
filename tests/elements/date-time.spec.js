const { test, expect } = require('@playwright/test');
const { timePickerTestData, timeRangePickerTestData, datePickerTestData, dateRangePickerTestData, multipleDatePickerTestData } = require('../../data/elements/date-time-test-data');

let urlDateTime='https://test-with-me-app.vercel.app/learning/web-elements/elements/date-time';

async function selectDateTimePicker(page, placeholder) {
    let pickerXpath = `//div[./input[@placeholder='${placeholder}']]`;
    await page.locator(pickerXpath).click();
}

async function pickTimeElement(page, type, value) {
    await page.locator(`//ul[@data-type='${type}']//li[.//text()='${value}']`).click();
}

async function pickTime(page, timeString) {
    let timeParts = timeString.split(":");
    await pickTimeElement(page, 'hour', timeParts[0]);
    await pickTimeElement(page, 'minute', timeParts[1]);
    await pickTimeElement(page, 'second', timeParts[2]);
    await page.locator("//button[.//text()[normalize-space()='OK']]").click();
}

async function fillTime(page, placeholder, timeString) {
    let pickerXpath = `//input[@placeholder='${placeholder}' and @size='12']`;
    if (timeString.includes(':')) {
        pickerXpath = `//input[@placeholder='${placeholder}' and @size='21']`;
    }
    await page.locator(pickerXpath).fill(timeString);
    await page.locator(pickerXpath).press('Enter');
}

timePickerTestData.forEach(({ placeholder, time }) => {
    test(`Verify selecting ${time} Time Picker`, async ({ page }) => {
        await page.goto(urlDateTime);
        await selectDateTimePicker(page, placeholder);
        await pickTime(page, time);
        let currentTimeLabelXpath = "//div[text()[normalize-space()='Current time:']]";
        await expect(page.locator(currentTimeLabelXpath)).toHaveText(`Current time: ${time}`);
    });
});

timeRangePickerTestData.forEach(({ placeholder, startTime, endTime, expectedResult }) => {
    test(`Verify selecting ${startTime} to ${endTime} Time Range Picker`, async ({ page }) => {
        await page.goto(urlDateTime);
        await selectDateTimePicker(page, placeholder);
        await pickTime(page, startTime);
        await pickTime(page, endTime);
        let currentTimeRangeLabelXpath = "//div[text()[normalize-space()='Current time range:']]";
        await expect(page.locator(currentTimeRangeLabelXpath)).toHaveText(`Current time range: ${expectedResult}`);
    });
});

datePickerTestData.forEach(({ placeholder, value }) => {
    test(`Verify ${placeholder} picker`, async ({ page }) => {
        await page.goto(urlDateTime);
        await fillTime(page, placeholder, value);
        let currentDateLabelXpath = `//div[text()[normalize-space()='Current date:'] and ./span[normalize-space(text())='${value}']]`;
        await expect(page.locator(currentDateLabelXpath)).toBeVisible();
    });
});

dateRangePickerTestData.forEach(({ startPlaceholder, startTime, endPlaceholder, endTime, expectedResult }) => {
    test(`Verify selecting ${startTime} to ${endTime} Date Time Range Picker`, async ({ page }) => {
        await page.goto(urlDateTime);
        await fillTime(page, startPlaceholder, startTime);
        await fillTime(page, endPlaceholder, endTime);
        let currentTimeRangeLabelXpath = "//div[text()[normalize-space()='Current date range:']]";
        await expect(page.locator(currentTimeRangeLabelXpath)).toHaveText(`Current date range: ${expectedResult}`);
    });
});

async function pickDate(page, timeData) {
    let parts = timeData.split('-');
    let yearToSelect = parts[0];
    let monthToSelect = parts[1];
    let dateToSelect = parts[2];
    let monthDisplayXpath="//button[@aria-label='month panel']";
    let yearDisplayXpath="//button[@aria-label='year panel']";
    let btnPrevMonthXpath="//button[@aria-label='prev-year']";
    let btnPrevYearXpath="//button[@aria-label='super-prev-year']";
    let btnNextYearXpath="//button[@aria-label='super-next-year']";
    let btnChoosenDateXpath=`//td[contains(concat(' ',normalize-space(@class),' '),' ant-picker-cell-in-view ')][./div[normalize-space(text())='${dateToSelect}']]`;
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

multipleDatePickerTestData.forEach(({ listDate, expectedResult }) => {
    test('Verify select Multiple Date Picker', async ({ page }) => {
        await page.goto(urlDateTime);
        await page.locator("//div[./input[contains(concat(' ',normalize-space(@class),' '),' ant-picker-multiple-input ')]]").click();
        for (let i = 0; i < listDate.length; i++) {
            await pickDate(page, listDate[i]);
        };
        await page.locator("//span[normalize-space(text())='Multiple Date Picker']").click();
        let currentDateLabelXpath = `//div[normalize-space(text())='Current date:'][2]`;
        await expect(page.locator(currentDateLabelXpath)).toHaveText(`${expectedResult}`);
    });
})
