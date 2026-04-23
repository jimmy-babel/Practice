package Demo1_ClassAndObj;

public class Object_Demo {
    public static void main(String[] args) {
        Girl g1 = new Girl();
        g1.name = "name1";
        g1.height = 111;
        g1.weight = 11;
        int bmi = g1.caculateBMI();
        System.out.println(g1.name);
        System.out.println(g1.height);
        System.out.println(g1.weight);
        System.out.println(bmi);


        Girl g2 = new Girl();
        g2.name = "name2";
        g2.height = 222;
        g2.weight = 22;
        int bmi2 = g2.caculateBMI();
        System.out.println(g2.name);
        System.out.println(g2.height);
        System.out.println(g2.weight);
        System.out.println(bmi2);

        Girl g3 = g2; //赋值地址引用
        g3.name = "changeName";
        System.out.println(g3.name); //changeName
        System.out.println(g2.name); //changeName


    }
}
