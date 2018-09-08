//app.js
var env = require("./env/index.js")['default'];

App({
  onLaunch: function (options) {
    console.log("onLaunch....");
    console.log(options);
  },
  onError: function(){
    console.log("error:.......")
  },
  onShow:function(options){
    console.log("onShow...");
    console.log(options);
  },
  onHide:function(){
    console.log("hide..");
  },
  globalData: {
    userInfo: null,
    _TY_APIHost:env['apiHost'],
    _TY_Home:env['home'],

    _TY_ContentPath:"/config",

    _TY_Share:{
      title:'',//分享标题
      path:'',//分享路径  必须是以/ 开头的路径
      imageUrl: ''//分享图片 支持 PNG及JPG
    }
  }
})