package com.akuntsu.instransactions.Singletons;

import android.content.Context;
import android.content.SharedPreferences;
import android.util.Log;

import com.akuntsu.instransactions.R;

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
}
