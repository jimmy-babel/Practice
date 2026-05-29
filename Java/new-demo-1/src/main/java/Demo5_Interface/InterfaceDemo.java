package Demo5_Interface;
import Demo3_Extend.Product;

public class InterfaceDemo {
    public static void main(String[] args) {
//        依赖注入前:
//        Product product = Product.createPhysicalProduct("华为Mate70", 7299.00, 672.00);
//        Order order = new Order(product, 2, 9000, 1000);
//        order.showOrderInfo();

        Product product = Product.createPhysicalProduct("华为Mate70", 7299.00, 672.00);
        Coupon coupon = new PriceDiscountCoupon(9000,1000);
        Order order = new Order(product,2,coupon);
        order.showOrderInfo();

        Coupon coupon2 = new RateDiscountCoupon(9000,1);
        order.setCoupon(coupon2);
        order.showOrderInfo();
        System.out.println(coupon2.ExtraInterfaceMethods());
    }
}