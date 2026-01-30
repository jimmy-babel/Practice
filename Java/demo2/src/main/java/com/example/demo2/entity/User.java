package com.example.demo2.entity;


import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;


/**
 * 用户实体类
 * @Data：生成get/set/toString/hashCode/equals
 * @NoArgsConstructor：无参构造
 * @AllArgsConstructor：全参构造
 */
@Data
@NoArgsConstructor
@AllArgsConstructor


public class User {
    private Long id;         // 用户ID
    private String username; // 用户名
    private Integer age;     // 年龄
    private String email;    // 邮箱
//    private LocalDateTime createTime; // 驼峰命名，对应数据库create_time

}