package com.akuntsu.instransactions.acts;

import android.content.Context;
import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.akuntsu.instransactions.Config;
import com.akuntsu.instransactions.R;
import com.akuntsu.instransactions.Singletons.State;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.UnsupportedEncodingException;

public class Login extends AppCompatActivity {

    private static final String TAG = "LOGIN";

    private boolean onRequest = false;

    RequestQueue queue;

    Context context;

    EditText usernameField;
    EditText passwordField;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        context = this;

        queue = Volley.newRequestQueue(context);

        usernameField = (EditText) findViewById(R.id.usernameField);
        passwordField = (EditText) findViewById(R.id.passwordField);

        Button b = (Button) findViewById(R.id.loginBtn);
        b.setOnClickListener(login);
    }

    View.OnClickListener login = new View.OnClickListener() {
        @Override
        public void onClick(View v) {

            if (onRequest) return;
            onRequest = true;

            if (!usernameField.getText().toString().trim().equals("")) {
                if (!passwordField.getText().toString().trim().equals("")) {

                    try {

                        String username = String.valueOf(usernameField.getText());
                        String password = String.valueOf(passwordField.getText());

                        JSONObject user = new JSONObject();
//                        user.put("username", username);
//                        user.put("password", password);

                        user.put("email", "peter@klaven");
                        user.put("password", "cityslicka");

                        loginRequest(user);

                    } catch (NumberFormatException e) {
                        Toast.makeText(getApplicationContext(),
                                "O campo matricula so aceita numeros", Toast.LENGTH_LONG).show();
                    } catch (JSONException e) {
                        e.printStackTrace();
                    }

                } else
                    Toast.makeText(getApplicationContext(), "Preencha o campo de password",
                            Toast.LENGTH_SHORT).show();
            } else
                Toast.makeText(getApplicationContext(), "Preencha o campo de usuario",
                        Toast.LENGTH_SHORT).show();

        }
    };

    private void loginRequest(JSONObject user) {
        JsonObjectRequest jsObjRequest = new JsonObjectRequest
                (Request.Method.POST, Config.server + "/login", user,
                        new Response.Listener<JSONObject>() {
                            @Override
                            public void onResponse(JSONObject response) {
                                Log.d(TAG, response.toString());
                                try {
                                    State.setCookie(context,
                                            (String) response.get("token"));
                                } catch (JSONException e) {
                                    e.printStackTrace();
                                }
                                onRequest = false;
                                Intent homeAct = new Intent(getBaseContext(), Home.class);
                                startActivity(homeAct);
                            }
                        }, new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        try {
                            Log.d(TAG, new String(error.networkResponse.data,
                                    "UTF-8"));
                        } catch (UnsupportedEncodingException e) {
                            e.printStackTrace();
                        }
                        onRequest = false;
                    }
                });

        queue.add(jsObjRequest);
    }
}
