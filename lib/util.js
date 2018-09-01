//引入underscore包
const _ = require('underscore');
const binding = require("./Binding.js");
const app = getApp();
var Domain = app.globalData._TY_APIHost;

let util = {
  get: function(url, data, success, fail, complete) {
    wx.request({
      url: Domain + url,
      data: data,
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        if (success) {
          success(res);
        }
      },
      fail: function(res) {
        if (fail) {
          fail(res);
        }
      },
      complete: function(res) {
        if (complete) {
          complete(res);
        }
      }
    })
  },
  post: function(url, data, success, fail, complete) {
    wx.request({
      url: Domain + url,
      data: data,
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        if (success) {
          success(res);
        }
      },
      fail: function(res) {
        if (fail) {
          fail(res);
        }
      },
      complete: function(res) {
        if (complete) {
          complete(res);
        }
      }
    });
  },
  uuid: function(len, radix) {
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
util.deepClone = function(obj) {
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

//内部方法 selector 选择器  比如.bb 或者 #bb 类似jquery
let _findChildBBBySelector = function(node, selector) {
  let resultVue = null;
  if (!node) {
    return null;
  }
  // let childNode = node.selectComponent(selector);
  let childNode = null;
  if (node.id == selector) {
    childNode = node;
  }
  if (childNode) {
    //找到子组件
    resultVue = childNode;
    return resultVue;
  } else {
    let childNodes = node.selectAllComponents(".bb");
    if (childNodes && childNodes.length > 0) {
      for (let i = 0; i < childNodes.length; i++) {
        let currentNode = childNodes[i];
        resultVue = _findChildBBBySelector(currentNode, selector);
        if (resultVue) {
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
util.findBBByUuid = function(uuid) {
  let root = app.globalData._TY_Root;
  return _findChildBBBySelector(root, uuid); //id 选择器
};

/**
 * css对象中rem单位转换成rpx单位 iphone 基数是37.5  小程序基数是20  小程序以iphone6的宽度是375rpx 即375*2px
 
 */
util.transferRemToRpx = function(style) {
    let newStyle = {};
    const reg = /[0-9\.]+rem/ig; //匹配所有rem
    const regFirst = /[0-9\.]+rem/; //匹配第一个
    if (style) {
      for (let i in style) {
        //字符串可能的情况： 1rem/calc(100vh - 2rem)/1rem 2rem 3rem 4rem/
        let val = style[i];
        let value = style[i];
        if (val && typeof(val) === 'string') {
          //["0.5rem","2rem"]
          const rems = val.match(reg);
          if (!rems) {
            newStyle[i] = value;
            continue;
          }
          rems.forEach((_rem, index) => {
            //0.5rem
            let num = _rem.replace("rem", "");
            const realVal = Number(num) * 37.5 * 2 + "rpx";
            value = value.replace(new RegExp(regFirst), realVal); //替换第一个找到的rem
          });
        }
        newStyle[i] = value;
      }
    }
    return newStyle;
  },


//建议css色值方法
util.setSimpleStyle = function (_css, returnObj) {
  return util.setStyle(returnObj,{
    layout: _css
  });
};

// css对象转cssstring 小程序用
util.cssToString = function(css){
  let result = "";
  if(!css){
    return result;
  }
  for (var i in css) {
    result += i + ":" + css[i] + ";";
  }
  return result;
}
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
util.setStyle = function(returnObj,bb, t) {
  const layout = bb.layout;
  let style = {
    // 'margin': '2px',
  };
  let result = "";
  let resultObj = {};
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
    if (layout.bgColor) {
      style['transform'] = `rotate(${layout.bgColor}deg)`;
    }
    if (layout.bgUrl) {
      style['background-image'] = `url(${layout.bgUrl})`;
    }
    if (layout.other) {
      style = Object.assign({}, style, layout.other);
    }
    style = util.transferRemToRpx(style);
    
    //针对小程序样式修复部分，返回String
    for (var i in style) {
      if (typeof(style[i]) === 'undefined') {
        continue;
      }
      resultObj[i] = style[i];
      result += i + ":" + style[i] + ";";
    }
  }
  if (returnObj){
    return resultObj;
  }else{
    return result;
  }
};

/**
DS配置案例
{
    type:"dynamic", //dynamic,static ，ds表示是后端动态数据，static表示静态数据

    //以下为type=static属性
    data:null, //静态数据，可以为任意数据类型

    //以下为type=dynamic的属性
    host:"", //如果为空，默认是window._TY_APIHost
    api:"/list-data",
    category:'config',//ds选择器 不是type字段而是category字段
    method:"post",
    inputs:[
        {paramName:'e',valueType:"template",variable:"<%=route.query.param%>},
        {paramName:'a2',valueType:"template",variable:123},
    ],
    outputs:[
        {dataKey:"tableData",valueKey:"data-list-1"},
        {dataKey:"obj",valueKey:"data-obj-1",handle:"${buzzCode}"}
    ]
}

 type 是指接口的类型，目前分为配置接口config和自定义接口custom

bb-list中的table data获取数据的调用方式 , util.getDSData(ds, {"bb":this ,"router":this.$router.param} , function(){} );

bb-list中的button group中execute-ds的按钮调用方法，util.getDSData(ds, {"bb":this ,"router":this.$router.param , "row-data":row} , function(){} );
**/
util.getDSData = function(ds, inputValueObj, success, error) {
    var type = ds['type'] || "dynamic";
    if (type == "static") {
      success(ds['data']);
      return;
    }

    var api = ds['api'];
    var host = app.globalData._TY_APIHost;
    var type = ds['category'] || 'config'; //默认是配置接口
    if (!api) {
      error(500, "请求参数无效");
      return;
    }

    var method = ds['method'] || 'post';
    var requestParam = {};
    var inputs = ds['inputs'] || [];
    var outputs_default = ds['outputs'] || [];
    if (inputs && inputs.length > 0) {
      inputs.forEach(function(input) {
        //TY2.0默认全部走template
        var valueType = input['valueType'] || 'template';
        var paramValue = null;
        if (valueType == 'constant') {
          paramValue = input['constant'] == undefined ? input['variable'] : input['constant'];
        } else if (valueType == 'template') { //支持参数为自定义模板

          paramValue = util.tpl(input['variable'], Object.assign(util.buildTplParams(inputValueObj['bb'], inputValueObj[input['valueKey']]), inputValueObj));
        } else if (valueType == 'inputValueObj') {
          wx.showToast({
            title: "DS配置请求参数小程序不支持",
            icon: 'none',
            duration: 2000
          })
        }
        //格式化参数
        paramValue = typeof paramValue == "object" ? (paramValue == null ? "" : JSON.stringify(paramValue)) : paramValue;
        requestParam[input['paramName']] = paramValue;
      });
    }
    //老数据的custom接口地址存在api中，TY2.0的custom接口存在url中
    var apiUrl = ds['url'] || api;
    if (type == 'config') {
      //如果不是自定义接口
      apiUrl = app.globalData._TY_ContentPath + "/" + api;
    }
    //加上host  小程序请求会自动加上域名
    //apiUrl = host + apiUrl;
    //统一转换成小写
    method = method.toLowerCase();
    util[method](apiUrl, requestParam, function(response) {
      var data = response['data'];
      if (data['ok']) {
        var realDataMap = data['data'] || {};
        var outputs = app.globalData._TY_Tool.deepClone(outputs_default);
        new Promise(function(resolve, reject) {
          const promiseArr = [];
          outputs.forEach(function(output) {
            if (!output['valueKey'] && !output['handle']) {
              //没有valueKey 并且也没有handle 直接返回data对象
              output['value'] = realDataMap;
              return true;
            }
            var _outputValue = null;
            var paramArr = output['valueKey'].split('.');
            if (paramArr.length > 1) { //支持参数形式  a.b[1].c.d[0][0].e
              var paramValueStr = "realDataMap" + '.' + output['valueKey'];
              try {
                _outputValue = eval("(" + paramValueStr + ")");
              } catch (error) {
                console.log('DS取值参数配置有误:', error);
              }
            } else {
              _outputValue = realDataMap[output['valueKey']];
            }
            if (output['handle']) {
              //加载handle对应的buzz函数，进行执行，异步操作统一通过Promise处理   小程序中无效
              const item = new Promise((resolve, reject) => {
                util.loadBuzz(output['handle'], function(code) {
                  output['value'] = eval(code);
                  resolve();
                });
              });
              promiseArr.push(item);
            } else {
              output['value'] = _outputValue;
            }
          });
          //等待forEach中的异步全部执行完
          Promise.all(promiseArr).then(values => {
            resolve(outputs);
          });
        }).then((outputs) => {
          success(outputs)
        });
      } else {
        error(data['code'], data['message']);
      }
    }, function(err) {
      console.log(err);
    });
  },

  /**
   *  组装模板或者getDsData方法的参数
   */
  util.buildTplParams = function(t, obj) {

    let currentPage = getCurrentPages();
    const page = currentPage[currentPage.length - 1];
    const options = page && page.options;
    let newObj = t;
    newObj = Object.assign(newObj, newObj.properties, newObj.data);
    return _.extend({
      "bb": newObj,
      "router": options || {},
      "route": page || {},
      "external": t.external
    }, (obj ? obj : {}));
  },

  /**
   * 仅仅只是实现字段替换，支持对象和数组 eg:a.b  a[0].b  a.b[0]
   */
  util.tpl = function(str, obj) {
    let result = str;
    const reg = /<%=.*?>/ig; ///&lt;%=.*?%&gt;/ig
    const regFirst = /<%=.*?>/; //只取第一个
    const regArray = /\[.*?\]/ig;
    const fields = str.match(reg);
    let params = [];
    if (fields && fields.length > 0) {
      fields.forEach((field, index) => {
        //item可能是 a.b  a[1].b  等 （不支持表达式）
        let resultParam = "";
        try {
          let item = field.replace("<%=", "").replace("%>", "");
          const itemNodes = item.split(".");
          let param = obj;
          for (let i = 0; i < itemNodes.length; i++) {
            //a  a[0]  a[0][1]
            const itemNode = itemNodes[i];
            const itemNodeSplits = itemNode.split("["); //有没有数组
            const key = itemNodeSplits[0];
            param = param[key];
            if (itemNodeSplits.length > 1) {
              //是数组
              ;
              const arrayIndexs = itemNode.match(regArray);
              arrayIndexs.forEach((val, _index) => {
                val = val.replace("[", "").replace("]", "");
                param = param[val];
              });
            }
          }
          if (typeof(param) === 'object') {
            //最后的值不可能是object类型，只可能是基础类型
            param = "";
          }
          resultParam = param;
        } catch (err) {
          console.log(err);
          resultParam = "";
        }
        result = result.replace(new RegExp(regFirst), resultParam);
      });
    }
    return result;
  },
  /**
   *按钮解析公共方法 
      @button:当前点击的按钮配置
      {
          action:'url 地址跳转|| execute-ds执行接口 || dialog-page弹窗 || code自定义代码 || buzz 巴斯代码',
          url:''跳转地址 action:'url’时有效
          urlType:'openWindow 在新标签中打开 
          ds:{} //按钮请求的接口配置 action:'execute-ds’时有效
          confirmTitle:'', //请求接口前的提示语标题   action:'execute-ds’时有效
          confirmText:'', //请求接口前的提示语内容   action:'execute-ds’时有效
          callBackStaticWords:'' //请求接口成功提示语
          dialogPage:'pageAlias',//弹窗中的页面名称   action:'dialog-page’时有效
          method:fn , //需要执行的方法 action:'code’时有效
          buzz:'buzzName', //巴斯方法名称  action:'buzz’时有效
          noConfirm:true //是否去除确认框
      }
      @valueobj :参数来源 t, bb, row-data ,route
  */
  util.resolveButton = function(button, valueobj) {
    var t = valueobj['bb'];
    return new Promise((resolve, reject) => {
      if (button['action'] == 'url') {
        //URL跳转
        //为了兼容扩展dataparam的值的范围，注意URL参数的Encode
        var rowData = valueobj['row-data'] ? valueobj['row-data'] : {};
        var realObj = Object.assign({}, valueobj, rowData);
        var url = util.tpl(button['url'], util.buildTplParams(t, realObj));
        // url = encodeURI(url);
        wx.navigateTo({
          url: url
        });
        resolve();
        //触发按钮执行完成事件
        t.triggerEvent("button-finish", button, valueobj);
      } else if (button['action'] == 'execute-ds') {
        var ds = button['ds'];
        var valueKey = button.valueKey || 'row-data';
        var confirmTitle = button['confirmTitle'] ? button['confirmTitle'] : "提示";
        var confirmText = button['confirmText'] ? button['confirmText'] : "是否执行此操作";
        var messageInfo = button['callBackStaticWords'] ? button['callBackStaticWords'] : "操作成功";

        var postFun = function() {
          //解析按钮主题
          if (button.theme && button.theme == 'vc') {
            //如果是验证码
            t.changeText({
              type: 'custom',
              arguments: "正在获取"
            });
          } else {
            t.showLoading();
          }
          t.disabledFn(); //disable 按钮
          util.getDSData(ds, valueobj, function(map) {
            t.hideLoading();
            if (button.theme && button.theme == 'vc') {
              //如果是验证码
              t.changeText({
                type: 'custom',
                arguments: "正在获取"
              });
            } else {
              t.enabledFn();
              wx.showToast({
                title: messageInfo || "请求成功",
                icon: 'success',
                duration: 2000
              })
            }
            resolve();
            // util.buttonCallback(button, valueobj, callback, map);
            //触发按钮执行完成事件
            t.triggerEvent("button-finish", {
              button: button,
              valueobj: valueobj,
              map: map
            });
            t.triggerEvent("button-finish-success", {
              button: button,
              valueobj: valueobj,
              map: map
            });
          }, function(err, msg) {
            wx.showToast({
              title: msg || messageInfo,
              icon: 'none',
              duration: 2000
            })
            reject();
            //触发按钮执行完成事件
            t.triggerEvent("button-finish", {
              button: button,
              valueobj: valueobj,
              err: err
            });
            t.triggerEvent("button-finish-error", {
              button: button,
              valueobj: valueobj,
              err: err
            });
          });
        }
        if (button['noConfirm']) {
          postFun();
        } else {
          wx.showModal({
            title: confirmTitle || '提示',
            content: confirmText || '确认操作？',
            success: function(res) {
              if (res.confirm) {
                postFun();
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          });
        }
      } else {
        wx.showToast({
          title: "不支持",
          icon: 'none',
          duration: 2000
        })
      }
    });
  }


//ty工具类对象
app.globalData._TY_Tool = util;
wx._TY_Tool = util;
module.exports = util;
