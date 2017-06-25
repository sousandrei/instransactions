package com.akuntsu.instransactions.adapters;

import android.content.Context;
import android.graphics.drawable.Drawable;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import com.akuntsu.instransactions.R;

import com.akuntsu.instransactions.models.Offer;
import com.squareup.picasso.Picasso;

import java.util.ArrayList;
import java.util.List;

public class OfferAdapter extends RecyclerView.Adapter<OfferAdapter.ViewHolder> {
    private List<Offer> offerList;
    private Context context;

    public class ViewHolder extends RecyclerView.ViewHolder {
        public TextView buyer, seller, value, state, name, desc;
        public ImageView photo;

        public ViewHolder(View v) {
            super(v);
            name = v.findViewById(R.id.name);
            desc = v.findViewById(R.id.desc);
            photo = v.findViewById(R.id.photo);
        }
    }

    public OfferAdapter(Context context,List<Offer> offerList) {
        this.context = context;
        this.offerList = offerList;
    }

    @Override
    public OfferAdapter.ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View v = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.offer_card_adapter, parent, false);
        ViewHolder vh = new ViewHolder(v);
        return vh;
    }

    @Override
    public void onBindViewHolder(ViewHolder holder, int position) {
        Offer offer = offerList.get(position);

        Picasso.with(context).load(offer.getPhoto()).into(holder.photo);
        holder.name.setText(offer.getName());
        holder.desc.setText(offer.getDesc());
    }

    @Override
    public int getItemCount() {
        return offerList.size();
    }
}
