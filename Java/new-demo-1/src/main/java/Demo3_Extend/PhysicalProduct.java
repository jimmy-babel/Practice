package Demo3_Extend;

public class PhysicalProduct extends Product {
    private double weight;

    public PhysicalProduct() {
        System.out.println("PhysicalProduct构造函数");
    }

    public PhysicalProduct(String name, double price, double weight) {
        super(name, price);
        this.weight = weight;
    }

    public double getWeight() {
        return weight;
    }

    public void setWeight(double weight) {
        this.weight = weight;
    }

    @Override
    public String displayInfo() {
        return "PhysicalProduct Override重写:"+super.displayInfo()+", 重量:"+this.weight;
    }

    @Override
    public String sendProduct() { //重写抽象函数
        System.out.println("PhysicalProduct发货");
        return "PhysicalProduct发货";
    }
}