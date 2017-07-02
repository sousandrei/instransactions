package com.akuntsu.instransactions.fragments;

import android.app.Dialog;
import android.app.DialogFragment;
import android.content.Context;
import android.content.DialogInterface;
import android.os.Bundle;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AlertDialog;
import android.text.TextUtils;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.EditText;

import com.akuntsu.instransactions.Config;
import com.akuntsu.instransactions.R;
import com.akuntsu.instransactions.Singletons.State;
import com.akuntsu.instransactions.models.Offer;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.UnsupportedEncodingException;
import java.net.CookieHandler;

public class AddOfferFragment extends DialogFragment {

    private static final String TAG = "ADDOFFER";

    public interface NoticeDialogListener {
        public void onDialogPositiveClick(DialogFragment dialog);

        public void onDialogNegativeClick(DialogFragment dialog);
    }

    RequestQueue queue;

    NoticeDialogListener listener;

    Context mContext;

    EditText nameField;
    EditText descField;
    EditText valueField;

    @Override
    public Dialog onCreateDialog(Bundle savedInstanceState) {
        AlertDialog.Builder builder = new AlertDialog.Builder(getActivity());

        CookieHandler.setDefault(State.getCookieManager());

        LayoutInflater inflater = getActivity().getLayoutInflater();

        final View mDialogView = inflater.inflate(R.layout.add_offer_dialog, null);
        builder.setView(mDialogView);

        nameField = mDialogView.findViewById(R.id.name);
        descField = mDialogView.findViewById(R.id.desc);
        valueField = mDialogView.findViewById(R.id.value);


        builder.setPositiveButton("ok", null);
        builder.setNegativeButton("cancel", new DialogInterface.OnClickListener() {
            public void onClick(DialogInterface dialog, int id) {
                AddOfferFragment.this.getDialog().cancel();
            }
        });

        AlertDialog dialog = builder.create();
        dialog.show();

        dialog.getButton(AlertDialog.BUTTON_POSITIVE).
                setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View view) {
                        addOffer(mDialogView);
                    }
                });
//        return builder.create();
        return dialog;
    }

    @Override
    public void onAttach(Context context) {

        mContext = context;

        queue = Volley.newRequestQueue(context);

        super.onAttach(context);
        try {
            listener = (NoticeDialogListener) context;
        } catch (ClassCastException e) {
            throw new ClassCastException(context.toString()
                    + " must implement NoticeDialogListener");
        }
    }

    private void addOffer(View mDialogView) {

        String desc;
        String name;
        String value;

        boolean cancel = false;
        View focusView = null;

        name = nameField.getText().toString();
        if (TextUtils.isEmpty(name)) {
            nameField.setError("nome invalido");
            focusView = nameField;
            cancel = true;
        } else if (!isNameValid(name)) {
            nameField.setError("nome invalido");
            focusView = nameField;
            cancel = true;
        }

        desc = descField.getText().toString();
        if (TextUtils.isEmpty(desc)) {
            descField.setError("descricao invalida");
            focusView = descField;
            cancel = true;
        } else if (!isDescValid(desc)) {
            descField.setError("descricao invalida");
            focusView = descField;
            cancel = true;
        }

        value = valueField.getText().toString();
        if (TextUtils.isEmpty(value)) {
            valueField.setError("valor invalido");
            focusView = valueField;
            cancel = true;
        } else if (!isValueValid(value)) {
            valueField.setError("valor invalido");
            focusView = valueField;
            cancel = true;
        }

        if (cancel) {
            focusView.requestFocus();
        } else {
            JSONObject offer = new JSONObject();

            try {
                offer.put("name", name);
                offer.put("desc", desc);
                offer.put("value", value);
                offer.put("seller", State.getUser().get("_id"));
                offer.put("state", "open");
                offer.put("photo", State.getUser().get("photo"));
            } catch (JSONException e) {
                e.printStackTrace();
            }

            addOfferRequest(offer, mDialogView);
        }
    }

    private boolean isNameValid(String name) {
        return name.length() >= 4;
    }

    private boolean isValueValid(String value) {
        return Integer.parseInt(value) > 0;
    }

    private boolean isDescValid(String desc) {
        return desc.length() >= 4;
    }

    private void addOfferRequest(JSONObject offer, final View v) {
        JsonObjectRequest jsObjRequest = new JsonObjectRequest
                (Request.Method.POST, Config.server + "/offers", offer,
                        new Response.Listener<JSONObject>() {
                            @Override
                            public void onResponse(JSONObject response) {
                                dismiss();
                            }
                        }, new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        Log.d(TAG, String.valueOf(error));
                        Snackbar.make(v, "erro ao fazer login",
                                Snackbar.LENGTH_LONG)
                                .setAction("Action", null).show();
                    }
                });

        queue.add(jsObjRequest);
    }
}
