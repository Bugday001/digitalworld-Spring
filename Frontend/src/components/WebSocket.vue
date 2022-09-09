
<template>
    <!-- websocket -->
      <div class="layout">
        <textarea class="msgBody" v-model="msg"/>
        <br/>
        <input v-model="sendMsg" style="width:200px;height:20px;margin-top:20px"/>
        <button @click="sendMessage" style="width:150px;height:30px;">发送</button>
        <button @click="close" style="width:150px;height:30px;">断开链接</button>
        <button @click="init" style="width:150px;height:30px;">建立链接</button>
      </div>
</template>
    
<script>

    import { avc, AppService } from './../service/appservice.js'

    export default {
      name: "WebSocket",
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
        moveFetch(msg) {
            this.socket.send(msg);
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
            let list = msg.data.split("--");
            let jsondata = new Array(5);
            for (var i=0; i<5; i++)
            {
                jsondata[i] = JSON.parse(list[i]);
            }
            //更新agents
            avc.worlds.agents.update(jsondata);
            let showMsg = "";
            for(var i=0; i<5; i++){
                switch(i){
                  case 3: 
                          showMsg += "Matlab";
                          break;
                  case 4:
                          showMsg += "Android";
                          break;
                  default:
                          showMsg += "Digital";
                          break;
                }
                showMsg += "->"
                showMsg += "id:" + jsondata[i].id + ", x:" + jsondata[i].x + ", y:" + jsondata[i].y;
                showMsg += ", angle:" + jsondata[i].state[0] + ", speed:" + jsondata[i].state[1] + ", upspeed:" + jsondata[i].state[2];
                showMsg += ", X:" + jsondata[i].realWorldLoc[0].toFixed(2) + ", Y:" + jsondata[i].realWorldLoc[1].toFixed(2) + ", Z:" + jsondata[i].realWorldLoc[2].toFixed(2);
                showMsg += ", GyroX:" + jsondata[i].realWorldLoc[3].toFixed(2) + ", GyroY:" + jsondata[i].realWorldLoc[4].toFixed(2);
                showMsg += "\r\n";
            }
            
            this.msg = showMsg;
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
        //全局化，使得js可以调用
        window.moveFetch= this.moveFetch
      },
    };
</script>
<style scoped>
    .layout {
      position: relative;
      width: 100%;
      height: 100%;
    }
    .msgBody {
      width: 1200px;
      height: 200px;
      border: 1px solid rgb(95, 79, 79);
      margin-top: 20px ;
    }
</style>    