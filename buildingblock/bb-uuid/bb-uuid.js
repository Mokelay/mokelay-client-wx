// buildingblock/bb-uuid/bb-uuid.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    value: {
      type: [String, Number]
    },
    length: {
      type: Number
    },
    radix: {
      type: Number
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    valueBase:""
  },

  attached:function(){
    let t=this;
    t.setData({
      valueBase: t.properties.value
    });
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
