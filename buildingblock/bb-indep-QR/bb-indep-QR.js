// buildingblock/bb-indep-QR/bb-indep-QR.js
var QR = require('../../lib/qrcode/qrcode.js');
var app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    /*二维码类型
        default 默认 wx微信小程序二维码
    */
    qrType: {
      type: String
    },
    url: {
      type: Boolean
    },
    //大小
    size: {
      type: Number
    },
    //微信配置
    wxOptions: {
      type: Object
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    realUrl:"http://ty.saiyachina.com/",
    realSize:200,
    canvasHidden: false,
    maskHidden: true,
    imagePath: '',
    realWxOptions: {
      //参数
      scene: "pageAlias",
      //页面
      page: "pages/index/index",
      //透明底色
      is_hyaline: false
    },
    sizeStyle:""
  },
  attached: function () {
    const t = this;
    const pages = getCurrentPages();
    let realUrl = pages[0].route;
    if (t.properties.url){
      realUrl = wx._TY_Tool.tpl(t.properties.url, t);
    }
    t.data.realUrl = realUrl;
    t.data.realSize = t.properties.size || 200;
    t.data.realWxOptions = t.properties.wxOptions ? t.properties.wxOptions : t.data.realWxOptions;
  },
  ready: function () {
    const t = this;
    if (t.properties.qrType == "wx") {
      const scene = encodeURIComponent(t.data.realWxOptions.scene);
      const page = encodeURIComponent(t.data.realWxOptions.page);
      const url = `${app.globalData._TY_APIHost}/config/test_xiaobc_wx_mp_qr_code?scene=${scene}&page=${page}&hyaline=${t.data.realWxOptions.is_hyaline}`
      t.setData({
        imagePath: url
      })
    }else{
      // 页面初始化 options为页面跳转所带来的参数
      var size = this.setCanvasSize();//动态设置画布大小
      var initUrl = this.data.realUrl;
      this.setData({
        sizeStyle: `height:${size.w}px;width:${size.h}px;`
      });
      this.createQrCode(initUrl, "mycanvas", size.w, size.h, this);
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    setUrl: function (...args) {
      const t = this;
      args.forEach((val, key) => {
        if (val.type == 'custom') {
          t.data.realUrl = val.arguments;
          var initUrl = t.data.realUrl;
          t.createQrCode(initUrl, "mycanvas", size.w, size.h, this);
        }
      });
    },
    //适配不同屏幕大小的canvas
    setCanvasSize: function () {
      const t = this;
      var size = {};
      try {
        var res = wx.getSystemInfoSync();
        var scale = 750 / 686;//不同屏幕下canvas的适配比例；设计稿是750宽
        var width = res.windowWidth / scale;
        var height = width;//canvas画布为正方形
        size.w = t.data.realSize || width;
        size.h = t.data.realSize || height;
      } catch (e) {
        // Do something when catch error
        console.log("获取设备信息失败" + e);
      }
      return size;
    },
    createQrCode: function (url, canvasId, cavW, cavH) {
      //调用插件中的draw方法，绘制二维码图片
      QR.api.draw(url, canvasId, cavW, cavH,this);
      setTimeout(() => { this.canvasToTempImage(); }, 1000);
    },
    //获取临时缓存照片路径，存入data中
    canvasToTempImage: function () {
      var that = this;
      wx.canvasToTempFilePath({
        canvasId: 'mycanvas',
        success: function (res) {
          var tempFilePath = res.tempFilePath;
          console.log(tempFilePath);
          that.setData({
            imagePath: tempFilePath,
            // canvasHidden:true
          });
        },
        fail: function (res) {
          console.log(res);
        }
      },that);
    },
    formSubmit: function (e) {
      var that = this;
      var url = e.detail.value.url;
      that.setData({
        maskHidden: false,
      });
      wx.showToast({
        title: '生成中...',
        icon: 'loading',
        duration: 2000
      });
      var st = setTimeout(function () {
        wx.hideToast()
        var size = that.setCanvasSize();
        //绘制二维码
        that.createQrCode(url, "mycanvas", size.w, size.h);
        that.setData({
          maskHidden: true
        });
        clearTimeout(st);
      }, 2000)

    }
  }
})
