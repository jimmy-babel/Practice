package Demo4_Static;
/*代码块*/
import Demo3_Extend.Product;
import Demo3_Extend.DigitalProduct;
import Demo3_Extend.PhysicalProduct;

import java.sql.SQLOutput;

public class StaticMain {
    private static int count;
    private int count2;
    public static Object obj;
    public static void main(String[] args) {
        count++;
        System.out.println(count+","+getCount());
        System.out.println(Product.staticNum);
        Product product = new Product() {
            @Override
            public String sendProduct() { //方法重载
                return "";
            }
        };
        System.out.println(product.staticNum);
        System.out.println(Product.staticNum);

        Product p2 = new Product() {
            @Override
            public String sendProduct() {  //方法重载
                return "";
            }
        };

        System.out.println(p2.staticNum);
        System.out.println(Product.staticNum);

        System.out.println("=================静态变量");
        System.out.println(MathUtil.toDegrees(360));
        System.out.println(MathUtil.toRadians(360));

        System.out.println("=================静态工厂方法1");
        Result result = Result.ok(null);
        System.out.println(result.getData());
        Result result2 = Result.ok(obj);
        System.out.println(result2.getData());
        Result result3 = Result.ok(product);
        System.out.println(result3.getData());

        System.out.println("=================createDigitalProduct,createPhysicalProduct实例:");
        DigitalProduct digitalProduct = DigitalProduct.createDigitalProduct("setname",441,"setkey");//new DigitalProduct
        PhysicalProduct physicalProduct = PhysicalProduct.createPhysicalProduct("setname",441,442); //new PhysicalProduct
        System.out.println(digitalProduct.displayInfo());
        System.out.println(physicalProduct.displayInfo());

        System.out.println(TrafficLight.RED.getLabel()+"->"+TrafficLight.RED.getNextLight().getLabel());
        System.out.println(TrafficLight.GREEN.getLabel()+"->"+TrafficLight.GREEN.getNextLight().getLabel());
        System.out.println(TrafficLight.YELLOW.getLabel()+"->"+TrafficLight.YELLOW.getNextLight().getLabel());
    }

    public static int getCount(){
        //this.count2 = 1; //不能访问成员变量和成员方法
        //this.getCount2();
        return StaticMain.count;
    };

    public int getCount2(){
        System.out.println(StaticMain.count); //成员方法可以访问静态变量
        return StaticMain.count;
    }
}
