// buildingblock/bb-vant-switch/bb-vant-switch.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    value: {
      type: [Boolean,String]
    },
    defaultValTpl:{
      type:String
    },
    //基础配置
    option: {
      type: Object,
      value: {
        size: "",
        activeText: "是",
        inactiveText: "否",
        disabled: false,
        readonly: false
      }
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    isShow: true,
    valueBase:false,
  },
  attached: function () {
    let t = this;
    let value = t.properties.value == null ? t.properties.defaultValTpl : t.properties.value;
    let valueBase = typeof value == "string"?value == "true":value;
    t.setData({
      valueBase: valueBase
    });
  },
  /**
   * 组件的方法列表
   */
  methods: {
    change:function(e){
      this.triggerEvent("input", e.detail.value);
      this.triggerEvent("change", e.detail.value);
    },
    hideFn() {
      this.isShow = false;
    },
    //展示积木
    showFn() {
      this.isShow = true;
    },
  }
})
