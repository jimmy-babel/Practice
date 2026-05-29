package advance;

public class Demo_Exception {
    public static void main(String[] args) {
        int a = 10,b=0;
        try {
            int res = a/b;
        } catch (ArithmeticException e) {
            System.out.println("catch");
            System.out.println("ArithmeticException:"+e);
        } finally {
            System.out.println("finally");
        }
    }
}
