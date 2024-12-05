const { test, expect } = require('@playwright/test');

test(`Verify Shadow DOM`, async ({ page }) => {
    await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/shadow-dom');
    let inputName = '#name-input';
    await page.locator(inputName).fill('Day');
    let btnSubmit = '#shadow-btn';
    await page.locator(btnSubmit).click();
    let label = '#name-display';
    await expect(page.locator(label)).toHaveText('Day');
})