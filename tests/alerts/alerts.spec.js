const { test, expect } = require('@playwright/test');

const alertsUrl = 'https://test-with-me-app.vercel.app/learning/web-elements/alerts';

function buildButtonXpath(alertType) {
    return `(//div[.//text()[normalize-space()='${alertType}']]/following-sibling::button)[1]`;
}

test('Verify Alert Demo', async ({ page }) => {
    await page.goto(alertsUrl);
    page.on('dialog', async dialog => {
        expect(dialog.message()).toBe('Welcome to Test With Me!');
        await dialog.accept();
    });
    await page.locator(buildButtonXpath('Alert Demo')).click();
});

['OK', 'Cancel'].forEach(option => {
    test(`Verify Alert Confirm / Cancel with '${option}' option`, async ({ page }) => {
        let alertsType = 'Alert Confirm / Cancel';
        await page.goto(alertsUrl);
        page.on('dialog', async dialog => {
            expect.soft(dialog.message()).toBe('Are you sure to delete this item?');
            if (option == 'OK') {
                await dialog.accept();
            }
            else {
                await dialog.dismiss();
            }
        });
        await page.locator(buildButtonXpath(alertsType)).click();
        let labelSelectValueXpath = `(//div[.//text()[normalize-space()='${alertsType}']]/following-sibling::div[.//text()[normalize-space()='Selected value:']])[1]`;
        await expect(page.locator(labelSelectValueXpath)).toHaveText(`Selected value: ${option}`);
    });
})

test(`Verify Alert with prompt box`, async ({ page }) => {
    let alertsType = 'Alert with prompt box';
    let yourName = 'DayCao';
    await page.goto(alertsUrl);
    page.on('dialog', async dialog => {
        expect.soft(dialog.message()).toBe('Please enter your name:');
        await dialog.accept(yourName);
    });
    await page.locator(buildButtonXpath(alertsType)).click();
    let labelSelectValueXpath = `(//div[.//text()[normalize-space()='${alertsType}']]/following-sibling::div[.//text()[normalize-space()='Entered value:']])[1]`;
    await expect(page.locator(labelSelectValueXpath)).toHaveText(`Entered value: ${yourName}`);
});

['OK', 'Cancel'].forEach(option => {
    test(`Verify Alert with prompt box without filling name then select '${option}' option`, async ({ page }) => {
        let alertsType = 'Alert with prompt box';
        await page.goto(alertsUrl);
        page.on('dialog', async dialog => {
            expect.soft(dialog.message()).toBe('Please enter your name:');
            if (option == 'OK') {
                await dialog.accept();
            }
            else {
                await dialog.dismiss();
            }
            page.on('dialog', async dialog => {
                expect.soft(dialog.message()).toBe('Name is required!');
                await dialog.accept();
            });
        });
        await page.locator(buildButtonXpath(alertsType)).click();
        let labelSelectValueXpath = `(//div[.//text()[normalize-space()='${alertsType}']]/following-sibling::div[.//text()[normalize-space()='Entered value:']])[1]`;
        await expect(page.locator(labelSelectValueXpath)).toHaveText(`Entered value: `);
    });
})