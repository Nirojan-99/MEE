package ui;

import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;
import ui.page.HomePage;
import ui.page.LoginPage;

import java.time.Duration;

public class LoginTest extends TestBase {
    LoginPage loginPage;
    HomePage homePage;

    @BeforeClass
    public void initClass() {
        loginPage = new LoginPage(driver);
        homePage = new HomePage(driver);
    }

    @Test
    public void testVerifyLogin() throws InterruptedException {
        loginPage.enterEmail("nirojan@gmail.com");
        loginPage.enterPassword("1234567");
        loginPage.clickLogin();

        softAssert.assertEquals(homePage.getUserName(), "Nirojan", "user name is not correct");
        softAssert.assertAll();
    }

    @Test(priority = 1)
    public void testVerifyInvalidLogin() throws InterruptedException {
        loginPage.enterEmail("nirojan@gmail.com");
        loginPage.enterPassword("12345678");
        loginPage.clickLogin();

        softAssert.assertTrue(loginPage.isToastDisplayed(), "valid login");
        softAssert.assertAll();
    }

    @Test(priority = 2, dependsOnMethods = "testVerifyLogin")
    public void testVerifyPostDescription() {
        homePage.enterDescription("சட்டை கூட வாங்க முடியாத விலையில் டஸ்ட் ஜாக்கெட் உங்களுக்காக - 1000/= மட்டுமே பாரா விளக்குகள் - யாழ் 115 செம்மணி சாலை கிட்டு பூங்க அருகில்");
        homePage.clickBtn();

        softAssert.assertNull(homePage.getDescription(), "post is not uploaded");
        softAssert.assertAll();
    }

    @Test(priority = 3,dependsOnMethods = "testVerifyLogin")
    public void testVerifyLogout() {
        homePage.clickLogout();
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(2));

        softAssert.assertTrue(loginPage.isRememberMeDisplayed(),"page is not login");
        softAssert.assertAll();
    }


}
