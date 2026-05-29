package advance;
import java.util.ArrayList;
import java.util.Iterator;

public class Demo_ArrayList {
    public static void main(String[] args) {
        // 创建List集合，存储字符串
        ArrayList<String> list = new ArrayList<>();
        // 增
        list.add("A");
        list.add("B");
        list.add(2,"C");
        // 删
        list.remove(1);
        list.add(1,"B");
        // 改
        list.set(0,"a");
        // 查
        System.out.println(list.get(0)+list.get(1)+list.get(2));
        // 普通for遍历
        System.out.println("普通for");
        for (int i = 0; i < list.size(); i++) {
            System.out.println(i+":"+list.get(i));
        }
        // 增强for遍历
        System.out.println("增强for");
        for (String item : list){
            System.out.println(item);
        }
        // 迭代器遍历Iterator
        System.out.println("Iterator");
        Iterator<String> it = list.iterator();
        while (it.hasNext()){
            System.out.println(it.next());
        }
    }
}
