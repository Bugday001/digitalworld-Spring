package edu.tongji.cc.digitalworld.api;

import javax.annotation.Resource;
import java.util.List;

import org.springframework.web.bind.annotation.*;

import edu.tongji.cc.digitalworld.common.Location;
import edu.tongji.cc.digitalworld.entity.Map;
import edu.tongji.cc.digitalworld.service.AppService;

@RestController
@CrossOrigin
@RequestMapping(value="/api/map")
public class MapController {
    @Resource(name="avc")
    final AppService avc;

    public MapController(AppService avc)
    {
        this.avc = avc;
    }

    @GetMapping("")
    public short[][] find(@RequestParam(value = "criteria", defaultValue = "") String command)
    {
        if(command == "all"){
            Map tempMap = new Map(50, 50);
            return tempMap.cell();
        }
        Map tempMap = new Map(50, 50);
        return tempMap.cell();
    }

}
