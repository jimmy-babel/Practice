package com.example.demo1.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

// @RestControllerAdvice 是一个全局异常处理器，它会拦截所有 @RestController 中的异常
@RestControllerAdvice
public class GlobalExceptionHandler {

    // @ExceptionHandler 注解指定这个方法处理哪种类型的异常
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationExceptions(MethodArgumentNotValidException ex) {
        // 创建一个 Map 来存放错误信息
        Map<String, String> errors = new HashMap<>();

        // 遍历所有验证失败的字段
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField(); // 获取字段名
            String errorMessage = error.getDefaultMessage(); // 获取我们在注解中定义的错误信息
            errors.put(fieldName, errorMessage);
        });

        // 返回一个包含错误信息的 Map 和 400 Bad Request 状态码
        return new ResponseEntity<>(errors, HttpStatus.OK);
//        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }
}