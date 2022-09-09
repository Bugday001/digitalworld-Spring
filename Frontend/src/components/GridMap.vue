<!-- 
/**
* name: GridMap.vue
* version: 1.0
* Author: Bugday
* Date: 2022/08/05 22:01:58
* Description: grid map view, 全塞在一个文件感觉不太好，没有利用vue的巧妙
*/ 
-->
<template>
    <div class="div_mainInfo">
        <div class="div_gridmap">
            <canvas id="gridmap" width="600" height="600" class="gridMap" ref="gridMap"></canvas>
        </div>
        <div class="div_mapInfo">
            <canvas id="mousePosition" width="200" height="30" ref="mousePosition"></canvas>
            <br />
            <div class="div_setGoal">
                设置Agent的终点坐标：
                <div>
                    x:<input type="text" name="point" value="17" oninput="value=value.replace(/[^\d]/g,'')" />
                    y:<input type="text" name="point" value="7" oninput="value=value.replace(/[^\d]/g,'')" />
                    id:<input type="text" name="agentId" value="0" oninput="value=value.replace(/[^\d]/g,'')" />
                </div>
            </div>
            <br />
            <button type="button" class="functionalBtn" @click="initServerInfo">Init Server</button>
            <button type="button" class="functionalBtn" @click="drawBasicMap">Update map</button>
            <br />
            <button id="startBtn" type="button" class="functionalBtn" @click="startTimer">Start timer</button>
            <button id="stopBtn" type="button" class="functionalBtn" @click="stopTimer">Stop timer</button>
            <br />
            <button type="button" class="functionalBtn" @click="setGoalPoint">Set goal point</button>

        </div>
        
    </div>
    <WebSocket/>

</template>
<!-- <script setup>中的代码会在每次组件实例被创建的时候执行。 -->
<script>

import { g2d_init, g2d_draw_world, g2d_update_allcell, g2d_update_cell, g2d_draw_map } from './../common/graphics2d.js'
import { avc, AppService } from './../service/appservice.js'
import { agent_update } from '../foundation/agent-api'
import WebSocket from "../components/WebSocket.vue";
import {Point, isnull, awaithandler} from '../common/common.js'

export default {
    data() {
        return {

        };
    },
    components:{

        WebSocket

    },
    mounted() {
        this.ctx_gridmap = g2d_init("gridmap");
        this.stopBtn = document.getElementById('stopBtn');
        this.startBtn = document.getElementById('startBtn');
        this.canvas = document.querySelector("#gridmap");
        this.canvastxt = document.querySelector("#mousePosition");
        this.init();
    },
    created() {
        
    },
    methods: {
        /**
         * Initialization
         */
        init() {
            this.draw(this.ctx_gridmap, avc);
            this.getMousePoistion();
        },

        /**
         * 暂时预留渲染入口-requestAnimationFrame
         * @param {*} ctx 画笔
         * @param {*} avc Instance of AppService 
         */
        draw(ctx, avc) {
            // requestAnimationFrame(step() => {
            g2d_draw_map(ctx, avc.worlds.map);
            // });
        },

        /**
         * 获取鼠标在Canvas的地图坐标
         */
        getMousePoistion() {
            let that = this;
            let mapLegnth = avc.mapservice().world.length;
            var ctx = this.canvastxt.getContext("2d");
            ctx.font = "20px Arial";
            //实时传回鼠标坐标
            this.canvas.addEventListener("mousemove", function(e) { 
                var cRect = that.canvas.getBoundingClientRect();              
                var canvasX = Math.round(e.clientX - cRect.left);        
                var canvasY = Math.round(e.clientY - cRect.top);         
                ctx.clearRect(0, 0, that.canvas.width, that.canvas.height); 
                let x = Math.ceil(canvasX*mapLegnth/that.canvas.width)-1;
                let y = Math.ceil(canvasY*mapLegnth/that.canvas.height)-1;       
                ctx.fillText("("+x+", "+y+")", 10, 20);
            });
            //点击设置目标位置
            let inputPoint = document.getElementsByName("point");
            this.canvas.addEventListener('mousedown', (e) => {
                var cRect = that.canvas.getBoundingClientRect();
                var canvasX = Math.round(e.clientX - cRect.left);
                var canvasY = Math.round(e.clientY - cRect.top);
                ctx.clearRect(0, 0, that.canvas.width, that.canvas.height);
                let x = Math.ceil(canvasX * mapLegnth / that.canvas.width) - 1;
                let y = Math.ceil(canvasY * mapLegnth / that.canvas.height) - 1;
                inputPoint[0].value = x;
                inputPoint[1].value = y;
            });
        },

        /** 
         * 初始化后端agents、map
         */
        initServerInfo() {
            avc.worlds.fetchFromServer();
        },

        /** 
         * 渲染到canvas
         */
        drawBasicMap() {
            avc.worlds.updateAllView();
        },

        startTimer() {
            avc.start();
            this.startBtn.disabled = true;
            this.stopBtn.disabled = false;
        },

        stopTimer() {
            avc.stop();
            this.startBtn.disabled = false;
            this.stopBtn.disabled = true;
        },

        /** 
         * 设置目标点到后端
         */
        setGoalPoint() {
            let inputPoint = document.getElementsByName("point");
            let inputId = document.getElementsByName("agentId");
            let point = [parseInt(inputPoint[0].value), parseInt(inputPoint[1].value)];
            let agent = avc.worlds.agents.get(parseInt(inputId[0].value));
            agent_update(inputId[0].value, point).then((res) => {
                console.log(res);
            }).catch((res) => {
                console.log(res)
            });
            //更新目标点地点
            g2d_update_cell(agent.goalPoint, 0);
            avc.worlds.map.setMapCellValue(agent.goalPoint, 0);
            let goalPoint = new Point([parseInt(inputPoint[0].value), parseInt(inputPoint[1].value), 0]);
            // agent.setGoalPoint(goalPoint);
            agent.goalPoint = goalPoint;
            g2d_update_cell(agent.goalPoint, 40);
            avc.worlds.map.setMapCellValue(agent.goalPoint, 40);
        },
    },
};

</script>

<style scoped>
.div_mainInfo {
    display: table;
    margin: 1 auto;
}

.div_gridmap {
    width: 50%;
    display: table-cell;
    vertical-align: top;
}

.div_mapInfo {
    width: 50%;
    display: table-cell;
    vertical-align: top;
}

.gridMap {
    margin: 0 auto;
    border: 3px solid gray;
}

.div_setGoal {
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    margin: 5px;
    padding: 5px;
    background: rgba(153, 153, 153, 0.167);
}

input {
    width: 80px;
    border: 5;
    outline: 0;
    padding: 10px;
    margin: 10px;
    font-size: 20px;
    text-align: center;
}

.functionalBtn {
    display: inline-block;
    padding: 15px 25px;
    margin: 10px;
    font-size: 20px;
    cursor: pointer;
    text-align: center;
    text-decoration: none;
    outline: none;
    color: #fff;
    background-color: #2ca6d9;
    border: none;
    border-radius: 15px;
    box-shadow: 0 9px #999;
}

.functionalBtn:hover {
    background-color: #7fc3cc;
    font-style: italic;
}

.functionalBtn:active {
    background-color: #7fc3cc;
    box-shadow: 0 5px #666;
    transform: translateY(4px);
}

.functionalBtn:disabled {
    background-color: #7fc3cc;
    box-shadow: 0 5px #666;
    transform: translateY(4px);
    font-style: italic;
}
</style>