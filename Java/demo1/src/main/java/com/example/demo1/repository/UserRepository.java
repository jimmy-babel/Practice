package com.example.demo1.repository;

import com.example.demo1.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository // 标记为 Repository Bean
// 继承 JpaRepository<实体类, 主键类型>
// 继承后，你将自动拥有 save(), findById(), findAll(), deleteById() 等方法
public interface UserRepository extends JpaRepository<User, Long> {

    // 你可以在这里定义自定义的查询方法，Spring Data JPA 会自动实现
    // 例如：根据用户名查找用户
    Optional<User> findByUsername(String username);
}