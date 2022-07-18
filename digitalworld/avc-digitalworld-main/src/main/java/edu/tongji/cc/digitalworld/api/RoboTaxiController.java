package edu.tongji.cc.digitalworld.api;

import edu.tongji.cc.digitalworld.entity.Agent;
import edu.tongji.cc.digitalworld.service.AppService;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

@RestController
@RequestMapping(value="/api/agent/")
public class RoboTaxiController {

    @Resource(name="avc")
    final AppService avc;

    public RoboTaxiController(AppService avc)
    {
        this.avc = avc;
    }

    @GetMapping("")
    public List<Agent> find(@RequestParam(value = "criteria", defaultValue = "") String criteria)
    {
        return avc.agents().find();
    }

    @GetMapping("{id}")
    public Agent get(@PathVariable(value = "id") Integer id)
    {
        return avc.agents().get(id);
    }
}
