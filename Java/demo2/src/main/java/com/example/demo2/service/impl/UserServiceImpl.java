package com.example.demo2.service.impl;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.demo2.entity.User;
import com.example.demo2.mapper.UserMapper;
import com.example.demo2.service.UserService;
import org.springframework.stereotype.Service;

/**
 * Service实现类
 * 继承ServiceImpl<Mapper, Entity>，自动注入Mapper
 */
@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements UserService {

    /**
     * 分页查询用户（自定义实现）
     */
    @Override
    public IPage<User> getUserPage(Page<User> page) {
        // baseMapper就是注入的UserMapper
        return baseMapper.selectPage(page, null);
    }
}