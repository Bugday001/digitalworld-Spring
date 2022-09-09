// Utility methods.
//
// author zhangwei on 2022.07.18
// - First version
// modified by xxxx on 2022.07.xx
// - (Add your own major modifications here as developing history)

class Point{
    constructor(value)
    {
        if (value == null)
        {
            this.x = 0;
            this.y = 0;
            this.z = 0;
        }
        else{
            this.x = value[0];
            this.y = value[1];
            this.z = value[2];    
        }
    }
/*
    constructor()
    {
        this.x = 0;
        this.y = 0;
        this.z = 0;
    }
    constructor(x,y)
    {
        this.x = x;
        this.y = y;
        this.z = 0;
    }

    constructor(x,y,z)
    {
        this.x = x;
        this.y = y;
        this.z = z;
    }
*/
    value()
    {
        var retval = new Array(3);
        retvalue[0] = x;
        retvalue[1] = y;
        retvalue[2] = z; 
        return retvalue;
    }
}

function isnull(o)
{
    if (!o && typeof(o)!="undefined" && o!=0)
        return true
    else
        return false;
}


// Usage:
//  const [err, data] = await awaithandler(fetchData())
//  console.log('err', err)
//  console.log('data', data)
//
// Reference
// - async/await的错误处理方法总结与优化, 
//   https://blog.csdn.net/q3254421/article/details/88878288
//
const awaithandler = (promise) => {
    return promise
     .then(data => [data, null])
     .catch(err => [null, err])
    }
   
export {Point, isnull, awaithandler} 