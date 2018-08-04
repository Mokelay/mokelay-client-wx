// component/bb-wx-text/bb-wx-text.js
var WxParse = require('../../lib/wxParse/wxParse.js');

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    value: {
      type: String,
      value: 'default value',
    },
    defaultValTpl:{
      type:null
    }
  },

  ready:function(){
    this.setData({
      content:this.data.value
    });
    WxParse.wxParse('content', 'html', this.data.content, this, 0);
  },

  /**
   * 组件的初始数据
   */
  data: {
    content:null
  },

  /**
   * 组件的方法列表
   */
  methods: {
    load:function(){}
  }
})
