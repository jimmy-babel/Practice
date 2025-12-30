package com.jimmy.demo;

    // TODO 构造方法 ConstructorFunc
    // 构造方法:与类同名 --有无参构造方法和有参构造方法
    // 若没有声名任何构造方法,JVM会自动帮我们生成"无参构造方法"
    // 若声名了任意一个构造方法(无参或有参),则不会再自动生成"无参构造方法"
    // 父类对象是在子类对象构建前完成 (构建子类对象前会调用父类构造方法完成父类构建)
    // 若父类只声名了有参构造方法,子类构建对象时需要在子类构造方法中显示完成父类的构建:super(xx)

    // TODO Extends - 继承
    // 面向对象变成中有3个非常重要的特征：继承，封装，多态
    // 类存在父子关系：子类可以直接获取到父类的成员属性和成员方法。
    // 类的继承只能是单继承，一个类只能同时声明一个父类 //同时子类也可以被继承为父类
    // 一个父类可以有多个子类

public class ConstructorFuncAndClassExtends {
    static {
        System.out.println("ConstructorFuncAndClassExtends静态代码块"); //静态代码块 //只会执行一次
    }
    {
        System.out.println("ConstructorFuncAndClassExtends代码块"); //代码块 //每次构建对象时 都会执行一次
    }
    public ConstructorFuncAndClassExtends(){
        System.out.println("ConstructorFuncAndClassExtends 无参构造函数");
    }
    public static void main(String[] args) {
        System.out.println("开始无参 new Parent");
        Parent parent = new Parent();
        parent.getName();

        System.out.println("开始有参 new Parent");
        Parent parent_2 = new Parent("Parent Change");
        parent_2.getName();

        System.out.println("开始无参 new Child1");
        Child child_none = new Child();
        child_none.getName();

        System.out.println("开始无参 new Child2");
        Child child_none2 = new Child2();
        child_none2.getName();

        System.out.println("开始有参 new Child1");
        Child child = new Child("JIMMY1");
        child.getName();

        System.out.println("开始有参 new Child2");
        Child child2 = new Child2("JIMMY2");
        child2.getName();

        new ConstructorFuncAndClassExtends(); //构建对象 //这时候才会执行:ClassExtends代码块
    }
}

class Parent {
    static {
        System.out.println("Parent静态代码块"); //静态代码块 //只会执行一次
    }
    {
        System.out.println("Parent代码块"); //代码块 //每次构建对象时 都会执行一次
    }
    String name = "Parent";
    public Parent(){
        System.out.println("Parent无参构造方法"+name);
    }
    public Parent(String name){
        this.name = name;
        System.out.println("Parent有参构造方法"+name);
    }
    void getName(){
        System.out.println("Parent getName:"+this.name+"\n");
    }
}

class Child extends Parent{ //Child:子类 , Parent:父类
    static {
        System.out.println("Child静态代码块"); //静态代码块 //只会执行一次
    }
    {
        System.out.println("Child代码块"); //代码块 //每次构建对象时 都会执行一次
    }
    String name = "Child";
    public Child(){
        System.out.println("Child无参构造方法"+name);
    }
    public Child(String name){
        super(name);
        this.name = name;
        System.out.println("Child有参构造方法"+name);
    }
    void getName(){
        System.out.println("Child getName:"+this.name+","+super.name+"\n"); //this.name 跟 super.name 指向不同
    }
}

class Child2 extends Child{ //Child2:子类 , Child:父类
    static {
        System.out.println("Child2静态代码块"); //静态代码块 //只会执行一次
    }
    {
        System.out.println("Child2代码块"); //代码块 //每次构建对象时 都会执行一次
    }
    String name = "Child2";
    public Child2(){
        System.out.println("Child2无参构造方法"+name);
    }
    public Child2(String name){
        super(name);
        this.name = name;
        System.out.println("Child2有参构造方法"+name);
    }
    void getName(){
        System.out.println("Child2 getName:"+this.name+","+super.name+"\n");
    }
}