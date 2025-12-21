package com.jimmy.demo;
import com.jimmy.demo.AccessPermission; //引用同包的类

    //TODO 基本数据类型：
    //1.数值类型 --整数类型:byte short int long; --浮点类型:float double;
    //2.字符类型 char;
    //3.布尔类型 boolean;

    //示例：
    //byte 8 ->short 16-> int 32-> long 64位;
    //float 单精度->double 双精度;

    //引用数据类型：
    //String、类、接口、数组、枚举、特殊类型值null

public class BasicDataType {
    public static void main(String[] args) {

        //1 int & String & +
        int a = 97;
        int b = 100;
        String str = "字符串String";
        System.out.println(a); //97
        System.out.println(b); //100
        System.out.println(a+b); //197
        System.out.println(a*b); //9700
        System.out.println(a/b); //0
        System.out.println(b/a); //1

        System.out.println(a+b+str); //197字符串String
        System.out.println(str+a+b); //字符串String97100
        System.out.println(a+"+"+str+"+"+b);

        //2 byte & short
        byte byte_val = 1;
        short short_val = 2;
        System.out.println(byte_val); //1
        System.out.println(short_val); //2

        //3 double & float
        double double_val =3.1415926535;
        float float_val =3.1415926535f;
        System.out.println(double_val); //3.1415926535
        System.out.println(float_val); //3.1415927

        System.out.println(2*3 == 6); //true
        System.out.println(2.7*3 == 8.1); //false
        System.out.println(8.1/3); //2.6999999999999997


        //4 char
        char char_val = 'a'; //用''，不是""
        char char_val2 = 97;
        System.out.println(char_val); //a
        System.out.println(char_val2); //a
        System.out.println(char_val+char_val2); //194
        System.out.println((int)char_val); //97

        //5 boolean
        boolean boolean_val = true;
        if(boolean_val){
            System.out.println("boolean_val是"+boolean_val); //true
        }else{
            System.out.println("boolean_val是"+boolean_val);
        }

        //6 char int long float double 自动类型转换
        double double_val6 = 1;
        int int_val6 = 'a';
        System.out.println(double_val6); //1.0
        System.out.println(int_val6); //97

        //7 byte short long float double 自动类型转换 & 强制类型转换
        double double_val7 = 1.1;
        int int_val7 = 1;
        float float_val7 = 1.1f;
        System.out.println(double_val7+int_val7+float_val7); //double
        System.out.println((int)1.1); //1 //精度丢失
        System.out.println((byte)127); //127
        System.out.println((byte)128); //-128 //数据溢出

        String string_val7 = "441";
        System.out.println(Integer.parseInt(string_val7)); //441
        System.out.println(Double.parseDouble(string_val7)); //441.0
        System.out.println(Float.parseFloat(string_val7)); //441.0
        System.out.println(string_val7.charAt(0)); //4
        System.out.println(string_val7.charAt(2)); //1
        //System.out.println(string_val7.charAt(3)); //报错 Index 3 out of bounds for length 3

        //8 除法 & 精度问题 & 取模(a%b = a-(a/b * b)) = (10-(3*3))
        System.out.println(10/3); //3 //int类型
        System.out.println(10.0f/3); //3.3333333 //float类型
        System.out.println(10.0/3); //3.3333333333333335 //double类型

        System.out.println(10%3); // 1  //(10 - 3*3)

        //9 非短路/短路逻辑运算：& && | || ! ^
        int int_val9 = 0;
        if(++int_val9 > 0 & ++int_val9 > 1){
            System.out.println("A会进来"+int_val9); //2
        }
        if(++int_val9 > 2 && ++int_val9 > 3){
            System.out.println("B会进来"+int_val9); //4
        }

        if(++int_val9 > 999 && ++int_val9 > 999){ //短路逻辑运算 只会左边运算
            System.out.println("C不会进来,而且只++一次,后者不会执行:"+int_val9); //5
        }

        if(++int_val9 > 999 & ++int_val9 > 999){ //非短路 两边运算
            System.out.println("D不会进来,但是前者++一次,后者也会++一次:"+int_val9); //7
        }

        if(++int_val9 > 7 || ++int_val9 > 8){ //短路逻辑运算 只会左边运算
            System.out.println("E会进来,而且只++一次,后者不会执行:"+int_val9); //8
        }

        if(++int_val9 > 8 | ++int_val9 > 9){ //非短路 两边运算
            System.out.println("F会进来,而且前者++一次,后者也会++一次:"+int_val9); //10
        }

        //同包访问权限:
        AccessPermission accessPermission = new AccessPermission();
        System.out.println(accessPermission.defaultName);
        System.out.println(accessPermission.protectedName);
        System.out.println(accessPermission.publicName);
        System.out.println();
        accessPermission.showMsg();
    }
}
