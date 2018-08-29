// buildingblock/bb-input/bb-input.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    value: {
      type: [String, Number]
    },
    //基础配置
    option: {
      type: Object,
      value: {
        type: "text",//输入框的类型，小程序属性
        disabled: false,
        placeholder: "请输入内容",
        maxLen: 1000000000
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    valueBase:"",
    realOption:{}
  },
  //此时可以setData
  attached: function () {
    let t = this;
    this.setData({
      valueBase: t.data.value,
      realOption: t.data.option
    });
  },
  /**
   * 组件的方法列表
   */
  methods: {
    inputEvent:function(event){
      let val = event.detail.value;
      this.setData({
        valueBase:val
      });
      this.triggerEvent("input",val);
      this.triggerEvent("change", val);
    },
    focusEvent:function(){
    },
    blurEvent:function(event){
    },
    confirmEvent:function(event){
    }

  }
})
