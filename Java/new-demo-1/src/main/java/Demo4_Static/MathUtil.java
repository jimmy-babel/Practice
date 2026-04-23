package Demo4_Static;

public class MathUtil {
    // 圆周率 π
    public static final double PI = 3.141592653589793;
    // 平角（180度）
    public static final double STRAIGHT_ANGLE = 180;

    // 度转弧度的换算系数：π / 180
    public static final double DEGREES_TO_RADIANS = PI / STRAIGHT_ANGLE;
    // 弧度转度的换算系数：180 / π
    public static final double RADIANS_TO_DEGREES = STRAIGHT_ANGLE / PI;

    /**
     * 将角度转换为弧度
     * @param degrees 角度值
     * @return 对应的弧度值
     */
    public static double toRadians(double degrees) {
        return degrees * DEGREES_TO_RADIANS;
    }

    /**
     * 将弧度转换为角度
     * @param radians 弧度值
     * @return 对应的角度值
     */
    public static double toDegrees(double radians) {
        return radians * RADIANS_TO_DEGREES;
    }
}
