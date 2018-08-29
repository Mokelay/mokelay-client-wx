// component/bb/bb.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    value: {
      type: null
    },
    alias: {
      type: String
    },
    attributes: {
      type: Object
    },
    bb: {
      type: Object
    },
    on: {
      type: Object
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
     cssStyle:""
  },

  //设置css样式
  attached:function(){
    let t=this;
    if (t.data.bb && t.data.bb.layout){
      let _css = getApp().globalData._TY_Tool.setSimpleStyle(t.data.bb.layout);
      t.setData({
        cssStyle: _css
      });
    }
  },

  ready:function(){
    // console.log("bb is ready");
  },

  /**
   * 组件的方法列表
   */
  methods: {
  }
})
