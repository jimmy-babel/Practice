package com.jimmy.demo;

public class InterfaceDemo {
    public static void main(String[] args) {
        Computer c = new Computer();
        Light light = new Light();
        c.usb1 = light;
        Light light2 = new Light();
        c.usb2 = light2;
        c.powerSupply();
    }
}

interface USBInterface{

}

interface USBSupply extends USBInterface{

}

interface USBReceive extends USBInterface{
    public void powerReceive();
}

class Computer implements USBSupply{
    public USBReceive usb1;
    public USBReceive usb2;
    public void powerSupply(){
        usb1.powerReceive();
        usb2.powerReceive();
    }
}

class Light implements USBReceive {
    public  void powerReceive(){
        System.out.println("电灯接通电源");
    }
}