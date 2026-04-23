package Demo4_Static;

import Demo3_Extend.Product;
import Demo3_Extend.DigitalProduct;
import Demo3_Extend.PhysicalProduct;
public class StaticDemo {
    private static int count;
    private int count2;
    public static Object obj;
    public static void main(String[] args) {
        count++;
        System.out.println(count+","+getCount());
        System.out.println(Product.staticNum);
        Product product = new Product() {
            @Override
            public String sendProduct() {
                return "";
            }
        };
        System.out.println(product.staticNum);
        System.out.println(Product.staticNum);

        Product p2 = new Product() {
            @Override
            public String sendProduct() {
                return "";
            }
        };

        System.out.println(p2.staticNum);
        System.out.println(Product.staticNum);

        System.out.println(MathUtil.toDegrees(360));
        System.out.println(MathUtil.toRadians(360));

        Result result = Result.ok(null);
        System.out.println(result.getData());
        Result result2 = Result.ok(obj);
        System.out.println(result2.getData());
        Result result3 = Result.ok(product);
        System.out.println(result3.getData());

        DigitalProduct digitalProduct = DigitalProduct.createDigitalProduct("setname",441,"setkey");
        PhysicalProduct physicalProduct = PhysicalProduct.createPhysicalProduct("setname",441,442);
        System.out.println(digitalProduct.displayInfo());
        System.out.println(physicalProduct.displayInfo());

    }
    public static int getCount(){
        //this.count2 = 1; //不能访问成员变量和成员方法
        //this.getCount2();
        return StaticDemo.count;
    };

    public int getCount2(){
        System.out.println(StaticDemo.count); //成员方法可以访问静态变量
        return StaticDemo.count;
    }
}
