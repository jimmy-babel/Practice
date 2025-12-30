package com.example.demo1.dto;

// 这是一个简单的 Java 类，用来接收前端传来的 JSON 数据
public class UserRequest {

    private String name;
    private String name2;
    private int age;

    // Spring Boot 需要一个无参构造函数来创建对象
    public UserRequest() {
    }

    // Getter 和 Setter 方法是必需的，
    // Spring Boot 通过它们来设置和获取对象的属性值
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getName2() {
        return name2;
    }

    public void setName2(String name) {
        this.name2 = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }
}