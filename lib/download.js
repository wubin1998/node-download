/*
  Copyright (c) 2017 Wu Bin
*/

'use strict'

const fs = require('fs')
const http = require('http')
const path = require('path')
const Url = require('url')
const https = require('https');

const Download = {};

let RHttp = function(protocol){
  let fn = "";
  if (protocol == "http:") {
    fn = http.get;
  } else if (protocol == "https:") {
    fn = https.get;
  } else {
    throw new Error('Invalid Protocol!')
  }
  return fn;
}

let http_request = function(url, dir, filename) {
  let protocol = Url.parse(url).protocol;

  return new Promise( (resolve, reject) => {
    let fn = RHttp(protocol)
    fn(url, res => {
      let statusCode = res.statusCode;
      let statusMessage = res.statusMessage;
      let chunk = ""
      res.setEncoding('binary')
      res.on('data', data => {
        chunk += data;
      })
        .on('error', err => {
          throw new Error(err)
        })
        .on('end', () => {
          if (parseInt(statusCode) != 200) {
            throw new Error(`${statusCode} ${statusMessage}`)
          }
          fs.writeFile(dir + filename, chunk, { encoding: 'binary' }, (err) => {
            if (err) throw new Error(err);
            resolve({status: statusCode})
          })
        })
    })
  })
}

let request_stream = function(url, dir, filename) {
  let protocol = Url.parse(url).protocol;

  return new Promise( (resolve, reject) => {
    let fn = RHttp(protocol)
    fn(url, res => {
      let statusCode = res.statusCode;
      let statusMessage = res.statusMessage;
      let writeStream = fs.createWriteStream(dir + filename)
      res.on('data', data => {
        writeStream.write(data)
      })
        .on('error', err => {
          throw new Error(err);
        })
        .on('end', function(){
          if (parseInt(statusCode) != 200) {
            throw new Error(`${statusCode} ${statusMessage}`)
          }
          writeStream.end()
          writeStream.on('close', function(){
            resolve({status: statusCode})
          })
        })
    })
  })
}

/**
 * File
 * 
 * @param {String} url 
 * @param {String} dir 
 * @param {String} filename 
 * @returns 
 */
Download.File = (url, dir, filename) => {
  
  if(!dir) {
    dir = __dirname + "\\"
  }
  if(typeof filename != "string") {
    filename =  path.basename(url)
  }
  return http_request(url, dir, filename)
}

/**
 * FileStream
 * 
 * @param {String} url 
 * @param {String} dir 
 * @param {String} filename 
 * @returns 
 */
Download.FileStream = (url, dir, filename) => {

  if(!dir) {
    dir = __dirname + "\\"
  }
  if(typeof filename != "string") {
    filename =  path.basename(url)
  }
  return request_stream(url, dir, filename)
}

module.exports = Download