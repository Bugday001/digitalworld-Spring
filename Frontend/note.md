# notebook

## 使用axios与flask通信。
### 前端
创建axios:(foundation.js)
```js
const requests = axios.create({
  baseURL: import.meta.env.VITE_API_URL, //配置flask地址,在.env.development中配置
  timeout: 5000
});
```

使用：(agent-api.js)
```js
function agent_find(criteria)
{
    return requests(
        {
            url: "/api/agent",
            type: "get",
            params: { // get用params，post用data
                "id" : 0
            },
            contentType: "text",
            processData: false,
            dataType: "text",
            responsetype: "json"

        }
    );
}
```
vue3调用:(UiTest.vue)
```js
function getUserInfo() {
	const params = {
		id: 0
	}
	agent_get(params).then((res) => {
		console.log(res)
	}).catch((res) => {
        console.log(res)
  })
}
```

### 后端
```python
# 使用以下代码解决跨域问题(CORS)
from flask_cors import CORS
app = Flask(__name__)
CORS(app, resources=r'/*')
# 获取get的传值，params
@app.route('/api/agent')
def testGet():
    name = request.args.get('id')
```

## Spring
### WebSocket
[WebSocket实现前后端通讯](https://www.cnblogs.com/taojietaoge/p/14980331.html)
[csdn websocket](https://blog.csdn.net/seeeeeeeeeee/article/details/124681886)