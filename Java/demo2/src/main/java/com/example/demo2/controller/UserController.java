package com.example.demo2.controller;


import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.example.demo2.common.Result;
import com.example.demo2.entity.User;
import com.example.demo2.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * 用户接口（数据库版）
 * 所有接口返回统一Result格式
 */
@Slf4j
@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    /**
     * 新增用户
     */
    @PostMapping
    public Result<?> addUser(@RequestBody User user) {
        boolean save = userService.save(user);
        return save ? Result.success() : Result.fail("新增失败");
    }

    /**
     * 根据ID删除用户
     */
    @DeleteMapping("/{id}")
    public Result<?> deleteUser(@PathVariable Long id) {
        boolean remove = userService.removeById(id);
        return remove ? Result.success() : Result.fail("删除失败");
    }

    /**
     * 根据ID修改用户
     */
    @PutMapping("/{id}")
    public Result<?> updateUser(@PathVariable Long id, @RequestBody User user) {
        user.setId(id); // 确保ID一致
        boolean update = userService.updateById(user);
        return update ? Result.success() : Result.fail("修改失败");
    }

    /**
     * 根据ID查询用户
     */
    @GetMapping("/{id}")
    public Result<User> getUserById(@PathVariable Long id) {
        User user = userService.getById(id);
        return Result.success(user);
    }

    /**
     * 查询所有用户
     */
    @GetMapping
    public Result<?> getAllUsers() {
        return Result.success(userService.list());
    }

    /**
     * 分页查询用户
     * 示例：/user/page?current=1&size=2
     */
    @GetMapping("/page")
    public Result<IPage<User>> getUserPage(
            @RequestParam(defaultValue = "1") Long current, // 当前页
            @RequestParam(defaultValue = "2") Long size     // 每页条数
    ) {
        Page<User> page = new Page<>(current, size);
        IPage<User> userPage = userService.getUserPage(page);
        return Result.success(userPage);
    }
}

// 备份
//import com.example.demo2.config.CustomConfig;
//import com.example.demo2.entity.User;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.ArrayList;
//import java.util.List;
//import java.util.Map;
//
///**
// * 用户RESTful API控制器
// * @RestController：= @Controller + @ResponseBody，返回JSON而非页面
// * @Slf4j：Lombok自动生成日志对象log
// * @RequestMapping：接口前缀
// */
//@Slf4j
//@RestController
//@RequestMapping("/user")
//public class UserController {
//
//    // 注入自定义配置类
//    @Autowired
//    private CustomConfig customConfig;
//
//    // 模拟数据库存储用户数据
//    private static final List<User> USER_LIST = new ArrayList<>();
//
//    static {
//        // 初始化测试数据
//        USER_LIST.add(new User(1L, "张三", 20, "zhangsan@test.com"));
//        USER_LIST.add(new User(2L, "李四", 22, "lisi@test.com"));
//    }
//
//    /**
//     * 1. 获取自定义配置信息（GET请求）
//     */
//    @GetMapping("/config")
//    public CustomConfig getConfig() {
//        log.info("读取自定义配置：{}", customConfig); // 打印DEBUG级别日志
//        return customConfig;
//    }
//
//    /**
//     * 2. 获取所有用户（RESTful：GET /user）
//     */
//    @GetMapping
//    public List<User> getAllUsers() {
//        log.debug("查询所有用户，共{}条数据", USER_LIST.size());
//        return USER_LIST;
//    }
//
//    /**
//     * 3. 路径参数：根据ID查询用户（RESTful：GET /user/{id}）
//     * @PathVariable：接收路径中的参数
//     */
//    @GetMapping("/{id}")
//    public User getUserById(@PathVariable Long id) {
//        log.info("根据ID查询用户：{}", id);
//        return USER_LIST.stream()
//                .filter(user -> user.getId().equals(id))
//                .findFirst()
//                .orElse(null);
//    }
//
//    /**
//     * 4. 请求参数：根据用户名和年龄查询（GET /user/query?username=张三&age=20）
//     * @RequestParam：接收URL中的请求参数（可指定默认值、是否必传）
//     */
//    @GetMapping("/query")
//    public List<User> getUserByCondition(
//            @RequestParam(required = false) String username,
//            @RequestParam(defaultValue = "0") Integer age) {
//        log.info("查询条件：用户名={}，年龄={}", username, age);
//        return USER_LIST.stream()
//                .filter(user -> (username == null || user.getUsername().contains(username))
//                        && (age == 0 || user.getAge().equals(age)))
//                .toList();
//    }
//
//    /**
//     * 5. 请求头参数：获取请求头中的Token（GET /user/token）
//     * @RequestHeader：接收请求头中的参数
//     */
//    @GetMapping("/token")
//    public String getToken(@RequestHeader("token") String token) {
//        log.info("获取请求头Token：{}", token);
//        return "Token：" + token;
//    }
//
//    /**
//     * 6. 请求体：新增用户（RESTful：POST /user）
//     * @RequestBody：接收JSON格式的请求体
//     */
//    @PostMapping
//    public String addUser(@RequestBody User user) {
//        log.info("新增用户：{}", user);
//        USER_LIST.add(user);
//        return "新增用户成功，当前总数：" + USER_LIST.size();
//    }
//
//    /**
//     * 7. 混合参数：修改用户（RESTful：PUT /user/{id}）
//     * 路径参数 + 请求体
//     */
//    @PutMapping("/{id}")
//    public String updateUser(@PathVariable Long id, @RequestBody User user) {
//        log.info("修改ID为{}的用户，新信息：{}", id, user);
//        for (int i = 0; i < USER_LIST.size(); i++) {
//            if (USER_LIST.get(i).getId().equals(id)) {
//                USER_LIST.set(i, user);
//                return "修改用户成功";
//            }
//        }
//        return "用户不存在";
//    }
//
//    /**
//     * 8. 删除用户（RESTful：DELETE /user/{id}）
//     */
//    @DeleteMapping("/{id}")
//    public String deleteUser(@PathVariable Long id) {
//        log.info("删除ID为{}的用户", id);
//        boolean removed = USER_LIST.removeIf(user -> user.getId().equals(id));
//        return removed ? "删除用户成功" : "用户不存在";
//    }
//}