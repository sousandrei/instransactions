package com.akuntsu.instransactions.Singletons;

import android.content.Context;
import android.content.SharedPreferences;
import android.util.Log;
import android.webkit.CookieManager;

import com.akuntsu.instransactions.R;

import org.json.JSONObject;

/**
 * Created by sousa on 23/06/2017.
 */

public class State {
    public static void setCookie(Context context, String cookie) {
        SharedPreferences sharedPref = context.getSharedPreferences(
                context.getString(R.string.app_name), Context.MODE_PRIVATE);

        SharedPreferences.Editor editor = sharedPref.edit();
        editor.putString(context.getString(R.string.cookie), cookie);
        editor.commit();

    }

    public static String getCookie(Context context) {
        SharedPreferences sharedPref = context.getSharedPreferences(
                context.getString(R.string.app_name), Context.MODE_PRIVATE);

        return sharedPref.getString(context.getString(R.string.cookie), "");
    }

    private static java.net.CookieManager cookieM;

    public static java.net.CookieManager getCookieManager() {
        return cookieM;
    }

    public static void setCookieManager(java.net.CookieManager cookieManager) {
        cookieM = cookieManager;
    }

    private static JSONObject user;

    public static JSONObject getUser() {
        return user;
    }

    public static void setUser(JSONObject user) {
        State.user = user;
    }
}
