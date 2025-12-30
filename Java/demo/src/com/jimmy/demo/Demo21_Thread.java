package com.jimmy.demo;

public class Demo21_Thread {
    public static void main(String[] args) {
        // TODO 线程
        // Thread是线程类。
        // currentThread方法用于获取当前正在运行线程
        // getName方法用于获取线程名称
        // main方法运行在main线程里
        System.out.println(Thread.currentThread().getName());
    }
}
