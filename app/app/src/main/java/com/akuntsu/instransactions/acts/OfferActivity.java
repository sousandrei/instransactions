package com.akuntsu.instransactions.acts;

import android.app.DialogFragment;
import android.app.FragmentManager;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.v4.app.Fragment;
import android.support.v4.widget.DrawerLayout;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.Toolbar;
import android.util.Log;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.ListView;

import com.akuntsu.instransactions.Config;
import com.akuntsu.instransactions.R;
import com.akuntsu.instransactions.adapters.OfferAdapter;
import com.akuntsu.instransactions.fragments.AddOfferFragment;
import com.akuntsu.instransactions.models.Offer;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonArrayRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

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

    private String[] mPlanetTitles;
    private DrawerLayout mDrawerLayout;
    private ListView mDrawerList;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_offer);

        mPlanetTitles = getResources().getStringArray(R.array.drawer_string_array);
        mDrawerLayout = (DrawerLayout) findViewById(R.id.offer_layout);
        mDrawerList = (ListView) findViewById(R.id.drawer_layout);

        mDrawerList.setAdapter(new ArrayAdapter<>(this, R.layout.drawer_list_item, mPlanetTitles));
        mDrawerList.setOnItemClickListener(new DrawerItemClickListener());

        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                DialogFragment addOffer = new AddOfferFragment();
                addOffer.show(getFragmentManager(), "AddOfferFragment");

            }
        });

        context = this;

        queue = Volley.newRequestQueue(context);

        mRecyclerView = (RecyclerView) findViewById(R.id.recyclerView);
        mRecyclerView.setHasFixedSize(true);

        mLayoutManager = new LinearLayoutManager(this);
        mRecyclerView.setLayoutManager(mLayoutManager);

        mAdapter = new OfferAdapter(context, offerList);
        mRecyclerView.setAdapter(mAdapter);
        getOffers();
    }

    private class DrawerItemClickListener implements ListView.OnItemClickListener {
        @Override
        public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
            selectItem(position);
        }
    }

    private void selectItem(int position) {
        Intent homeAct;
        switch (position) {
            case 0:
                homeAct = new Intent(getBaseContext(), LoginActivity.class);
                startActivity(homeAct);
                break;
            case 1:
                homeAct = new Intent(getBaseContext(), SettingsActivity.class);
                startActivity(homeAct);
                break;
            case 2:
                homeAct = new Intent(getBaseContext(), LoginActivity.class);
                startActivity(homeAct);
                break;
            case 3:
                homeAct = new Intent(getBaseContext(), LoginActivity.class);
                startActivity(homeAct);
                break;
        }
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
