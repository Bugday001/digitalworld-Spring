package edu.tongji.cc.digitalworld.api;

import edu.tongji.cc.digitalworld.entity.Agent;
import edu.tongji.cc.digitalworld.service.AppService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    public RoboTaxiController(AppService avc)
    {
        this.avc = avc;
    }

    @GetMapping("")
    public List<Agent> find(@RequestParam(value = "cmd", defaultValue = "") String command)
    {
        if(command == "all"){
            return avc.agents().find();
        }
        return avc.agents().find();
    }

    @GetMapping("/{id}")
    public Agent get(@PathVariable(value = "id") Integer id)
    {
        return avc.agents().get(id);
    }
}
