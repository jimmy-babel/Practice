package Demo3_Extend;

public abstract class Product extends Grandpa {
    private String name;
    private double price;
    public static int staticNum = 0;
    public Product() {
        staticNum++;
        System.out.println("Product构造函数");
    }

    public Product(String name, double price) {

        System.out.println("Product有参构造函数");
        staticNum++;
        this.name = name;
        this.price = price;
    }

    public static PhysicalProduct createPhysicalProduct(String name, double price, double weight){
        return new PhysicalProduct(name, price, weight);
    }

    public static DigitalProduct createDigitalProduct(String name, double price, String secretKey){
        return new DigitalProduct(name, price, secretKey);
    }

    public String displayInfo(){
        return "商品名称: " + name + ", 商品价格: " + price;
    }

    public abstract String sendProduct();



    public void setName(String name) {
        this.name = name;
    }

    public void setPrice(double price) {
        this.price = price;
    }
}

