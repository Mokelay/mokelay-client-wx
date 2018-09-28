
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
      //注册成功 初始化session
      wx._TY_Tool.post(app.globalData._TY_ContentPath + "/xy_partner_init", {
        wxOpenId: openId
      }).then((res) => {
        //初始化session之后跳转到首页
        wx.reLaunch({
          url: 'index',
        })
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
