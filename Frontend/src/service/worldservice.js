// Lattice world.
// This module maintains the "world" data structure inside memory. This data structure
// is useful to communicate with backend service and to update the display with graphics2d.
//
// author zhangwei on 2022.07.18
// - First version
// modified by xxxx on 2022.07.xx
// - (Add your own major modifications here as developing history)

import Agent from "../common/agent";
import {g2d_draw_world, g2d_update_allcell, g2d_update_cell} from "../common/graphics2d";
import {world_fetch} from "../foundation/world-api"
import AgentService from "./agentservice";
import MapService from "./mapservice";


class WorldService{

    constructor()
    {
        this.agents = new AgentService();
        this.map = new MapService();
    }

    // Fetch data from remote server and update local variables.
    fetchFromServer()
    {
        this.agents.fetch("init");
        this.map.fetchFromServer();
    }

    getAgents()
    {
        return this.agents;
    }

    getMap()
    {
        return this.map;
    }

    // param
    //  agent: Agent class
    //  from: Point class
    //  to: Point class
    //
    moveAgent(agent, from, to)
    {
        this.map.setMapCellValue(from, agent.oldmapvalue);
        this.updateCellView(from);
        agent.oldmapvalue = this.map.getMapCellValue(to);
        agent.setLocation(to);
        this.map.setMapCellValue(to, 99);
        this.map.setMapCellValue(agent.goalPoint, 40);
        this.updateCellView(to);
    }

    updateAllView()
    {
        g2d_update_allcell(this.map)
    }

    updateCellView(location)
    {
        g2d_update_cell(location, this.map.getMapCellValue(location));
    }
}

export default WorldService;
