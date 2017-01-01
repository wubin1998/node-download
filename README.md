# node-download
nodejs下载插件

## 使用方法
#### File(URL, dir, filename[Optional], callback[Optional])
```js
var download = require('node-download')

download.File("http://o6httuwar.bkt.clouddn.com/2202-ntk39234.jpg","./public", null, function(data){
  if (data.status == 200) {
    console.log("下载完成")
  }
})
```