// buildingblock/bb-indep-sms/bb-indep-sms.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    fieldConfig: {
      type: Object
    },
    buttonConfig: {
      type: Object
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    fieldOption: {
      "theme": "default",
      "label": "手机号码",
      "error": false,
      "errorMessage": "",
      "autosize": true,
      "type": "tel",
      "maxText": 11,
      "border": true,
      "showMessageText": false,
      "noPadding": false
    }, 
    sendButton: {
      "selectText": "获取验证码",
      "buttonType": "default",
      "type": "text",
      "size": "mini",
      "color": "",
      "action": "execute-ds",
      "buzz": "buzzNull",
      "style": {
        "fontSize": "12px"
      },
      "fontSize": "12px",
      "ds": {
        "api": "test-aliyun-sms",
        "category": "config",
        "method": "POST",
        "url": ""
      },
      "confirmText": "请查收您的短信",
      "callBackStaticWords": "短信发送成功"
    },
    sendButtonOptions: {
      "disabled": true,
      "disabledStyle": {
        "font": {                  //阴影
          "size": "12px",            //阴影大小
          "color": "#cccccc",       //阴影方向
        },
      }
    },
    fieldUUid: "",
    buttonUUid: "",
    valueBase:""
  },
  attached: function () {
    let sendButton = {};
    let sendButtonOptions = {};
    let fieldOption = {};
    if (this.properties.buttonConfig){
      sendButton = this.properties.buttonConfig.button;
      sendButtonOptions = this.properties.buttonConfig.options
    }else{
      sendButton = this.data.sendButton;
      sendButtonOptions = this.data.sendButtonOptions;
    }
    if (this.properties.fieldConfig){
      fieldOption = this.properties.fieldConfig
    }else{
      fieldOption = this.data.fieldOption
    }
    sendButton.style = "background:rgb(26, 173, 25);color:#fff;width:240rpx;padding:7rpx 0;"
    this.setData({
      fieldOption: fieldOption,
      sendButton: sendButton,
      sendButtonOptions: sendButtonOptions,
      fieldUUid: wx._TY_Tool.uuid(),
      buttonUUid: wx._TY_Tool.uuid()
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    fieldChange: function (e) {
      const t = this;
      const val = e.detail;
      var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
      t.data.valueBase = val;
      t.triggerEvent("change", val);
      t.triggerEvent("input", val);
      if (myreg.test(val)) {
        wx._TY_Tool.findBBByUuid(t.data.buttonUUid).enabledFn()
      } else {
        wx._TY_Tool.findBBByUuid(t.data.buttonUUid).disabledFn()
      }
    },
    buttonSuccess: function (...args) {
      const t = this;
      var msgButton = wx._TY_Tool.findBBByUuid(t.data.buttonUUid);
      msgButton.__proto__.countDown();
    }
  }
})
