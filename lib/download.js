'use strict'

const fs = require('fs')
const http = require('http')
const path = require('path')
const Url = require('url')

const Download = {};

Download.File = (url, dir, filename, callback) => {
  if (Url.parse(url).protocol != "http:") {
    throw new Error("Can only be http! Do not use HTTPS!")
  }
  if(!dir) {
    throw new Error("Please enter a file path")
  }
  if(typeof filename != "string") {
    filename =  path.basename(url)
  }

  http.get(url, res => {
    let chunk = ""
    res.setEncoding('binary')
    
    res.on('data', data => {
      chunk += data;
    })
      .on('end', () => {
        fs.writeFile(dir + filename, chunk, { encoding: 'binary' }, (err) => {
          if (err) throw new Error(err);
          callback ? callback({status: 200}) : ""
        })
      })
  })
}

module.exports = Download