// author zhangwei on 2022.07.18
// - First version
// modified by xxxx on 2022.07.xx
// - (Add your own major modifications here as developing history)

import {requests} from "../foundation/foundation.js"
import Agent from "../common/agent.js";
import AgentService from './agentservice.js';
import MapService from './mapservice.js';
import WorldService from './worldservice.js';
import {Point, isnull, awaithandler} from '../common/common.js'

const DATA_REFRESH_INTERVAL = 1000;

class AppService{

    constructor()
    {
        // this.agents = new AgentService(requests);
        // this.maps = new MapService(requests);
        this.worlds = new WorldService();
        this.timerid = 0;
        // this.mapservice = this.mapservice.bind(avc);
        // this.agentservice = this.agentservice.bind(avc);
        // this.worldservice = this.worldservice.bind(avc);
        // this.start = this.start.bind(avc);
        // this.stop = this.stop.bind(avc);

        // this.start();
    }

    destructor()
    {
        this.stop();
    }

    mapservice()
    {
        return this.worlds.map;
    }

    agentservice()
    {
        return this.worlds.agents;
    }

    worldservice()
    {
        return this.worldservice;
    }

    start()
    {
        //避免多次启动定时器，加快运动
        if(this.timerid)clearInterval(this.timerid);

        this.timerid = setInterval(()=>{
            //获取agents位置
            // this.worlds.agents.fetch("move");
            //websocket
            moveFetch("start");
            let agents = this.worlds.agents.find();
            for (let i=0; i<agents.length; i++){
                // console.log(agents[i].location());
                this.worlds.moveAgent(agents[i], agents[i].oldLocation, agents[i].location());
                agents[i].oldLocation = agents[i].location();
            }
        }, DATA_REFRESH_INTERVAL);
    }

    stop()
    {
        clearInterval(this.timerid);
    }
}

var avc = new AppService();

export {avc, AppService};