package Demo3_Extend;

public class AbstractDemo {
    public static void main(String[] args) {
        PhysicalProduct p = new PhysicalProduct("华为Mate70", 7299.00, 672.00);
        DigitalProduct d = new DigitalProduct("Appstore 充值卡", 99.9, "123456");

        sendProducts(p, d);
        // Product[] products = {p, d};
    }

    public static void sendProducts(Product... products) {
        for (int i = 0; i < products.length; i++) {
            System.out.println("进来"+i);
            Product product = products[i];
            product.sendProduct();
        }
    }
}