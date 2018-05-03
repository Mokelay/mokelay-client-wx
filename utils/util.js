let util = {};

util.invoke = function(options) {
    return new Promise((resolve, reject) => {
        if (!util.ajax) {
            util.ajax = axios.create({
                baseURL: window._TY_APIHost,
                timeout: 30000,
                withCredentials: true
            });
        }
        util.ajax(options).then(function(response) {
            if (response && response['data'] && response['data']['code'] && response['data']['code'] == -401) {
                //未登录
                location.href = window._TY_SSOURL;
            } else if (response && response['data'] && response['data']['code'] && response['data']['code'] == -400) {
                //TY未登录
                location.href = document.location.protocol + "//" + document.location.host + "/#/ty-login";
            } else {
                resolve(response);
            }
        }).catch(function(error) {
            reject(error);
        });
    });
}

//为了能请求第三方或自定义额接口，保证图片上传到第三方文件服务器，这里不设置baseURL
util.post = function(url, param, options) {
    return util.invoke(_.extend({
        url: url,
        method: 'post',
        data: Qs.stringify(param),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }, options));
}

util.get = function(url, param, options) {
    return util.invoke(_.extend({
        url: url,
        method: 'get',
        params: param
    }, options));
}

//获取DS
/**
DS配置案例
{
    host:"", //如果为空，默认是window._TY_APIHost
    api:"/list-data",
    category:'config',//ds选择器 不是type字段而是category字段
    method:"post",
    inputs:[
        {paramName:'a',valueType:"constant",constant:123},
        {paramName:'a',valueType:"constant",variable:123},
        {paramName:'b',valueType:"inputValueObj",valueKey:"bb",variable:"pageSize"},
        {paramName:'c',valueType:"inputValueObj",valueKey:"router",variable:"page"},
        {paramName:'d',valueType:"inputValueObj",valueKey:"row-data",variable:"alias"},
        //TY2.0统一走tempalte
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
    var api = ds['api'];
    var host = window._TY_HOSTS[ds['host'] || ""] || window._TY_APIHost;
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
                var _inputData = inputValueObj[input['valueKey']];
                if (_inputData && typeof input['variable'] == 'string') {
                    var paramArr = input['variable'].split('.');
                    if (paramArr.length > 1) { //支持参数形式 a.b[1].c.d[0][0].e
                        var paramValueStr = '_inputData' + '.' + input['variable'];
                        try {
                            paramValue = eval("(" + paramValueStr + ")");
                        } catch (error) {
                            console.log('DS上传参数配置有误:', error);
                        }
                    } else {
                        paramValue = _inputData[input['variable']];
                    }
                }
            }
            //格式化参数
            paramValue = typeof paramValue == "object" ? JSON.stringify(paramValue) : paramValue;
            requestParam[input['paramName']] = paramValue;
        });
    }
    //老数据的custom接口地址存在api中，TY2.0的custom接口存在url中
    var apiUrl = ds['url'] || api;
    if (type == 'config') {
        //如果不是自定义接口
        apiUrl = window._TY_ContentPath + "/" + api;
    }
    //统一转换成小写
    method = method.toLowerCase();
    //设置请求参数
    var options = {
        baseURL: util.tpl(host, Object.assign(util.buildTplParams(inputValueObj['bb'], inputValueObj)))
    }
    util[method](apiUrl, requestParam, options).then(function(response) {
        var data = response['data'];
        if (data['ok']) {
            var realDataMap = data['data'] || {};
            var outputs = _TY_Tool.deepClone(outputs_default);
            new Promise(function(resolve, reject) {
                const promiseArr = [];
                outputs.forEach(function(output) {
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
                        //加载handle对应的buzz函数，进行执行，异步操作统一通过Promise处理
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
    }).catch(function(err) {
        error(err);
    });
}

module.exports = {
  formatTime: formatTime
}
