var Domain = 'http://www.mokelay.com';

let util = {
  get:function(url,data,success,fail,complete){
    wx.request({
      url: Domain+url,
      data: data,
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        if(success){
          success(res);
        }
      },
      fail: function(res) {
        if(fail){
          fail(res);
        }
      },
      complete: function(res) {
        if (complete){
          complete(res);
        }
      }
    })
  },
  post: function (url, data, success, fail, complete){
    wx.request({
      url: Domain + url,
      data: data,
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        if (success) {
          success(res);
        }
      },
      fail: function (res) {
        if (fail) {
          fail(res);
        }
      },
      complete: function (res) {
        if (complete) {
          complete(res);
        }
      }
    });
  }
};

module.exports =util;