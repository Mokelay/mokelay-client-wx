//批处理脚本，用于从服务端下载所有的page配置以及巴斯函数

var http = require('http');
var querystring=require('querystring');
var fs = require('fs');
 
var postData=querystring.stringify({
	appAlias:'xy_partner'
});

// var username = 'falcon';
// var password = '';
// var _auth = 'Basic ' + new Buffer(username + ':' + password).toString('base64')
 
var options = {
    host: 'www.mokelay.com',
    port: 80,
    path: '/config/load-app-buzz',
    method: 'POST',
    headers:{
        'accept': '*/*',
        'content-type': "application/x-www-form-urlencoded",
        'accept-encoding': 'gzip, deflate',
        'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8',
        'user-agent': 'nodejs rest client'
    }
};
 
var req = http.request(options, function (res) {
    res.on('data',function (chunk) {
         var d = JSON.parse(chunk.toString());
         console.log(d)
    });
});
 
req.on('error', function(e) {
  console.log('problem with request: ' + e.message);
});

req.write(postData); 
 
req.end();