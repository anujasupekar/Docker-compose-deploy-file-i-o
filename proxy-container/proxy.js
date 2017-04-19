  var redis = require('redis')
  var multer  = require('multer')
  var express = require('express')
  var fs      = require('fs')
  var app = express()
  // REDIS
  var client = redis.createClient(32800, '172.17.0.2', {})
  var httpProxy = require('http-proxy')
  var http = require('http')

  var proxy = httpProxy.createProxyServer({});
  client.del("queue");


  client.lpush('queue','http://127.0.0.1:50102');

  var server = http.createServer(function(req, res) {
    client.rpoplpush('queue','queue', function(err, value) {
  	proxy.web(req, res, { target: value });
  	});
  });

  console.log("listening on port 3002")
  server.listen(3002)
