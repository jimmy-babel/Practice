package base;

public class ArrayDemo {
    public static void main(String[] args) {
        // 静态初始化：直接赋值
        int[] arr1 = {1,2,3,4,};
        // 动态初始化：指定长度，默认赋初始值
        int[] arr2 = new int[3];
        for (int item : arr1){
            System.out.printf(item+"");
        }
        System.out.println();
        for (int item : arr2){
            System.out.printf(item+"");
        }
        System.out.println();

        // 二维数组
        int[][] twoArr = {{1,2},{3,4,5}};
        for(int[] row : twoArr ){
            System.out.println("row:"+row);
            for (int val : row){
                System.out.println(val+"");
            }
        }

    }
}
