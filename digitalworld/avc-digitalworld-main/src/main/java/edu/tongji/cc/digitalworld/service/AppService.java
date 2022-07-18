package edu.tongji.cc.digitalworld.service;

import org.springframework.stereotype.Service;

@Service("avc")
public class AppService {

    private WorldService world = new WorldService();
    private LogService logservice = new LogService();
    private WorldService worldservice = new WorldService();

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
