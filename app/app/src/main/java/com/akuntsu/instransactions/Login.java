package com.akuntsu.instransactions;

import android.app.FragmentTransaction;
import android.net.sip.SipAudioCall;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;

public class Login extends AppCompatActivity {

    private boolean onRequest = false;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        Button b = (Button) findViewById(R.id.button);

        b.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Toast.makeText(Login.this, "test", Toast.LENGTH_LONG).show();
                login();
            }
        });
    }

    private void login() {
        if (onRequest) {
            Toast.makeText(Login.this, "ja ta request rolando", Toast.LENGTH_LONG).show();
            return;
        }

        onRequest = true;

        RequestQueue queue = Volley.newRequestQueue(this);
        String url = "https://jsonplaceholder.typicode.com/posts/1";

        StringRequest stringRequest = new StringRequest(Request.Method.GET, url,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {
                        Toast.makeText(Login.this, "request feito", Toast.LENGTH_LONG).show();
                        onRequest = false;
                    }
                }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                Toast.makeText(Login.this, "nao foi", Toast.LENGTH_LONG).show();
                onRequest = false;
            }
        });

        queue.add(stringRequest);
    }
}
