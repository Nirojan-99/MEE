package ui;

import com.google.common.io.Files;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.ITestResult;
import org.testng.annotations.*;
import org.testng.asserts.SoftAssert;

import java.io.File;
import java.io.IOException;

public class TestBase {
    public static WebDriver driver;
    SoftAssert softAssert;

    @BeforeSuite
    public void setUp() {
        System.setProperty("webdriver.chrome.driver", "resources/chromedriver.exe");
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.get("http://localhost:3000/");
    }

    @BeforeMethod
    public void beforeMethod() {
        softAssert = new SoftAssert();
    }

    @AfterMethod
    public void checkStatus(ITestResult result) throws IOException {
        if (ITestResult.FAILURE == result.getStatus()) {
            takeScreenShot(result.getName());
        }
    }

    @AfterSuite
    public void tearDown() {
        driver.quit();
    }

    private void takeScreenShot(String testMethod) throws IOException {
        var cam = (TakesScreenshot) driver;
        File ss = cam.getScreenshotAs(OutputType.FILE);
        Files.move(ss.getAbsoluteFile(), new File("resources/screenshots/" + testMethod + ".png"));
    }
}
