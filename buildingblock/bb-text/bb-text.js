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
      content: this.valueTpl(this.data.value)
    });
    this.render();
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
    valueTpl: function (val) {
      const t = this;
      return wx._TY_Tool.tpl(val, wx._TY_Tool.buildTplParams(t));
    },
    render:function(){
      WxParse.wxParse('content', 'html', this.data.content, this, 0);
    },
    load:function(){},
    getValue:function(){
      return this.data.content;
    },
    setValue:function(val){
      let t=this;
      t.setData({
        content: t.valueTpl(val),
        value: t.valueTpl(val)
      });
      t.render();
    }
  }
})
