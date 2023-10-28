package ui.page;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.Wait;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

public class LoginPage {
    private final WebDriver driver;
    private By emailInput = By.xpath("//input[@placeholder=\"Email\"]");
    private By passwordInput = By.xpath("//input[@placeholder=\"Password\"]");
    private By btn = By.xpath("//button[@type=\"submit\"]");
    private By toast = By.xpath("//div[@class=\"Toastify\"]//div");
    private By rememberMe = By.xpath("//label[@for=\"check\"]");

    public LoginPage(WebDriver driver) {
        this.driver = driver;
    }


    public void enterEmail(String email) {
        driver.findElement(emailInput).sendKeys(email);
    }

    public void enterPassword(String password) {
        driver.findElement(passwordInput).sendKeys(password);
    }

    public void clickLogin() throws InterruptedException {
        driver.findElement(btn).click();
    }

    public boolean isToastDisplayed() {
        Wait<WebDriver> wait = new WebDriverWait(driver, Duration.ofSeconds(2));
        wait.until(d -> driver.findElement(toast).isDisplayed());

        return driver.findElement(toast).isDisplayed();
    }

    public boolean isRememberMeDisplayed() {
        return driver.findElement(rememberMe).isDisplayed();
    }
}
