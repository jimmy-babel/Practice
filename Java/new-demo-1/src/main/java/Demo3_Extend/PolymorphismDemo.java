package Demo3_Extend;


public class PolymorphismDemo {
    public static void main(String[] args) {
        // 父类类型变量指向子类对象，JVM自动完成向上转型
        Product p = new PhysicalProduct("Mate",441,442);
        DigitalProduct d = new DigitalProduct("Iphone",441,"wxasdasd");
        createOrder(p);
        createOrder(d);
    }

    public static void createOrder(Product product) { //向上转型(子类转父类Product)
        // 向上转型后只能调用父类方法，调用子类方法需向下转型，转型前需类型检查
        if (product instanceof PhysicalProduct) { //特殊处理 instanceof类型检查
            PhysicalProduct physicalProduct = (PhysicalProduct) product; //向下转型(父类Product转子类PhysicalProduct)
            physicalProduct.setWeight(443); //PhysicalProduct的成员方法
        }
        if (product instanceof DigitalProduct) { //特殊处理 instanceof类型检查
            DigitalProduct digitalProduct = (DigitalProduct) product; //向下转型(父类Product转子类DigitalProduct)
            digitalProduct.setSecretKey("newsetSecretKey--rewfnajefnasedjkf"); //DigitalProduct的成员方法
        }
        System.out.println("生成订单createOrder");
        // 1. 展示商品信息
        System.out.println(product.displayInfo());
        // 2. 确认订单
        System.out.println("订单已确认！！");
    }
}
