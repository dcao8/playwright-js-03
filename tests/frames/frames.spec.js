const { test, expect } = require('@playwright/test');

test(`Verify Frame`, async ({ page }) => {
    await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/frames');
    let iFrameLocator = page.frameLocator("//iframe[@title='Example Frame']");
    let expectLabelInFrame = iFrameLocator.locator("//p[.//text()[normalize-space()='The best place to learn about Software Testing']]");
    await expect(expectLabelInFrame).toBeVisible();
})