//批处理脚本，用于从服务端下载所有的page配置以及巴斯函数

var http = require('http');
var querystring=require('querystring');
var fs = require('fs');
var path = require('path');
 
// var postData=querystring.stringify({
// 	appAlias:'xy_partner'
// });
 
var options = {
    host: 'www.mokelay.com',
    port: 80,
    path: '/config/load-app-buzz?appAlias=xy_partner',
    method: 'GET',
    headers:{
        'accept': '*/*',
        'content-type': "application/x-www-form-urlencoded",
        'accept-encoding': 'gzip, deflate',
        'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8',
        'user-agent': 'nodejs rest client'
    }
};
 
var req = http.request(options, function (res) {
	res.setEncoding('utf-8');
	var content = [];
    res.on('data',function (chunk) {
    	content.push(chunk.toString());
    });

    res.on('end',function(){
    	var d = JSON.parse(content.join(''));
    	if(d['data'] && d['data']['data_list']){
    		var buzzList = d['data']['data_list']['list'];
    		for(var i in buzzList){
    			var buzz = buzzList[i];
    			var alias = buzz['alias'];
    			var code = buzz['code'];
    			console.log("Write:"+alias+".js");

    			var  p =path.join(__dirname,'buzz',alias+".js");
    			fs.writeFile(p,code,(err)=>{
    				if(err){
    					console.log("Write buzz error:");
    					console.log(err);
    				}
    			})
    		}
    		// console.log(d);
    		// 
    		// console.log(p);
    	}
    });
});
 
req.on('error', function(e) {
  console.log('problem with request: ' + e.message);
});
 
req.end();