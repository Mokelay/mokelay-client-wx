// component/bb-page/bb-page.js
var util = require("../../lib/util.js");
var pkg = require("../../package/index.js");

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    root: {
      type: Boolean,
      value:false
    },
    //支持模板
    pageAlias: {
      type: String
    },
    layoutStyle: {
      type: null
    },
    params: {
      type: null
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    content:null,
    pageStyle:""//页面全局样式
  },

  ready:function(){
    var t = this;
    pkg.loadPage(this.data.pageAlias).then(function(page){
      var layoutObject = page['layoutObject']&&JSON.parse(page['layoutObject']);
      var content = page['content']&&JSON.parse(page['content']);

      wx.setNavigationBarTitle({
        title: layoutObject&&layoutObject['title']||'加载中....'
      });
      if (layoutObject && layoutObject.cssStyle){
        let _css = util.setSimpleStyle(layoutObject.cssStyle);
        t.setData({
          pageStyle: _css
        });
      }
      t.setData({
        content: content
      });
    }).catch(function(e){
      console.log(e);
    });
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 用于交互 页面跳转 重定向
     */
    redirect: function (...args) {
      let t = this;
      const params = args[0];
      args.forEach((val, key) => {
        if (val.type == 'custom') {
          let url = val.arguments;
          url = app.globalData._TY_Tool.tpl(url, app.globalData._TY_Tool.buildTplParams(t, params));
          wx.navigateTo({
            url: url
          });
        }
      });
    },
    /*回退
        url 跳转地址  不传则回退
      */
    goBack:function(...args) {
      let url;
      args.forEach((val, key) => {
        if (val.type == 'custom') {
          url = val.arguments;
        }
      });
      if (url) {
        wx.navigateBack({
          delta: url
        })
      } else {
        wx.navigateBack({
          delta: 1
        })
      }
    }
  }
})
