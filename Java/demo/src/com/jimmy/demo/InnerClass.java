package com.jimmy.demo;

    // TODO 外部类
    // 外部类不允许使用private，protected修饰
    // 所谓的外部类，就是在源码中直接声明的类

    // TODO 内部类
    // 所谓的内部类，就是类中声明的类
    // 内部类就当成外部类的属性使用即可
    // 因为内部类可以看作外部类的属性，所以需要构建外部类对象才可以使用

public class InnerClass {
    public static void main(String[] args) {

        OuterClassDemo outerClassDemo = new OuterClassDemo();
        OuterClassDemo.InnerClassDemo1 innerClassDemo1 = outerClassDemo.new InnerClassDemo1();
        innerClassDemo1.showMsg();

        OuterClassDemo.InnerClassDemo2.showMsg();
    }
}



class OuterClassDemo{
    public class InnerClassDemo1{
        void showMsg(){
            System.out.println("InnerClassDemo1");
        }
    }
    static public class InnerClassDemo2{
        static void showMsg(){
            System.out.println("static InnerClassDemo2");
        }
    }
}
