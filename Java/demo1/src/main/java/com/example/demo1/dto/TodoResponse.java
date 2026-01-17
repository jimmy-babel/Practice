package com.example.demo1.dto;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor // Lombok: 自动生成全参构造函数
public class TodoResponse {
    private long id;
    private String title;
    private String description;
    private boolean completed;
    private  String jimmy;
}
