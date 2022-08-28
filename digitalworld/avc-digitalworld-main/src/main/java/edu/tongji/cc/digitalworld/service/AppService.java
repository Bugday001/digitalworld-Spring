package edu.tongji.cc.digitalworld.service;

import org.springframework.stereotype.Service;

/**
 * Main application service.
 * @author ZhangWei(Dept. of Control, TongJi University)
 * - First version.
 */
@Service("avc")
public class AppService {

    private static WorldService world = new WorldService();
    private static LogService logservice = new LogService();
    private static WorldService worldservice = new WorldService();

    public AppService()
    {

    }

    public WorldService world()
    {
        return worldservice;
    }

    public AgentService agents()
    {
        return world.getAgentService();
    }

    public MapService map()
    {
        return world.getMapService();
    }

}
