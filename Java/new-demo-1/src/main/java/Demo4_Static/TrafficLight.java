package Demo4_Static;

public class TrafficLight {
    private String label;
    private TrafficLight nextLight;

    // 私有构造方法，限制外部实例化
    private TrafficLight(String label) {
        this.label = label;
    }

    // 定义常量红绿灯对象
    public static final TrafficLight RED;
    public static final TrafficLight YELLOW;
    public static final TrafficLight GREEN;

    // 静态代码块：初始化常量（只能在静态代码块中赋值私有静态常量）
    static {
        RED = new TrafficLight("红");
        GREEN = new TrafficLight("绿");
        YELLOW = new TrafficLight("黄");

        // 设置灯色流转顺序：红 -> 绿 -> 黄 -> 红
        RED.nextLight = GREEN;
        GREEN.nextLight = YELLOW;
        YELLOW.nextLight = RED;
    }

    // 获取下一个灯色
    public TrafficLight getNextLight() {
        return nextLight;
    }

    // 获取灯标（红/绿/黄）
    public String getLabel() {
        return label;
    }
}
