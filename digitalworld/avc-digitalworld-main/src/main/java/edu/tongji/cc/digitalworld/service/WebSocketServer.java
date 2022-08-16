// package edu.tongji.cc.digitalworld.service;

// import org.slf4j.Logger;
// import org.slf4j.LoggerFactory;
// import org.springframework.stereotype.Component;

// import javax.annotation.PostConstruct;
// import javax.websocket.*;
// import javax.websocket.server.ServerEndpoint;
// import java.io.IOException;
// import java.util.concurrent.CopyOnWriteArraySet;
// import java.util.concurrent.atomic.AtomicInteger;

// @ServerEndpoint(value = "/ws/path/asset")    // WebSocket 路径
// @Component
// public class WebSocketServer {

//     private static Logger log = LoggerFactory.getLogger(WebSocketServer.class);
//     private static final AtomicInteger OnlineCount = new AtomicInteger(0);
//     // concurrent包的线程安全Set，用来存放每个客户端对应的Session对象。
//     private static CopyOnWriteArraySet<Session> SessionSet = new CopyOnWriteArraySet<Session>();

//     @PostConstruct
//     public void init() {
//         log.info("websocket 加载");
//     }


//     /**
//      * 连接建立成功调用的方法
//      */
//     @OnOpen
//     public void onOpen(Session session) throws IOException{
//         SessionSet.add(session);
//         int cnt = OnlineCount.incrementAndGet(); // 在线数加1
//         log.info("有连接加入，当前连接数为：{}", cnt);
//        // SendMessage(session, "连接成功");
//     }

//     /**
//      * 连接关闭调用的方法
//      */
//     @OnClose
//     public void onClose(Session session) {
//         SessionSet.remove(session);
//         int cnt = OnlineCount.decrementAndGet();
//         log.info("有连接关闭，当前连接数为：{}", cnt);
//     }

//     /**
//      * 收到客户端消息后调用的方法
//      *
//      * @param message
//      *            客户端发送过来的消息
//      */
//     @OnMessage
//     public void onMessage(String message, Session session) throws IOException {
//         log.info("来自客户端的消息：{}",message);
//         SendMessage(session, "收到消息，消息内容："+message);

//     }

//     /**
//      * 出现错误
//      * @param session
//      * @param error
//      */
//     @OnError
//     public void onError(Session session, Throwable error) {
//         log.error("发生错误：{}，Session ID： {}",error.getMessage(),session.getId());
//         error.printStackTrace();
//     }

//     /**
//      * 发送消息，实践表明，每次浏览器刷新，session会发生变化。
//      * @param session
//      * @param message
//      */
//     public static void SendMessage(Session session, String message) throws IOException {
//         try {
// //          session.getBasicRemote().sendText(String.format("%s (From Server，Session ID=%s)",message,session.getId()));
//             session.getBasicRemote().sendText(message);
//         } catch (IOException e) {
//             log.error("发送消息出错：{}", e.getMessage());
//             e.printStackTrace();
//         }
//     }

//     /**
//      * 群发消息
//      * @param message
//      * @throws IOException
//      */
//     public static void BroadCastInfo(String message) throws IOException {
//         for (Session session : SessionSet) {
//             if(session.isOpen()){
//                 SendMessage(session, message);
//             }
//         }
//     }

//     /**
//      * 指定Session发送消息
//      * @param sessionId
//      * @param message
//      * @throws IOException
//      */
//     public static void SendMessage(String message,String sessionId) throws IOException {
//         Session session = null;
//         for (Session s : SessionSet) {
//             if(s.getId().equals(sessionId)){
//                 session = s;
//                 break;
//             }
//         }
//         if(session!=null){
//             SendMessage(session, message);
//         }
//         else{
//             log.warn("没有找到你指定ID的会话：{}",sessionId);
//         }
//     }
// }

import edu.tongji.cc.digitalworld.util.WebSocketUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.util.Date;
import java.util.Objects;

/**
 * WebSocketServer
 *
 * @author hcf
 * @date 2022/1/6 17:57
 */
@Component
@ServerEndpoint(value = "/websocket/{appNo}")
public class WebSocketServer {

    private static final Logger LOGGER = LoggerFactory.getLogger(WebSocketServer.class);

    @OnOpen
    public void onOpen(@PathParam("appNo") String appNo, Session session) {
        LOGGER.info("用户【{}】于 {} 时间，与服务器建立 websocket 连接!", appNo, new Date());
        WebSocketUtil.addSession(appNo, session);
    }

    @OnClose
    public void onClose(@PathParam("appNo") String appNo) {
        LOGGER.info("用户【{}】于 {} 时间，与服务器断开 websocket 连接!", appNo, new Date());
        WebSocketUtil.remoteSession(appNo);
    }

    @OnMessage
    public void onMessage(@PathParam("appNo") String appNo, String message) {
        LOGGER.info("服务器于 {} 时间，对用户【{}】发送消息，消息内容：{}", new Date(), appNo, message);
        Session session = WebSocketUtil.ONLINE_SESSION.get(appNo);
        if (Objects.isNull(session)) {
            LOGGER.info("服务器和用户【{}】之间的链接已断开", appNo);
            return;
        }
        Boolean success = WebSocketUtil.sendMessage(appNo, session, message);
        LOGGER.info("客户端向服务端发送消息结果：{}", success);
    }

    @OnError
    public void onError(Session session, Throwable throwable) {
        LOGGER.error("服务器和用户之间的链接产生异常，异常原因：{}", throwable.getMessage(), throwable);
        try {
            session.close();
        } catch (IOException e) {
            LOGGER.error("断开服务器和用户之间的链接产生异常，异常原因：{}", e.getMessage(), e);
        }
    }
}
