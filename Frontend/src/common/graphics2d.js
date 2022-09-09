// Graphics 2D Engine
//
// Reference
// Pixi,
// The HTML5 Creation Engine: Create beautiful digital content with the fastest, most flexible 2D WebGL renderer.
// https://github.com/pixijs/pixijs
//
// Learning Pixi,
// https://github.com/kittykatattack/learningPixi
//
// author zhangwei on 2022.07.18
// - First version
// modified by xxxx on 2022.07.xx
// - (Add your own major modifications here as developing history)

const WORLD_WIDTH = 50, WORLD_HEIGHT = 50;
var stepx=30, stepy=30; 
const lineWidth = 1;

function g2d_init(canvasid){
    let canvas = document.querySelector('#' + canvasid);
    let ctx = canvas.getContext("2d");
    stepx = ctx.canvas.width/WORLD_WIDTH;
    stepy = ctx.canvas.height/WORLD_HEIGHT;
    return ctx;
}

function g2d_draw(ctx){
    //requestAnimationFrame(function step(){
        //drawDial(ctx); //绘制表盘
        //drawAllHands(ctx); //绘制时分秒针
        //requestAnimationFrame(step);
    //});
}

var nowTime = 0;
//记录每次动画执行结束的时间
var lastTime = Date.now();
//我们自己定义的动画时间差值
var diffTime = 40;

function g2d_set_animator_interval(interval)
{
    diffTime = interval;
}

// requestAnimationFrame is an optimized method to do animation rather than
// using timer.
//
function g2d_animate_start(render)
{
    let animatorid = 0;

    //requestAnimationFrame效果
    (function animloop(time) {
        nowTime = Date.now()
        console.log(time,Date.now())
        // 当前时间-上次执行时间如果大于diffTime，那么执行动画，并更新上次执行时间
        if(nowTime-lastTime > diffTime){
            lastTime = nowTime
            render();
        }
        animatorid = requestAnimationFrame(animloop);
    })();

    return animatorid;
}

function g2d_animate_stop(animatorid)
{
    cancelAnimationFrame(animatorid)
}



function g2d_draw_map(ctx, map)
{
    let color='#ccc';
    ctx.save()
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.lineWidth = 0.2;
    ctx.strokeStyle = color;
    for (var i = stepx; i < ctx.canvas.width; i += stepx) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, ctx.canvas.height);
        ctx.closePath();
        ctx.stroke();
    }
    for (var j = stepy; j < ctx.canvas.height; j += stepy) {
        ctx.beginPath();
        ctx.moveTo(0, j);
        ctx.lineTo(ctx.canvas.width, j);
        ctx.closePath();
        ctx.stroke();
    }
    //绘制障碍
    for (var i=0; i<WORLD_WIDTH; i++) {
            for (var j=0; j<WORLD_HEIGHT; j++) {
                if(map.world[i][j] == 1){
                    ctx.fillStyle = "black";
                    ctx.fillRect(i*stepx, j*stepy, stepx, stepy);
                }
                else if(map.world[i][j] == 40) {
                    ctx.fillStyle = "yellow";
                    ctx.fillRect(location.x*stepx+lineWidth, location.y*stepy+lineWidth, stepx-lineWidth*2, stepy-lineWidth*2);
                }
            }
        }
    ctx.restore();
}

function g2d_draw_object(ctx, o)
{
    
}

function g2d_draw_objects(ctx, objectlist)
{
    
}

function g2d_move_object(ctx, x1,y1,x2,y2)
{

}

function g2d_draw_world(world)
{

}

function g2d_update_allcell(map)
{
    let ctx = g2d_init("gridmap");
    ctx.save();
    g2d_draw_map(ctx, map);
    for (var i=0; i<WORLD_WIDTH; i++) {
        for (var j=0; j<WORLD_HEIGHT; j++) {
            switch(map.world[i][j]) {
                case 0:
                    ctx.fillStyle = "white";
                   break;
                case 1:
                    ctx.fillStyle = "black";
                   break;
                case 99:
                    ctx.fillStyle = "red";
                    break;
                case 40:
                    ctx.fillStyle = "yellow";
                    break;
                default:
                    ctx.fillStyle = "white";
            } 
            // ctx.fillRect(i*stepx, j*stepy, stepx, stepy);
            ctx.fillRect(location.x*stepx+lineWidth, location.y*stepy+lineWidth, stepx-lineWidth*2, stepy-lineWidth*2);
        }
    }

    ctx.restore();
}

/**
 * 
 * @param {*} location Location
 * @param {*} value 0：可行，1：障碍，99：车，40：目标
 */
function g2d_update_cell(location, value)
{
    let ctx = g2d_init("gridmap");
    ctx.save();
    switch(value) {
        case 0:
            ctx.fillStyle = "white";
           break;
        case 1:
            ctx.fillStyle = "black";
           break;
        case 99:
            ctx.fillStyle = "red";
            break;
        case 40:
            ctx.fillStyle = "yellow";
            break;
        default:
            ctx.fillStyle = "white";
   } 
    ctx.fillRect(location.x*stepx+lineWidth, location.y*stepy+lineWidth, stepx-lineWidth*2, stepy-lineWidth*2);
    ctx.restore();
}

export {g2d_init, g2d_draw_world, g2d_update_allcell, g2d_update_cell, g2d_draw_map} ;