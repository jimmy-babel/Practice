package com.example.demo1.dto;

public class UserResponse {
    private String message;
    private UserRequest user;

    public UserResponse(String message, UserRequest user) {
        this.message = message;
        this.user = user;
    }

    // Getter 方法
    public String getMessage() {
        return message;
    }

    public UserRequest getUser() {
        return user;
    }
}