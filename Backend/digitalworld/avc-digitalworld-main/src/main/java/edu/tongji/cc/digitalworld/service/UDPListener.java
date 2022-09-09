package edu.tongji.cc.digitalworld.service;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;
import org.springframework.stereotype.Component;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;
import java.net.SocketException;
import java.util.logging.Logger;
import java.util.List;
import javax.annotation.Resource;

import edu.tongji.cc.digitalworld.common.Location;
import edu.tongji.cc.digitalworld.util.*;

/**
 * udp监听
 * @author fjh
 */

/*
 * 服务器端，实现基于UDP的用户登陆
 */
@WebListener
@Component
public class UDPListener implements ServletContextListener {
    public static Logger logger = Logger.getLogger(UDPListener.class.getName());
    public static final int MAX_UDP_DATA_SIZE = 4096;
    public static final int UDP_PORT = 26667;
    public static DatagramPacket packet = null;
    public static DatagramSocket socket = null;
    @Resource(name="avc")
    final AppService avc = new AppService();
    byte[] g_by_buffer;

    @Override
    public void contextInitialized(ServletContextEvent sce) {
        try {
            logger.info("========启动一个线程，监听UDP数据报.PORT:" + UDP_PORT + "=========");
            // 启动一个线程，监听UDP数据报
            new Thread(new UDPProcess(UDP_PORT)).start();
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    class UDPProcess implements Runnable {

        public UDPProcess(final int port) throws SocketException {
            //创建服务器端DatagramSocket，指定端口
            socket = new DatagramSocket(port);
        }

        @Override
        public void run() {
            // TODO Auto-generated method stub
            logger.info("=======创建数据报，用于接收客户端发送的数据======");
            while (true) {
                byte[] buffer = new byte[MAX_UDP_DATA_SIZE];
                packet = new DatagramPacket(buffer, buffer.length);
                try {
                    // logger.info("=======此方法在接收到数据报之前会一直阻塞======");
                    socket.receive(packet);
                    new Thread(new Process(packet)).start();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }

        }
    }

    class Process implements Runnable {
        public Process(DatagramPacket packet) throws UnsupportedEncodingException {
            // TODO Auto-generated constructor stub
            // logger.info("======接收到的UDP信息======");
            byte[] by_buffer = packet.getData();// 接收到的UDP信息，然后解码
            g_by_buffer = by_buffer;
            byte[] by_doubleData = new byte[5*8];
            //截取double段
            System.arraycopy(by_buffer, 8, by_doubleData, 0, 5*8);
            List<Double> list_doubleData = DataTypeConversion.byteArrayToDoubleList(by_doubleData);
            int i_device = DataTypeConversion.byte2uint8(by_buffer[0]);
            logger.info("======data from matlab======");
            logger.info(String.valueOf(i_device));
            for(int i=0;i<5;i++){
                logger.info(String.valueOf(list_doubleData.get(i)));
            }
            if(i_device == 116) { //第四辆车为matlab
                Location tempLoc = new Location((int)Math.round(list_doubleData.get(0)), (int)Math.round(list_doubleData.get(1)));
                avc.agents().find().get(3).setLocation(tempLoc);
                avc.agents().find().get(3).setState(list_doubleData.get(2), list_doubleData.get(3), list_doubleData.get(4));
            }
            else if(i_device == 115) { //第五辆车为app
                avc.agents().find().get(4).setRealWorldLoc(list_doubleData);
            }
            
        }

        @Override
        public void run() {
            // TODO Auto-generated method stub
            // logger.info("====过程运行=====");
            try {
                // logger.info("====向客户端响应数据=====");
                //1.定义客户端的地址、端口号、数据
                InetAddress address = packet.getAddress();
                int port = 8081;
                //2.创建数据报，包含响应的数据信息
                DatagramPacket packet2 = new DatagramPacket(g_by_buffer, g_by_buffer.length, address, port);
                //3.响应客户端
                socket.send(packet2);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

    }

    @Override
    public void contextDestroyed(ServletContextEvent sce) {
       logger.info("========UDPListener摧毁=========");
    }


}

