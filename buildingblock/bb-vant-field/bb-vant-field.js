// buildingblock/bb-vant-field/bb-vant-field.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    //内容
    value: {
      type: String,
    },
    /*模板默认值*/
    defaultValTpl: {
      type: [String, Number, Boolean]
    },
    /*其他属性配置
        {
            type:"defalut", 可设置为任意原生类型 number tel textarea
            placeholder:"", 
            label:"标签名",
            icon:"", 输入框尾部图标
            leftIcon:"",输入框左侧图标
            required:false,
            disabled:false,
            border:true,
            error:false,  是否将输入内容标红
            errorMessage:"错误提示文案", 底部错误提示文案 
            autosize:true 自适应内容高度，只对 textarea 有效
            valueStyle:{} 
        }
    */
    option: {
      type: Object
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    valueBase:"",
    realOption: {
      type: "defalut",
      placeholder: "",
      label: "标签名",
      icon: "",
      leftIcon: "",
      required: false,
      disabled: false,
      error: false,
      errorMessage: "",
      autosize: true,
      maxText: 100000,
      border: true,
      showMessageText: true,
      valueStyle: {}
    },

  },
  created: function () {
  },
  attached: function () {
    const newOption = this.properties.option;
    // const valueBase = wx._TY_Tool.tpl(this.properties.defaultValTpl,this)
    this.setData({
      realOption:newOption
    })
  },
  ready: function () {
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //点击图标
    clickIcon(e) {
      this.triggerEvent('clickIcon', e);
    },
    //输入事件
    input(e) {
      this.data.value = e.detail.value;
      this.data.valueBase = e.detail.value;
      this.triggerEvent('input', e.detail.value);
      this.triggerEvent('change', e.detail.value);
    },
    //显示字符，超出限制字符截取
    keyup(key) {
      // this.valueBase = this.valueBase + key.key;
      this.writeText = this.valueBase.length;
      this.triggerEvent('onFocus', this.valueBase);
      var t = this.valueBase;
      var w = this.writeText;
      var s = this.option.maxText;
      if (w > s) {
        var a = this.valueBase.substring(0, s);
        this.valueBase = a;
        this.writeText = this.valueBase.length;
      }
    },
    focus:function(){

    },
    blur:function(){
      
    },
    getValue:function(){
      return this.data.value;
    }
  }
})
