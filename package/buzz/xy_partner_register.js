
  module.exports = function (...args) {
const app = getApp();
  var inviteCode = app.globalData._TY_Tool.findBBByUuid("9FB87610-11BB-4651-8930-2FEA81D16085").getValue();//邀请码
  var phone = app.globalData._TY_Tool.findBBByUuid("51EE6944-B076-4B84-906D-476EACE54275").data.valueBase;//手机号
  var vcCode = app.globalData._TY_Tool.findBBByUuid("6982FE01-CA72-412C-B620-30C3E7A11411").getValue();//验证码
  var name = app.globalData._TY_Tool.findBBByUuid("AFB87610-11BB-4651-8930-2FEA81D16085").getValue();//姓名
  var idCardNumber = app.globalData._TY_Tool.findBBByUuid("BFB87610-11BB-4651-8930-2FEA81D16085").getValue();//身份证

  let currentPage = getCurrentPages();
  const page = currentPage[currentPage.length - 1];
  var openId = page.options.t;

  //注册
  wx._TY_Tool.post(app.globalData._TY_ContentPath + "/xy_partner_register", {
    mobilephone: phone,
    idCardNumber: idCardNumber,
    vcCode: vcCode,
    name: name,
    wxOpenId:openId,
    inviteCode: inviteCode
  }).then((res) => {
    var data = res.data;
    if (data['ok']) {
      app.globalData._TY_inviteCode = res['data']['data']['recommendCode']||'';
      //注册成功 初始化session
      wx._TY_Tool.post(app.globalData._TY_ContentPath + "/xy_partner_init", {
        wxOpenId: openId
      }).then((res) => {
        app.globalData._TY_Root.generateShareImg(function(url){
          //url 是生成的图片地址
          if(url){
            //有地址
            app.globalData._TY_Share.imageUrl = url;
            wx.getStorageSync("_TY_shareImg",url||'');
            wx._TY_Tool.post(app.globalData._TY_ContentPath + "/xy_partner_update_user_share_img_url", {
              wxOpenId: openId,
              shareImgUrl: url
            }).then((res) => {
                wx.reLaunch({
                  url: 'index',
                })
            });
          }else{
          	//初始化session之后跳转到首页
            wx.reLaunch({
              url: 'index',
            })
          }
        });
      });
      wx.showToast({
        title: "注册成功",
        icon: 'success',
        duration: 2000
      })
    } else {
      wx.showToast({
        title: data.message || "注册失败",
        icon: 'none',
        duration: 2000
      })
    }
  });
  }
