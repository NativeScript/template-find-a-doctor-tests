"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const nativescript_dev_appium_1 = require("nativescript-dev-appium");
const chai_1 = require("chai");
const parser_1 = require("nativescript-dev-appium/lib/parser");
const isSauceRun = parser_1.isSauceLab;
const isAndroid = parser_1.runType.includes("android");
const kinveyMobileUser = process.env.kinveyUsername;
const kinveyPass = process.env.kinveyPassword;
describe("Find a Doctor Template", () => {
    let driver;
    before(() => __awaiter(this, void 0, void 0, function* () {
        driver = yield nativescript_dev_appium_1.createDriver();
        driver.defaultWaitTime = 10000;
    }));
    after(() => __awaiter(this, void 0, void 0, function* () {
        if (isSauceRun) {
            driver.sessionId().then(function (sessionId) {
                console.log("Report https://saucelabs.com/beta/tests/" + sessionId);
            });
        }
        yield driver.quit();
        console.log("Quit driver!");
    }));
    afterEach(function () {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.currentTest.state === "failed") {
                yield driver.logScreenshot(this.currentTest.title);
            }
        });
    });
    describe("Login page", () => {
        it("Open the app and verify login page components", () => __awaiter(this, void 0, void 0, function* () {
            const title = yield driver.findElementByText("Login", 0 /* exact */);
            chai_1.expect(title).to.exist;
            const description = yield driver.findElementByText("Additional text can go here", 0 /* exact */);
            chai_1.expect(description).to.exist;
            const emailLabel = yield driver.findElementByText("Email", 0 /* exact */);
            const passLabel = yield driver.findElementByText("Password", 0 /* exact */);
            chai_1.expect(emailLabel).to.exist;
            chai_1.expect(passLabel).to.exist;
            const emailField = yield driver.findElementByText("example@progress.com", 0 /* exact */);
            const passField = yield driver.findElementByText("Enter password", 0 /* exact */);
            chai_1.expect(emailField).to.exist;
            chai_1.expect(passField).to.exist;
            const registerBtn = yield driver.findElementByText("Register", 0 /* exact */);
            chai_1.expect(registerBtn).to.exist;
            const screen = yield driver.compareScreen("loginScreen");
            chai_1.expect(screen).to.be.true;
        }));
        it('Should show validation messages when login without credentials', () => __awaiter(this, void 0, void 0, function* () {
            const locator = isAndroid ? "android.widget.Button" : "XCUIElementTypeButton";
            const loginBtn = yield driver.findElementByClassName(locator);
            yield loginBtn.click();
            const emailValidation = yield driver.findElementByText("Email is required.", 0 /* exact */);
            const passValidation = yield driver.findElementByText("Password is required.", 0 /* exact */);
            chai_1.expect(emailValidation).to.exist;
            chai_1.expect(passValidation).to.exist;
        }));
    });
    describe("Register page", () => {
        it("Navigate to register page and verify componets", () => __awaiter(this, void 0, void 0, function* () {
            const registerBtn = yield driver.findElementByText("Register", 0 /* exact */);
            chai_1.expect(registerBtn).to.exist;
            yield registerBtn.click();
            driver.wait(500);
            const title = yield driver.findElementByText("Registration", 0 /* exact */);
            chai_1.expect(title).to.exist;
            const additionalTitle = yield driver.findElementByText("ADDITIONAL INFORMATION", 0 /* exact */);
            chai_1.expect(additionalTitle).to.exist;
            const firstName = yield driver.findElementByText("First name", 0 /* exact */);
            chai_1.expect(firstName).to.exist;
        }));
        it('Tap register button and verify validation messages appears', () => __awaiter(this, void 0, void 0, function* () {
            if (isAndroid) {
                const wd = driver.wd();
                const action = new wd.TouchAction(driver.driver);
                action.press({ x: 340, y: 780 })
                    .wait(1000)
                    .moveTo({ x: 340, y: 300 })
                    .release();
                yield action.perform();
            }
            const registerBtn = yield driver.findElementByText("Register", 0 /* exact */);
            yield registerBtn.click();
            const firstNameValidation = yield driver.findElementByText("First name is required.", 0 /* exact */);
            const lastNameValidation = yield driver.findElementByText("Last name is required.", 0 /* exact */);
            chai_1.expect(firstNameValidation).to.exist;
            chai_1.expect(lastNameValidation).to.exist;
            if (isAndroid) {
                const wd = driver.wd();
                const action = new wd.TouchAction(driver.driver);
                action.press({ x: 340, y: 300 })
                    .wait(1000)
                    .moveTo({ x: 340, y: 780 })
                    .release();
                yield action.perform();
            }
            const emailValidation = yield driver.findElementByText("Email is required.", 0 /* exact */);
            const passValidation = yield driver.findElementByText("Password is required.", 0 /* exact */);
            const passConfirmValidation = yield driver.findElementByText("Password confirm is required.", 0 /* exact */);
            chai_1.expect(emailValidation).to.exist;
            chai_1.expect(passValidation).to.exist;
            chai_1.expect(passConfirmValidation).to.exist;
        }));
        it('Fill the forms and register a user', () => __awaiter(this, void 0, void 0, function* () {
            const emailField = yield driver.findElementByText("example@progress.com", 0 /* exact */);
            var today = new Date().getDate();
            var mm = new Date().getMinutes();
            var hh = new Date().getHours();
            const prefix = isAndroid ? "android" : "ios";
            const email = prefix + today + "." + hh + "." + mm + "@progress.com";
            yield emailField.sendKeys(email);
            const passField = yield driver.findElementByText("Enter password", 0 /* exact */);
            yield passField.sendKeys("123");
            const confirmField = yield driver.findElementByText("Enter password again", 0 /* exact */);
            yield confirmField.sendKeys("123");
            if (isAndroid) {
                const wd = driver.wd();
                const action = new wd.TouchAction(driver.driver);
                action.press({ x: 340, y: 780 })
                    .wait(1000)
                    .moveTo({ x: 340, y: 300 })
                    .release();
                yield action.perform();
            }
            const firstNameField = yield driver.findElementByText("John", 0 /* exact */);
            yield firstNameField.sendKeys("User");
            const lastNameField = yield driver.findElementByText("Doe", 0 /* exact */);
            yield lastNameField.sendKeys("Test");
            if (!isAndroid) {
                yield driver.driver.hideDeviceKeyboard();
            }
            //Choose female as a gender
            const wd = driver.wd();
            let action;
            if (isAndroid) {
                const male = yield driver.findElementByText("male", 0 /* exact */);
                yield male.click();
                driver.wait(500);
                const female = yield driver.findElementByText("female", 0 /* exact */);
                yield female.click();
            }
            else {
                const genderBtn = yield driver.findElementByText("Gender", 0 /* exact */);
                yield genderBtn.click();
                driver.wait(1000);
                action = new wd.TouchAction(driver.driver);
                action.tap({ x: 192, y: 540 });
                yield action.perform();
                yield genderBtn.click();
            }
            const femaleSelected = yield driver.findElementByText("female", 0 /* exact */);
            chai_1.expect(femaleSelected).to.exist;
            //Choose blue choice gold plan
            if (isAndroid) {
                const none = yield driver.findElementByText("None", 0 /* exact */);
                yield none.click();
                driver.wait(500);
                const blueChoice = yield driver.findElementByText("Blue Choice Gold PPO? 001", 0 /* exact */);
                yield blueChoice.click();
                //choose date 
                const pickDate = yield driver.findElementByText("Pick a date", 0 /* exact */);
                yield pickDate.click();
                driver.wait(1000);
                const okBtn = yield driver.findElementByText("OK", 0 /* exact */);
                yield okBtn.click();
                driver.wait(1000);
            }
            else {
                const planBtn = yield driver.findElementByText("Plan", 0 /* exact */);
                yield planBtn.click();
                driver.wait(1000);
                action = new wd.TouchAction(driver.driver);
                action.tap({ x: 192, y: 540 });
                yield action.perform();
                driver.wait(1000);
            }
            const goldPlan = yield driver.findElementByText("Blue Choice Gold PPO? 001", 0 /* exact */);
            chai_1.expect(goldPlan).to.exist;
            const registerBtn = yield driver.findElementByText("Register", 0 /* exact */);
            chai_1.expect(registerBtn).to.exist;
            yield registerBtn.click();
            const homePageTitle = yield driver.findElementByText("Find Doctor", 0 /* exact */);
            chai_1.expect(homePageTitle).to.exist;
        }));
    });
    describe("Home Page, MyPlan and Expense Calculator", () => {
        it('Verify Home Page components are visible', () => __awaiter(this, void 0, void 0, function* () {
            const location = yield driver.findElementByText("Location", 0 /* exact */);
            chai_1.expect(location).to.exist;
            const specialty = yield driver.findElementByText("Specialty", 0 /* exact */);
            chai_1.expect(specialty).to.exist;
            const resetBtn = yield driver.findElementByText("Reset", 0 /* exact */);
            chai_1.expect(resetBtn).to.exist;
            const findDoctorBtn = yield driver.findElementByText("Find Doctor", 0 /* exact */);
            chai_1.expect(findDoctorBtn).to.exist;
            let locator = isAndroid ? "EXPENSE CALCULATOR" : "Expense Calculator";
            const expenseCalculator = yield driver.findElementByText(locator, 0 /* exact */);
            chai_1.expect(expenseCalculator).to.exist;
            locator = isAndroid ? "MY PLAN" : "My Plan";
            const myPlanBtn = yield driver.findElementByText(locator, 0 /* exact */);
            chai_1.expect(myPlanBtn).to.exist;
        }));
        it('Navigate to MyPlan and verify user data', () => __awaiter(this, void 0, void 0, function* () {
            let locator = isAndroid ? "MY PLAN" : "My Plan";
            const myPlanBtn = yield driver.findElementByText(locator, 0 /* exact */);
            chai_1.expect(myPlanBtn).to.exist;
            yield myPlanBtn.click();
            const user = yield driver.findElementByText("User Test", 0 /* exact */);
            chai_1.expect(user).to.exist;
            const userPlan = yield driver.findElementByText("Blue Choice Gold PPO? 001", 0 /* exact */);
            chai_1.expect(userPlan).to.exist;
            const planLevel = yield driver.findElementByText("GOLD", 0 /* exact */);
            chai_1.expect(planLevel).to.exist;
            const deductibles = yield driver.findElementByText("DEDUCTIBLES", 0 /* exact */);
            chai_1.expect(deductibles).to.exist;
            const individualsPlan = yield driver.findElementByText("$3,250.00", 0 /* exact */);
            chai_1.expect(individualsPlan).to.exist;
            if (!isAndroid) {
                const logOutBtn = yield individualsPlan.scrollTo(0 /* down */, () => driver.findElementByText("Log Out", 0 /* exact */), 400);
                driver.wait(1000);
                chai_1.expect(logOutBtn).to.exist;
            }
        }));
        it('Navigate to Expense Calculator', () => __awaiter(this, void 0, void 0, function* () {
            const locator = isAndroid ? "EXPENSE CALCULATOR" : "Expense Calculator";
            const expenseCalculator = yield driver.findElementByText(locator, 0 /* exact */);
            chai_1.expect(expenseCalculator).to.exist;
            yield expenseCalculator.click();
            const title = yield driver.findElementByText("Expense Calculator", 0 /* exact */);
            chai_1.expect(title).to.exist;
            const submitBtn = yield driver.findElementByText("Submit", 0 /* exact */);
            yield submitBtn.getAttribute("enabled").then(function (attribute) {
                chai_1.expect(attribute).to.equal('false');
            });
        }));
        it('Submit request for expenses calculation', () => __awaiter(this, void 0, void 0, function* () {
            if (isAndroid) {
                const filterInput = yield driver.findElementByClassName("android.widget.EditText");
                yield filterInput.sendKeys("knee");
                driver.wait(500);
            }
            const kneeArthro = yield driver.findElementByText("Knee Arthroscopy", 0 /* exact */);
            chai_1.expect(kneeArthro).to.exist;
            yield kneeArthro.click();
            let submitBtn = yield driver.findElementByText("Submit", 0 /* exact */);
            yield submitBtn.getAttribute("enabled").then(function (attribute) {
                chai_1.expect(attribute).to.equal('false');
            });
            const locator = isAndroid ? "android.widget.Switch" : "XCUIElementTypeSwitch";
            const switchBtn = yield driver.findElementByClassName(locator);
            yield switchBtn.click();
            submitBtn = yield driver.findElementByText("Submit", 0 /* exact */);
            yield submitBtn.getAttribute("enabled").then(function (attribute) {
                chai_1.expect(attribute).to.equal('true');
            });
            yield submitBtn.click();
            const title = yield driver.findElementByText("Estimated Out-of-Pocket Range", 0 /* exact */);
            chai_1.expect(title).to.exist;
        }));
        it('Verify Out-of-Pocket calculator cards values', () => __awaiter(this, void 0, void 0, function* () {
            const hospitalA = yield driver.findElementByText("Hospital A", 0 /* exact */);
            chai_1.expect(hospitalA).to.exist;
            const rangeA = yield driver.findElementByText("$200-$300", 0 /* exact */);
            chai_1.expect(rangeA).to.exist;
            const averageCostA = yield driver.findElementByText("$250", 0 /* exact */);
            chai_1.expect(averageCostA).to.exist;
            const hospitalOut = yield driver.findElementByText("Hospital B, out-patient", 0 /* exact */);
            chai_1.expect(hospitalOut).to.exist;
            const rangeOut = yield driver.findElementByText("$600-$800", 0 /* exact */);
            chai_1.expect(rangeOut).to.exist;
            const averageCostOut = yield driver.findElementByText("$750", 0 /* exact */);
            chai_1.expect(averageCostOut).to.exist;
            let descriptionIn;
            if (isAndroid) {
                const wd = driver.wd();
                const action = new wd.TouchAction(driver.driver);
                action.press({ x: 340, y: 780 })
                    .wait(1000)
                    .moveTo({ x: 340, y: 300 })
                    .release();
                yield action.perform();
                descriptionIn = driver.findElementByText("Your individual deductible is not met," +
                    " your out of pocket cost is the cost of the service, $1250", 1 /* contains */);
            }
            else {
                descriptionIn = yield averageCostOut.scrollTo(0 /* down */, () => driver.findElementByText("Your individual deductible is not met," +
                    " your out of pocket cost is the cost of the service, $1250", 1 /* contains */), isAndroid ? 100 : 300);
            }
            chai_1.expect(descriptionIn).to.exist;
            const descriptionOut = yield driver.findElementByText("Your out of pocket cost is your remaining individual deductible, " +
                "$483.57 plus coinsurance of 10% over the remaining $5016.43", 0 /* exact */);
            chai_1.expect(descriptionOut).to.exist;
            const hospitalIn = yield driver.findElementByText("Hospital B, in-patient", 0 /* exact */);
            chai_1.expect(hospitalIn).to.exist;
            const rangeIn = yield driver.findElementByText("$1,000-$2,000", 0 /* exact */);
            chai_1.expect(rangeIn).to.exist;
            const averageCostIn = yield driver.findElementByText("$1,250", 0 /* exact */);
            chai_1.expect(averageCostIn).to.exist;
        }));
    });
    describe('Verify find a doctor functionality and book an appointment', () => {
        it("Navigate back to Home Page", () => __awaiter(this, void 0, void 0, function* () {
            yield driver.navBack();
            let locator = isAndroid ? "FIND DOCTOR" : "Find Doctor";
            const findDoctorBtn = yield driver.findElementByText(locator, 0 /* exact */);
            chai_1.expect(findDoctorBtn).to.exist;
            yield findDoctorBtn.click();
            const location = yield driver.findElementByText("Location", 0 /* exact */);
            chai_1.expect(location).to.exist;
            const specialty = yield driver.findElementByText("Specialty", 0 /* exact */);
            chai_1.expect(specialty).to.exist;
        }));
        it("Select Location filter and verify components of the page", () => __awaiter(this, void 0, void 0, function* () {
            const location = yield driver.findElementByText("Location", 0 /* exact */);
            chai_1.expect(location).to.exist;
            yield location.click();
            const zipLabel = yield driver.findElementByText("ZIP", 0 /* exact */);
            chai_1.expect(zipLabel).to.exist;
            const findBtn = yield driver.findElementByText("Find Physician", 0 /* exact */);
            chai_1.expect(findBtn).to.exist;
        }));
        it('Click Find button and verify results', () => __awaiter(this, void 0, void 0, function* () {
            const findBtn = yield driver.findElementByText("Find Physician", 0 /* exact */);
            yield findBtn.click();
            driver.wait(1000);
            const doctorJerome = yield driver.findElementByText("DR Jerome Aya-Ay", 0 /* exact */);
            chai_1.expect(doctorJerome).to.exist;
            const description = yield driver.findElementByText("Spartanburg Regional Healthcare System", 0 /* exact */);
            chai_1.expect(description).to.exist;
        }));
        it('Click doctor result item and verify detail page components', () => __awaiter(this, void 0, void 0, function* () {
            const doctorJerome = yield driver.findElementByText("DR Jerome Aya-Ay", 0 /* exact */);
            yield doctorJerome.click();
            driver.wait(1000);
            const doctorName = yield driver.findElementByText("DR Jerome Aya-Ay", 0 /* exact */);
            chai_1.expect(doctorName).to.exist;
            const description = yield driver.findElementByText("Spartanburg Regional Healthcare System", 0 /* exact */);
            chai_1.expect(description).to.exist;
            const bookAppointmentBtn = yield driver.findElementByText("Book an Appointment", 0 /* exact */);
            chai_1.expect(bookAppointmentBtn).to.exist;
            const education = yield driver.findElementByText("Marshall University School Of Medicine 2004", 0 /* exact */);
            chai_1.expect(education).to.exist;
            const degree = yield driver.findElementByText("Degree:", 0 /* exact */);
            chai_1.expect(degree).to.exist;
            let locations;
            if (isAndroid) {
                const wd = driver.wd();
                const action = new wd.TouchAction(driver.driver);
                action.press({ x: 340, y: 780 })
                    .wait(1000)
                    .moveTo({ x: 340, y: 300 })
                    .release();
                yield action.perform();
                locations = yield driver.findElementByText("Locations:", 0 /* exact */);
            }
            else {
                locations = yield degree.scrollTo(0 /* down */, () => driver.findElementByText("Locations:", 0 /* exact */), 200);
            }
            chai_1.expect(locations).to.exist;
            const locationDesription = yield driver.findElementByText("1703 John B White SR Blvd", 1 /* contains */);
            chai_1.expect(locationDesription).to.exist;
            const phone = yield driver.findElementByText("8645625100", 0 /* exact */);
            chai_1.expect(phone).to.exist;
        }));
        it('Click Book an Appointment button and verify Calendar\'s page components', () => __awaiter(this, void 0, void 0, function* () {
            const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
            ];
            const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            const d = new Date();
            const monthName = monthNames[d.getMonth()];
            const dayName = days[d.getDay()];
            const dayCount = new Date().getDate();
            const dateTitle = dayName + " " + monthName + " " + dayCount;
            if (isAndroid) {
                const wd = driver.wd();
                const action = new wd.TouchAction(driver.driver);
                action.press({ x: 340, y: 300 })
                    .wait(1000)
                    .moveTo({ x: 340, y: 780 })
                    .release();
                yield action.perform();
            }
            const bookAppointmentBtn = yield driver.findElementByText("Book an Appointment", 0 /* exact */);
            yield bookAppointmentBtn.click();
            const pageTitle = yield driver.findElementByText("Pick a date and time for your appointment", 0 /* exact */);
            chai_1.expect(pageTitle).to.exist;
            const calendarTitle = yield driver.findElementByText(dateTitle, 0 /* exact */);
            chai_1.expect(calendarTitle).to.exist;
            if (isAndroid) {
                const wd = driver.wd();
                const action = new wd.TouchAction(driver.driver);
                action.tap({ x: 545, y: 895 });
                yield action.perform();
            }
            else {
                const nextDay = dayCount + 1;
                const dayCell = yield driver.findElementByText(nextDay.toString(), 0 /* exact */);
                yield dayCell.click();
            }
            const okBtn = yield driver.findElementByText("OK", 0 /* exact */);
            chai_1.expect(okBtn).to.exist;
        }));
        it('Click OK btn and book an appointment', () => __awaiter(this, void 0, void 0, function* () {
            const okBtn = yield driver.findElementByText("OK", 0 /* exact */);
            yield okBtn.click();
            const bookNowItem = yield driver.findElementByText("Book Now", 0 /* exact */);
            yield bookNowItem.click();
            let locator = isAndroid ? "CONFIRM" : "Confirm";
            const confirmBtn = yield driver.findElementByText(locator, 0 /* exact */);
            yield confirmBtn.click();
            driver.wait(1000);
            const title = yield driver.findElementByText("Find Doctor", 0 /* exact */);
            chai_1.expect(title).to.exist;
            locator = isAndroid ? "EXPENSE CALCULATOR" : "Expense Calculator";
            const expenseBtn = yield driver.findElementByText(locator, 0 /* exact */);
            chai_1.expect(expenseBtn).to.exist;
        }));
        it('Verify appointment is created', () => __awaiter(this, void 0, void 0, function* () {
            const recentAppointments = yield driver.findElementByText(" YOUR RECENT APPOINTMENTS", 0 /* exact */);
            chai_1.expect(recentAppointments).to.exist;
            const currentAppointment = yield driver.findElementByText("Dr. Jerome Aya-Ay", 0 /* exact */);
            chai_1.expect(currentAppointment).to.exist;
        }));
        it('Go to appointment details and verify Doctor\'s information', () => __awaiter(this, void 0, void 0, function* () {
            const currentAppointment = yield driver.findElementByText("Dr. Jerome Aya-Ay", 0 /* exact */);
            yield currentAppointment.click();
            driver.wait(1000);
            const doctorName = yield driver.findElementByText("DR Jerome Aya-Ay", 0 /* exact */);
            chai_1.expect(doctorName).to.exist;
            const description = yield driver.findElementByText("Spartanburg Regional Healthcare System", 0 /* exact */);
            chai_1.expect(description).to.exist;
            const bookAppointmentBtn = yield driver.findElementByText("Cancel this Appointment", 0 /* exact */);
            chai_1.expect(bookAppointmentBtn).to.exist;
            const education = yield driver.findElementByText("Marshall University School Of Medicine 2004", 0 /* exact */);
            chai_1.expect(education).to.exist;
            const degree = yield driver.findElementByText("Degree:", 0 /* exact */);
            chai_1.expect(degree).to.exist;
            let locations;
            if (isAndroid) {
                const wd = driver.wd();
                const action = new wd.TouchAction(driver.driver);
                action.press({ x: 340, y: 780 })
                    .wait(1000)
                    .moveTo({ x: 340, y: 300 })
                    .release();
                yield action.perform();
                locations = yield driver.findElementByText("Locations:", 0 /* exact */);
            }
            else {
                locations = yield degree.scrollTo(0 /* down */, () => driver.findElementByText("Locations:", 0 /* exact */), 200);
            }
            chai_1.expect(locations).to.exist;
            const locationDesription = yield driver.findElementByText("1703 John B White SR Blvd", 1 /* contains */);
            chai_1.expect(locationDesription).to.exist;
            const phone = yield driver.findElementByText("8645625100", 0 /* exact */);
            chai_1.expect(phone).to.exist;
        }));
        it('Cancel the appointment', () => __awaiter(this, void 0, void 0, function* () {
            if (isAndroid) {
                const wd = driver.wd();
                const action = new wd.TouchAction(driver.driver);
                action.press({ x: 340, y: 300 })
                    .wait(1000)
                    .moveTo({ x: 340, y: 780 })
                    .release();
                yield action.perform();
            }
            const cancelBtn = yield driver.findElementByText("Cancel this Appointment", 0 /* exact */);
            yield cancelBtn.click();
            driver.wait(1000);
            const description = yield driver.findElementByText("You are canceling the appointment with DR Jerome Aya-Ay", 1 /* contains */);
            let locator = isAndroid ? "CONFIRM" : "Confirm";
            const confirmBtn = yield driver.findElementByText(locator, 0 /* exact */);
            yield confirmBtn.click();
            driver.wait(1000);
            const title = yield driver.findElementByText("Find Doctor", 0 /* exact */);
            chai_1.expect(title).to.exist;
            locator = isAndroid ? "EXPENSE CALCULATOR" : "Expense Calculator";
            const expenseCalculator = yield driver.findElementByText(locator, 0 /* exact */);
        }));
    });
});
