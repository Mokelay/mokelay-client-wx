var Domain = 'http://www.mokelay.com';

//引入underscore包
const _ = require('underscore');
const app = getApp();

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
//内部方法 selector 选择器  比如.bb 或者 #bb 类似jquery
let _findChildBBBySelector=function(node,selector){
  let resultVue = null;
  if(!node){
    return null;
  }
  // let childNode = node.selectComponent(selector);
  let childNode = null;
  if (node.id == selector){
    childNode = node;
  }
  if (childNode){
    //找到子组件
    resultVue = childNode;
    return resultVue;
  }else{
    let childNodes = node.selectAllComponents(".bb");
    if (childNodes && childNodes.length>0){
      for (let i = 0; i < childNodes.length;i++){
        let currentNode = childNodes[i];
        resultVue = _findChildBBBySelector(currentNode,selector);
        if (resultVue){
          return resultVue;
        }
      }
    }
  }
};
/**
 * 根据uuid获取组件对象
 * 使用前提：所有组件 都需要加上固定class  eg: class="bb {{uuid}}" id="{{uuid}}"
 */
util.findBBByUuid = function(uuid){
  let root = app.globalData._TY_Root;
  return _findChildBBBySelector(root,uuid);//id 选择器
};

/**
 * 获取巴斯 回调处理
 */
util.loadBuzz = function (buzz, handle) {
  util.get("/config/read-buzz-by-alias",{
    alias:buzz
  },function(response){
    if(response.data['ok']){
      let data = response.data.data.data;
      if (handle){
        handle(data.code);
      }
    }else{
      console.log('巴斯' + buzz+"获取失败!");
    }
  });
};

/**
 *setAnimation 设置积木动画 
 *私有只在bbRender中使用
 * @bb:{ //需要解析交互的积木
    uuid: '',
    alias: 'bb-layout-canvas', //积木别名
    aliasName: '自由式布局', //中文名称
    attributes: {}, //积木属性
    animation: [{ //动画
    }],
    interactives: [{ //触发交互
    }],
    layout: {} //积木布局
}
 */
let _setAnimation = function (bb) {
  const animations = bb['animation'];
  let animation = null;
  if (animations && animations.length > 0) {
    animations.forEach((ani, key) => {
      const playNum = ani.loop ? 'infinite' : ani.playNum;
      ani.style = ani.style ? ani.style : '';
      ani.time = ani.time ? ani.time : 0;
      ani.delay = ani.delay ? ani.delay : 0;
      ani.direction = ani.direction ? ani.direction : '';
      animation = animation ? `${animation},${ani.style} ${ani.time / 1000}s ${ani.delay / 1000}s ${ani.direction} ${playNum}` : `${ani.style} ${ani.time / 1000}s ${ani.delay / 1000}s ${ani.direction} ${playNum}`
    })
  }
  return animation;
};
//建议css色值方法
util.setSimpleStyle = function (_css) {
  return util.setStyle({
    layout: _css
  });
};
/**
 *setStyle 设置积木样式
 *私有只在bbRender中使用
 * @t:当前容器积木的实例化对象
 * @bb:{ //需要解析交互的积木
    uuid: '',
    alias: 'bb-layout-canvas', //积木别名
    aliasName: '自由式布局', //中文名称
    attributes: {}, //积木属性
    animation: [{ //动画
    }],
    interactives: [{ //触发交互
    }],
    layout: {} //积木布局
}
 */
util.setStyle = function (bb, t) {
  const layout = bb.layout;
  let style = {
    // 'margin': '2px',
  };
  let result = "";
  if (layout && JSON.stringify(layout) != '{}') {
    style = {
      'display': layout.display,
      'position': layout.positionType,
      'z-index': layout.zIndex,
      
      'background-repeat': layout.bgRepeat,
      'background-origin': layout.bgOrigin,
      'background-position': layout.bgPosition,
      'background-size': layout.bgSize,
      'background-attachment': layout.bgAttachment,
      'background-color': layout.bgColor,
      'opacity': layout.transparency,
      'width': layout.size ? layout.size.width : "auto",
      'height': layout.size ? layout.size.height : "auto",
      'left': layout.position ? layout.position.x : "auto",
      'top': layout.position ? layout.position.y : "auto",
      'border-style': layout.border && layout.border.style,
      'border-color': layout.border && layout.border.color,
      'border-width': layout.border && layout.border.size,
      'border-radius': layout.border && layout.border.radius,
      'padding': layout.border && layout.border.padding,
      'margin': layout.border && layout.border.margin,
      'box-shadow': `${layout.shadow && layout.shadow.size} ${layout.shadow && layout.shadow.direction} ${layout.shadow && layout.shadow.vague} ${layout.shadow && layout.shadow.color}`,
      'overflow-y': layout['overflow-y'],
      'overflow-x': layout['overflow-x'],
      'font-family': layout.font && layout.font.family,
      'color': layout.font && layout.font.color,
      'font-size': layout.font && layout.font.size,
      'text-align': layout.font && layout.font.align,
      'text-decoration': layout.font && layout.font.decoration,
      'line-height': layout.font && layout.font.lineHeight,
    }
    if (layout.bgColor){
      style['transform']=`rotate(${layout.bgColor}deg)`;
    }
    if (layout.bgUrl){
      style['background-image']=`url(${layout.bgUrl})`;
    }
    if (layout.other) {
      style = Object.assign({}, style, layout.other);
    }

    //针对小程序样式修复部分，返回String
    for (var i in style){
      if(typeof(style[i])==='undefined'){
        continue;
      }
      result +=i+":"+style[i]+";";
    }
  }
  // const animation = _setAnimation(bb);
  // style['animation'] = animation;
  return result;
};


//ty工具类对象
app.globalData._TY_Tool = util;
module.exports =util;