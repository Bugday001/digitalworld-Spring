// author zhangwei on 2022.07.22
// - First version
// modified by xxxx on 2022.07.xx
// - (Add your own major modifications here as developing history)

import { requests } from './foundation.js';
import axios from 'axios';

function agent_find(params)
{
    return requests(
        {
            url: "/api/agent",
            type: "get",
            params: { // get用params，post用data
                "cmd": params,
            },
            contentType: "text",
            processData: false,
            dataType: "text",
            responsetype: "json"

        }
    );
}

/**
 * 
 * @param {*} params 传入id
 * @returns 
 */
async function agent_get(params)
{
  return requests(
    {
        url: "/api/agent",
        type: "get",
        params: params,
        contentType: "text",
        processData: false,
        dataType: "text",
        responsetype: "json"

    }
);
    /*.then(function (response){
      console.log(response);
      self.responsetext = JSON.stringify(response.data);
      console.log("responsetext in get(): " + JSON.stringify(self.responsetext));
    }).catch((error)=>{
      if (error.response)
      {
          console.log("error.response.data in get(): " + error.response.data);
      }
      console.log(error);
    });
    */
}

function agent_addnew(id, agent)
{

}

function agent_remove(id)
{

}

/**
 * 设置后端的值，目前仅支持goal points
 * @param {int} id 
 * @param {[]} newvalue 
 * @returns success or not
 */
function agent_update(id, newvalue)
{
  return requests(
        {
            url: "/api/agent/update",
            type: "get",
            params: { // get用params，post用data
                "id": id+"",
                "cmd": "set",
                "newvalue": newvalue+""
            },
            contentType: "text",
            processData: false,
            dataType: "text",
            responsetype: "json"
        }
    );
//   return requests(
//     {
//         url: "/api/agent/update",
//         method: "post",
//         data: { // get用params，post用data
//             "id": id+"",
//             "cmd": "set",
//             "newvalue": JSON.stringify(newvalue)
//         },
//         headers: {  
//           'Content-Type': 'application/json', //'multipart/form-data',//'application/json'
//           'Access-Control-Allow-Origin': '*'
//         },
//     }
// );
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


export {agent_find, agent_get, agent_addnew, agent_remove, agent_update};

