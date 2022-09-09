// author zhangwei on 2022.07.18
// - First version
// modified by xxxx on 2022.07.xx
// - (Add your own major modifications here as developing history)

import Agent from '../common/agent'
import {agent_find,agent_get} from '../foundation/agent-api'
// how many agents in the world
const WORLD_AGENT_COUNT = 5;
const MAP_OBJECT_PASSABLE = 0


// 应该在JavaScript中使用Class吗？https://zhuanlan.zhihu.com/p/158956514
class AgentService{

  constructor(requests){
    this.agents = new Array(WORLD_AGENT_COUNT);
    for (var i=0; i<WORLD_AGENT_COUNT; i++)
    {
        let agent = new Agent();
        agent.state = 1;
        agent.oldmapvalue = MAP_OBJECT_PASSABLE;
        //
        this.agents[i] = agent;
    }
  }

  // Update agents from the server
  fetch(parmas)
  {
    //得到所有agents信息
    agent_find(parmas).then((res) => {
      let data = res.data;
      // console.log(data);
      for (var i=0; i<WORLD_AGENT_COUNT; i++)
      {
          let agent = this.agents[i];
          agent.id = data[i].id;
          agent.state = 1;
          agent.x = data[i].x;
          agent.y = data[i].y;
          agent.z = 0;
          // console.log(data.agents);
      }
    }).catch((res) => {
          console.log(res)
    });
    // TODO
    // update this.agents with agentlist
    
  }

  find()
  {
    return this.agents;
  }

  get(id)
  {
    let found = false;
    let agent = null;
    for(var i=0; i<this.agents.length; i++)
    {
      agent = this.agents[i];
      if ((agent.state != 0) && (agent.id == id))
      {
        found = true;
        break;
      }
    }
    return found ? agent : null;
  }

  addnew(id, agent)
  {
    // TODO add agent into agents[]
  }

  remove(id)
  {
    // remove an agents from agents[]

  }

  update(data)
  {
    for (var i=0; i<WORLD_AGENT_COUNT; i++)
    {
        let agent = this.agents[i];
        agent.id = data[i].id;
        agent.state = 1;
        agent.x = data[i].x;
        agent.y = data[i].y;
        agent.z = 0;
        // console.log(data.agents);
    }
  }
}

/*
function SuperHero() {
  const [superHeroJSON, setSuperHeroJSON] = React.useState({});
  React.useEffect(() => {
     axios.get('/superhero/').then(response => {
       setSuperHeroJSON(response);
     }).catch(error => {});

  }, [])

  return (<>
    {JSON.stringify(superHeroJSON, null, '    ')}
  </>)
}

export default SuperHero;
*/


export default AgentService;

