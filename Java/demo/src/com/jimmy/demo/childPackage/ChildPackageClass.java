package com.jimmy.demo.childPackage; //包完整路径(能看出父包)
//import java.lang.String; //java.lang不需要导入
//import java.util.ArrayList; //导入类
//import java.util.Date; //导入类
import java.util.*; //导入util包所有类
import com.jimmy.demo.AccessPermission;
//import com.jimmy.demo.AccessPermissionDemo1;
//import com.jimmy.demo.AccessPermissionDemo2;

    // TODO package - 包
    // package中容纳类
    // 基本语法： package 包完整路径;
    // 路径中的多个包使用点隔开  java.util.Date
    // 主要功能用于分类管理

    // 一个类可以没有包，但是package不可以在同一个源文件中使用多次
    // 包名为了区分类名，所以一般全部都是小写。
    // Java中存在不同包都有相同名称的类，可以使用包前缀. 进行区分

public class ChildPackageClass {
    public static void main(String[] args) {
        //java.lang.String 不需要导入
        String str = "jimmy"; //同等与 java.lang.String str = xxx
        String str2 = new String("jimmyluo by new String"); //同等与 java.lang.String str = new java.lang.String(xxx)
        System.out.println(str); //jimmy
        System.out.println(str2); //jimmyluo by new String

        //类java.util.Date
        java.util.Date date = new java.util.Date();
        Date date2 = new Date();
        System.out.println(date); //当前时间
        System.out.println(date2); //当前时间

        //类java.util.ArrayList
        new ArrayList();

        new com.jimmy.demo.childPackage.ChildPackageClass();
        new ChildPackageClass(); //等同于上面

        AccessPermission accessPermission = new AccessPermission();
        //System.out.println(accessPermission.privateName); //无法在子包直接访问private
        //System.out.println(accessPermission.defaultName); //无法在子包直接访问default
        //System.out.println(accessPermission.protectedName); //无法在子包直接访问protected
        System.out.println(accessPermission.publicName);
        accessPermission.showMsg();
    }
}
