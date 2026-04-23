package Demo2_Encapsulation;
// 封装
public class Employee {
    public Employee(){}

    public Employee(int baseSalary,int bonus){
        setBonus(bonus);
        setBaseSalary(baseSalary);
    }
    // 底薪
    private double baseSalary;
    // 奖金
    private double bonus;

    //计算薪资
    public double calculateSalary(char grade) {
        return baseSalary + caculateRate(grade);
    }
    //计算奖金
    private double caculateRate(char grade) {
        double rate = switch (grade) {
            case 'A' -> 1.0;
            case 'B' -> 0.8;
            case 'C' -> 0.6;
            case 'D' -> 0.5;
            default -> 0;
        };
        return (bonus * rate);
    }

    //SET
    public void setBaseSalary(int baseSalary){
        if(baseSalary<0){
            throw new IllegalArgumentException("baseSalary不能小于0");
        }
        this.baseSalary = baseSalary;
    }

    public void setBonus(int bonus){
        if(bonus<0){
            throw new IllegalArgumentException("bonus不能小于0");
        }
        this.bonus = bonus;
    }

    //GET
    public double getBaseSalary() {
        return baseSalary;
    }

    public double getBonus() {
        return bonus;
    }


}