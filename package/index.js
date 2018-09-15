//页面数据加载
var util = require("../lib/util.js");

const app = getApp()

module.exports = {
	/**
		根据页面别名加载页面数据
	**/
	loadPage:function(pageAlias){
		var t = this;
		return new Promise(function(resolve, reject) {
			if(app.globalData._TY_Package){
				t.loadLocalPage(pageAlias).then(function(value){
					resolve(value);
				}).catch(function(e){
					t.loadRemotePage(pageAlias).then(function(value){
						resolve(value);
					}).catch(function(e){
						reject(e);
					});
				});
			}else{
				t.loadRemotePage(pageAlias).then(function(value){
					resolve(value);
				}).catch(function(e){
					reject(e);
				});
			}
		});
	},
	/**
		根据页面别名加载本地页面数据
	**/
	loadLocalPage:function(pageAlias){
		return new Promise(function(resolve, reject) {
			try{
				resolve(require("./page/"+pageAlias+".js"))
			}catch(e){
				reject(e);
			}
		});
	},
	/**
		根据页面别名加载远程页面数据
	**/
	loadRemotePage:function(pageAlias){
		return new Promise(function(resolve, reject) {
			util.post('/config/load-page-data', {alias: pageAlias}).then((res)=>{
				var data = res.data['data'];
				var page = data['page'];
				resolve(page);
			});
		});
	}
};