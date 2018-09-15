// buildingblock/bb-indep-wx-login/bb-indep-wx-login.js

const app = getApp();

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    //是否返回用户信息,为true则返回用户信息
    returnUserinfo:{
      type:Boolean
    },
    //获取openId ds
    ds:{
      type:Object
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    authed:false,//是否授权过
    openId:"",//openId
    userInfo:{},//用户信息
    apiUrl:""//接口地址
  },
  attached:function(){
    const t=this;
    //获取接口api
    t.getAPIUrl();
    //检查是否授权
    t.checkAuth().then(()=>{
      if (!t.data.authed && t.data.returnUserinfo){
        //没有授权过,并且需要返回用户信息  显示授权页面，让授权  在页面处理了 这里可以不处理
      }else{
        //其他情况，获取openid，触发after_load; 获取用户信息，并触发after_load事件
        if (t.data.returnUserinfo){
          //授权过，并且需要返回用户信息
          t.getUserInfo().then(()=>{
            t.load(t.data.userInfo);
          });
        }else{
          //不需要返回用户信息  加载
          t.load();
        }
      }
    });
  },
  /**
   * 组件的方法列表
   */
  methods: {
    getAPIUrl:function(){
      const t=this;
      let url = "";
      if(t.data.ds){
        url = app.globalData._TY_ContentPath+"/"+t.data.ds.api;
      }else{
        url = app.globalData._TY_ContentPath + "/xy_partner_wx_get_open_id";//默认是小蚁的获取openid接口 
      }
      t.setData({
        apiUrl:url
      });
    },
    //加载  如果user有值说明是事件触发的，没有就是正常流程
    load:function(user){
      const t=this;
      t.checkSession().then((hasSession)=>{
        if (!hasSession){
          //没有session 或者session失效   登录获取openid
          t.getOpenId().then(()=>{
            console.log(t.data.openId);
            t.triggerEvent("after_load",{
              openId:t.data.openId,
              userInfo:t.data.userInfo
            });
          });
        }else{
          //有session的情况 目前不用处理
          wx.navigateTo({
            url: 'index'
          })
        }
      });
    },
    //获取用户信息
    getUserInfo:function(){
      const t=this;
      return new Promise((resolve,reject)=>{
        wx.getUserInfo({
          success: function (res) {
            console.log(res.userInfo)
            let userInfo = res.userInfo;
            t.setData({
              userInfo: userInfo
            });
            resolve();
          }
        })
      });
    },
    // 查看是否授权
    checkAuth:function(){
      const t=this;
      return new Promise((resolve, reject)=>{
        wx.getSetting({
          success(res) {
            if (res.authSetting['scope.userInfo']) {
              // 已经授权，可以直接调用 getUserInfo 获取头像昵称
              t.setData({
                authed:true
              });
              resolve();
            }else{
              t.setData({
                authed: false
              });
              resolve();
            }
          }
        })
      });
    },
    //获取用户信息绑定事件
    bindGetUserInfo(e) {
      const t = this;
      t.setData({
        authed: true
      });
      console.log(e.detail.userInfo)
      t.setData({
        userInfo: e.detail.userInfo
      });
      //加载
      t.load(t.data.userInfo);
    },
    //获取openid
    getOpenId:function(){
      const t=this;
      return new Promise((resolve,reject)=>{
        wx.login({
          success:function(res){
            let code = res.code;
            app.globalData._TY_Tool.get(t.data.apiUrl,{code:code}).then((response)=>{
              let data = response.data;
              if(data['ok']){
                let _openId = data.data.openId;
                let sessionId = data.data.si;
                if(sessionId){
                  //设置到全局变量中,后面每次请求都cookie都带上sessionId 
                  wx.setStorage({
                    key:"_TY_s",
                    data: sessionId
                  });
                }
                t.setData({
                  openId: _openId
                });
                resolve();
              }else{
               console.log("获取openId失败",data.message); 
              }
            });
          }
        });
      });
    },
    //校验微信session_key 是否过期,如果过去重新登录
    checkSession:function(){
      return new Promise((resolve,reject)=>{
        wx.checkSession({
          success:function(){
            resolve(true);
          },
          fail:function(){
            resolve(false);
          }
        });
      });
    }
  
  }
})
