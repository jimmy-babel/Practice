package com.example.demo1.service;

import com.example.demo1.dto.FileUploadRequest;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;

import java.util.Map;

// 定义文件相关的业务逻辑接口
public interface FileService {
    // 定义一个下载文件的方法
    ResponseEntity<Resource> downloadFile(String filename);

    ResponseEntity<Map<String,String>> uploadFile(FileUploadRequest request);

}