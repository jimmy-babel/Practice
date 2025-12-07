package com.jimmy.demo.childPackage;
import java.util.ArrayList;
import java.util.Date;
//import java.lang.String; //java.lang不需要导入
public class ChildClass {
    public static void main(String[] args) {
        // TODO 面向对象 - package - 包
        // package中容纳类
        // 基本语法： package 包完整路径;
        // 路径中的多个包使用点隔开
        // java.util.Date
        // 主要功能用于分类管理

        // 一个类可以没有包，但是package不可以在同一个源文件中使用多次
        // 包名为了区分类名，所以一般全部都是小写。
        // Java中存在不同包的相同名称的类，可以使用包进行区分

        java.util.Date date = new java.util.Date();
        Date date2 = new Date();
        String str = "jimmy";
        String str2 = new String("jimmyluo");
        System.out.println(date);
        System.out.println(date2);
        System.out.println(str);
        System.out.println(str2);
    }
}
