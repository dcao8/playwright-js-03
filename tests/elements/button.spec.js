const { test, expect } = require('@playwright/test');

[
  "Div button",
  "Origin button",
  "Input button",
  "Default",
  "Primary",
  "Dashed",
  "Text",
  "Link",
  "Icon button"
].forEach(inputButton => {
  test(`Verify ${inputButton}`, async ({ page }) => {
    await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/elements/button');

    let firstButtonXpath = `//button[.//text()[normalize-space()='${inputButton}']]`;
    let secondButtonXpath = `//*[@role='button' and .//text()[normalize-space()='${inputButton}']]`;
    let thirdButtonXpath = `//input[@type='button' and @value='${inputButton}']`;
    let buttonXpath = `${firstButtonXpath} | ${secondButtonXpath} | ${thirdButtonXpath}`;
    await page.locator(buttonXpath).click();
    let expectedElementXpath = `//div[./span[normalize-space(text())='${inputButton}']]`;
    await expect(page.locator(expectedElementXpath)).toHaveText(`Button ${inputButton} was clicked!`);
  });
})