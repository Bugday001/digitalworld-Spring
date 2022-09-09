// author zhangwei on 2022.07.18
// - First version
// modified by xxxx on 2022.07.xx
// - (Add your own major modifications here as developing history)

import {map_fetch, map_fetch_submap} from '../foundation/map-api'

// world size(namely the map size)
const WORLD_WIDTH = 50;
const WORLD_HEIGHT = 50;

const MAP_OBJECT_OBSTACLE = 1;
const MAP_OBJECT_PASSABLE = 0;
const MAP_OBJECT_AGENT = 99;

class MapService{
    constructor(requests)
    {
        this.world = new Array(WORLD_WIDTH);
        for (var i=0; i<WORLD_WIDTH; i++)
        {
            this.world[i] = new Array(WORLD_HEIGHT);
        }
        for (var i=0; i<WORLD_WIDTH; i++)
        {
            for (var j=0; j<WORLD_HEIGHT; j++)
                this.world[i][j] = MAP_OBJECT_PASSABLE;
        }
        //随机生成障碍
        for (let i=0; i<WORLD_WIDTH*WORLD_HEIGHT/5; i++){
            let x = Math.floor(Math.random()*WORLD_WIDTH);
            let y = Math.floor(Math.random()*WORLD_HEIGHT);
            this.world[x][y] = MAP_OBJECT_OBSTACLE;
        }

        
        // this.setMapCellValue = this.setMapCellValue.bind(this)();
        // this.getMapCellValue = this.getMapCellValue.bind(this);
        // this.setObstacleCell = this.setsetObstacleCellMap.bind(this);
        // this.setPassableCell = this.setPassableCell.bind(this);
        // this.setAgentCell = this.setAgentCell.bind(this);

        this.requests = requests;
    }

    mapvalue()
    {
        return this.world;
    }

    setMapCellValue(loction, value)
    {
        this.world[loction.x][loction.y] = value; 
    }

    getMapCellValue(location)
    {
        return this.world[location.x][location.y];
    }

    setObstacleCell(x,y)
    {
        this.setMapCellValue(x,y,MAP_OBJECT_OBSTACLE);

    }

    setPassableCell(x,y)
    {
        this.setMapCellValue(x,y,MAP_OBJECT_PASSABLE);
    }

    setAgentCell(agentid, location)
    {
        this.setMapCellValue(x,y,MAP_OBJECT_AGENT);
    }


    fetchFromServer()
    {
        map_fetch("all").then((res) => {
            let data = res.data;
            // console.log(data);
            for (var i=0; i<WORLD_WIDTH; i++)
            {
                for (var j=0; j<WORLD_HEIGHT; j++)
                    this.world[i][j] = data[i][j];
            }
        }).catch((res) => {
            console.log(res)
        });
    }

}

export default MapService;
