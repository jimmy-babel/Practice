package com.jimmy.demo;

    // TODO 多态 Polymorphism
    // 所谓的多态，其实就是一个对象在不同场景下表现出来的不同状态和形态
    // 多态语法其实就是对对象的使用场景进行了约束
    // 一个对象可以使用的功能取决于引用变量的类型
    //（编译看左边、运行看右边） or （属性看左边、方法看右边（方法里的属性看作用域））

    // TODO 方法重写
    // 方法的重写：父类对象的方法其实主要体现通用性，无法在特殊的场合下使用
    // 如果子类对象需要在特殊的场合下使用，那么就需要重写方法的逻辑，这个操作在Java中称之为方法的重写
    // 这里的重写，并不意味着父类的方法被覆盖掉，只是在当前场合不使用。如果使用super关键字还是可以访问
    // 方法的重写要求，子类的方法和父类的方法，方法名相同，返回值类型相同，参数列表要相同
    // 构造方法无法被重写

public class Polymorphism {
    public static void main(String[] args) {
        // TODO 多态
        // 口诀：（编译看左边、运行看右边） or （属性看左边、方法看右边（方法里的属性看作用域））
        Person p1 = new Person();
        Person p2 = new Boy();
        Person p3 = new Girl();
        p1.whoAmI(); //I'm Person
        p2.whoAmI(); //I'm Boy
        p3.whoAmI(); //I'm Girl

        //"一个对象可以使用的功能取决于引用变量的类型" "多态语法其实就是对对象的使用场景进行了约束"
        p1.callPerson(); //callPerson
        //p2.callBoy(); //不能调子类的方法
        //p3.callGirl(); //不能调子类的方法

        Boy b1 = new Boy();
        Girl g1 = new Girl();
        b1.callBoy(); //callBoy
        g1.callGirl(); //callGirl

        // TODO 多态+方法重写
        // 口诀：（编译看左边、运行看右边） or （属性看左边、方法看右边（方法里的属性看作用域））

        // SumClass = new sumClass
        SumClass sumClass1 = new SumClass();
        System.out.println(sumClass1.i); //10
        System.out.println(sumClass1.sum()); //11
        System.out.println(sumClass1.getSum()+"\n"); //21

        // SumClass2 = new sumClass2
        SumClass2 sumClass2 = new SumClass2();
        System.out.println(sumClass2.i); //20
        System.out.println(sumClass2.sum()); //22
        System.out.println(sumClass2.getSum()+"\n"); //42


        // SumClass = new sumClass2
        SumClass sumClass1_2 = new SumClass2();
        System.out.println(sumClass1_2.i); //10
        System.out.println(sumClass1_2.sum()); //22
        System.out.println(sumClass1_2.getSum()+"\n"); //42


        // SumClass3 = new sumClass3
        SumClass3 sumClass3 = new SumClass3();
        System.out.println(sumClass3.i); //30
        System.out.println(sumClass3.sum()); //33
        System.out.println(sumClass3.getSum()+"\n"); //41

        // SumClass = new sumClass3
        SumClass sumClass1_3 = new SumClass3();
        System.out.println(sumClass1_3.i); //10
        System.out.println(sumClass1_3.sum()); //33
        System.out.println(sumClass1_3.getSum()+"\n"); //41

        // TODO 多态(类传参
        Polymorphism_Child child = new Polymorphism_Child();
        showMsg(child); //child  com.jimmy.demo.Polymorphism_Child@3d494fbf
        showMsgNew(child); //parent  com.jimmy.demo.Polymorphism_Child@3d494fbf //showMsgNew传参类没有child类，传参类向父类找，直到匹配上
        System.out.println();

        Polymorphism_Parent parent = new Polymorphism_Child();
        showMsg(parent); //parent  com.jimmy.demo.Polymorphism_Child@1ddc4ec2
        showMsgNew(parent); //parent  com.jimmy.demo.Polymorphism_Child@1ddc4ec2

    }

    //方法重载 (传参类型不同(类传参))
    static void showMsg(Polymorphism_Parent parent){
        System.out.println("parent\t"+parent);
    }
    static void showMsg(Polymorphism_Child child){
        System.out.println("child\t"+child);
    }
    static void showMsgNew(Polymorphism_Parent parent){
        System.out.println("parent\t"+parent);
    }
//    static void showMsgNew(Polymorphism_Child child){
//        System.out.println("child\t"+ child);
//    }
}

class Person{
    void whoAmI(){
        System.out.println("I'm Person");
    }
    void callPerson(){
        System.out.println("callPerson");
    }
}

class Boy extends Person{
    void whoAmI(){
        System.out.println("I'm Boy");
    }
    void callBoy(){
        System.out.println("callBoy");
    }
}

class Girl extends Person{
    void whoAmI(){
        System.out.println("I'm Girl");
    }
    void callGirl(){
        System.out.println("callGirl");
    }
}


class SumClass{
    int i = 10;
    int sum(){
        return i+1;
    }
    int getSum(){
        return getI()+i+1;
    }
    int getI(){
        return  i;
    }
}

class SumClass2 extends SumClass{
    int i = 20;
    int sum(){ //方法重写
        return i+2;
    }
    int getSum(){ //方法重写
        return getI()+i+2;
    }
    int getI(){ //方法重写
        return  i;
    }
}

class SumClass3 extends SumClass{
    int i = 30;
    int sum(){ //方法重写
        return i+3;
    }
    //SumClass3没有getSum() //所以会调用到父类的getSum,父类的getSum里面的getI()是调SumClass3的,i属性是getSum的作用域的,所以是父类的i;
    int getI(){ //方法重写
        return  i;
    }
}

class Polymorphism_Parent {
//    static void showMsg(Polymorphism_Parent parent){
//        System.out.println("STATIC Polymorphism_Parent\t" + parent);
//    }
//
//    void showMsgNew(Polymorphism_Parent parent){
//        System.out.println("Polymorphism_Parent\t" + parent);
//    }
}

class Polymorphism_Child extends Polymorphism_Parent{
//    static void showMsg(Polymorphism_Child child){
//        System.out.println("STATIC Polymorphism_Child\t" + child);
//    }
//    void showMsgNew(Polymorphism_Child child){
//        System.out.println("Polymorphism_Child\t" + child);
//    }
}