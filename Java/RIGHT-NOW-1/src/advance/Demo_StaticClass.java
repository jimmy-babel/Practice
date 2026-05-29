package advance;

class StaticDemo{
    public static String school = "xx学校";
    public  String name;
    static {
        System.out.println("静态代码块");
    }
    public static void staticMethod(){
        System.out.println("静态方法");
    }
}
public class Demo_StaticClass {
    public static void main(String[] args) {
        StaticDemo.staticMethod();
    }
}

