package com.jimmy.demo;

    //TODO java.util.Scanner

import java.util.Scanner; //引用util.Scanner

public class InputScanner {
    public static void main(String[] args) {
        //TODO new Scanner
        Scanner scanner = new Scanner(System.in); //new Scanner
        //System.out.println("输入整数");
        //int int_val = scanner.nextInt();
        //System.out.println("你的输入"+int_val);
        //System.out.println("输入小数");
        //double double_val = scanner.nextDouble();
        //System.out.println("你的输入"+double_val);

        System.out.println("输入成绩");
        double double_val_2 = scanner.nextDouble();
        System.out.println("你的输入"+double_val_2);
        switch ((int)double_val_2/60){
            case 0:
                System.out.println("成绩不合格"+double_val_2);
                break;
            default:
                System.out.println("成绩合格"+double_val_2);
                break;
        }
    }
}