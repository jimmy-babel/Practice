package advance;

import java.util.ArrayDeque;
import java.util.LinkedList;

public class Demo_LinkedListQueue {
    public static void main(String[] args) {
        LinkedList<String> link = new LinkedList<>();
        link.addFirst("头部元素");
        link.addLast("尾部元素");
        System.out.println(link.getFirst());
        System.out.println(link.getLast());

        ArrayDeque<String> queue  = new ArrayDeque<>();
        queue.offer("任务1");
        queue.offer("任务2");
        while (!queue.isEmpty()){
            System.out.println("出队:"+queue.poll());
        }
    }
}
