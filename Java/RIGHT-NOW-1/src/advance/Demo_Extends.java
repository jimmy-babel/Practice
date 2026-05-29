package advance;
// 父类
class Animal{
    public void eat(){
        System.out.println("animal eat");
    }
}
// 子类继承父类
class Dog extends Animal{
    // 方法重写：子类重写父类方法
    @Override
    public void eat(){
        // super：调用父类的方法/成员
        super.eat();
        System.out.println("Dog eat");
    }
}

public class Demo_Extends {
    public static void main(String[] args) {
        Dog dog = new Dog();
        dog.eat();


        //向上转型：父类引用指向子类对象（多态核心）
        Animal animal = new Dog();
        animal.eat(); // 执行子类重写的方法
    }
}
