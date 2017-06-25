package com.akuntsu.instransactions.acts;

import android.animation.Animator;
import android.animation.AnimatorListenerAdapter;
import android.content.Context;
import android.content.Intent;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.text.TextUtils;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

import com.akuntsu.instransactions.Config;
import com.akuntsu.instransactions.R;
import com.akuntsu.instransactions.Singletons.NukeSSLCerts;
import com.akuntsu.instransactions.Singletons.State;
import com.android.volley.NetworkResponse;
import com.android.volley.ParseError;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.HttpHeaderParser;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.UnsupportedEncodingException;

public class LoginActivity extends AppCompatActivity {

    private static final String TAG = "LOGINACTIVITY";

    private boolean onRequest = false;

    RequestQueue queue;

    Context context;

    EditText usernameField;
    EditText passwordField;

    View loginForm;
    View loginProgress;

    @Override
    protected void onRestart() {
        super.onRestart();
        toggleProgress(false);
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        new NukeSSLCerts().nuke();

        context = this;

        queue = Volley.newRequestQueue(context);

        usernameField = (EditText) findViewById(R.id.usernameField);
        passwordField = (EditText) findViewById(R.id.passwordField);

        loginForm = findViewById(R.id.loginForm);

        loginProgress = findViewById(R.id.loginProgress);

        Button b = (Button) findViewById(R.id.loginBtn);
        b.setOnClickListener(login);
    }

    View.OnClickListener login = new View.OnClickListener() {
        @Override
        public void onClick(View v) {

            if (onRequest) return;

            // Reset errors.
            usernameField.setError(null);
            passwordField.setError(null);

            // Store values at the time of the login attempt.
            String username = usernameField.getText().toString();
            String password = passwordField.getText().toString();

            boolean cancel = false;
            View focusView = null;

            // Check for a valid password, if the user entered one.
            if (!TextUtils.isEmpty(password) && !isPasswordValid(password)) {
                passwordField.setError(getString(R.string.error_invalid_password));
                focusView = passwordField;
                cancel = true;
            }

            // Check for a valid email address.
            if (TextUtils.isEmpty(username)) {
                usernameField.setError(getString(R.string.error_field_required));
                focusView = usernameField;
                cancel = true;
            } else if (!isUsernameValid(username)) {
                usernameField.setError(getString(R.string.error_invalid_email));
                focusView = usernameField;
                cancel = true;
            }

            if (cancel) {
                // There was an error; don't attempt login and focus the first
                // form field with an error.
                focusView.requestFocus();
            } else {
                JSONObject user = new JSONObject();

                try {
                    user.put("username", username);
                    user.put("password", password);
                } catch (JSONException e) {
                    e.printStackTrace();
                }

                loginRequest(user, v);
            }

        }
    };


    private void toggleProgress(boolean show) {
        animateView(loginForm, !show);
        animateView(loginProgress, show);
    }

    private void animateView(final View v, final boolean show) {
        int shortAnimTime = getResources().getInteger(android.R.integer.config_shortAnimTime);

        v.setVisibility(show ? View.VISIBLE : View.GONE);
        v.animate().setDuration(shortAnimTime).alpha(
                show ? 1 : 0).setListener(new AnimatorListenerAdapter() {
            @Override
            public void onAnimationEnd(Animator animation) {
                v.setVisibility(show ? View.VISIBLE : View.GONE);
            }
        });

    }

    private boolean isUsernameValid(String username) {
        return username.length() > 4;
    }

    private boolean isPasswordValid(String password) {
        return password.length() > 4;
    }

    private void loginRequest(JSONObject user, final View v) {
        onRequest = true;
        toggleProgress(true);
        JsonObjectRequest jsObjRequest = new JsonObjectRequest
                (Request.Method.POST, Config.server + "/login", user,
                        new Response.Listener<JSONObject>() {
                            @Override
                            public void onResponse(JSONObject response) {
                                Intent homeAct = new Intent(getBaseContext(), OfferActivity.class);
                                startActivity(homeAct);
                                onRequest = false;
                            }
                        }, new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        Log.d(TAG, String.valueOf(error));
                        Snackbar.make(v, "erro ao fazer login",
                                Snackbar.LENGTH_LONG)
                                .setAction("Action", null).show();
                        onRequest = false;
                        toggleProgress(false);
                    }
                }) {
            @Override
            protected Response<JSONObject> parseNetworkResponse(NetworkResponse response) {
                try {
                    JSONObject headers = new JSONObject(response.headers);
                    State.setCookie(context, (String) headers.get("set-cookie"));

                    String jsonString = new String(response.data,
                            HttpHeaderParser.parseCharset(response.headers, PROTOCOL_CHARSET));
                    return Response.success(new JSONObject(jsonString),
                            HttpHeaderParser.parseCacheHeaders(response));
                } catch (UnsupportedEncodingException e) {
                    return Response.error(new ParseError(e));
                } catch (JSONException je) {
                    return Response.error(new ParseError(je));
                }
            }
        };

        queue.add(jsObjRequest);
    }
}