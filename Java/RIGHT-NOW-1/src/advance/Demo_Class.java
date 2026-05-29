package advance;

class Student {
    //成员变量
    private String name;
    private int age;
    //无参构造函数
    public Student(){
        System.out.println("无参构造函数");
    }
    //有参构造函数
    public Student(String name, int age) {
        this.name = name;
        this.age = age;
    }
    //成员方法
    public void showInfo(){
        System.out.println("name:"+name+",age:"+age);
    }
}

public class Demo_Class {
    public static void main(String[] args) {
        //实例化对象
        Student s1 = new Student();
        Student s2 = new Student("张三",20);
        s1.showInfo();
        s2.showInfo();
    }
}
