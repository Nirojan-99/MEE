package api;


import api.common.Constants;
import api.utils.ResponseUtil;
import api.utils.StatusCode;
import io.restassured.http.ContentType;
import io.restassured.response.Response;
import org.testng.annotations.Test;
import static io.restassured.RestAssured.given;


public class ApiTest extends TestBase {

    @Test(priority = 1)
    public void testVerify200ForValidLogin() {
        String username = "nirojan@gmail.com";
        String password = "1234567";

        Response response = given()
                .formParam("email", username)
                .formParam("password", password)
                .when()
                .post("/api/auth/login");

        softAssert.assertEquals(response.getStatusCode(), StatusCode.STATUS_200, "status code is not 200");
        softAssert.assertNotNull(ResponseUtil.getValueForResponse(response.getBody().asString(), "token"), "token is null");

        softAssert.assertAll();
    }

    @Test(priority = 2)
    public void testVerify404ForInvalidLogin() {
        String username = "nirojan@gmail.com";
        String password = "dvdvdvd";

        Response response = given()
                .formParam("email", username)
                .formParam("password", password)
                .when()
                .post("/api/auth/login");

        softAssert.assertEquals(response.getStatusCode(), StatusCode.STATUS_404, "status code is not 404");
        softAssert.assertNotNull(ResponseUtil.getValueForResponse(response.getBody().asString(), "token"), "token is null");

        softAssert.assertAll();
    }

    @Test(priority = 3)
    public void testVerify200ForValidUpdateUser() {
        String username = "nirojan@gmail.com";
        String password = "1234567";

        Response response = given()
                .header("token", Constants.TOKEN)
                .formParam("email", username)
                .formParam("password", password)
                .when()
                .put("/api/users");

        softAssert.assertEquals(response.getStatusCode(), StatusCode.STATUS_200, "status code is not 200");
        softAssert.assertNotNull(ResponseUtil.getValueForResponse(response.getBody().asString(), "ack"), "ack is null");

        softAssert.assertAll();
    }

    @Test(priority = 3)
    public void testVerify500ForUpdateUserWithoutToken() {
        String username = "nirojan@gmail.com";
        String password = "1234567";

        Response response = given()
                .header("token", "")
                .formParam("email", username)
                .formParam("password", password)
                .when()
                .put("/api/users");

        softAssert.assertEquals(response.getStatusCode(), StatusCode.STATUS_500, "status code is not 500");

        softAssert.assertAll();
    }

    @Test(priority = 3)
    public void testVerify200ForGetValidUserID() {
        Response response = given()
                .header("token", Constants.TOKEN)
                .when()
                .get("/api/users/64ef37877d0ca3459cc4a243");

        softAssert.assertEquals(response.getStatusCode(), StatusCode.STATUS_200, "status code is not 200");
        String body = ResponseUtil.getObjectForResponse(response.getBody().asString(), "data");
        softAssert.assertNotNull(body, "no data fetched");
        softAssert.assertEquals(ResponseUtil.getValueForResponse(body, "email"), "nirojan@gmail.com", "user id is not same");

        softAssert.assertAll();
    }

    @Test(priority = 3)
    public void testVerify400ForGetInvalidUserID() {
        Response response = given()
                .header("token", Constants.TOKEN)
                .when()
                .get("/api/users/64ef37877d0ca3459cc4a245");

        softAssert.assertEquals(response.getStatusCode(), StatusCode.STATUS_400, "status code is not 400");

        softAssert.assertAll();
    }

    @Test(priority = 3)
    public void testVerify200ForValidRegister() {
        String username = "nirojan@gmail.com";
        String password = "1234567";
        String contactNumber = "1234567";
        String userName = "nirojan 2";
        String address = "alvai east";
        String country = "srilanka";
        String zip = "4000";

        Response response = given()
                .formParam("email", username)
                .formParam("password", password)
                .formParam("contactNumber", contactNumber)
                .formParam("userName", userName)
                .formParam("address", address)
                .formParam("country", country)
                .formParam("zip", zip)
                .when()
                .post("/api/auth/register");

        softAssert.assertEquals(response.getStatusCode(), StatusCode.STATUS_200, "status code is not 200");
        softAssert.assertNotNull(ResponseUtil.getValueForResponse(response.getBody().asString(), "token"), "token is null");

        softAssert.assertAll();
    }

    @Test(priority = 3)
    public void testVerify200ForGetRecommendationForValidToken() {
        Response response = given()
                .header("token", Constants.TOKEN)
                .when()
                .get("/api/recommend");

        softAssert.assertEquals(response.getStatusCode(), StatusCode.STATUS_200, "status code is not 200");
        String body = ResponseUtil.getArrayForResponse(response.getBody().asString(), "data");
        softAssert.assertNotNull(body, "no data fetched");

        softAssert.assertAll();
    }

    @Test(priority = 3)
    public void testVerify200ForGetPostsForValidToken() {
        Response response = given()
                .header("token", Constants.TOKEN)
                .when()
                .get("/api/posts");

        softAssert.assertEquals(response.getStatusCode(), StatusCode.STATUS_200, "status code is not 200");
        String body = ResponseUtil.getArrayForResponse(response.getBody().asString(), "data");
        softAssert.assertNotNull(body, "no data fetched");

        softAssert.assertAll();
    }

