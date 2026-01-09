package com.example.demo1.dto;
import  jakarta.validation.constraints.NotBlank;
import  lombok.Data;

@Data
public class CreateTodoRequest {
    @NotBlank(message = "标题不能为空")
    private String title;
    private String description;
}
