package com.jimmy.demo;
    // TODO 访问权限 AccessPermission
    // public：公共的，访问权限修饰符
    //         Java的源码中，公共类只能有一个，而且必须和源码文件名相同
    //         main方法：main方法是由JVM调用的，JVM调用时应该可以任意调用，而不用考虑权限问题。

    // TODO Java中的访问权限主要分为4种：
    // 1. private：同类 //私有
    // 2. (default)：同类+同包  //默认权限 //当不设定任何权限时，JVM会默认提供权限
    // 3. protected：同类+同包+子类 //受保护
    // 4. public：公共的，任意使用

public class AccessPermission {
    private String privateName = "privateName";
    String defaultName = "defaultName";
    protected String protectedName = "protectedName";
    public String publicName = "publicName";

    public static void main(String[] args) {

        AccessPermissionDemo1 accessPermissionDemo1 = new AccessPermissionDemo1();
        //System.out.println(accessPermissionDemo1.privateName); //无法在类外部直接访问private
        System.out.println(accessPermissionDemo1.defaultName);
        System.out.println(accessPermissionDemo1.protectedName);
        System.out.println(accessPermissionDemo1.publicName);
        System.out.println();

        accessPermissionDemo1.method1();
//        accessPermissionDemo1.clone(); //会报错 AccessPermission->super->java.lang.Object(clone)与AccessPermissionDemo1->super->java.lang.Object(clone)不是同一个父类;(Object父类不是同一个)
        System.out.println();

        AccessPermissionDemo2 accessPermissionDemo2 = new AccessPermissionDemo2();
        System.out.println(accessPermissionDemo2.defaultName);
        System.out.println(accessPermissionDemo2.protectedName);
        System.out.println(accessPermissionDemo2.publicName);
        System.out.println();

        accessPermissionDemo2.method2();

    }

    public void showMsg(){
        System.out.println(privateName);
        System.out.println(defaultName);
        System.out.println(protectedName);
        System.out.println(publicName);
    }
}

class AccessPermissionDemo1{
    private String privateName = "privateName";
    String defaultName = "defaultName";
    protected String protectedName = "protectedName";
    public String publicName = "publicName";


    void method1() {
        System.out.println(privateName);
        System.out.println(defaultName);
        System.out.println(protectedName);
        System.out.println(publicName);
        try {
            clone(); //AccessPermissionDemo1->super->java.lang.Object(clone)
        } catch (CloneNotSupportedException e) {
            throw new RuntimeException(e);
        }

    }
}

class AccessPermissionDemo2 extends AccessPermissionDemo1{
    public final String finalName = "finalName"; //final属性 必须初始化 //如果没有初始化则需要在构造方法里初始化

    // TODO final
    // Java中提供了一种语法，可以在数据初始化后不被修改，使用关键字final
    // final可以修饰变量：变量的值一旦初始化后无法修改
    // final可以修饰属性：那么JVM无法自动进行初始化，需要自己进行初始化，属性值不能发生变化
    // 一般将final修饰的变量称之为常量，或者叫不可变变量
    // final可以修饰方法，这个方法不能被子类重写
    // final可以修饰类，这样类就没有子类了
    // final不可以修饰构造方法
    // final可以修改方法的参数，一旦修饰，参数就无法修改。

    AccessPermissionDemo2(){}

    AccessPermissionDemo2(String name){
        // finalName = name; //构造方法里初始化final属性
    }
    void method2(){
        //System.out.println(privateName); //无法访问父类的私有private
        System.out.println(defaultName);
        System.out.println(protectedName);
        System.out.println(publicName);
    }
}