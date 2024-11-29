const { test, expect } = require('@playwright/test');
const { uploadTestData } = require('../../data/components/upload-test-data');
const path = require('path');

let urlUpload = 'https://test-with-me-app.vercel.app/learning/web-elements/components/upload';
uploadTestData.forEach(({ testCase, pathFolder, uploadFile }) => {
    test(`Verify ${testCase}`, async ({ page }) => {
        await page.goto(urlUpload);
        let inputClickToUploadXpath = "(//button[.//text()[normalize-space()='Click to Upload']]/preceding-sibling::input[@type='file'])[1]";
        for (let i = 0; i < uploadFile.length; i++) {
            let pathToUploadFile = path.join(process.cwd(),`${pathFolder}/${uploadFile[i]}`);
            await page.locator(inputClickToUploadXpath).setInputFiles(pathToUploadFile);
        }
        let expectedResult = "//span[contains(concat(' ',@class,' '), ' ant-upload-list-item-name ')]"
        await expect(page.locator(expectedResult)).toHaveText(uploadFile);
    });
});