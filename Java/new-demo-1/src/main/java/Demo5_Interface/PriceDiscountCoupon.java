package Demo5_Interface;

public class PriceDiscountCoupon implements Coupon {
    private int threshold;
    private int discount;

    public PriceDiscountCoupon(int threshold, int discount) {
        this.threshold = threshold;
        this.discount = discount;
    }

    @Override
    public int calculateDiscount(double totalPrice) {
        return totalPrice >= threshold ? discount : 0;
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