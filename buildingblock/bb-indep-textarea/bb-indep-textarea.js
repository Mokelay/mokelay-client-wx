// buildingblock/bb-indep-textarea/bb-indep-textarea.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    value:{
      type:String
    },
    placeholder:{
      type:String,
      value:'请输入...'
    },
    //最大长度
    showText:{
      type:Number,
      value:-1
    },
    styleConfig:{
      type:Object
    },
    //基础配置
    option:{
      type:Object,
      value:{
        disabled:false
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    //显示组件
    isShow:true,
    cssStyle:""
  },
  attached:function(){
    let t=this;
    t.setData({
      cssStyle:t.transferCss(t.properties.styleConfig)
    });
  },
  /**
   * 组件的方法列表
   */
  methods: {
    transferCss:function(val){
      const t = this;
      if (!val){
        val = {
          fontFamily: '',
          fontSize: '28rpx',
          fontColor: '#9a9a9a',
          bold: false,
          italic: false,
          underline: false,
          textAlign: 'left',
          lingHeight: 1.5,
          letterSpacing: 0,
          borderWidth: 1,
          borderColor: "#6298D8",
          borderStyle: "solid",
          borderRadius: "4rpx",
          width: "100%",
          resize: "none",
          height: "100rpx",
          padding: "10rpx",
          margin: "",
        };
      }
      const styles = {
        "border-radius": val.borderRadius,
        "padding": val.padding,
        "margin": val.margin,
        "height": val.height,
        "resize": val.resize,
        "width": val.width,
        "border-style": val.borderStyle,
        "border-color": val.borderColor,
        "border-width": val.borderWidth,
        'font-family': val.fontFamily,
        'font-size': val.fontSize,
        'color': val.fontColor,
        'font-weight': val.bold ? 'bold' : 'normal',
        'font-style': val.italic ? 'italic' : 'normal',
        'ling-height': val.lingHeight,
        'letter-spacing': val.letterSpacing,
        'text-decoration': val.underline ? 'underline' : 'none',
        'text-align': val.textAlign
      }
      return styles;
      
    },
    //改变 blur
    change:function(e){
      const t =this;
      t.triggerEvent("input", { value: e.detail.value });
      t.triggerEvent("change", { value: e.detail.value });
    },
    //外部设值
    setNumber: function (...params) {
      params.forEach((param, key) => {
        if (param.type == "custom") {
          this.setData({
            value: param.arguments
          });
        }
      })
    },
    //隐藏积木
    hideFn() {
      this.setData({
        isShow:false
      });
    },
    //展示积木
    showFn() {
      this.setData({
        isShow: true
      });
    },
    //禁用积木
    disabledFn() {
      let tmp = this.properties.option;
      tmp.disabled = true;
      this.setData({
        option:tmp
      });
    },
    //启用积木
    enabledFn() {
      let tmp = this.properties.option;
      tmp.disabled = false;
      this.setData({
        option: tmp
      });
    },
    //外部取值
    getValue: function () {
      return this.properties.value;
    },
    //外部设值
    setValue: function (val) {
      this.setData({
        value:val
      });
      t.triggerEvent("input", { value: val });
      t.triggerEvent("change", { value: val });
    }
  }
})
