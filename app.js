//app.js
App({
  onLaunch: function (options) {
    console.log("onLaunch....");
    console.log(options);
  },
  onError: function(){
    console.log("error:.......")
  },
  onShow:function(options){
    console.log("onShow...");
    console.log(options);
  },
  onHide:function(){
    console.log("hide..");
  },
  globalData: {
    userInfo: null
  }
})