package ui.page;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.Wait;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

public class HomePage {
    private final WebDriver driver;
    private By userName = By.id("userName");
    private By description = By.id("description");
    private By postBtn = By.id("post");
    private By logout = By.id("logout");

    public HomePage(WebDriver driver) {
        this.driver = driver;
    }

    public String getUserName() {
        Wait<WebDriver> wait = new WebDriverWait(driver, Duration.ofSeconds(2));

        wait.until(d -> driver.findElement(userName).isDisplayed());
        return driver.findElement(userName).getText();
    }

    public void enterDescription(String desc) {
        driver.findElement(description).sendKeys(desc);
    }

    public void clickBtn() {
        driver.findElement(postBtn).click();
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(2));
    }

    public String getDescription() {
        return driver.findElement(description).getText();
    }

    public void clickLogout(){
        driver.findElement(logout).click();
    }
}
