package com.example.demo1.dto;

import org.springframework.web.multipart.MultipartFile;

// 用于接收文件上传请求的 DTO
public class FileUploadRequest {

    // 这是一个普通的文本字段，用于接收额外信息，比如对文件的描述
    private String description;

    // 这是核心！MultipartFile 是 Spring 用于处理文件上传的专用类
    private MultipartFile file;

    // Getter 和 Setter
    public MultipartFile getFile() {
        return file;
    }

    public void setFile(MultipartFile file) {
        this.file = file;
    }


    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}