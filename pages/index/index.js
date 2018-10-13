//获取应用实例
var util = require("../../lib/util.js");

// console.log(pageAlias);
const app = getApp()

Page({
  data: {
    pageAlias:null,
    show:true,
    imagePath:""
  },
  onLoad: function (options) {
    var t = this;
    var pageAlias = this.options['alias'] || app.globalData._TY_Home;
    if (options.scene){
      /**
        * 扫描小程序二维码进入页面
        *  options 中的 scene 需要使用 decodeURIComponent 才能获取到生成二维码时传入的 scene
        * 完整的地址应该是 /page/index/index?test&id=123
        * eg: scene = test&id=123
        */
      // var scene = app.globalData._TY_Tool.decode(options.scene);
      var scene = options.scene;
      
      if (scene.indexOf("&")>=0){
        //有参数的页面，直接跳转到对应页面   index?pageAlias&id=123
        wx.navigateTo({
          url: "index" + scene
        });
      }else{
        //不带参数的页面
        pageAlias = scene;
      }
    }

    if (!pageAlias || pageAlias.length == 0 ){
      wx.showToast({
        title: "请设置页面别名", 
        mask: true, 
        icon: "none" 
        });
      return;
    }
    this.setData({
      pageAlias: pageAlias
    });
    //将当前组件对象放到全局变量中
    app.globalData._TY_Root = this;
    this.createSharePic()
  },
  onShow:function(){
    //页面每次渲染都会触发
    app.globalData._TY_Root = this;
    //清空分享数据
    app.globalData._TY_Share = {
      title: '',//分享标题
      path: '',//分享路径  必须是以/ 开头的路径
      imageUrl: this.data.imagePath//分享图片 支持 PNG及JPG
    }
  },
  //上拉触底事件
  onReachBottom:function(){
    
  },
  onPullDownRefresh: function () {
    const t = this;
    wx.showNavigationBarLoading();
    t.setData({
      show:false
    });setTimeout(()=>{
      t.setData({
        show: true
      });
      wx.hideNavigationBarLoading();
      // 停止下拉动作  
      wx.stopPullDownRefresh();
    },500)
  },
  //转发  分享规则
  onShareAppMessage:function(args){
    app.globalData._TY_Share.imageUrl = this.data.imagePath//分享图片 支持 PNG及JPG
    return app.globalData._TY_Share;
  },
  settext: function (context) {
    let _this = this;
    var size = _this.setCanvasSize();
    var text = "123456789";
    context.setFontSize(30);
    context.setTextAlign("center");
    context.setFillStyle("#fff");
    context.fillText(text, size.w / 2, 80);
    context.stroke();
  },
  createNewImg: function () {
    var _this = this;
    var size = _this.setCanvasSize();
    var context = wx.createCanvasContext('myCanvas');
    var imageQrCode = _this.data.filePath;　　　　　　　//二维码
    context.drawImage(imageQrCode, 0, 0, size.w, size.h);
    this.settext(context);
    //绘制图片
    context.draw();
    //将生成好的图片保存到本地，需要延迟一会，绘制期间耗时
    wx.showToast({
      title: '生成中...',
      icon: 'loading',
      duration: 1000
    });
    setTimeout(function () {
      wx.canvasToTempFilePath({
        x: 0,
        y: 0,
        width: 400,
        height: 400,
        canvasId: 'myCanvas',
        success: function (res) {
          var tempFilePath = res.tempFilePath;
          console.log("tempFilePath:", tempFilePath);
          _this.uploaderImg(tempFilePath)
          // _this.setData({
          //   imagePath: tempFilePath,
          // });
          // var img = _this.data.imagePath;
          // let urls = []
          // urls.push(img, '二维码路径')   //二维码路径是为了用户也可以保存二维码，分享到朋友圈有合成的图片也有二维码（参考拉钩小程序分享）
          // wx.previewImage({
          //   current: img,  // 当前显示图片的http链接
          //   urls: urls  // 需要预览的图片http链接列表
          // })
        },
        fail: function (res) {
          console.log(res);
        }
      }, _this);
    }, 1000);
  },
  createSharePic() {
    let _this = this,
      qrcode = _this.data.qrcode
    //从网上取图片  需要设置合法的downloadFile  域名
    // wx.downloadFile({
    //   url: "https://social-crm.oss-cn-qingdao.aliyuncs.com/8c2e7f893c9146c841044b18b26c7c70.png",
    //   success: function (res) {
    //     if (res.statusCode === 200) {
    //       _this.setData({
    //         filePath: res.tempFilePath,
    //       })
    //       _this.createNewImg();
    //     }
    //   }
    // })
  //从本地取图片
    _this.setData({
      filePath: "../../images/invite.jpg",
    })
    _this.createNewImg();
  },
  setCanvasSize() {
    return {
      h: 400,
      w: 400
    }
  },
  uploaderImg(imagePath){
    const t = this;
    wx.uploadFile({
      url: app.globalData._TY_APIHost + "/config/xy_oss_upload",
      filePath: imagePath,
      name: 'file',
      formData: {
        'imgIndex': 1
      },
      header: {
        "Content-Type": "multipart/form-data"
      },
      success: function (res) {
        var response = JSON.parse(res.data);
        console.log("uploader:",res);
        let data = response.data;
        console.log("uploader:", res);
        //服务器返回文件地址 file_url   序列化文件名：file_serialize_name
        const url = data.file_url;
        t.setData({
          imagePath: url,
        });
        
      },
      fail: function (res) {
        // wx.hideToast();
      }
    });
  }
})
