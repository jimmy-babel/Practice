package com.jimmy.demo;

import java.util.ArrayList;

public class Demo15_ArrayList {
    public static void main(String[] args) {
        ArrayList list = new ArrayList();
        list.add("441");
        list.add("442");
        list.add("jimmy");
        System.out.println(list);
        for (int i = 0; i < list.size(); i++) {
            System.out.println(i+","+list.get(i));
        }
        for (Object obj : list){
            System.out.println(obj);
        }
        Object pop = list.set(0,"luo");
        System.out.println(pop);
        System.out.println(list);
        Object removeVal = list.remove(1);
        System.out.println(removeVal);
        System.out.println(list);
        System.out.println(list.size()+","+list.isEmpty());
        System.out.println(list.contains("jimmy"));
        System.out.println(list.indexOf("jimmy"));
        Object[] item = list.toArray();
        Object clone = list.clone();
        ArrayList newList = (ArrayList)clone;
        System.out.println(item+","+newList);
        list.removeAll(list);
        System.out.println(list);
        System.out.println(list.isEmpty());

    }
}
