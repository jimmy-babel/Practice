package Demo5_Interface;

public class RateDiscountCoupon implements Coupon,ExtraInterface {
    private int threshold;
    private int discount;

    public RateDiscountCoupon(int threshold, int discount) {
        this.threshold = threshold;
        this.discount = discount;
    }

    @Override
    public int calculateDiscount(double totalPrice) {
        return totalPrice >= threshold ? (int) (totalPrice * (100 - discount) / 100) : 0;
    }

    @Override
    public int ExtraInterfaceMethods() {
        return 0;
    }

    @Override
    public int ExtraInterface2Methods() {
        return 0;
    }
}