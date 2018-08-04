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
        var layoutObject = JSON.parse(page['layoutObject']);
        var content = JSON.parse(page['content']);

        wx.setNavigationBarTitle({
          title: layoutObject['title']
        });

        t.setData({
          content: content
        });
      });
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
