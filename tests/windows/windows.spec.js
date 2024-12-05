const { test, expect } = require('@playwright/test');

const windowsUrl = 'https://test-with-me-app.vercel.app/learning/web-elements/windows';

async function clickButtonByText(text, page) {
    let btnXpath = `//button[.//text()[normalize-space()='${text}']]`;
    await page.locator(btnXpath).click();
}

['Open New Tab', 'Open New Window'].forEach(btnLabel => {
    test(`Verify ${btnLabel}`, async ({ page, context }) => {
        await page.goto(windowsUrl);
        await clickButtonByText(btnLabel, page);
        let newTab = await context.waitForEvent('page');
        let expectLabelInFrame = newTab.locator("//p[.//text()[normalize-space()='The best place to learn about Software Testing']]");
        await expect(expectLabelInFrame).toBeVisible();
    })
})

