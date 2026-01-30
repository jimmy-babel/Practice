package com.example.demo2.common;


import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

/**
 * 全局异常处理器
 * 捕获所有Controller层异常，统一返回格式
 */
//@Slf4j
//@RestControllerAdvice // 全局捕获Controller异常，返回JSON
//public class GlobalExceptionHandler {
//
//    // 捕获所有未知异常
//    @ExceptionHandler(Exception.class)
//    public Result<?> handleException(Exception e) {
////        log.error("系统异常：", e);
//        return Result.fail("系统异常，请联系管理员");
//    }
//
//    // 捕获参数异常（可自定义更多异常类型）
//    @ExceptionHandler(IllegalArgumentException.class)
//    public Result<?> handleIllegalArgumentException(IllegalArgumentException e) {
////        log.error("参数异常：", e);
//        return Result.fail(e.getMessage());
//    }
//}