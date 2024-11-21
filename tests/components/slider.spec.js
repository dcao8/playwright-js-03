const { test, expect } = require('@playwright/test');

[20, 3, 84].forEach(input => {
    test(`Verify slider with ${input}`, async ({ page }) => {
        await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/components/slider');
        let sliderXpath = "//div[./span[normalize-space(text())='Slider']]/following::div[contains(concat(' ',@class,' '), ' ant-slider-rail ' )]";
        let sliderLocator = page.locator(sliderXpath);
        let sliderLocatorBoundingBox = await sliderLocator.boundingBox();
        let x = sliderLocatorBoundingBox.x;
        let y = sliderLocatorBoundingBox.y;
        let sliderWidth = sliderLocatorBoundingBox.width;
        let beClickedX = input / 100 * sliderWidth + x;
        await page.mouse.move(x, y);
        await page.mouse.down();
        await page.mouse.move(beClickedX, y);
        await page.mouse.up();
        let currentValueLabelXpath = `//div[./span[normalize-space(text())='Slider']]/following::div[normalize-space(text())='Current Value:']`;
        await expect(page.locator(currentValueLabelXpath)).toHaveText(`Current Value: ${input}`);
    });
});