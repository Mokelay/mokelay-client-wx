// buildingblock/bb-indep-share/bb-indep-share.js

const app = getApp();

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    domStyle:{
      type:String
    },
    //分享标题
    title: {
      type: String
    },
    // 分享链接
    link: {
      type: String
    },
    // 分享图标
    imgUrl: {
      type: String
    },
    /*其他属性设置 
        {
            icon：""  触发分享的图标
            text:"分享" 触发分享的文案
        }
    */
    option: {
      type: Object,
      default: function () {
        return {
          icon: "ty-riji-fenxiang",
          text: ""//分享文案
        }
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    realTitle: "",
    realLink: "",
    realImgUrl: "",
    show: true //是否显示
  },
  attached:function(){
    let t=this;
    let _opt = t.properties.option||{};
    if (!_opt || !_opt.icon){
      _opt.icon = "ty-riji-fenxiang"
    }
    t.setData({
      realTitle: app.globalData._TY_Tool.tpl(t.properties.title, app.globalData._TY_Tool.buildTplParams(t)),
      realLink: app.globalData._TY_Tool.tpl(t.properties.link, app.globalData._TY_Tool.buildTplParams(t)),
      realImgUrl: app.globalData._TY_Tool.tpl(t.properties.imgUrl, app.globalData._TY_Tool.buildTplParams(t)),
      option: _opt
    });
  },
  ready:function(){
    let t=this;
    app.globalData._TY_Share = {
      title: t.data.realTitle||'',//分享标题
      path: t.data.realLink||'',//分享路径  必须是以/ 开头的路径
      imageUrl: t.data.realImgUrl||''//分享图片 支持 PNG及JPG
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    share:function(e){
      let t=this;
    }
  }
})
