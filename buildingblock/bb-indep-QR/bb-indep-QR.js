// buildingblock/bb-indep-QR/bb-indep-QR.js
var QR = require('../../lib/qrcode/qrcode.js');
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    url: {
      type: Boolean
    },
    //大小
    size: {
      type: Number
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
  },
  ready: function () {
    // 页面初始化 options为页面跳转所带来的参数
    var size = this.setCanvasSize();//动态设置画布大小
    var initUrl = this.data.realUrl;
    this.createQrCode(initUrl, "mycanvas", size.w, size.h, this);
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
