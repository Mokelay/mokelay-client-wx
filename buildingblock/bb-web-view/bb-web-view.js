// buildingblock/bb-web-view/bb-web-view.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    //webview的 h5页面地址
    src:{
      type:String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  attached:function(){
    let t=this;
    t.navigateToFromRouter();
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //手动设置 webview的页面地址
    setSrc:function(val){
      if(val){
        this.setData({
          src:val
        });
      }
    },
    //根据路由跳转到指定webview页面
    navigateToFromRouter:function(){
      let t=this;
      const pages = getCurrentPages();
      const currentPage = pages[pages.length - 1];
      const url = currentPage.options.webviewUrl;
      if(url){
        //如果路由上传了webviewUrl 参数，则直接跳转到指定页面
        this.setData({
          src: decodeURIComponent(url)
        });
      }
    }
  }
})
