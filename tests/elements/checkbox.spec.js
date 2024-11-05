const { test, expect } = require('@playwright/test');

function buildCheckboxXpath(label) {
    return `//label[./span[normalize-space(text())='${label}']]//input`;
}

test('Verify select all checkbox v1', async ({ page }) => {
    await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/elements/checkbox');
    //Select Apple checkbox
    await page.locator(buildCheckboxXpath('Apple')).setChecked(true);
    //Select Pear checkbox
    await page.locator(buildCheckboxXpath('Pear')).setChecked(true);
    //Select Orange checkbox
    await page.locator(buildCheckboxXpath('Orange')).setChecked(true);
    //Verify Selected value
    let selectedValueLabelXpath = "//div[normalize-space(text())='Selected values:']";
    await expect(page.locator(selectedValueLabelXpath)).toHaveText(`Selected values: Apple Pear Orange`);
});


async function selectCheckboxByLabel(label, page) {
    //Select checkbox
    let isChecked = await page.locator(buildCheckboxXpath(label)).isChecked();
    if (!isChecked) {
        await page.locator(buildCheckboxXpath(label)).click();
    }
}
test('Verify select all checkbox v2', async ({ page }) => {
    await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/elements/checkbox');
    //Select Apple checkbox
    await selectCheckboxByLabel('Apple', page);
    //Select Pear checkbox
    await selectCheckboxByLabel('Pear', page);
    //Select Orange checkbox
    await selectCheckboxByLabel('Orange', page);
    //Verify Selected value
    let selectedValueLabelXpath = "//div[normalize-space(text())='Selected values:']";
    await expect(page.locator(selectedValueLabelXpath)).toHaveText(`Selected values: Apple Pear Orange`);
});