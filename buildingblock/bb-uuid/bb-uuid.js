// buildingblock/bb-uuid/bb-uuid.js

const app = getApp();

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
    if (!t.properties.value) {
      t.generate();
    }else{
      t.setData({
        valueBase: t.properties.value
      });
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    generate: function () {
      const t=this;
      var val = app.globalData._TY_Tool.uuid(t.properties.length, t.properties.radix);
      this.v = val;
      t.setData({
        value:val,
        valueBase:val
      });
      t.triggerEvent('input', { value: val});
      t.triggerEvent('change', { value: val });
    }
  }
})
