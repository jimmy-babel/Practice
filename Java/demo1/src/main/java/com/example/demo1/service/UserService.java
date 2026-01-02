package com.example.demo1.service;

import com.example.demo1.entity.User;

import java.util.List;
import org.springframework.data.domain.Page; // 导入 Page
import org.springframework.data.domain.Pageable; // 导入 Pageable

public interface UserService {
    User createUser(User user);
    List<User> getAllUsers();
    Page<User> getAllUsers(Pageable pageable); // 添加一个支持分页的版本
    User getUserById(Long id);
}