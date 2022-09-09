<template>
  <canvas id="solar" width="300" height="300"></canvas>
</template>

<script setup>
// author zhangwei on 2022.07.18
// - First version
// - link: https://www.runoob.com/try/try.php?filename=html5-canvas-intro3
// modified by xxxx on 2022.07.xx
// - (Add your own major modifications here as developing history)export default {
import { onMounted } from '@vue/runtime-core';

let sun;
let earth;
let moon;
let ctx;

function init(){
    sun = new Image();
    earth = new Image();
    moon = new Image();
    sun.src = "sun.png";
    earth.src = "earth.png";
    moon.src = "moon.png";
 
    let canvas = document.querySelector("#solar");
    ctx = canvas.getContext("2d");
 
    sun.onload = function (){
        draw()
    }
 
}

function draw(){
    ctx.clearRect(0, 0, 300, 300); //清空所有的内容
    /*绘制 太阳*/
    ctx.drawImage(sun, 0, 0, 300, 300);
 
    ctx.save();
    ctx.translate(150, 150);
 
    //绘制earth轨道
    ctx.beginPath();
    ctx.strokeStyle = "rgba(255,255,0,0.5)";
    ctx.arc(0, 0, 100, 0, 2 * Math.PI)
    ctx.stroke()
 
    let time = new Date();
    //绘制地球
    ctx.rotate(2 * Math.PI / 60 * time.getSeconds() + 2 * Math.PI / 60000 * time.getMilliseconds())
    ctx.translate(100, 0);
    ctx.drawImage(earth, -12, -12)
 
    //绘制月球轨道
    ctx.beginPath();
    ctx.strokeStyle = "rgba(255,255,255,.3)";
    ctx.arc(0, 0, 40, 0, 2 * Math.PI);
    ctx.stroke();
 
    //绘制月球
    ctx.rotate(2 * Math.PI / 6 * time.getSeconds() + 2 * Math.PI / 6000 * time.getMilliseconds());
    ctx.translate(40, 0);
    ctx.drawImage(moon, -3.5, -3.5);
    ctx.restore();
 
    requestAnimationFrame(draw);
}

        onMounted(()=>{
            init();
        });

</script>

<style>
.greeting {
  color: red;
  font-weight: bold;
}
</style>