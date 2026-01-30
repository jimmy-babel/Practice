package com.example.demo2;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;
@MapperScan("com.example.demo2.mapper")
@SpringBootApplication
@RestController
public class Demo2Application {

	public static void main(String[] args) {
		SpringApplication.run(Demo2Application.class, args);
	}
    @GetMapping("/hello")
    public String sayHello() {
        // 当有人访问 http://localhost:8080/hello 时，这个方法就会被调用，并返回 "Hello World!" 字符串。
        return "Hello World!";
    }

}
