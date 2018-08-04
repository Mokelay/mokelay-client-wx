// component/bb-wx-text/bb-wx-text.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    text: {
      type: String,
      value: 'default value',
    },
    selectable:{
      type:Boolean
    },
    decode:{
      type:Boolean
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    someData: {}
  },

  /**
   * 组件的方法列表
   */
  methods: {
    load:function(){}
  }
})
