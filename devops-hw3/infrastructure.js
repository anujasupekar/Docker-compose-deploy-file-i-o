var redis = require('redis')
var multer  = require('multer')
var express = require('express')
var fs      = require('fs')
var exec = require('child_process').exec;
var app = express()
var httpProxy = require('http-proxy');
var http = require('http');
var port = 3010
// REDIS
//var client = redis.createClient(32800, '172.17.0.2', {})
var client = redis.createClient(6379, 'localhost', {})
client.del("spawnedserver");
app.get('/spawn', function(req, res) {
    exec('sh launch.sh ' + port, function(err, out, code) 
    {
      if (err instanceof Error)
            throw err;
      if( err )
      {
        console.error( err );
      }

	console.log('Launching a server container')
	client.lpush("spawnedserver", "localhost:" + port);
        port = port + 1;
	res.send("localhost:" + (port-1) + "\n");
    });

})

app.get('/listservers', function(req, res) {
        client.lrange("spawnedserver", 0, -1, function (err, reply) {
                console.log(reply)
		console.log(" ")
                res.send(reply+"\n")
        })
})

var server = app.listen(8001, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('App is running at http://%s:%s', host, port)
})
