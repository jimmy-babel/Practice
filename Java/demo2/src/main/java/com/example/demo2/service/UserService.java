package com.example.demo2.service;
import com.baomidou.mybatisplus.extension.service.IService;
import com.example.demo2.entity.User;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;

/**
 * Service接口
 * 继承IService<User>，提供更丰富的CRUD方法（比BaseMapper多批量操作等）
 */
public interface UserService extends IService<User> {
    // 自定义业务方法：分页查询用户
    IPage<User> getUserPage(Page<User> page);
}