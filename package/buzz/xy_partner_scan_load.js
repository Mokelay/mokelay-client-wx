
  module.exports = function (...args) {
    let _callback_result = args[0];
    if (_callback_result && _callback_result.res && _callback_result.res.result){

      let _result_code = _callback_result.res.result;

      wx._TY_Tool.get('/config/xy_partner_equips_status', {
        equipId: _result_code
      }).then((res) => {
        console.log(res);
        if (res.data.ok) {            
            wx.navigateTo({
              url: "index?alias=xy_partner_my_device"
            });
        } else {
            wx.navigateTo({
              url: "index?alias=xy_partner_scan_error&s=" + res.data.message
            });
            debugger;
        }
      })
    }

  }
