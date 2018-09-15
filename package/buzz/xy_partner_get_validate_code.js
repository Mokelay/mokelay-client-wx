module.exports = function (...args) {
 
  const app = getApp();

  let user = args[0];
  var invoteCode = app.globalData._TY_Tool.findBBByUuid("9FB87610-11BB-4651-8930-2FEA81D16085").getValue();//邀请码
  var phone = app.globalData._TY_Tool.findBBByUuid("51EE6944-B076-4B84-906D-476EACE54275").data.valueBase;//手机号
  
//发送短信验证码
  wx._TY_Tool.post(app.globalData._TY_ContentPath + "/xy_partner_send_register_vc", {
    recommendCode: invoteCode,
    mobilephone:phone
  }).then((res) => {
    var data = res.data;
    if (data['ok']){
      wx.showToast({
        title: "发送成功",
        icon: 'success',
        duration: 2000
      })
      //调button的disabled 方法
      var sms = app.globalData._TY_Tool.findBBByUuid("51EE6944-B076-4B84-906D-476EACE54275");
      //拿到button的对象，然后调用他的倒计时方法
      app.globalData._TY_Tool.findBBByUuid(sms.data.buttonUUid).countDown();
    }else{
      wx.showToast({
        title: data.message || "请求失败",
        icon: 'none',
        duration: 2000
      })
    }
  });
}