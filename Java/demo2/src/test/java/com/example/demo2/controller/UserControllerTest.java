package com.example.demo2.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

/**
 * UserController单元测试
 * @SpringBootTest：启动Spring容器
 * @AutoConfigureMockMvc：自动配置MockMvc（模拟HTTP请求）
 */
@SpringBootTest
@AutoConfigureMockMvc
public class UserControllerTest {

    // 注入MockMvc（模拟接口请求）
    @Autowired
    private MockMvc mockMvc;

    /**
     * 测试查询所有用户接口
     */
    @Test
    public void testGetAllUsers() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/user")  // 请求路径（包含上下文路径/api）
                        .contentType(MediaType.APPLICATION_JSON)) // 请求类型
                .andExpect(MockMvcResultMatchers.status().isOk()) // 断言响应状态码200
                .andExpect(MockMvcResultMatchers.jsonPath("$.size()").value(2)); // 断言返回数据条数为2
    }

    /**
     * 测试根据ID查询用户接口
     */
    @Test
    public void testGetUserById() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/user/1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.username").value("张三")); // 断言用户名是张三
    }

    /**
     * 测试新增用户接口
     */
    @Test
    public void testAddUser() throws Exception {
        // 构造JSON请求体
        String userJson = "{\"id\":3,\"username\":\"王五\",\"age\":25,\"email\":\"wangwu@test.com\"}";

        mockMvc.perform(MockMvcRequestBuilders.post("/api/user")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(userJson)) // 设置请求体
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().string("新增用户成功，当前总数：3"));
    }
}