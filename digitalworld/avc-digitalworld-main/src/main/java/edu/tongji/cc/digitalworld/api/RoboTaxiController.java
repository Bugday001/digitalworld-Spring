package edu.tongji.cc.digitalworld.api;

import edu.tongji.cc.digitalworld.A_Star.A_Star;
import edu.tongji.cc.digitalworld.A_Star.Node;
import edu.tongji.cc.digitalworld.common.Location;
import edu.tongji.cc.digitalworld.entity.Agent;
import edu.tongji.cc.digitalworld.service.AppService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.annotation.Resource;

/**
 * Restful interface for RoboTaxi service。
 *
 * @author ZhangWei(Dept. of Control, TongJi University)
 * - First version.
 */
@RestController
@CrossOrigin
@RequestMapping(value="/api/agent")
public class RoboTaxiController {

    @Resource(name="avc")
    final AppService avc;
    final short[][] mapCell;
    public RoboTaxiController(AppService avc)
    {
        this.avc = avc;
        this.mapCell = avc.map().getMap().cell();
    }

    /*
     * 
     */
    @GetMapping("")
    public List<Agent> find(@RequestParam(value = "cmd", defaultValue = "") String command)
    {
        if(command.equals("all")){
            return avc.agents().find();
        }
        if(command.equals("move")){
            /* A star */
            List<Agent> agents = avc.agents().find();
            for(int i=0;i<agents.size();i++){
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
            return avc.agents().find();
        }
        return avc.agents().find();
    }
    
    /*
     * 从前端更新参数
     * 请求示例：/api/agent/update?id=0&cmd=set&newvalue=17,7
     */
    @GetMapping(value = "/update")
    public String update(@RequestParam(value = "id", defaultValue = "") String id,
                        @RequestParam(value = "cmd", defaultValue = "") String command,
                        @RequestParam(value = "newvalue", defaultValue = "", required=false) String[] newvalue)
    {
        /* 设置目标位置 */
        if(command.equals("set")){
            Agent agent = avc.agents().get(Integer.parseInt(id));
            Location tempLoc = new Location(Integer.parseInt(newvalue[0]), Integer.parseInt(newvalue[1]));
            agent.setGoalPoint(tempLoc);
        }
        // System.out.println(command+id+newvalue[0]+"-"+newvalue[1]);
        String str = "ok";
        return str;
    }

    @GetMapping("/{id}")
    public Agent get(@PathVariable(value = "id") Integer id)
    {
        return avc.agents().get(id);
    }
}
