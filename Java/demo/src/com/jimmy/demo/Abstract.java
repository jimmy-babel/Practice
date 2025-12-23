package com.jimmy.demo;

    // TODO 抽象 - Abstract
    // 抽象类：不完整的类，就是抽象类: abstract class 类名
    // 无法直接构造对象

    // 抽象方法： 只有声明，没有实现的方法: 返回值类型 方法名（参数）

    // 分析问题：对象（具体） => 类（抽象）
    // 编写代码：类（抽象） => 对象（具体）
    // 如果一个类中含有抽象方法，那么这个类是抽象类
    // 如果一个类是抽象类，它的方法不一定都是抽象方法。

    // 抽象类无法直接构建对象，但是可以通过子类间接构建对象
    // 如果抽象类中含有抽象方法，那么子类继承抽象类，需要重写抽象方法，将方法补充完整，
    // abstract关键字不能和final同时使用

public class Abstract {
    public static void main(String[] args) {
        AbstractDemo2 abstractDemo2 = new AbstractDemo2();
        abstractDemo2.abstractMethod();
    }
}

abstract class AbstractDemo1{
    public abstract void abstractMethod();
    public void method2(){
        System.out.println("method2");
    }
}

class AbstractDemo2 extends AbstractDemo1{ //继承abstract抽象类
    public void abstractMethod(){
        System.out.println("AbstractDemo2 子类 - abstractMethod");
    }
}