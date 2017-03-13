# node-download
[![npm version](https://img.shields.io/npm/v/node-download-file.svg)](https://www.npmjs.com/package/node-download-file)
## 使用方法
```bash
npm install node-download-file --save
```
#### File(URL, dir, filename[Optional])
```js
var download = require('node-download-file')

download.File("http://o6httuwar.bkt.clouddn.com/2202-ntk39234.jpg","./public/", null)
.then( (result) => {
  if (result == 200) {
    console.log('下载完成')
  }
})
```

## 文件流
#### FileStream(URL, dir, filename[Optional])
```js
download.FileStream("http://o6httuwar.bkt.clouddn.com/2202-ntk39234.jpg","./", null)
.then( (result) => {
  if (result == 200) {
    console.log('下载完成')
  }
})
```