package edu.tongji.cc.digitalworld.entity;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import edu.tongji.cc.digitalworld.common.Location;

/**
 * The base class for all kinds of Agent.
 *
 * TODO: In the future, we'll introduce interface IiAgent.
 *
 * @author ZhangWei(Dept. of Control, TongJi University)
 * - First version.
 */
public class Agent {

    private int _id;
    private Location _location = new Location();
    private Location _goalPoint = new Location(40, 40);
    private double angle = 0, speed = 0, upspeed = 0;
    private List<Double> realWorldLoc = Arrays.asList(new Double[]{-1.0,-1.0,-1.0,-1.0,-1.0});

    public Agent()
    {

    }

    public int getId()
    {
        return _id;
    }

    public void setId(int id)
    {
        this._id = id;
    }

    public void setGoalPoint(Location loc)
    {
        this._goalPoint.assignfrom(loc);
    }

    public Location getGoalPoint()
    {
        return this._goalPoint;
    }

    public void setLocation(Location loc)
    {
        this._location.assignfrom(loc);
    }

    public Location getLocation()
    {
        return this._location;
    }

    public void setState(double angle, double speed, double upspeed)
    {
        this.angle = angle;
        this.speed = speed;
        this.upspeed = upspeed;
    }

    /**
     * 
     * @return angle, speed, upspeed
     */
    public List<Double> getState()
    {
        List<Double> list = Arrays.asList(this.angle, this.speed, this.upspeed);;
        return list;
    }

    public void setRealWorldLoc(List<Double> loc)
    {
        this.realWorldLoc = loc;
    }

    public List<Double> getRealWorldLoc()
    {
        return this.realWorldLoc;
    }

    public int getX()
    {
        return _location.getX();
    }

    public int getY()
    {
        return _location.getY();
    }
}
