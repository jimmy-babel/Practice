package com.example.demo1.dto;
// 接口简单示例3~4
// 定义返回结构message,user
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