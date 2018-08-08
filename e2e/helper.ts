import {AppiumDriver} from "nativescript-dev-appium";

export async function hideKeyboard(driver: AppiumDriver) {
    try {
        await driver.driver.hideDeviceKeyboard();
    } catch (error) {
    }
}