// Agent class.
//
// author zhangwei on 2022.07.222
// - First version
// modified by xxxx on 2022.07.xx
// - (Add your own major modifications here as developing history)

import {Point, isnull, awaithandler} from '../common/common.js'

class Agent{
    constructor()
    {
        this.id = 0;
        this.state = 0;
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.yawangle = 0;
        this.pitchangle = 0;
        this.velocity = 0;
        this.acceleration = 0;
        this.oldmapvalue = 0;
        this.oldLocation = new Point([0, 0, 0]);
        this.goalPoint = new Point([40, 40, 0]);
    }

    /*
    constructor(location, angle)
    {
        this.id = 0;
        this.state = 0;
        this.x = location.x;
        this.y = location.y;
        this.z = location.z;
        this.yawangle = angle;
        this.pitchangle = 0.0;
        this.velocity = 0;
        this.acceleration = 0;
        this.oldmapvalue = 0;

        this.setId = this.setId.bind(this);
        this.setState = this.setState.bind(this);
        this.setLocation = this.setLocation.bind(this);
        this.setAngle = this.setAngle.bind(this);
        // TODO
    }
    */

    setId(id)
    {
        this.id = id;
    }

    setState(state)
    {
        this.state = state;
    }

    // Return a Point object
    location()
    {
        return new Point([this.x, this.y, this.z]);
    }

    // Param: location is a Point object.
    setLocation(location)
    {
        this.x = location.x;
        this.y = location.y;
        this.z = location.z;
    }

    setGoalPoint(location)
    {
        this.x = location.x;
        this.y = location.y;
        this.z = location.z;
    }

    angle()
    {
        return this.yawangle;
    }

    setAngle(angle)
    {
        this.yawangle = angle;
    }

    assginfrom(newvalue)
    {
        // TODO
    }
}

export default Agent;