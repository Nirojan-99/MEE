package api.utils;

import com.google.gson.JsonObject;
import org.json.JSONException;
import org.json.JSONObject;

public class ResponseUtil {
    public static String getValueForResponse(String response, String key) {
        String value = "";
        try {
            JSONObject jsonObject = new JSONObject(response);
            value = String.valueOf(jsonObject.getString(key));
        } catch (JSONException e) {
            e.getMessage();
        }
        return value;
    }

    public static String getObjectForResponse(String response, String key) {
        String value = "";
        try {
            JSONObject jsonObject = new JSONObject(response);
            value = String.valueOf(jsonObject.getJSONObject(key));
        } catch (JSONException e) {
            e.getMessage();
        }
        return value;
    }

    public static String getArrayForResponse(String response, String key) {
        String value = "";
        try {
            JSONObject jsonObject = new JSONObject(response);
            value = String.valueOf(jsonObject.getJSONArray(key));
        } catch (JSONException e) {
            e.getMessage();
        }
        return value;
    }
}
