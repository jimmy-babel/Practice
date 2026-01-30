package com.example.demo2.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.demo2.entity.User;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

/**
 * Mapper接口
 * 继承BaseMapper<User>，无需写任何SQL，即可实现CRUD
 * @Repository：标识为数据访问组件
 */
@Repository
@Mapper
public interface UserMapper extends BaseMapper<User> {
    // 如需自定义SQL，可在此添加方法，配合注解或XML实现
}