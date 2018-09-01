// component/bb-page/bb-page.js
var util = require("../../lib/util.js");

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
    content:null
  },

  ready:function(){
    var t = this;
    util.post(
      '/config/load-page-data', 
      { alias: this.data.pageAlias },
      function(res){
        var data = res.data['data'];
        var page = data['page'];
        var layoutObject = page['layoutObject']&&JSON.parse(page['layoutObject']);
        var content = page['content']&&JSON.parse(page['content']);

        wx.setNavigationBarTitle({
          title: layoutObject&&layoutObject['title']||'加载中....'
        });

        t.setData({
          content: content
        });

        console.log(content);
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
    }
  }
})
