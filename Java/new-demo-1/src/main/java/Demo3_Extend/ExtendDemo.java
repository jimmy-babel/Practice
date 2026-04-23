package Demo3_Extend;

public class ExtendDemo {
    public ExtendDemo() {
        System.out.println("ExtendDemo构造函数");
    }

    public static void main(String[] args) {
        System.out.println("new PhysicalProduct");
        PhysicalProduct p_Product = new PhysicalProduct();
        p_Product.setName("Iphone");
        p_Product.setPrice(441);
        p_Product.setWeight(442);
        System.out.println(p_Product.displayInfo());
        System.out.println();

//        System.out.println("new Product");
//        Product product = new Product();
//        product.grandpaShow();
//        System.out.println();
//
//        System.out.println("new Product2");
//        Product product2 = new Product("MATE",443);
//        System.out.println(product2.displayInfo());
//        System.out.println();


        System.out.println("new PhysicalProduct2");
        PhysicalProduct p_Product2 = new PhysicalProduct();
        p_Product2.setName("xiaomi");
        p_Product2.setPrice(441);
        p_Product2.setWeight(442);
        System.out.println(p_Product2.displayInfo());
    }
}
