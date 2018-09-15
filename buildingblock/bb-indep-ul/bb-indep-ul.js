// buildingblock/bb-indep-ul/bb-indep-ul.js

const app = getApp();
const SWIPE_WIDTH = 90;//滑块长度
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    domStyle:{
      type:String
    },
    //几列，如果是一列表示纵向展示，多列表示横向
    columns: {
      type: [Number, String],
      value: 1
    },
    //主题 主要通过主题改变itemContent模板，来方便配置item ['line','card'] line表示一行一个文字，后面跟日期；card表示卡片，样式可以通过css编辑器控制
    theme: {
      type: String,
      value: 'line'
    },
    //内容模板,通过数据填充展示的组件 <%=rowData.title%>
    itemContent: {
      type: [String, Array],
      value:[]
    },
    //静态的数据
    staticList: {
      type: [String, Array],
      value: []
    },
    //列表数据  数据源
    ds: {
      type: Object
    },
    //======样式控制区======
    //li 的样式设置
    itemStyle: {
      type: Object
    },
    //第一个item样式
    firstItemStyle: {
      type: Object
    },
    //最后一个item的样式
    lastItemStyle: {
      type: Object
    },
    //当前列表分页参数 page当前页  pageSize每页条数
    pageConfig: {
      type: Object,
      value: {
        page: 1,
        pageSize: 10
      }
    },
    //关闭上拉加载
    closePullLoading: {
      type: Boolean
    },
    //是否固定高度
    fixedHeight: {
      type: Boolean,
      value: false
    },
    //懒加载 默认不加载数据
    lazy: {
      type: Boolean,
      value: false
    },
    /**
                按钮解析
                {
                    disabled:false,//按钮是否可编辑
                    action:'url 地址跳转|| execute-ds执行接口 || dialog-page弹窗 || code自定义代码 || buzz 巴斯代码',
                    url:''跳转地址 action:'url’时有效
                    urlType:'openWindow 在新标签中打开 
                    ds:{} //按钮请求的接口配置 action:'execute-ds’时有效
                    confirmTitle:'', //请求接口前的提示语标题   action:'execute-ds’时有效
                    confirmText:'', //请求接口前的提示语内容   action:'execute-ds’时有效
                    callBackStaticWords:'' //请求接口成功提示语
                    dialogPage:'pageAlias',//弹窗中的页面名称   action:'dialog-page’时有效
                    method:fn , //需要执行的方法 action:'code’时有效
                    buzz:'buzzName'  //巴斯方法名称  action:'buzz’时有效
                }
             */
    itemClickConfig: {
      type: Object
    }
  },
