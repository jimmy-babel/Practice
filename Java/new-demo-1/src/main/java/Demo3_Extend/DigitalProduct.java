package Demo3_Extend;

public class DigitalProduct extends Product {
    private String secretKey;

    public DigitalProduct() {
    }

    public DigitalProduct(String name, double price, String secretKey) {
        super(name, price);
        this.secretKey = secretKey;
    }

    public void setSecretKey(String secretKey) {
        this.secretKey = secretKey;
    }

    @Override
    public String displayInfo() {
        return "DigitalProduct Override重写:"+super.displayInfo()+", secretKey:"+this.secretKey;
    }

    @Override
    public String sendProduct() { //重写抽象函数
        System.out.println("DigitalProduct发货");
        return "DigitalProduct发货";
    }


}
