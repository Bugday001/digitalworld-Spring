package edu.tongji.cc.digitalworld.entity;

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

    public int getX()
    {
        return _location.getX();
    }

    public int getY()
    {
        return _location.getY();
    }
}
