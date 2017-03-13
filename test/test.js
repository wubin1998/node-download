var download = require('../lib/download.js')

download.File("http://o6httuwar.bkt.clouddn.com/2202-ntk39234.jpg","./",null)
.then( (result) => {
  console.log(result)
})

download.FileStream("http://o6httuwar.bkt.clouddn.com/2202-ntk39234.jpg","./",null)
.then( (result) => {
  console.log(result)
})