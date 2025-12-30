package com.jimmy.demo;

    // TODO 单例模式 SinglePattern
    // JVM默认给类提供的构造方法，其实就是公共的，无参的构造方法
    // 考虑使用单例模式场景:
    // 1. 类的创建过程复杂
    // 2. 类的对象消耗资源

public class SinglePattern {
    public static void main(String[] args) {
        SinglePatternDemo demo1 = SinglePatternDemo.getInstance();
        SinglePatternDemo demo2 = SinglePatternDemo.getInstance();
        SinglePatternDemo demo3 = SinglePatternDemo.getInstance();

        System.out.println(demo1 == demo2);
        System.out.println(demo2 == demo3);
        System.out.println(demo1.equals(demo2));
    }
}

//单例模式:
class SinglePatternDemo{
    private static SinglePatternDemo singlePatternDemo = null;
    private SinglePatternDemo(){}

    public static SinglePatternDemo getInstance(){
        if(singlePatternDemo == null){
            System.out.println("初始化 getInstance");
            singlePatternDemo = new SinglePatternDemo();
        }
        return singlePatternDemo;
    }
}