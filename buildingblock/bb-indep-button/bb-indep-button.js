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
          theme:'vc',//按钮主题 默认、验证码
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
      type:Object,
      value:{
        disabled: false
      }
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    external:{},//外部参数
    realOptions:{},//基础配置
    realButton:{},
    isShow:true
  },

  attached:function(){
    this.setData({
      realOptions: this.properties.options,
      realButton:this.properties.button
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
      app.globalData._TY_Tool.resolveButton(t.data.realButton, app.globalData._TY_Tool.buildTplParams(t));
      t.triggerEvent('buttonClick', { button: t.data.realButton, bb: t}, {});
      t.triggerEvent('click', { button: t.data.realButton, bb: t }, {});
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
      let realOptions = this.data.realOptions;
      realOptions.disabled = true;
      this.setData({
        realOptions: realOptions
      });
    },
    //启用积木
    enabledFn() {
      let realOptions = this.data.realOptions;
      realOptions.disabled = false;
      this.setData({
        realOptions: realOptions
      });
    },
    //显示loading
    showLoading:function(){
      let realButton = this.data.realButton;
      realButton.loading = true;
      this.setData({
        realButton: realButton
      });
    },
    //影藏loading
    hideLoading:function(){
      let realButton = this.data.realButton;
      realButton.loading = false;
      this.setData({
        realButton: realButton
      });
    },
    //修改按钮文案
    changeText:function(...args){
      let t=this;
      args.forEach((val, key) => {
        if (val.type == 'custom') {
          let _text = val.arguments;
          let realButton = this.data.realButton;
          realButton.text = _text;
          this.setData({
            realButton: realButton
          });
        }
      });
    },
    /**
     * 按钮文案倒计时 显示
     * text 文案
     * time 时间
     */
    countDown: function (...args){
      let t = this;
      if (!t.data||!t.data.realButton){
        return;
      }
      let params = {};
      args.forEach((val, key) => {
        if (val.type == 'custom') {
          params = val.arguments;
        }
      });
      params.text = params.text ? params.text:'重新发送';
      let num = params.time ? params.time : 60;
      let timeIndex = setInterval(()=>{
        num--;
        if(num<0){
          if (timeIndex){
            clearInterval(timeIndex);  
          }
          let realButton = t.data.realButton;
          realButton.text = t.properties.button.text;
          t.setData({
            realButton: realButton
          });
          t.enabledFn();
        }else{
          const _text = params.text + "(" + num+")";
          let realButton = t.data.realButton;
          realButton.text = _text;
          t.setData({
            realButton: realButton
          });
        }
      },1000);
    }
  }
})
