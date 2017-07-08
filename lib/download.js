/*
  Copyright (c) 2017 Wu Bin
*/

'use strict'

const fs = require('fs')
const http = require('http')
const path = require('path')
const Url = require('url')

const Download = {};

Download.File = (url, dir, filename) => {
  return new Promise( (resolve, reject) => {
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
        .on('error', err => {
          throw new Error(err)
        })
        .on('end', () => {
          if (parseInt(res.statusCode) != 200) {
            throw new Error(`${res.statusCode} ${res.statusMessage}`)
          }
          fs.writeFile(dir + filename, chunk, { encoding: 'binary' }, (err) => {
            if (err) throw new Error(err);
            resolve({status: res.statusCode})
          })
        })
    })
  })
}

Download.FileStream = (url, dir, filename) => {
  return new Promise( (resolve, reject) => {
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
      var writeStream = fs.createWriteStream(dir + filename)
      res.on('data', data => {
        writeStream.write(data)
      })
        .on('error', err => {
          throw new Error(err);
        })
        .on('end', function(){
          if (parseInt(res.statusCode) != 200) {
            throw new Error(`${res.statusCode} ${res.statusMessage}`)
          }
          writeStream.end()
          writeStream.on('close', function(){
            resolve({status: res.statusCode})
          })
        })
    })
  })
}

module.exports = Download