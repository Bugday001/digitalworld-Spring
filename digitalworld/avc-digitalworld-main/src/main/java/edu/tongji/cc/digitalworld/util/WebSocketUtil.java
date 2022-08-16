package edu.tongji.cc.digitalworld.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.websocket.Session;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.Future;
import java.util.concurrent.TimeUnit;

/**
 * WebSocketUtil
 *
 * @author hcf
 * @date 2022/1/6 18:01
 */
public class WebSocketUtil {
    private static final Logger LOGGER = LoggerFactory.getLogger(WebSocketUtil.class);

    public static final Map<String, Session> ONLINE_SESSION = new ConcurrentHashMap<>();

    public static void addSession(String userKey, Session session) {
        ONLINE_SESSION.put(userKey, session);
    }

    public static void remoteSession(String userKey) {
        ONLINE_SESSION.remove(userKey);
    }


    public static Boolean sendMessage(String appNo, Session session, String message) {
        // getAsyncRemote() 和 getBasicRemote() 异步与同步
        Future<Void> future = session.getAsyncRemote().sendText(message);
        try {
            future.get(3, TimeUnit.SECONDS);
        } catch (Exception e) {
            LOGGER.error("服务器发送消息给客户端 【{}】 下的用户【{}】，传输失败。消息内容为：{},", session.getId(), appNo, message);
            return false;
        }
        LOGGER.info("服务器发送消息给客户端 【{}】 下的用户【{}】，传输结果为：{}。消息内容为：{}", session.getId(), appNo, message, future.isDone());
        return future.isDone();
    }
}


