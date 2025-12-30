package com.jimmy.demo;
import java.util.ArrayList;

    // TODO 集合
    // 1. Collection接口
    // 常用的子接口
    // List ：按照插入顺序保存数据，数据可以重复的 (具体的实现类：ArrayList，LinkedList)
    // Set ：集，无序保存，数据不能重复 (具体的实现类 HashSet)
    // Queue ：队列 (具体的实现类：ArrayBlockingQueue)

    // 2. Map接口
    // 具体的实现 ： HashMap，Hashtable

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
