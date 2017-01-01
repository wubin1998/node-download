var download = require('../lib/download.js')

download.File("http://o6httuwar.bkt.clouddn.com/2202-ntk39234.jpg","./",null, function(data){
  if (data.status == 200) {
    console.log('下载完成');
  }
})

download.FileStream("http://o6httuwar.bkt.clouddn.com/2202-ntk39234.jpg","./",null, function(data){
  if (data.status == 200) {
    console.log('下载完成');
  }
})