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
    },
    //渲染样式
    domStyle:{
      type:String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    valueBase:"",
    realOption:{},
    isShow:true
  },
  //此时可以setData
  attached: function () {
    let t = this;
    this.setData({
      valueBase: t.properties.value,
      realOption: t.properties.option
    });
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //输入事件
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
    },
    //影藏积木
    hideFn:function(){
      this.setData({
        isShow:false
      });
    },
    //显示积木
    showFn:function(){
      this.setData({
        isShow:true
      });
    },
    //禁用
    disabledFn:function(){
      this.data.realOption.disabled = true;
    },
    //启用
    enabledFn:function(){
      this.data.realOption.disabled = false;
    },
    //外部取值
    getValue: function () {
      return this.data.valueBase;
    },
    //外部设值
    setValue: function (val) {
      this.setData({
        valueBase : val
      });
      this.triggerEvent('input', val);
      this.triggerEvent('change', val);
    }

  }
})
