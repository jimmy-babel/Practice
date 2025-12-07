package com.jimmy.demo;

import java.util.Scanner;

public class Input {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in); //Scanner
//        System.out.println("输入整数");
//        int int_val = scanner.nextInt();
//        System.out.println("你的输入"+int_val);
//        System.out.println("输入小数");
//        double double_val = scanner.nextDouble();
//        System.out.println("你的输入"+double_val);

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