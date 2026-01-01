package com.example.demo1.service.impl; // 推荐在 service 下再建一个 impl 包来存放实现类

import com.example.demo1.dto.FileUploadRequest;
import com.example.demo1.service.FileService;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service; // 1. 添加 @Service 注解
import org.springframework.http.MediaTypeFactory;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.HashMap;
import java.util.Map;

    // 1. @Service 注解告诉 Spring，这是一个服务类，需要被 Spring 容器管理
    @Service
    public class FileServiceImpl implements FileService {

    private static final String UPLOAD_DIR = "uploads/";

    // 2. 实现接口中定义的方法
    @Override
    public ResponseEntity<Resource> downloadFile(String filename) {
        // 这里的代码和之前在 Controller 中的完全一样
        Path filePath = Paths.get(UPLOAD_DIR).resolve(filename).normalize();

        try {
            Resource resource = new UrlResource(filePath.toUri());

            if (resource.exists() && resource.isReadable()) {
                MediaType mediaType = MediaTypeFactory
                        .getMediaType(resource)
                        .orElse(MediaType.APPLICATION_OCTET_STREAM);

                return ResponseEntity.ok()
                        .contentType(mediaType)
                        .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                        .body(resource);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (MalformedURLException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @Override
    public ResponseEntity<Map<String,String>> uploadFile(FileUploadRequest request){

        MultipartFile file = request.getFile();
        if(file.isEmpty()){
            return ResponseEntity.badRequest().body(Map.of("message","上传失败,文件为空"));
        }
        Path uploadPath = Paths.get(UPLOAD_DIR);
        try {
            Files.createDirectories(uploadPath);

        } catch (IOException e) {
            return ResponseEntity.status(500).body(Map.of("message","创建上传目录失败"));
        }

        //保存文件
        try{
            //获取原始文件名
            String originalFilename = file.getOriginalFilename();
            //构建目标文件路径
            Path destinationPath = uploadPath.resolve(originalFilename);
            //将上传的文件内容复制到目标文件
            Files.copy(file.getInputStream(),destinationPath, StandardCopyOption.REPLACE_EXISTING);

            //返回成功响应
            Map<String,String> response = new HashMap<>();
            response.put("message","文件上传成功");
            response.put("filename",originalFilename);
            response.put("size",file.getSize()+"bytes");
            response.put("description",request.getDescription());
            return  ResponseEntity.ok(response);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

}