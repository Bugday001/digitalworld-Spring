package edu.tongji.cc.digitalworld.entity;

import java.util.List;

public class Map {
    private short[][] cell;

    public Map(int width, int height)
    {
        cell = new short[width][height];
    }

    public short[][] cell()
    {
        return cell;
    }

}
