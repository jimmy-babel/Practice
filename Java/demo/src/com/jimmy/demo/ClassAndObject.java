package com.jimmy.demo;

    // TODO 对象
    // 对象：类的实例化 （new 类名()）
    // 针对于具体对象的属性称之为：对象属性，成员属性，实例属性
    // 针对于具体对象的方法称之为：对象方法，成员方法，实例方法
    // TODO 静态
    // 和对象无关，只和类相关的称之为静态，
    // 和类相关的属性称之为静态属性
    // 和类相关的方法称之为静态方法
    // 静态语法就是在属性和方法前增加static关键字
    // TODO 成员方法
    // 方法语法: [方法的返回值类型]/void 方法名(){}

import java.util.Arrays;

public class ClassAndObject {
    public static void main(String[] args) {
        String name = "JIMMY";
        extraMethod(name);
        System.out.println(name);

        //TODO new MyClass1
        System.out.println("开始new MyClass1");
        MyClass1 myClass1 = new MyClass1(name);
        myClass1.name = "JIMMY LUO";
        System.out.println("外面1"+name); //JIMMY
        myClass1.myClassMethods_1(name); //方法中name属性的改变不会影响外部的name变量(原因:方法中name属性的改变会在堆中产生新地址,方法中的name会指向堆中的新地址(JIMMY LUO),外面的name还是指向旧地址,所以还是JIMMY)
        System.out.println("外面2"+name); //JIMMY

        System.out.println("外面3"+myClass1.name);//JIMMY LUO
        myClass1.myClassMethods_2(myClass1);
        System.out.println("外面4"+myClass1.name);//JIMMY LUOchange

        MyClass1.staticMethod1();
        myClass1.staticMethod1(); //对象也可以调用static静态方法

        //TODO new MyClass2
        MyClass2 myClass2 = new MyClass2();
        MyClass2 myClass2_2 = new MyClass2("JIMMY");

        myClass2_2.sayHello("LUO1");
        myClass2_2.sayHello("LUO2","HAHA1");
        myClass2_2.sayHello("HAHA3","XIXI","XIXI2");
    }
    public static void extraMethod(String name){
        name += "10";
        System.out.println("里面"+name);
    }
}

class MyClass1 {
    //先执行静态代码块  构建对象时执行代码块
    static { //静态代码块1
        System.out.println("MyClass1 静态代码块1");
    }
    {        //代码块1
        System.out.println("MyClass1 代码块1");
    }
    static { //静态代码块2
        System.out.println("MyClass1 静态代码块2");
    }
    {        //代码块2
        System.out.println("MyClass1 代码块2");
    }

    String name; //对象属性
    static String type = "static_type"; //静态属性
    static void staticMethod1(){ //静态方法
        //System.out.println(name); 静态方法中 不可访问成员属性name
        System.out.println("static staticMethod1()"+","+type); //静态方法中调用静态属性type
    }

    public MyClass1(String name) { //有参构造方法
        this.name = name;
    }

    public void myClassMethods_1(String name){ //成员方法
        name += "change";
        System.out.println("MyClass1 myClassMethods_1:"+name+","+this.name);

        staticMethod1(); //成员方法中调用静态方法
    }

    public void myClassMethods_2(MyClass1 myClass1){ //成员方法
        myClass1.name += "change";
        System.out.println("MyClass1 myClassMethods_2:"+myClass1.name+","+this.name);
    }

}

class MyClass2 {
    String name;
    String name2;
    public MyClass2(){ //无参构造方法
        System.out.println("MyClass2 构造方法1 "+this.name+","+name2);
    }
    public MyClass2(String name){ //有参构造方法
        //构造方法名=类名
        //如果一个类中没有任何构造方法,JVM会自动添加一个公共的、无参构造方法,方便对象的调用;
        this.name = name;
        name2 = name;
        System.out.println("MyClass2 构造方法2 "+name+","+this.name+","+name2);
    }
    // 方法 传参方式(匹配参数个数/匹配参数类型)
    void sayHello(String name){
        System.out.println("hello"+this.name+name);
    }

    void sayHello(String name,String tips){
        System.out.println("hello"+this.name+name+tips);
    }

    void sayHello(String... extra){
        System.out.println("hello"+this.name+Arrays.toString(extra));
    }
}