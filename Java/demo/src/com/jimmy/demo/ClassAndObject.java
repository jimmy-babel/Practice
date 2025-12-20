package com.jimmy.demo;

    // TODO 对象
    // 针对于具体对象的属性称之为：对象属性，成员属性，实例属性
    // 针对于具体对象的方法称之为：对象方法，成员方法，实例方法
    // TODO 静态
    // 和对象无关，只和类相关的称之为静态，
    // 和类相关的属性称之为静态属性
    // 和类相关的方法称之为静态方法
    // 静态语法就是在属性和方法前增加static关键字

public class ClassAndObject {
    public static void main(String[] args) {
        String name = "JIMMY";
        extraMethod(name);
        System.out.println(name);

        //TODO new MyClass1
        System.out.println("开始new MyClass1");
        MyClass1 myClass1 = new MyClass1(name);
        myClass1.name = "JIMMY LUO";
        System.out.println(name); //JIMMY
        myClass1.extraMethod1(name);
        System.out.println(name); //JIMMY

        MyClass1.staticMethod1();
        myClass1.staticMethod1(); //对象也可以调用static方法

        //TODO new MyClass2
        MyClass2 myClass2 = new MyClass2();
        MyClass2 myClass2_2 = new MyClass2("JIMMY");
    }
    public static void extraMethod(String name){
        name += "10";
        System.out.println("里面"+name);
    }
}

class MyClass1 {
    static { //静态代码块
        System.out.println("MyClass1 静态代码块1");
    }
    { //代码块
        System.out.println("MyClass1 代码块1");
    }
    static {
        System.out.println("MyClass1 静态代码块2");
    }
    {
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

    public void extraMethod1(String name){ //成员方法
        name += "10";
        System.out.println("MyClass1 extraMethod1:"+name);
        System.out.println(this.name);

        staticMethod1(); //成员方法中调用静态方法
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

}