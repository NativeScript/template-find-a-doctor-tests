import { AppiumDriver, createDriver, SearchOptions, Direction, Point } from "nativescript-dev-appium";
import { expect } from "chai";
import { isSauceLab, runType } from "nativescript-dev-appium/lib/parser";
import { exec } from "child_process";
import { hideKeyboard } from "./helper";

const isSauceRun = isSauceLab;
const isAndroid: boolean = runType.includes("android");
const kinveyMobileUser = process.env.kinveyUsername;
const kinveyPass = process.env.kinveyPassword;




describe("Find a Doctor Template", () => {
    let driver: AppiumDriver;

    before(async () => {
        driver = await createDriver();
        driver.defaultWaitTime = 10000;
    });

    after(async () => {
        if(isSauceRun){
            driver.sessionId().then(function(sessionId){
                console.log("Report https://saucelabs.com/beta/tests/" + sessionId);
            });
        }
        await driver.quit();
        console.log("Quit driver!");
    });

    afterEach(async function () {
        if (this.currentTest.state === "failed") {
            await driver.logScreenshot(this.currentTest.title);
        }
    });

    describe("Login page", () => {
        // it("Log in", async () => {
        //     const emailField = await driver.findElementByText("example@progress.com", SearchOptions.exact);
        //     await emailField.sendKeys("test3@test.com");
        //     const passField = await driver.findElementByText("Enter password", SearchOptions.exact);
        //     await passField.sendKeys("123");
        //     await hideKeyboard(driver);
        //     const locator = isAndroid ? "android.widget.Button" : "XCUIElementTypeButton";
        //     const loginBtn = await driver.findElementByClassName(locator);
        //     await loginBtn.click();
        // });
        it("Open the app and verify login page components", async () => {
            const title = await driver.findElementByText("Login", SearchOptions.exact);
            expect(title).to.exist;
            const description = await driver.findElementByText("Additional text can go here", SearchOptions.exact);
            expect(description).to.exist;
            
            const emailLabel = await driver.findElementByText("Email", SearchOptions.exact);
            const passLabel = await driver.findElementByText("Password", SearchOptions.exact);
            expect(emailLabel).to.exist;
            expect(passLabel).to.exist;
            const emailField = await driver.findElementByText("example@progress.com", SearchOptions.exact);
            const passField = await driver.findElementByText("Enter password", SearchOptions.exact);
            expect(emailField).to.exist;
            expect(passField).to.exist;
            
            const registerBtn = await driver.findElementByText("Register", SearchOptions.exact);
            expect(registerBtn).to.exist;
        });

        it('Should show validation messages when login without credentials', async () =>{
            const locator = isAndroid ? "android.widget.Button" : "XCUIElementTypeButton";
            const loginBtn = await driver.findElementByClassName(locator);
            await loginBtn.click();

            const emailValidation = await driver.findElementByText("Email is required.", SearchOptions.exact);
            const passValidation = await driver.findElementByText("Password is required.", SearchOptions.exact);
            expect(emailValidation).to.exist;
            expect(passValidation).to.exist;
        });
    });

    describe("Register page", () =>{
        it("Navigate to register page and verify componets", async () =>{
            const registerBtn = await driver.findElementByText("Register", SearchOptions.exact);
            expect(registerBtn).to.exist;
            await registerBtn.click();
            await driver.wait(500);
            const title = await driver.findElementByText("Registration", SearchOptions.exact);
            expect(title).to.exist;
            const additionalTitle = await driver.findElementByText("ADDITIONAL INFORMATION", SearchOptions.exact);
            expect(additionalTitle).to.exist;
            const firstName = await driver.findElementByText("First name", SearchOptions.exact);
            expect(firstName).to.exist;
        });

        it('Tap register button and verify validation messages appears', async () =>{
            if(isAndroid){
                const wd = driver.wd();
                const action = new wd.TouchAction(driver.driver);
                action.press({x: 340, y: 780})
                .wait(1000)
                .moveTo({x: 340, y: 300})
                .release()
                await action.perform();
            }
            
            const registerBtn = await driver.findElementByText("Register", SearchOptions.exact);
            await registerBtn.click();

            const firstNameValidation = await driver.findElementByText("First name is required.", SearchOptions.exact); 
            const lastNameValidation = await driver.findElementByText("Last name is required.", SearchOptions.exact);
            expect(firstNameValidation).to.exist;
            expect(lastNameValidation).to.exist;
            if(isAndroid){
                const wd = driver.wd();
                const action = new wd.TouchAction(driver.driver);
                action.press({x:  340, y: 300})
                .wait(1000)
                .moveTo({x: 340 , y: 780})
                .release();
                await action.perform();
            }
            const emailValidation = await driver.findElementByText("Email is required.", SearchOptions.exact);
            const passValidation = await driver.findElementByText("Password is required.", SearchOptions.exact);
            const passConfirmValidation = await driver.findElementByText("Password confirm is required.", SearchOptions.exact);
            expect(emailValidation).to.exist;
            expect(passValidation).to.exist;
            expect(passConfirmValidation).to.exist;
        });

        it('Fill the forms and register a user', async () =>{
            const emailField = await driver.findElementByText("example@progress.com", SearchOptions.exact);
            var today = new Date().getDate();
            var mm = new Date().getMinutes();
            var hh = new Date().getHours();
            const prefix = isAndroid ? "android" : "ios"
            const email = prefix + today + "." + hh + "." + mm + "@progress.com";
            await emailField.sendKeys(email);
            const passField = await driver.findElementByText("Enter password", SearchOptions.exact);
            await passField.sendKeys("123");
            const confirmField = await driver.findElementByText("Enter password again", SearchOptions.exact);
            await confirmField.sendKeys("123");
            await hideKeyboard(driver);
            
            if(isAndroid){
                const wd = driver.wd();
                const action = new wd.TouchAction(driver.driver);
                action.press({x: 340, y: 780})
                .wait(1000)
                .moveTo({x: 340, y: 300})
                .release()
                await action.perform();
            }
            await driver.wait(500);
            const firstNameField = await driver.findElementByText("John", SearchOptions.exact);
            await firstNameField.sendKeys("User");
            await hideKeyboard(driver);
            await driver.wait(500);
            const lastNameField = await driver.findElementByText("Doe", SearchOptions.exact);
            await lastNameField.sendKeys("Test")
            await hideKeyboard(driver);          

            //Choose female as a gender
            const wd = driver.wd();
            let action;
            if(isAndroid){
                const male = await driver.findElementByText("male", SearchOptions.exact);
                await male.click();
                await driver.wait(500);
                const female = await driver.findElementByText("female", SearchOptions.exact);
                await female.click();
            }
            else{
                const genderBtn = await driver.findElementByText("Gender", SearchOptions.exact);
                await genderBtn.click();
                await driver.wait(1000);
                action = new wd.TouchAction(driver.driver);
                action.tap({x:  192, y: 540});
                await action.perform();
                await genderBtn.click();
            }
            
            const femaleSelected = await driver.findElementByText("female", SearchOptions.exact);
            expect(femaleSelected).to.exist;

            //Choose blue choice gold plan
            if(isAndroid){
                const none = await driver.findElementByText("None", SearchOptions.exact);
                await none.click();
                await driver.wait(500);
                const blueChoice = await driver.findElementByText("Blue Choice Gold PPO? 001", SearchOptions.exact);
                await blueChoice.click();
                //choose date 
                const pickDate = await driver.findElementByText("Pick a date", SearchOptions.exact);
                await pickDate.click();
                await driver.wait(1000)
                const okBtn = await driver.findElementByText("OK", SearchOptions.exact);
                await okBtn.click();
                await driver.wait(1000)
            }
            else{
                const planBtn = await driver.findElementByText("Plan", SearchOptions.exact);
                await planBtn.click();            
                await driver.wait(1000);
                action = new wd.TouchAction(driver.driver);
                action.tap({x:  192, y: 540});
                await action.perform();
                await driver.wait(1000)
            }
            
            const goldPlan = await driver.findElementByText("Blue Choice Gold PPO? 001", SearchOptions.exact);
            expect(goldPlan).to.exist;
        
            const registerBtn = await driver.findElementByText("Register", SearchOptions.exact);
            expect(registerBtn).to.exist;
            await registerBtn.click();

            const homePageTitle = await driver.findElementByText("Find Doctor", SearchOptions.exact);
            expect(homePageTitle).to.exist;
        });
    });

    describe("Home Page, MyPlan and Expense Calculator", () => {
        it('Verify Home Page components are visible', async () =>{
            const location = await driver.findElementByText("Location", SearchOptions.exact);
            expect(location).to.exist;
            const specialty = await driver.findElementByText("Specialty", SearchOptions.exact);
            expect(specialty).to.exist;
            const resetBtn = await driver.findElementByText("Reset", SearchOptions.exact);
            expect(resetBtn).to.exist;
            const findDoctorBtn = await driver.findElementByText("Find Doctor", SearchOptions.exact);
            expect(findDoctorBtn).to.exist;
            let locator = isAndroid ? "EXPENSE CALCULATOR" : "Expense Calculator"
            const expenseCalculator = await driver.findElementByText(locator, SearchOptions.exact);
            expect(expenseCalculator).to.exist;
            locator = isAndroid ? "MY PLAN" : "My Plan"
            const myPlanBtn = await driver.findElementByText(locator, SearchOptions.exact);
            expect(myPlanBtn).to.exist;
        });
    
        it('Navigate to MyPlan and verify user data', async () => {
            let locator = isAndroid ? "MY PLAN" : "My Plan"
            const myPlanBtn = await driver.findElementByText(locator, SearchOptions.exact);
            expect(myPlanBtn).to.exist;
            await myPlanBtn.click();

            const user = await driver.findElementByText("User Test", SearchOptions.exact);
            expect(user).to.exist;
            const userPlan = await driver.findElementByText("Blue Choice Gold PPO? 001", SearchOptions.exact);
            expect(userPlan).to.exist;
            const planLevel = await driver.findElementByText("GOLD", SearchOptions.exact);
            expect(planLevel).to.exist;
            const deductibles = await driver.findElementByText("DEDUCTIBLES", SearchOptions.exact);
            expect(deductibles).to.exist;
            const individualsPlan = await driver.findElementByText("$3,250.00", SearchOptions.exact);
            expect(individualsPlan).to.exist;
            if(!isAndroid){
                const logOutBtn = await individualsPlan.scrollTo(
                    Direction.down, 
                    () => driver.findElementByText("Log Out", SearchOptions.exact),
                    400
                );
                await driver.wait(1000);
                expect(logOutBtn).to.exist;
            }
        });

        it('Navigate to Expense Calculator', async () => {
            const locator = isAndroid ? "EXPENSE CALCULATOR" : "Expense Calculator"
            const expenseCalculator = await driver.findElementByText(locator, SearchOptions.exact);
            expect(expenseCalculator).to.exist;
            await expenseCalculator.click();
            const title = await driver.findElementByText("Expense Calculator", SearchOptions.exact);
            expect(title).to.exist;
            const submitBtn = await driver.findElementByText("Submit", SearchOptions.exact);
            await submitBtn.getAttribute("enabled").then(function(attribute){
                expect(attribute).to.equal('false');
            });
        });

        it('Submit request for expenses calculation', async () => {
            if(isAndroid){
                const filterInput = await driver.findElementByClassName("android.widget.EditText");
                await filterInput.sendKeys("knee");
                await driver.wait(500);
            }
            const kneeArthro = await driver.findElementByText("Knee Arthroscopy", SearchOptions.exact);
            expect(kneeArthro).to.exist;
            await kneeArthro.click();

            let submitBtn = await driver.findElementByText("Submit", SearchOptions.exact);
            await submitBtn.getAttribute("enabled").then(function(attribute){
                expect(attribute).to.equal('false');
            });

            const locator = isAndroid ? "android.widget.Switch" : "XCUIElementTypeSwitch";
            const switchBtn = await driver.findElementByClassName(locator);
            await switchBtn.click();

            submitBtn = await driver.findElementByText("Submit", SearchOptions.exact);
            await submitBtn.getAttribute("enabled").then(function(attribute){
                expect(attribute).to.equal('true');
            });

            await submitBtn.click();

            const title = await driver.findElementByText("Estimated Out-of-Pocket Range", SearchOptions.exact);
            expect(title).to.exist;
        });

        it('Verify Out-of-Pocket calculator cards values', async () => {
            const hospitalA = await driver.findElementByText("Hospital A", SearchOptions.exact);
            expect(hospitalA).to.exist;
            const rangeA = await driver.findElementByText("$200-$300", SearchOptions.exact);
            expect(rangeA).to.exist;
            const averageCostA = await driver.findElementByText("$250", SearchOptions.exact);
            expect(averageCostA).to.exist;

            const hospitalOut = await driver.findElementByText("Hospital B, out-patient", SearchOptions.exact);
            expect(hospitalOut).to.exist;
            const rangeOut = await driver.findElementByText("$600-$800", SearchOptions.exact);
            expect(rangeOut).to.exist;
            const averageCostOut = await driver.findElementByText("$750", SearchOptions.exact);
            expect(averageCostOut).to.exist;
            let descriptionIn;
            if(isAndroid){
                const wd = driver.wd();
                const action = new wd.TouchAction(driver.driver);
                action.press({x: 340, y: 780})
                .wait(1000)
                .moveTo({x: 340, y: 300})
                .release()
                await action.perform();
                descriptionIn = driver.findElementByText("Your individual deductible is not met,"+ 
                " your out of pocket cost is the cost of the service, $1250", SearchOptions.contains);
            }
            else{
                descriptionIn = await averageCostOut.scrollTo(
                    Direction.down, 
                    () => driver.findElementByText("Your individual deductible is not met,"+ 
                    " your out of pocket cost is the cost of the service, $1250", SearchOptions.contains),
                    isAndroid ? 100 : 300
                );
            }
            expect(descriptionIn).to.exist;
            

            const descriptionOut = await driver.findElementByText("Your out of pocket cost is your remaining individual deductible, " +
            "$483.57 plus coinsurance of 10% over the remaining $5016.43", SearchOptions.exact);
            expect(descriptionOut).to.exist;

            const hospitalIn= await driver.findElementByText("Hospital B, in-patient", SearchOptions.exact);
            expect(hospitalIn).to.exist;
            const rangeIn = await driver.findElementByText("$1,000-$2,000", SearchOptions.exact);
            expect(rangeIn).to.exist;
            const averageCostIn = await driver.findElementByText("$1,250", SearchOptions.exact);
            expect(averageCostIn).to.exist;
        })
    });

    describe('Verify find a doctor functionality and book an appointment', () => {
        it("Navigate back to Home Page", async () => {
            await driver.navBack();
            let locator = isAndroid ? "FIND DOCTOR" : "Find Doctor"
            const findDoctorBtn = await driver.findElementByText(locator, SearchOptions.exact);
            expect(findDoctorBtn).to.exist;
            await findDoctorBtn.click();

            const location = await driver.findElementByText("Location", SearchOptions.exact);
            expect(location).to.exist;
            const specialty = await driver.findElementByText("Specialty", SearchOptions.exact);
            expect(specialty).to.exist;
        });

        it("Select Location filter and verify components of the page", async () => {
            const location = await driver.findElementByText("Location", SearchOptions.exact);
            expect(location).to.exist;
            await location.click();

            const zipLabel = await driver.findElementByText("ZIP", SearchOptions.exact);
            expect(zipLabel).to.exist;

            const findBtn = await driver.findElementByText("Find Physician", SearchOptions.exact);
            expect(findBtn).to.exist
        })

        it('Click Find button and verify results', async () => {
            const findBtn = await driver.findElementByText("Find Physician", SearchOptions.exact);
            await findBtn.click();
            await driver.wait(1000);
            const doctorJerome = await driver.findElementByText("DR Jerome Aya-Ay", SearchOptions.exact);
            expect(doctorJerome).to.exist;
            const description = await driver.findElementByText("Spartanburg Regional Healthcare System", SearchOptions.exact);
            expect(description).to.exist;
        })

        it('Click doctor result item and verify detail page components', async () =>{
            const doctorJerome = await driver.findElementByText("DR Jerome Aya-Ay", SearchOptions.exact);
            await doctorJerome.click();
            await driver.wait(1000);

            const doctorName = await driver.findElementByText("DR Jerome Aya-Ay", SearchOptions.exact);
            expect(doctorName).to.exist;
            const description = await driver.findElementByText("Spartanburg Regional Healthcare System", SearchOptions.exact);
            expect(description).to.exist;
            const bookAppointmentBtn = await driver.findElementByText("Book an Appointment", SearchOptions.exact);
            expect(bookAppointmentBtn).to.exist;
            const education = await driver.findElementByText("Marshall University School Of Medicine 2004", SearchOptions.exact);
            expect(education).to.exist;
            const degree = await driver.findElementByText("Degree:", SearchOptions.exact);
            expect(degree).to.exist;
            let locations;
            if(isAndroid){
                const wd = driver.wd();
                const action = new wd.TouchAction(driver.driver);
                action.press({x: 340, y: 780})
                .wait(1000)
                .moveTo({x: 340, y: 300})
                .release()
                await action.perform();
                locations = await driver.findElementByText("Locations:", SearchOptions.exact);
            }
            else{
                locations = await degree.scrollTo(
                    Direction.down,
                    () => driver.findElementByText("Locations:", SearchOptions.exact),
                    200
                )
            }
            expect(locations).to.exist;
            const locationDesription = await driver.findElementByText("1703 John B White SR Blvd", SearchOptions.contains);
            expect(locationDesription).to.exist;
            const phone = await driver.findElementByText("8645625100", SearchOptions.exact);
            expect(phone).to.exist;
        });

        it('Click Book an Appointment button and verify Calendar\'s page components', async () => {
            const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
            ];
            const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            const d = new Date();
            const monthName = monthNames[d.getMonth()];
            const dayName = days[d.getDay()];
            const dayCount = new Date().getDate();
            const dateTitle = dayName + " " + monthName + (dayCount < 10 ? " 0" : " ") + dayCount;

            if(isAndroid){
                const wd = driver.wd();
                const action = new wd.TouchAction(driver.driver);
                action.press({x: 340, y: 300})
                .wait(1000)
                .moveTo({x: 340, y: 780})
                .release()
                await action.perform();
            }

            const bookAppointmentBtn = await driver.findElementByText("Book an Appointment", SearchOptions.exact);
            await bookAppointmentBtn.click();

            const pageTitle = await driver.findElementByText("Pick a date and time for your appointment" ,SearchOptions.exact);
            expect(pageTitle).to.exist;

            const calendarTitle = await driver.findElementByText(dateTitle, SearchOptions.exact);
            expect(calendarTitle).to.exist;

            if(isAndroid){
                const wd = driver.wd();
                const action = new wd.TouchAction(driver.driver);
                action.tap({x: 542, y: 991}); // click a day from next month
                await action.perform();
            }
            else{
                const wd = driver.wd();
                const action = new wd.TouchAction(driver.driver);
                action.tap({x: 292, y: 641}); // click a day from next month
                await action.perform();
            }
            const okBtn = await driver.findElementByText("OK", SearchOptions.exact);
            expect(okBtn).to.exist;
        });

        it('Click OK btn and book an appointment', async () => {
            const okBtn = await driver.findElementByText("OK", SearchOptions.exact);
            await okBtn.click();

            const bookNowItem = await driver.findElementByText("Book Now", SearchOptions.exact);
            await bookNowItem.click();
            let locator = isAndroid ? "CONFIRM" : "Confirm";
            const confirmBtn = await driver.findElementByText(locator, SearchOptions.exact);
            await confirmBtn.click();
        });

        it('Verify appointment is created', async () => {
            const currentAppointment = await driver.findElementByText("Dr. Jerome Aya-Ay", SearchOptions.exact);
            expect(currentAppointment).to.exist;
        });

        it('Go to appointment details and verify Doctor\'s information', async () =>{
            const currentAppointment = await driver.findElementByText("Dr. Jerome Aya-Ay", SearchOptions.exact);
            await currentAppointment.click();
            await driver.wait(1000);

            const doctorName = await driver.findElementByText("DR Jerome Aya-Ay", SearchOptions.exact);
            expect(doctorName).to.exist;
            const description = await driver.findElementByText("Spartanburg Regional Healthcare System", SearchOptions.exact);
            expect(description).to.exist;
            const bookAppointmentBtn = await driver.findElementByText("Cancel this Appointment", SearchOptions.exact);
            expect(bookAppointmentBtn).to.exist;
            const education = await driver.findElementByText("Marshall University School Of Medicine 2004", SearchOptions.exact);
            expect(education).to.exist;
            const degree = await driver.findElementByText("Degree:", SearchOptions.exact);
            expect(degree).to.exist;
            let locations;
            if(isAndroid){
                const wd = driver.wd();
                const action = new wd.TouchAction(driver.driver);
                action.press({x: 340, y: 780})
                .wait(1000)
                .moveTo({x: 340, y: 300})
                .release()
                await action.perform();
                locations = await driver.findElementByText("Locations:", SearchOptions.exact);
            }
            else{
                locations = await degree.scrollTo(
                    Direction.down,
                    () => driver.findElementByText("Locations:", SearchOptions.exact),
                    200
                )
            }
            expect(locations).to.exist;
            const locationDesription = await driver.findElementByText("1703 John B White SR Blvd", SearchOptions.contains);
            expect(locationDesription).to.exist;
            const phone = await driver.findElementByText("8645625100", SearchOptions.exact);
            expect(phone).to.exist;
        });

        //Enable the test for cancel appointment when kinvey fix the issue for appointments list
        //currently a user can see other users' appointments

        // it('Cancel the appointment', async () =>{
        //     if(isAndroid){
        //         const wd = driver.wd();
        //         const action = new wd.TouchAction(driver.driver);
        //         action.press({x: 340, y: 300})
        //         .wait(1000)
        //         .moveTo({x: 340, y: 780})
        //         .release()
        //         await action.perform();
        //     }
        //     const cancelBtn = await driver.findElementByText("Cancel this Appointment", SearchOptions.exact);
        //     await cancelBtn.click();
        //     await driver.wait(1000);
        //     const description = await driver.findElementByText("You are canceling the appointment with DR Jerome Aya-Ay", SearchOptions.contains)
        //     let locator = isAndroid ? "CONFIRM" : "Confirm"
        //     const confirmBtn = await driver.findElementByText(locator, SearchOptions.exact);
        //     await confirmBtn.click();
        //     await driver.wait(1000);

        //     const title = await driver.findElementByText("Find Doctor", SearchOptions.exact);
        //     expect(title).to.exist;
        //     locator = isAndroid ? "EXPENSE CALCULATOR" : "Expense Calculator"
        //     const expenseCalculator = await driver.findElementByText(locator, SearchOptions.exact);
        // })
    });
});
