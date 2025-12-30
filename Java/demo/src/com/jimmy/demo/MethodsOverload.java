package com.jimmy.demo;

    // TODO 方法重载 MethodsOverload
    // 一个类中，不能重复声明的相同的方法，也不能声明相同的属性
    // 这里相同的方法指的是方法名，参数列表相同，和返回值类型无关
    // 方法的重载: 方法名相同，但是参数列表（个数，顺序，类型）不相同
    // 构造方法也存在方法的重载

public class MethodsOverload {
    public static void main(String[] args) {
        // new LoginClass
        LoginClass loginClass = new LoginClass();
        loginClass.login();
        loginClass.login("13160675000");
        loginClass.login("admin","123456");

    }
}


class LoginClass{
    String name;
    // 构造方法也可以方法重载
    LoginClass(){
        System.out.println("无参构造函数1");
    }
    LoginClass(String name){
        this.name = name;
        System.out.println("有参构造函数2"+name);
    }

    // 方法重载 (传参个数、类型不同)
    void login(){
        System.out.println("匿名登录");
    }
    void login(String phone){
        System.out.println("手机号登录"+phone);
    }
    void login(String account,String password){
        System.out.println("账号密码登录"+account+" "+password);
    }

}