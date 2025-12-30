package com.example.demo1;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RestController;


import com.example.demo1.dto.UserRequest;
import com.example.demo1.dto.UserResponse;
@RestController
@SpringBootApplication
public class Demo1Application {

	public static void main(String[] args) {
		SpringApplication.run(Demo1Application.class, args);
	}

    // GET接口
    // @GetMapping("/hello") 注解将 HTTP GET 请求的 "/hello" 路径映射到这个方法上。
    @GetMapping("/hello")
    public String sayHello() {
        // 当有人访问 http://localhost:8080/hello 时，这个方法就会被调用，
        // 并返回 "Hello World!" 字符串。
        return "Hello World!";
    }

    // 带参数的GET接口
    @GetMapping("/hello/{name}") // URL 中的 {name} 是一个占位符
    public String greetByName(@PathVariable String name) { // @PathVariable 将占位符的值赋给 name 变量
        // 使用接收到的 name 参数，返回一个个性化的字符串
        return "你好, " + name + "!";
    }

    //  POST接口
    @PostMapping("/users/create") // 1. 使用 @PostMapping 注解
    public UserResponse createUser(@RequestBody UserRequest userRequest) { // 2. 使用 @RequestBody 注解
        // 打印接收到的用户信息，方便在控制台查看
        System.out.println("接收到新用户: " + userRequest.getName() + ", 年龄: " + userRequest.getAge());

        // 构建并返回一个响应对象
        String welcomeMessage = "欢迎, " + userRequest.getName() + "! 你已成功注册。";
        return new UserResponse(welcomeMessage, userRequest);
    }

    // POST接口 V2
    @PostMapping("/users/my_create")
    public UserResponse myCreateUser(@RequestBody UserRequest userRequest){
        System.out.println("getName: " + userRequest.getName() + ", getAge: " + userRequest.getAge());
        String welcomeMessage = "userRequest.getName:"+userRequest.getName();
        return  new UserResponse(welcomeMessage,userRequest);
    }

}
