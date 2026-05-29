package advance;
// 抽象类：包含抽象方法，不能实例化
abstract class Person {
    // 抽象方法：无方法体
    public abstract void work();
}

// 接口：标准/规范，传统接口只能定义抽象方法、常量
interface Run {
    void run();
}

// 子类继承抽象类 + 实现接口
class Worker extends Person implements Run {
    @Override
    public void work() {
        System.out.println("重写Work");
    }

    @Override
    public void run() {
        System.out.println("重写Run");
    }
}

public class Demo_AbstractInterface {
    public static void main(String[] args) {
        Worker w = new Worker();
        w.work();
        w.run();
    }
}