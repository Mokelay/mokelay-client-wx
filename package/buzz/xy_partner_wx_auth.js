
  module.exports = function (...args) {
const app = getApp();

  let user = args[0];
  const openId = user.openId;
  const userInfo = user.userInfo;
  
  wx._TY_Tool.get(app.globalData._TY_ContentPath +"/xy_partner_check_user",{
    wxOpenId: openId
  }).then((res)=>{
    var data = res.data['data'];
    if (!data.data || !data.data.id){
      //根据openid 没有查询到数据  跳转到注册页面,并把openid 传过去
      wx.navigateTo({
        url: 'index?alias=xy_partner_register&t=' + openId,
      })
    }else{
      //有值 调用初始化session 的接口
      if(data.data.shareImgUrl){
        app.globalData._TY_Share.imageUrl=data.data.shareImgUrl||"";
      }
      wx._TY_Tool.post(app.globalData._TY_ContentPath + "/xy_partner_init",{
        wxOpenId: openId
      }).then((res)=>{
        app.globalData._TY_inviteCode = res['data']['data']['invitationCode']||'';
        //初始化session之后跳转到首页
        wx.reLaunch({
          url: 'index',
        })
      });
    }
  });
  }
