package base;

public class BaseTypeDemo {
    public static void main(String[] args) {
        // 1. 八大基本数据类型
        byte b = 10;
        short s = 20;
        int i = 100;
        long l = 1000L; // long类型必须加L后缀
        float f = 3.14F; // float必须加F后缀
        double d = 5.20;
        char c = 'A'; // char单字符，单引号
        boolean flag = true; // 只有true/false，无0/1

        // 2. 自动类型转换（小范围 → 大范围）
        int num = b;
        System.out.println("自动转换：" + num);

        // 3. 强制类型转换（大范围 → 小范围，可能丢失精度）
        int res = (int) d;
        System.out.println("强制转换：" + res);

        // 4. 包装类（基本类型转对象，自动装箱/拆箱）
        Integer integer = 100; // 自动装箱 int → Integer
        int n = integer;      // 自动拆箱 Integer → int
        System.out.println("包装类：" + integer);
    }
}
