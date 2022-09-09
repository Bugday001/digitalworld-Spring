import { requests } from './foundation.js';

function map_fetch(params)
{
    return requests(
        {
            url: "/api/map",
            type: "get",
            params: { // get用params，post用data
                "criteria": "all",
            },
            contentType: "text",
            processData: false,
            dataType: "text",
            responsetype: "json"
    
        }
    );
}

function map_fetch_submap()
{

}

export {map_fetch, map_fetch_submap}