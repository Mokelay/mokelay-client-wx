//获取应用实例
var util = require("../../lib/util.js");

// console.log(pageAlias);
const app = getApp()

Page({
  data: {
    pageAlias:null
  },
  onLoad: function (options) {
    var t = this;
    var pageAlias = this.options['alias'];
    if (!pageAlias || pageAlias.length == 0 ){
      // wx.showToast({
      //   title: "请设置页面别名", 
      //   mask: true, 
      //   icon: "none" 
      //   });
      // return;

      //默认首页
      pageAlias = "xy_partner_home";
    }
    this.setData({
      pageAlias: pageAlias
    });
    //将当前组件对象放到全局变量中
    app.globalData._TY_Root = this;
  },
  onShow:function(){
    //页面每次渲染都会触发
    app.globalData._TY_Root = this;
    //清空分享数据
    app.globalData._TY_Share = {
      title: '',//分享标题
      path: '',//分享路径  必须是以/ 开头的路径
      imageUrl: ''//分享图片 支持 PNG及JPG
    }
  },
  //上拉触底事件
  onReachBottom:function(){
    
  },
  //转发  分享规则
  onShareAppMessage:function(args){
    //通过修改全局的分享对象  跳转到对应路径
    return app.globalData._TY_Share;
  }
})
