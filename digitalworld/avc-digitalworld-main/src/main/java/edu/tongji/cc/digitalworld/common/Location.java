package edu.tongji.cc.digitalworld.common;

public class Location {

    private int[] _value = new int[3];

    public Location()
    {

    }

    public Location(int x, int y)
    {
        this._value[0] = x;
        this._value[1] = y;
    }

    public Location(int x, int y, int z)
    {
        this._value[0] = x;
        this._value[1] = y;
        this._value[2] = z;
    }

    public int getX()
    {
        return _value[0];
    }

    public void setX(int x)
    {
        _value[0] = x;
    }

    public int getY()
    {
        return _value[1];
    }
    public int getZ()
    {
        return _value[2];
    }

    public int[] getValue()
    {
        return _value;
    }

    public void assignfrom(Location loc)
    {
        int i;
        for (i=0; i<3; i++)
        {
            this._value[i] = loc._value[i];
        }
    }



}
