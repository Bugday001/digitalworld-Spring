package edu.tongji.cc.digitalworld.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import com.alibaba.fastjson.JSON;
import org.json.JSONObject;

import javax.annotation.PostConstruct;
import javax.websocket.*;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.util.concurrent.CopyOnWriteArraySet;
import java.util.concurrent.atomic.AtomicInteger;

import edu.tongji.cc.digitalworld.A_Star.A_Star;
import edu.tongji.cc.digitalworld.A_Star.Node;
import edu.tongji.cc.digitalworld.common.Location;
import edu.tongji.cc.digitalworld.entity.Agent;

import java.util.List;

import javax.annotation.Resource;

@ServerEndpoint(value = "/ws/path/asset")    // WebSocket 路径
@Component
public class WebSocketServer {

    @Resource(name="avc")
    final AppService avc = new AppService();
    final short[][] mapCell = avc.map().getMap().cell();
    
    private static Logger log = LoggerFactory.getLogger(WebSocketServer.class);
    private static final AtomicInteger OnlineCount = new AtomicInteger(0);
    // concurrent包的线程安全Set，用来存放每个客户端对应的Session对象。
    private static CopyOnWriteArraySet<Session> SessionSet = new CopyOnWriteArraySet<Session>();

    // public WebSocketServer(AppService avc) 
    // {
    //     this.avc = avc;
    //     this.mapCell = avc.map().getMap().cell();
    // }

    @PostConstruct
    public void init() {
        log.info("websocket 加载");
    }


    /**
     * 连接建立成功调用的方法
     */
    @OnOpen
    public void onOpen(Session session) throws IOException{
        SessionSet.add(session);
        int cnt = OnlineCount.incrementAndGet(); // 在线数加1
        log.info("有连接加入，当前连接数为：{}", cnt);
       // SendMessage(session, "连接成功");
    }

    /**
     * 连接关闭调用的方法
     */
    @OnClose
    public void onClose(Session session) {
        SessionSet.remove(session);
        int cnt = OnlineCount.decrementAndGet();
        log.info("有连接关闭，当前连接数为：{}", cnt);
    }

    /**
     * 收到客户端消息后调用的方法
     *
     * @param message
     *            客户端发送过来的消息
     */
    @OnMessage
    public void onMessage(String message, Session session) throws IOException {
        if(message.equals("start")) {
             /* A star */
             List<Agent> agents = avc.agents().find();
             //有两个agent是matlab和app
             for(int i=0;i<agents.size()-2;i++){
                 Node initialNode = new Node(agents.get(i).getX(), agents.get(i).getY());
                 Node finalNode = new Node(agents.get(i).getGoalPoint().getX(),agents.get(i).getGoalPoint().getY());
                 A_Star aStar = new A_Star(mapCell.length, mapCell[0].length, initialNode, finalNode);
                 aStar.setBlocks(mapCell);  //传入地图
                 List<Node> path = aStar.findPath(initialNode, finalNode);
                 /* 若有下一步就更新agent location */
                 if(path.size()>1){
                     Location tempLoc = new Location(path.get(1).getRow(), path.get(1).getCol());
                     agents.get(i).setLocation(tempLoc);
                 }
             }
             List<Agent> new_agents = avc.agents().find();
             String sendData = "";
             for(int i=0; i<new_agents.size(); i++){
                JSONObject object = new JSONObject(avc.agents().find().get(i));
                sendData += object.toString() + "--";
             }
            //  String data = JSON.toJSON(new_agents).toString();
             SendMessage(session, sendData);
        }
        // log.info("来自客户端的消息：{}",message);
        // SendMessage(session, "收到消息，消息内容："+message);

    }

    /**
     * 出现错误
     * @param session
     * @param error
     */
    @OnError
    public void onError(Session session, Throwable error) {
        log.error("发生错误：{}，Session ID： {}",error.getMessage(),session.getId());
        error.printStackTrace();
    }

    /**
     * 发送消息，实践表明，每次浏览器刷新，session会发生变化。
     * @param session
     * @param message
     */
    public static void SendMessage(Session session, String message) throws IOException {
        try {
//          session.getBasicRemote().sendText(String.format("%s (From Server，Session ID=%s)",message,session.getId()));
            session.getBasicRemote().sendText(message);
        } catch (IOException e) {
            log.error("发送消息出错：{}", e.getMessage());
            e.printStackTrace();
        }
    }

    /**
     * 群发消息
     * @param message
     * @throws IOException
     */
    public static void BroadCastInfo(String message) throws IOException {
        for (Session session : SessionSet) {
            if(session.isOpen()){
                SendMessage(session, message);
            }
        }
    }

    /**
     * 指定Session发送消息
     * @param sessionId
     * @param message
     * @throws IOException
     */
    public static void SendMessage(String message,String sessionId) throws IOException {
        Session session = null;
        for (Session s : SessionSet) {
            if(s.getId().equals(sessionId)){
                session = s;
                break;
            }
        }
        if(session!=null){
            SendMessage(session, message);
        }
        else{
            log.warn("没有找到你指定ID的会话：{}",sessionId);
        }
    }
}
