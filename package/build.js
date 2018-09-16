//批处理脚本，用于从服务端下载所有的page配置以及巴斯函数
var http = require('http');
var querystring=require('querystring');
var fs = require('fs');
var path = require('path');
var appAlias = 'xy_partner';

//同步巴斯脚本
var options = {
    host: 'www.mokelay.com',
    port: 80,
    path: '/config/load-app-buzz?appAlias='+appAlias,
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
    			console.log("Write buzz:"+alias+".js");

    			var  p =path.join(__dirname,'buzz',alias+".js");
    			fs.writeFile(p,code,(err)=>{
    				if(err){
    					console.log("Write buzz error:");
    					console.log(err);
    				}
    			})
    		}
    	}
    });
});
req.on('error', function(e) {
  console.log('problem with request: ' + e.message);
});
req.end();

//同步页面配置
var options2 = {
    host: 'www.mokelay.com',
    port: 80,
    path: '/config/load_app_page?appAlias='+appAlias,
    method: 'GET',
    headers:{
        'accept': '*/*',
        'content-type': "application/x-www-form-urlencoded",
        'accept-encoding': 'gzip, deflate',
        'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8',
        'user-agent': 'nodejs rest client'
    }
};
var req2 = http.request(options2, function (res2) {
    res2.setEncoding('utf-8');
    var content2 = [];
    res2.on('data',function (chunk) {
        content2.push(chunk.toString());
    });

    res2.on('end',function(){
        var d = JSON.parse(content2.join(''));
        if(d['data'] && d['data']['data_list']){
            var pageList = d['data']['data_list']['list'];
            for(var i in pageList){
                var page = pageList[i];
                console.log("Write page:"+page['alias']+".js");

                var  p =path.join(__dirname,'page',page['alias']+".js");
                var code = "module.exports = "+JSON.stringify(page);
                fs.writeFile(p,code,(err)=>{
                    if(err){
                        console.log("Write page error:");
                        console.log(err);
                    }
                })
            }
        }
    });
});
req2.on('error', function(e) {
  console.log('problem with request: ' + e.message);
});
req2.end();