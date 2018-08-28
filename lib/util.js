var Domain = 'http://www.mokelay.com';

//引入underscore包
const _ = require('underscore');

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
  },
  uuid: function (len, radix){
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    var uuid = [];
    var i;
    radix = radix || chars.length;
    if (len) {
      for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
    } else {
      var r;
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
      uuid[14] = '4';
      for (i = 0; i < 36; i++) {
        if (!uuid[i]) {
          r = 0 | Math.random() * 16;
          uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
        }
      }
    }
    return uuid.join('');
  }
};
//深拷贝  对象/数组
util.deepClone = function (obj) {
  let cloneObj;
  if (!_.isObject(obj) || typeof obj === 'function') {
    return obj;
  }
  cloneObj = _.isArray(obj) ? [] : {};
  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      if (!_.isObject(obj[i])) {
        // obj[i]为null和undefined都会进入这里
        cloneObj[i] = obj[i];
      } else {
        cloneObj[i] = util.deepClone(obj[i]);
      }
    }
  }
  return cloneObj;
};

util._resovleTpl = function (str, data) {
  try {
    return _.template(str)(data);
  } catch (e) {
    return "";
  }
}

util._tpl = function (tpl, data) {
  if (typeof tpl === 'string') {
    //字符串
    return util._resovleTpl(tpl, data);
  } else if (_.isArray(tpl)) {
    //数组
    for (let i = 0; i < tpl.length; i++) {
      let newObj = util._tpl(tpl[i], data);
      if (typeof newObj === 'object') {
        tpl[i] = newObj;
      }
    }
  } else if (_.isObject(tpl)) {
    //对象 js 对象和数组 都是object类型，不过上面已经过滤掉array了
    for (let o in tpl) {
      if (tpl.hasOwnProperty(o)) {
        let val = util._tpl(tpl[o], data);
        if (typeof val === 'string') {
          //除string类型外，其他类型不需要返回
          tpl[o] = val;
        }
      }
    }
  }
  return tpl;
};
/**
 * 模板解析工具  支持对象，数组，字符串
 * @param tpl
 * @param data
 */
util.tpl = function (tpl, data) {
  let result = tpl;
  if (typeof tpl === 'object') {
    //对象或者数组,为保证不改变请求参数值，先深拷贝
    result = util.deepClone(tpl);
  }
  //深拷贝对象 模板解析
  return util._tpl(result, data);
};


module.exports =util;