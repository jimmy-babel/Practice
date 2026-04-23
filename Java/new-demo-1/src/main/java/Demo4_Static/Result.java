package Demo4_Static;

public class Result {
    private int code;
    private String msg;
    private Object data;

    // 状态码常量
    private static final int OK = 0;
    private static final int FAIL = 1;
    private static final String OK_MSG = "OK";

    // 全参构造方法
    public Result(int code, String msg, Object data) {
        this.code = code;
        this.msg = msg;
        this.data = data;
    }

    // 静态工厂方法：成功（带数据）
    public static Result ok(Object data) {
        return new Result(OK, OK_MSG, data);
    }

    // 方法重载：成功（无数据）
    public static Result ok() {
        return ok(null);
    }

    // 静态工厂方法：失败（带错误信息）
    public static Result fail(String msg) {
        return new Result(FAIL, msg, null);
    }

    // getter/setter（可选补充，完整类通常需要）
    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }
}