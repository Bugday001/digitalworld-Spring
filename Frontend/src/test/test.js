// author zhangwei on 2022.07.18
// - First version
// modified by xxxx on 2022.07.xx
// - (Add your own major modifications here as developing history)

import axios from "axios";

function test_run() {

    // alert("inside /test/test.js/test_run method");

    // Make a request for a user with a given ID
    axios.get('http://localhost:5173/api/agent/0')
        .then(function (response) {
            // handle success
            console.log(response);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function () {
            // always executed
        });

    // Optionally the request above could also be done as
    axios.get('http://localhost:5173/api/agent/0', {
        params: {
            ID: 12345
        }
    })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        })
        .then(function () {
            // always executed
        });

    // Want to use async/await? Add the `async` keyword to your outer function/method.
    async function getUser() {
        try {
            const response = await axios.get('http://localhost:5173/api/agent/0');
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }

}

function load_table_data()
{
  let listdata = [
    {date: '2022-07-23', name: 'zhangwei', address: 'jiading, TongJi Univ.'},
    {date: '2022-07-23', name: 'wangwu', address: 'jiading, TongJi Univ.'}
  ];
  return listdata;
}

export {test_run, load_table_data};