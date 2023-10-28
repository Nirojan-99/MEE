package api;

import io.restassured.RestAssured;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.BeforeMethod;
import org.testng.asserts.SoftAssert;

public class TestBase {
    SoftAssert softAssert;

    @BeforeClass
    public void setUp() {
        RestAssured.baseURI = "http://127.0.0.1:5000";
    }

    @BeforeMethod
    public void beforeClass() {
        softAssert = new SoftAssert();
    }
}
