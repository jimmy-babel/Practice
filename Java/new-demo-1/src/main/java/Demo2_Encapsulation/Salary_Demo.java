package Demo2_Encapsulation;

/**
 * 计算员工工资，公式：工资 = 底薪 + 奖金 * 系数
 * 系数分五级：
 * A:1.0、B:0.8、C:0.6、D:0.4、E:0
 */
public class Salary_Demo {
    public static void main(String[] args) {
        //构造方法
        Employee employee1 = new Employee(1000,500);
        double salary1 = employee1.calculateSalary('B');
        System.out.println("salary:"+salary1);
        System.out.println(employee1.getBaseSalary());
        System.out.println(employee1.getBonus());

        //无参构造方法
        Employee employee2 = new Employee();
        //SET
        employee2.setBaseSalary(1000);
        employee2.setBonus(500);

        double salary2 = employee2.calculateSalary('D');
        System.out.println("salary:"+salary2);
        System.out.println(employee2.getBaseSalary());
        System.out.println(employee2.getBonus());
    }

    //面向过程
    public static double calculateSalary(int baseSalary, int bonus, char grade) {
        double rate = switch (grade){
            case 'A' -> 1.0;
            case 'B' -> 0.9;
            default -> 0;
        };
        return rate*baseSalary+bonus;
    }
}