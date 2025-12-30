package com.example.demo1.controller;

import com.example.demo1.dto.FileUploadRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.MediaTypeFactory;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.HashMap;
import java.util.Map;

import com.example.demo1.service.FileService;

// Web控制层
// 1. @RestController 注解表明这是一个 API 控制器，它的方法返回数据（如 JSON 或文件）
@RestController
// 2. @RequestMapping("/api/files") 为这个控制器下的所有接口添加一个统一的 URL 前缀
//    这样，文件下载的完整 URL 就变成了 http://localhost:8080/api/files/download/{filename}
@RequestMapping("/api/files")
public class FileController {

    //声明对FileService的依赖
    private final FileService fileService;

    //上传文件保存路径
    private static final String UPLOAD_DIR = "uploads/";

    @Autowired
    //构造函数注入
    public FileController(FileService fileService) {
        this.fileService = fileService;
    }

    //下载接口
    @GetMapping("/download/{filename}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String filename) {
        // 3. 调用 Service 层的方法来处理业务逻辑
        // Controller 现在只负责“调用”和“返回”，不关心具体实现
        return fileService.downloadFile(filename);
    }

    //上传接口
    @PostMapping("/upload")
    public ResponseEntity<Map<String,String>> uploadFile(@ModelAttribute FileUploadRequest request) {
        return fileService.uploadFile(request);
    }
}