    @Test(priority = 3)
    public void testVerify500ForGetPostsForInvalidToken() {
        Response response = given()
                .header("token", "")
                .when()
                .get("/api/posts");

        softAssert.assertEquals(response.getStatusCode(), StatusCode.STATUS_500, "status code is not 500");

        softAssert.assertAll();
    }


    @Test(priority = 3)
    public void testVerify200ForGetValidSinglePost() {
        Response response = given()
                .header("token", Constants.TOKEN)
                .when()
                .get("/api/posts/64f369ed2de923dfdf7dbb55");

        softAssert.assertEquals(response.getStatusCode(), StatusCode.STATUS_200, "status code is not 200");
        String body = ResponseUtil.getObjectForResponse(response.getBody().asString(), "data");
        softAssert.assertNotNull(body, "body is null");
        softAssert.assertEquals(ResponseUtil.getValueForResponse(body, "_id"), "64f369ed2de923dfdf7dbb55", "id is null");

        softAssert.assertAll();
    }

    @Test(priority = 3)
    public void testVerify500ForGetInvalidSinglePost() {
        Response response = given()
                .header("token", Constants.TOKEN)
                .when()
                .get("/api/posts/64f369ed2de923dfdf7dbb5g");

        softAssert.assertEquals(response.getStatusCode(), StatusCode.STATUS_500, "status code is not 500");

        softAssert.assertAll();
    }

    @Test(priority = 3)
    public void testVerify200ForSearchPost() {
        Response response = given()
                .formParam("query", "சட்டை")
                .header("token", Constants.TOKEN)
                .when()
                .post("/api/search");

        softAssert.assertEquals(response.getStatusCode(), StatusCode.STATUS_200, "status code is not 200");

        softAssert.assertAll();
    }

    @Test(priority = 3)
    public void testVerify200ForEmptySearchPost() {
        Response response = given()
                .formParam("query", " ")
                .header("token", Constants.TOKEN)
                .when()
                .post("/api/search");

        softAssert.assertEquals(response.getStatusCode(), StatusCode.STATUS_200, "status code is not 200");
        String body = ResponseUtil.getArrayForResponse(response.getBody().asString(), "data");
        softAssert.assertEquals(body, "[]", "body is not empty");
        softAssert.assertAll();
    }

    @Test(priority = 3)
    public void testVerify200ForNextWordPredictionForComment() {
        Response response = given()
                .contentType(ContentType.JSON)
                .contentType(ContentType.URLENC)
                .formParam("previousWords", "விலையில் தயாரிப்புகளின்")
                .when()
                .post("/api/word-prediction/comments");

        softAssert.assertEquals(response.getStatusCode(), StatusCode.STATUS_200, "status code is not 200");
        String body = ResponseUtil.getArrayForResponse(response.getBody().asString(), "nextWord");
        softAssert.assertNotNull(body, "body is not empty");
        softAssert.assertAll();
    }

    @Test(priority = 3)
    public void testVerify200ForNextWordPredictionForPost() {
        Response response = given()
                .contentType(ContentType.JSON)
                .header("token",Constants.TOKEN)
                .contentType(ContentType.URLENC)
                .formParam("comment", "கிட்டார் பெருக்கியில் ஒரு கரகரப்பான ஒலி இருந்தது")
                .formParam("postID", "64f369ed2de923dfdf7dbb55")
                .when()
                .post("/api/sentiment-analysis");

        softAssert.assertEquals(response.getStatusCode(), StatusCode.STATUS_200, "status code is not 200");
        String body = ResponseUtil.getArrayForResponse(response.getBody().asString(), "nextWord");
        softAssert.assertNotNull(body, "body is not empty");
        softAssert.assertAll();
    }

    @Test(priority = 3)
    public void testVerify200ForNextWordPredictionForPost1() {
        Response response = given()
                .header("token",Constants.TOKEN)
                .contentType(ContentType.URLENC)
                .formParam("userID", "64ef37877d0ca3459cc4a243")
                .formParam("description", "பந்திக்கு முந்துங்கள்.... மருத்துவ துடைப்பான்கள் கற்றாழை அடங்கிய வைரஸ் மற்றும் பாக்டீரியாக்களைக் கொல்கிற தடிப்பமான 80 துடைப்பான்கள் பக்கெட் நல்ல வாசனை தரும் உலர்ந்த தோல் / சருமத்தை ஈரப்படுத்தும் refresh பண்ணும் 99% கொஞ்சம் கிருமிகள் ஐ கொல்லும் clean ஆக வைத்திருக்கும் பெரும்பாலும் பயன்படுத்தப்படும் மேற்பரப்புகள் மற்றும் கணினிகளை / கைபேசிகளை சுத்தம் செய்ய பயன்படுத்தலாம் 300/= மட்டுமே பாரா விளக்குகள் யாழ் 115 செம்மணி சாலை கிட்டு பூங்க அருகில்")
                .when()
                .post("/api/posts");

        softAssert.assertEquals(response.getStatusCode(), StatusCode.STATUS_200, "status code is not 200");
        String body = ResponseUtil.getArrayForResponse(response.getBody().asString(), "nextWord");
        softAssert.assertNotNull(body, "body is not empty");
        softAssert.assertAll();
    }

}
