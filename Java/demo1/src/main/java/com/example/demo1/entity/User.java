package com.example.demo1.entity;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email; // 导入 Email 验证
import jakarta.validation.constraints.NotBlank; // 导入 NotBlank 验证

@Entity // 1. 标记这是一个 JPA 实体类，对应数据库中的一张表
@Table(name = "users") // 2. 指定对应的表名，如果省略，默认表名是类名的小写（user）
public class User {
    @Id //主键
    @GeneratedValue(strategy = GenerationType.IDENTITY) //指定主键生成策略为自增（AUTO_INCREMENT）
    private Long id;

    @NotBlank(message = "用户名不能为空") // @NotBlank: 不能为 null，且去除首尾空格后长度必须大于0
    @Column(nullable = false, unique = true) //标记为表中的列，非空且唯一
    private  String username;

    @NotBlank(message = "邮箱不能为空")
    @Email(message = "邮箱格式不正确")
    @Column(nullable = false)
    private String email;

    //JPA要求至少一个无参构造函数
    public User(){}

    //get & set
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}