/**
   * 组件的初始数据
   */
  data: {
    list:[],
    external:{},
    realContent:[],
    randerData:[],//页面渲染需要的属性，用属性代替vue的render方法逻辑
    pageSize: 10,
    page: 1,
    end: false,//是否加载结束
    loading: false,//是否加载中
    startX:0,//开始距左侧的距离
    moveLen:0//滑动距离
  },
  attached:function(){
    let t=this;
    t.setData({
      list: t.transferList(t.properties.staticList),
      page: t.properties.pageConfig&&t.properties.pageConfig.page||1,
      pageSize: t.properties.pageConfig&&t.properties.pageConfig.pageSize||10,
      realContent:t.properties.itemContent
    });
    if (!t.properties.lazy) {
      //加载数据
      t.loadData();
    }else{
      t.renderItem();
    }
  },
  //热面ready事件
  ready:function(){
    let t=this;
    //渲染完成事件
    t.triggerEvent("mounted", {bb:t});
  },
  /**
   * 组件的方法列表
   */
  methods: {
    transferList: function (val) {
      let t = this;
      let result = [];
      if (val) {
        if (typeof (val) === 'string') {
          try {
            result = JSON.parse(val);
          } catch (e) {
            console.log("非json格式");
          }
        }
      }
      return result;
    },
    //根据主题，修改 内容模板realContent
    changeContentByTheme: function () {
      let t = this;
      if ((!t.data.realContent || t.data.realContent.length <= 0) && t.properties.theme) {
        //根据不同的主题设置不同de realContent
        switch (t.properties.theme) {
          case 'line':
            t.setData({
              realContent: [
                {
                  "uuid": "0B87493A-AB7B-4721-AE2A-0B42732DE002",
                  "alias": "bb-words",
                  "aliasName": "标题",
                  "attributes": {
                    "show": true,
                    "attributeName": "title",
                    "value": "<%=rowData.title%>",
                    "theme": "",
                    "textAlign": "left",
                    "lineHeight": "1rem",
                    "tagName": "a",
                    "cssClass": "flex1 ellipsis pointer",
                    "fontColor": "#0091ea"
                  },
                  "animation": [],
                  "interactives": [],
                  "layout": {}
                },
                {
                  "uuid": "546FEF5B-BE46-44EF-9EA9-8B441244D797",
                  "alias": "bb-words",
                  "aliasName": "日期",
                  "attributes": {
                    "show": true,
                    "attributeName": "date",
                    "theme": "",
                    "tagName": "span",
                    "lineHeight": "1rem",
                    "value": "<%=rowData.createDate%>",
                    "cssClass": "flex_wrap",
                    "fontColor": "#666"
                  },
                  "animation": [],
                  "interactives": [],
                  "layout": {}
                }
              ]
            })
            break;
          case 'card':
            t.setData({
              realContent:[
              {
                "uuid": "D9E26950-31C3-41EF-9E3B-9C227129D561",
                "alias": "bb-img",
                "aliasName": "小图片",
                "attributes": {
                  "show": true,
                  "src": "<%=rowData.img%>",
                  "attributeName": "img"
                },
                "animation": [

                ],
                "interactives": [

                ],
                "layout": {
                  "other":{
                    "width": "50px",
                    "height": "50px",
                    "margin": "auto",
                    "border-radius": "50%",
                    "display": "block",
                    "overflow": "hidden"
                  }
                }
              },
              {
                "uuid": "279454A8-0FFA-4CF0-89DE-F5D3AD5EB2A2",
                "alias": "bb-words",
                "aliasName": "文案",
                "attributes": {
                  "show": true,
                  "attributeName": "title",
                  "lineHeight": "1.5rem",
                  "textAlign": "center",
                  "display": "block",
                  "value": "<%=rowData.title%>"
                },
                "animation": [

                ],
                "interactives": [

                ],
                "layout": {

                }
              }
            ]
            });
            t.properties.itemStyle = {
              "border": {
                "margin": "",
                "size": "0 0.05rem 0 0",
                "color": "rgba(234, 234, 234, 1)",
                "style": "solid",
                "radian": "0.1rem",
                "padding": "0.5rem 0.5rem 0.2rem 0.5rem"
              }
            }
            break;
          default:
            return
        }
      }
    },
    //滚动到底部时触发
    lower:function(event){
      let t=this;
      if (!t.data.end && !t.data.loading) {
        t.data.loading = true;
        t.data.page = t.data.page + 1;
        t.loadData();
      }
    },
    //加载数据
    loadData:function(){
      let t=this;
      if (t.properties.ds) {
        if (!t.properties.closePullLoading){
          wx.showLoading({
            title: '加载中',
          })
        }
        //如果配置的ds说明是动态的数据
        app.globalData._TY_Tool.getDSData(t.properties.ds, app.globalData._TY_Tool.buildTplParams(t), function (map) {
          if (!t.properties.closePullLoading) {
            wx.hideLoading();
          }
          map.forEach(function (item) {
            var _list = [];
            if (item['valueKey'].split('.').length > 1) {//支持定制接口
              _list = item['value']
            } else {
              if (item['value'] && item['value']['currentRecords']) {
                _list = item['value']['currentRecords'];
                const totalPage = item['value']['totalPages'];
                if (t.data.page >= totalPage) {
                  t.data.end = true;
                } else {
                  t.data.end = false;
                }
              } else if (item['value'] && item['value']['list']) {
                _list = item['value']['list'];
              } else {
                _list = item['value'];
              }
            }
            if (t.data.page > 1) {
              // t.data.list = t.data.list.concat(_list);
              t.setData({
                list: t.data.list.concat(_list)
              });
            } else {
              // t.data.list = _list;
              t.setData({
                list: _list
              });
            }
            t.data.loading = false;
            //渲染
            t.renderItem();
            //加载完数据
            t.triggerEvent("loaded", {bb:t});
          });
        }, function (code, msg) {
          if (!t.properties.closePullLoading) {
            wx.hideLoading();
          }
        });
      }else{
        //渲染
        t.renderItem();
      }
    },
    /**
     *  渲染li  item
     * [{
     *  content:[],
     *  style:"",
     *  swipe:"90"//滑块长度 px
     * }]
     */
    renderItem: function () {
      let t = this;
      let result = [];
      if (!t.data.list || t.data.list.length <= 0 || !t.data.realContent || t.data.realContent.length <= 0) {
        return result;
      }
      t.data.list.forEach((item, index) => {
        let _item = {
          content: [],
          style: ""
        };
        if (item['hide']) {
          result.push(_item);
          return true;
        }
        //数据解析到模板中去
        let _content = app.globalData._TY_Tool.tpl(JSON.stringify(t.data.realContent), app.globalData._TY_Tool.buildTplParams(t, {
          rowData: item
        }));
        if (!_content) {
          console.error("错误提示:", "列表组件没有配置模板或者没有匹配到参数");
          result.push(_item);
          return true;
        }
        /*
            兼容 ul包含ul的情况
            子的ul中模板用<#= ... #>代替，否则第一层就会被模板参数替换
        */
        const reg = /<#=(.*?)#>/g;
        if (_content.match(reg)) {
          //如果字符串中含有<#=...#> 这样的标识，转换成 <%=...%>
          _content = _content.replace(reg, function () {
            return "<%=" + arguments[1] + "%>"
          })
        }
        //设置content
        _item.content = JSON.parse(_content);

        let clazz = [];
        let _style = {}
        if (t.properties.theme === 'line') {
          //如果是line的话，li是flex布局
          _style = {
            "display": "-webkit - box",
            "display": "-webkit - flex",
            "display": "flex",
            "-webkit-box-orient": "horizontal",
            "-webkit-flex-flow": "row wrap",
            "flex-flow": "row wrap"
          }
        }
        const col = Number(t.properties.columns);
        if (col > 1) {
          _style = {
            width: 1 / col * 100 + "%",
            float: "left"
          }
        }
        let _cssStyle = Object.assign({}, app.globalData._TY_Tool.setSimpleStyle(t.properties.itemStyle, true), _style);
        if (index == 0 && t.properties.firstItemStyle) {
          //第一个的样式
          _cssStyle = Object.assign(_cssStyle, app.globalData._TY_Tool.setSimpleStyle(t.properties.firstItemStyle, true), _style);
        } else if (index == t.data.list.length - 1 && t.properties.lastItemStyle) {
          //最后一个的样式
          _cssStyle = Object.assign(_cssStyle, app.globalData._TY_Tool.setSimpleStyle(t.properties.lastItemStyle, true), _style);
        }
        //设置样式
        _item.style = app.globalData._TY_Tool.cssToString(_cssStyle);
        _item.swipe = 0;//滑块为0
        result.push(_item);
      });
      //修改data randerData
      t.setData({
        randerData: result
      });
    },
    //item点击事件
    itemClick:function(event){
      const t=this;
      let row = event.currentTarget.dataset.row;
      if (t.data.itemClickConfig) {
        //如果配置了item的点击配置
        app.globalData._TY_Tool.resolveButton(t.data.itemClickConfig, app.globalData._TY_Tool.buildTplParams(t, {
          rowData: item
        }));
      }
      t.triggerEvent("itemClick",{item:row,bb:t});
    },
    /**
     * 外部级联
     */
    linkage: function (...data) {
      if (data) {
        this.external['linkage'] = data;
        //外部参数请求数据，重新恢复到第一页
        this.data.page = 1;
        this.loadData();
      }
    },
    navigateTo: function (...args) {
      let t=this;
      const params = args[0];
      args.forEach((val, key) => {
        if (val.type == 'custom') {
          let url = val.arguments;
          url = app.globalData._TY_Tool.tpl(url, app.globalData._TY_Tool.buildTplParams(t, params));
          wx.navigateTo({
            url: url
          });
        }
      });
    },
    //滑动开始
    touchstart:function(e){
      let t=this;
      // const index = e.currentTarget.dataset.index;
      t.data.startX = e.changedTouches[0].clientX;
    },
    //滑块滑动中
    touchmove:function(e){
      let t=this;
      const index = e.currentTarget.dataset.index;
      let item = t.data.randerData[index];
      item.swipe = item.swipe ? item.swipe : 0;
      let moveX = e.changedTouches[0].clientX;
      t.data.moveLen = t.data.startX - moveX;
      console.log("移动距离---" + t.data.moveLen);
      if (t.data.moveLen>0){
        //向左滑
        if (t.data.moveLen - item.swipe < 0){
          item.swipe = 90;
        } else if (t.data.moveLen >= SWIPE_WIDTH){
          item.swipe = 90;
        }else{
          item.swipe = item.swipe + t.data.moveLen;
        }
      }else{
        if (item.swipe) {
          //没有滑动
          item.swipe = item.swipe + t.data.moveLen;
        }
      }
      let _data = t.data.randerData;
      _data[index] = item;
      t.setData({
        randerData: _data
      });
    },
    //滑块滑动结束
    touchend:function(e){
      let t=this;
      const index = e.currentTarget.dataset.index;
      let item = t.data.randerData[index];
      if (item.swipe <= 58 || t.data.moveLen<=-58){
        item.swipe = 0;
      }else{
        item.swipe = 90;
      }
      let _data = t.data.randerData;
      _data[index] = item;
      t.setData({
        randerData: _data
      });
    },
    del: function (event){
      let t=this;
      let row = event.currentTarget.dataset.row;
      t.triggerEvent("deleteClick", { item: row, bb: t });
    },

    
  }
})
