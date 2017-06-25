package com.akuntsu.instransactions.acts;

import android.app.DialogFragment;
import android.app.Fragment;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.Toolbar;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.akuntsu.instransactions.Config;
import com.akuntsu.instransactions.R;
import com.akuntsu.instransactions.Singletons.State;
import com.akuntsu.instransactions.adapters.OfferAdapter;
import com.akuntsu.instransactions.fragments.AddOfferFragment;
import com.akuntsu.instransactions.models.Offer;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonArrayRequest;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;

public class OfferActivity extends AppCompatActivity implements AddOfferFragment.NoticeDialogListener {

    private static final String TAG = "OFFERACTIVITY";

    private RecyclerView mRecyclerView;
    private RecyclerView.Adapter mAdapter;
    private RecyclerView.LayoutManager mLayoutManager;

    RequestQueue queue;
    Context context;

    List<Offer> offerList = new ArrayList<>();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_offer);

        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                DialogFragment addOffer = new AddOfferFragment();
                addOffer.show(getFragmentManager(), "AddOfferFragment");

//                Snackbar.make(view, "Replace with your own action", Snackbar.LENGTH_LONG)
//                        .setAction("Action", null).show();
            }
        });


        context = this;

        queue = Volley.newRequestQueue(context);

        mRecyclerView = (RecyclerView) findViewById(R.id.recyclerView);
        mRecyclerView.setHasFixedSize(true);

        // use a linear layout manager
        mLayoutManager = new LinearLayoutManager(this);
        mRecyclerView.setLayoutManager(mLayoutManager);

        mAdapter = new OfferAdapter(context, offerList);
        mRecyclerView.setAdapter(mAdapter);
        getOffers();
    }

    private void getOffers() {
        JsonArrayRequest jsObjRequest = new JsonArrayRequest
                (Request.Method.GET, Config.server + "/offers", null,
                        new Response.Listener<JSONArray>() {
                            @Override
                            public void onResponse(JSONArray response) {
                                try {
                                    for (int i = 0; i < response.length(); i++) {
                                        JSONObject obj = response.getJSONObject(i);

                                        Offer novo = new Offer(obj.getString("_id"));
                                        novo.setName((String) obj.get("name"));
                                        novo.setDesc((String) obj.get("desc"));
                                        novo.setPhoto((String) obj.get("photo"));
                                        offerList.add(novo);
                                    }
                                    mAdapter.notifyDataSetChanged();
                                } catch (JSONException e) {
                                    e.printStackTrace();
                                }
                            }
                        }, new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        Log.d(TAG, String.valueOf(error));
                    }
                });

        queue.add(jsObjRequest);
    }

    @Override
    public void onDialogPositiveClick(DialogFragment dialog) {
        getOffers();
    }

    @Override
    public void onDialogNegativeClick(DialogFragment dialog) {

    }
}
