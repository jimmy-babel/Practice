package Demo1_ClassAndObj;

//面向对象
public class Girl {
    public String name;
    public int height;
    public double weight;

    int caculateBMI(){
        double heightInMeter = height / 100.0;
        return (int)(weight/ (heightInMeter * heightInMeter));
    }
}
