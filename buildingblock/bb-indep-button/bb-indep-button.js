// buildingblock/bb-indep-button/bb-indep-button.js
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
          disabled:false,//按钮是否可编辑
          size:'small',//按钮大小
          icon:'icon',//按钮图标
          text:'按钮文字',//
          action:'url 地址跳转|| execute-ds执行接口',
          url:''跳转地址 action:'url’时有效
          ds:{} //按钮请求的接口配置 action:'execute-ds’时有效
          confirmTitle:'', //请求接口前的提示语标题   action:'execute-ds’时有效
          confirmText:'', //请求接口前的提示语内容   action:'execute-ds’时有效
          callBackStaticWords:'' //请求接口成功提示语
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

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
