package com.example.demo2.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

/**
 * 读取自定义配置（prefix指定配置前缀）
 * @ConfigurationProperties：批量读取配置，比@Value更优雅
 * @Component：交给Spring容器管理
 * @Data：Lombok自动生成get/set/toString
 */
@Data
@Component
@ConfigurationProperties(prefix = "custom.app")
public class CustomConfig {
    private String name;    // 对应custom.app.name
    private String version; // 对应custom.app.version
    private String author;  // 对应custom.app.author
}