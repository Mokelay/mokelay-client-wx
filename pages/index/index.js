//获取应用实例
var util = require("../../utils/util.js");

// console.log(pageAlias);
const app = getApp()

Page({
  data: {
    content:null
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

    wx.request({
      url: 'http://www.mokelay.com/config/load-page-data',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        alias: pageAlias
      },
      dataType:"json",
      method:'POST',
      success:function(res){
        var data = res.data['data'];
        console.log(data);
        var page = data['page'];
        var layoutObject = JSON.parse(page['layoutObject']);
        var content = JSON.parse(page['content']);

        wx.setNavigationBarTitle({
          title: layoutObject['title']
        });

        console.log(content);
        t.setData({
          content:content
        })
      }
    });
  }
})
