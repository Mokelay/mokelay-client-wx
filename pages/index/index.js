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
      wx.showToast({
        title: "请设置页面别名", 
        mask: true, 
        icon: "none" 
        });
      return;
    }
    this.setData({
      pageAlias: pageAlias
    });
  }
})
