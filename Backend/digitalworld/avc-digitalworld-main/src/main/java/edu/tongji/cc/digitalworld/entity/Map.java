package edu.tongji.cc.digitalworld.entity;

import java.util.List;

/**
 * Geographical Map, which is a 2D/3D space containing some MapObjects/Agents.
 *
 * @author ZhangWei(Dept. of Control, TongJi University)
 * - First version.
 */
public class Map {
    private short[][] cell;

    public Map(int width, int height)
    {
        cell = new short[width][height];
        /* random */
        for(int i=0;i<width;i++){
            for(int j=0;j<height;j++){
                if(Math.random()<0.7 || (i>=40 && j>=40)){
                    cell[i][j] = 0;
                }
                else{
                    cell[i][j] = 1;
                }
            }
        }
    }

    public short[][] cell()
    {
        return cell;
    }

}
