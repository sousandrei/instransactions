package com.akuntsu.instransactions.models;

import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.util.Log;

import java.util.ArrayList;

/**
 * Created by sousa on 22/06/2017.
 */

public class User {

    private static final String TAG = "USER";

    private int id;
    private String firstName;
    private String lastName;
    private String cpf;
    private String phone;
    private String photo;
    private String email;
    private String username;
    private String routes;

    private ArrayList<User> friends = new ArrayList<User>();

    public User(int id, String username){
        this.id = id;
        this.username = username;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public String getRoutes() {
        return routes;
    }

    public void setRoutes(String routes) {
        this.routes = routes;
    }

    public ArrayList<User> getFriends() {
        return friends;
    }

    public void addFriend(User friend) {
        this.friends.add(this.friends.size() + 1, friend);
    }

    public void delFriend(User friend) {
        Log.d(TAG, "delete plz o " + friend.getFirstName());
//        this.friends.remove(this.friends.size() + 1, friend);
    }

    public int getId() {
        return id;
    }

    /*
    * firstName
    * lastName
    * friends
    * cpf
    * phone
    * photo
    * email
    * username
    * password
    * routes
    * */

}