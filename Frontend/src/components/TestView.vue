
<!-- <template> -->
<!-- websocketceshi -->
  <!-- <div class="layout">
    <div class="msgBody">{{ msg }}</div>
    <input v-model="sendMsg" style="width:200px;height:30px;margin-top:20px"/>
    <button @click="sendMessage" style="width:100px;height:30px;">发送</button>
    <button @click="close" style="width:100px;height:30px;">断开链接</button>
    <button @click="init" style="width:100px;height:30px;">建立链接</button>
  </div>
</template> -->

<!-- <script>
export default {
  name: "LayOut",
  data() {
    return {
      msg: "",
      sendMsg: "",
      //后台的地址，只需要动localhost:8001部分，改成你后端的地址。我自己电脑上本地开的就直接用本地的了。
      //后面webSocket是后台设定的接口地址，admin是你这个前台的识别码id。用于区分，比如你多个地方链接后台，后台推送数据的时候需要根据这个id不同，给对应的人推送，不然就推送到所有建立链接的网页上了
      path: "ws://localhost:7777/ws/path/asset",
      //存websocket实例化的
      socket: "",
    };
  },
  methods: {
    //用于前台发送数据到后台，调用websocket中的send方法把数据发过去。
    sendMessage() {
      this.socket.send(this.sendMsg);
    },
    //初始化建立前后台链接
    init() {
      if (typeof WebSocket === "undefined") {
        alert("您的浏览器不支持socket");
      } else {
        // 实例化socket
        this.socket = new WebSocket(this.path);
        // 监听socket连接
        this.socket.onopen = this.open;
        // 监听socket错误信息
        this.socket.onerror = this.error;
        // 监听socket消息
        this.socket.onmessage = this.getMessage;
        this.socket.onclose = this.close;
      }
    },
    //链接成功时的回调函数
    open() {
      console.log("socket连接成功");
    },
    //链接错误时的回调
    error(err) {
      console.log("连接错误" + err);
    },
    //后台消息推送过来，接收的函数，参数为后台推过来的数据。
    getMessage(msg) {
      this.msg = msg.data;
    },
    //链接关闭的回调
    close(event) {
      //socket是链接的实例，close就是关闭链接
      this.socket.close()
      console.log("断开链接成功");
    },
  },
  created() {
    //开局初始化建立链接
    this.init();
  },
};
</script> -->
<!-- <style scoped>
.layout {
  position: relative;
  width: 100%;
  height: 100%;
}
.msgBody {
  width: 500px;
  height: 300px;
  border: 1px solid rgb(95, 79, 79);
}
</style> -->



<template>
  <h1>{{ msg }}</h1>
  <div class="card">
    <textarea v-model='responsetext' style="width:400px,height:200px"></textarea><br>
    <button type="button" @click="on_agent_get_click">Fetch Agent/RoboTaxi Information From Backend</button>
    <button type="button" @click="on_agent_get_click2">Fetch Agent/RoboTaxi Information From Backend</button>
  </div>
</template>

<script>
//import axios from "axios";
import {isnull, awaithandler} from "../common/common.js"
import {avc} from "../service/appservice.js";

// - async/await的错误处理方法总结与优化, https://blog.csdn.net/q3254421/article/details/88878288
// - https://blog.51cto.com/u_15310651/3165705
export default{
    name: 'TestView',
    data(){
        return {
            responsetext: '',
            msg: 'welcome'
        }
    },
    computed:{
        computedtest:function(){

        }
    },
    mounted(){

    },
    methods:{
        async on_agent_get_click(){
            let self = this;
            alert('inside TestView component');

            let agents = avc.agentservice();
            // let robotaxi = await agentsvc.get(0);
            const [response, err] = await agents.get(0).then(response=>[response,null]).catch(err=>[null,err]);
            if (err == null)
            {
                let robotaxi = response.data;
                console.log(JSON.stringify(robotaxi));
                self.responsetext = JSON.stringify(robotaxi);
            }
            else{
                console.log(err);
                self.responsetext = "";
            }
        },
        
        async on_agent_get_click2(){
            let self = this;
            alert('inside TestView component');

            let agents = avc.agentservice();
            // let robotaxi = await agentsvc.get(0);
            const [response, err] = await awaithandler(agents.get(0));
            if (err == null)
            {
                let robotaxi = response.data;
                console.log(JSON.stringify(robotaxi));
                self.responsetext = JSON.stringify(robotaxi);
            }
            else{
                console.log(err);
                self.responsetext = "";
            }
        }
    },
    props: ['inputtext']
}
</script>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
