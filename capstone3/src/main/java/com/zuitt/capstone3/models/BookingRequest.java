package com.zuitt.capstone3.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "bookingRequests")
public class BookingRequest {

    @Id
    private String id;
    private String startDate;
    private String endDate;
    private double child;
    private double adult;
    private double room;
    private String status;

    @DBRef
    private Account user;

    @DBRef
    private Service service;

    public BookingRequest(String startDate, String endDate, double child, double adult, double room, String status, Service service) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.child = child;
        this.adult = adult;
        this.room = room;
        this.status = status;
        this.service = service;
    }

    public String getId() {
        return id;
    }

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    public double getChild() {
        return child;
    }

    public void setChild(double child) {
        this.child = child;
    }

    public double getAdult() {
        return adult;
    }

    public void setAdult(double adult) {
        this.adult = adult;
    }

    public double getRoom() {
        return room;
    }

    public void setRoom(double room) {
        this.room = room;
    }

    public Account getUser() {
        return user;
    }

    public void setUser(Account user) {
        this.user = user;
    }

    public Service getService() {
        return service;
    }

    public void setService(Service service) {
        this.service = service;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
