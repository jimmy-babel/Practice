package com.example.demo1.controller;

import com.example.demo1.entity.User;
import com.example.demo1.service.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid; // 1. 导入 @Valid 注解

import java.util.List;

@RestController
@RequestMapping("/api/users") // 所有用户相关接口的前缀
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // 创建用户 (POST 请求)
    @PostMapping
    public ResponseEntity<User> createUser(@Valid @RequestBody User user) {
        User createdUser = userService.createUser(user);
        // 返回 201 Created 状态码和创建的用户信息
        return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
    }

    // 获取所有用户 (GET 请求)
    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }
//    等同于：
//    public ResponseEntity<List<User>> getAllUsers() {
//        List<User> users = userService.getAllUsers();
//        return new ResponseEntity<>(users, HttpStatus.OK);
//    }

    // 新增一个支持分页的接口
    @GetMapping("/paginated")
    public Page<User> getAllUsersPaginated(
            @RequestParam(defaultValue = "0") int page, // 请求参数，页码，默认为 0 (第一页)
            @RequestParam(defaultValue = "10") int size) { // 请求参数，每页大小，默认为 10

        // 创建一个 Pageable 对象，它封装了分页信息
        Pageable pageable = PageRequest.of(page, size);

        // 调用 Service 层的分页查询方法
        return userService.getAllUsers(pageable);
    }

    // 根据 ID 获取用户 (GET 请求)
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        User user = userService.getUserById(id);
        return ResponseEntity.ok(user);
    }
}