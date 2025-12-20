package com.jimmy.demo;

        //TODO 引用数据类型

public class ReferenceDataType {
    public static void main(String[] args) {
        //String
        String str_val = "";
        str_val = "JIMMY_LUO";
        System.out.println(str_val);

        //数组[]
        String [] arr_val = {"a","b","c"};
        System.out.println(arr_val); //.toString()
        for (int i = 0,len=arr_val.length;i<len;i++){
            if(i == 2){
                break;
            }
            System.out.println(i+","+arr_val[i]);
        }

        int i = 0;
        System.out.println(i);
        while (i<=(arr_val.length - 1)){
            if(i == 1){
                break;
            }
            System.out.println(i+","+arr_val[i]);
            i+=1;
        }
        System.out.println(i);
        i=0;
        do {
            if(i == 2){
                break;
            }
            System.out.println(i+","+arr_val[i]);
            i+=1;
        }while(i<=(arr_val.length - 1));

        //类
        Cooking myCooking = new Cooking("鱼","红烧");
        myCooking.start();
        myCooking.multiName("multiName","A","B","C");

        Cooking myCooking2 = new Cooking("鱿鱼","清蒸");
        myCooking2.start();
        boolean isCooking = myCooking2.isCooking();
        System.out.println(isCooking);
        int test;
        //System.out.println(test); //变量使用前必须初始化，否则会报错 //反观类的属性可以不初始化，JVM会自动完成初始化
    }
}

class Cooking {
    // TODO 成员属性会在构造对象的时候默认初始化:
    // byte、short、int、long:0;
    // float、double:0.0;
    // boolean:false;
    // char:空字符;
    // 引用数据类型:null;
    String type;
    String food;

    public Cooking(String food,String type) {
        this.food = food;
        this.type = type;
    }

    void start(){
        System.out.println("准备食材:"+food);
        System.out.println("开始"+type);
        System.out.println("大功告成");
    }

    boolean isCooking(){
        return  true;
    }

    void multiName(String title,String ...extra){
        System.out.println(title);
        System.out.println(extra);
    }
}

