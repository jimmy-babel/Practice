package com.jimmy.demo;
import java.io.*;

    // TODO IO

public class Demo20_File {
    public static void main(String[] args) throws Exception {
        String dirPath = "F:\\Works\\github\\Practice\\Java\\demo\\data";
        String filePath = "F:\\Works\\github\\Practice\\Java\\demo\\data\\word.txt";
        String not_exist = "F:\\Works\\github\\Practice\\Java\\demo\\data\\newDir2\\newFile.txt";

        // TODO 1.文件对象 new File
        System.out.println("TODO 文件对象 new File:");
        File dir = new File(dirPath);
        File file = new File(filePath);
        File file_not_exist = new File(not_exist);
        System.out.println(file);
        System.out.println("是否是file文件"+file.isFile());
        System.out.println("是否是文件夹"+file.isDirectory());
        System.out.println(file.getName()+file.getAbsoluteFile()+file.length()+file.lastModified());
        String[] list = dir.list();
        System.out.println("文件夹中内容:");
        for (String name : list){
            System.out.println(name);
        }
        System.out.println();
        System.out.println("文件夹中文件对象:");
        File[] files = dir.listFiles();
        for (File f : files){
            System.out.println(f);
            System.out.println(f.getName());
            System.out.println(f.isDirectory());
        }
        System.out.println();
        System.out.println(file_not_exist+","+file_not_exist.exists()+",");
        if(!file_not_exist.exists()){
            file_not_exist.createNewFile(); //新建文件 (file_not_exist路径的文件)
        }

        // TODO  2.文件复制
        System.out.println("TODO IO - 文件复制:");
        // 数据源文件对象
        File srcFile = new File("F:\\Works\\github\\Practice\\Java\\demo\\data\\word.txt");
        // 数据目的地文件对象(自动生成)
        File destFilt = new File("F:\\Works\\github\\Practice\\Java\\demo\\data\\word.txt.copy");
        // 文件输入流（管道对象）
        FileInputStream in = null;
        // 文件输出流（管道对象）
        FileOutputStream out = null;
        try{
            in = new FileInputStream(srcFile);
            out = new FileOutputStream(destFilt);
            // 打开阀门,流转数据(输入)
            //int data = in.read();
            // 打开阀门,流转数据(输出)
            //out.write(data);
            int data = -1;
            StringBuilder ss = new StringBuilder();
            while ((data=in.read()) != -1){
                ss.append((char)data);
                out.write(data);
            }
            System.out.println("输出文件内容:"+ss);
        }catch (IOException e){
            throw new RuntimeException(e);
        }finally {
            if(in != null){
                try {
                 in.close();
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }
            if(out != null){
                try {
                    out.close();
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }
        }

        // TODO 3.文件复制 + 缓存流
        System.out.println("TODO IO - 文件复制 + 缓存流:");
        BufferedInputStream buffIn = null;
        BufferedOutputStream buffOut = null;
        FileInputStream in_v2 = null;
        FileOutputStream out_v2 = null;
        byte[] cache = new byte[1024];
        try{
            in_v2 = new FileInputStream(srcFile);
            out_v2 = new FileOutputStream(destFilt);
            buffIn = new BufferedInputStream(in_v2);
            buffOut = new BufferedOutputStream(out_v2);

            int data = -1;
            while ((data=buffIn.read(cache)) != -1){
                buffOut.write(cache,0,data);
            }
        }catch (IOException e){
            throw new RuntimeException(e);
        }finally {
            if(buffIn != null){
                try {
                    buffIn.close();
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }
            if(buffOut != null){
                try {
                    buffOut.close();
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }
        }

        // TODO 4.字符流
        System.out.println("TODO IO - 字符流:");
        BufferedReader reader = null;
        PrintWriter writer = null;
        try{
            reader = new BufferedReader(new FileReader(srcFile));
            writer = new PrintWriter(destFilt);

            String line = null;
            while ((line=reader.readLine()) != null){
                writer.println(line);
            }
            //刷写数据
            writer.flush();

        }catch (IOException e){
            throw new RuntimeException(e);
        }finally {
            if(reader != null){
                try {
                    reader.close();
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }
            if(writer != null){
                writer.close();
            }
        }


        // TODO 5.序列化 反序列化
        System.out.println("TODO IO - 序列化 反序列化:");
        File dataFile = new File("F:\\Works\\github\\Practice\\Java\\demo\\data\\obj.dat");
        ObjectOutputStream objectOut = null;
        FileOutputStream fileOut = null;

        // 对象输入流
        ObjectInputStream objectIn = null;
        FileInputStream fileIn = null;
        try{
            fileOut = new FileOutputStream(dataFile);
            objectOut = new ObjectOutputStream(fileOut);

            //JAVA中只有加了特殊标记的类才能在写文件中进行序列化操作
            DemoClass demo1 = new DemoClass();
            objectOut.writeObject(demo1);
            objectOut.flush();

            // 从文件中读取数据转换成对象
            fileIn = new FileInputStream(dataFile);
            objectIn = new ObjectInputStream(fileIn);
            Object o = objectIn.readObject();
            System.out.println(o);
        }catch (Exception e){
            throw new RuntimeException(e);
        }finally {
            if(objectOut != null){
                try {
                    objectOut.close();
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }
        }


    }
}

class DemoClass implements Serializable{

}
