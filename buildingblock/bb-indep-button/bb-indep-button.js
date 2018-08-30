// buildingblock/bb-indep-button/bb-indep-button.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    //dom 样式渲染
    domStyle:{
      type:String
    },
    /**
     * 按钮配置
     * {
          type:'primary',//按钮样式
          size:'small',//按钮大小
          icon:'icon',//按钮图标
          text:'按钮文字',//
          loading:true,//小程序特有，按钮loading 效果！！！！
          action:'url 地址跳转|| execute-ds执行接口',
          url:''跳转地址 action:'url’时有效
          ds:{} //按钮请求的接口配置 action:'execute-ds’时有效
          confirmTitle:'', //请求接口前的提示语标题   action:'execute-ds’时有效
          confirmText:'', //请求接口前的提示语内容   action:'execute-ds’时有效
          callBackStaticWords:'', //请求接口成功提示语
          noConfirm:true //不要弹窗确认
        }
     */
    button:{
      type:Object
    },
    /**
     * 其他属性
     * disabled:false, //禁用
        readonly:false,  //只读
        disabledStyle:{}  //禁用状态样式
     */
    options:{
      type:Object
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    external:{},//外部参数
    realOptions:{},//基础配置
    isShow:true
  },

  attached:function(){
    this.setData({
      realOptions: this.properties.options
    });
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //外部参数，在button中存储
    linkage(...data) {
      let t = this;
      if (data) {
        this.external['linkage'] = data;
      }
    },
    //按钮点击事件
    btnClick:function(event){
      let t=this;
      app.globalData._TY_Tool.resolveButton(button, app.globalData._TY_Tool.buildTplParams(this));
      t.triggerEvent('buttonClick', {}, {button:button,bb:t});
      t.triggerEvent('click', {}, { button: button, bb: t });
    },
    //隐藏积木
    hideFn() {
      this.data.isShow = false;
    },
    //展示积木
    showFn() {
      this.data.isShow = true;
    },
    //禁用积木
    disabledFn() {
      this.data.realOptions.disabled = true;
    },
    //启用积木
    enabledFn() {
      this.data.realOptions.disabled = false;
    }
  }
})
