package com.jimmy.demo;

    // TODO 面向对象 - Extends - 继承
    // 面向对象变成中有3个非常重要的特征：继承，封装，多态
    // 类存在父子关系：子类可以直接获取到父类的成员属性和成员方法。
    // 类的继承只能是单继承，一个类只能同时声明一个父类，子类也可以被继承为"孙子类", "孙子类"也可以被继承
    // 一个父类可以有多个子类

public class ClassExtends {
    public static void main(String[] args) {

        System.out.println("开始无参new Child1");
        Child child_none = new Child();
        child_none.getName();

        System.out.println("开始无参new Child2");
        Child child_none2 = new Child2();
        child_none2.getName();

        System.out.println("开始new Child1");
        Child child = new Child("JIMMY1");
        child.getName();

        System.out.println("开始new Child2");
        Child child2 = new Child2("JIMMY2");
        child2.getName();
    }
}

class Parent {
    String name = "Parent";
    public Parent(){
        System.out.println("Parent无参构造函数"+name);
    }
    public Parent(String name){
        this.name = name;
        System.out.println("Parent构造函数"+name);
    }
    void getName(){
        System.out.println("Parent getName:"+this.name+"\n");
    }
}

class Child extends Parent{
    String name = "Child";
    public Child(){
        System.out.println("Child无参构造函数"+name);
    }
    public Child(String name){
        super(name);
        this.name = name;
        System.out.println("Child构造函数"+name);
    }
    void getName(){
        System.out.println("Child getName:"+this.name+","+super.name+"\n");
    }
}

class Child2 extends Child{
    String name = "Child2";
    public Child2(){
        System.out.println("Child2无参构造函数"+name);
    }
    public Child2(String name){
        super(name);
        this.name = name;
        System.out.println("Child2构造函数"+name);
    }
    void getName(){
        System.out.println("Child2 getName:"+this.name+","+super.name+"\n");
    }
}