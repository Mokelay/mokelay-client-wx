// buildingblock/bb-indep-ul/bb-indep-ul.js
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
    }
  },
/**
   * 组件的初始数据
   */
  data: {
    list:[],
    external:{},
    realContent:[],
    pageSize: 10,
    page: 1,
    end: false,//是否加载结束
    loading: false//是否加载中
  },
  attached:function(){
    let t=this;
    t.setData({
      list: t.transferList(t.properties.staticList),
      page: t.properties.pageConfig.page,
      pageSize: t.properties.pageConfig.pageSize,
      realContent:t.properties.itemContent
    });
    if (!t.properties.lazy) {
      //加载数据
      t.loadData();
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
      val = [{
        title:'title1',
        img:'http://imgsrc.baidu.com/imgad/pic/item/e1fe9925bc315c60f4aa8f2787b1cb134954773f.jpg'
      }, {
          title: 'title2',
          img: 'http://imgsrc.baidu.com/imgad/pic/item/e1fe9925bc315c60f4aa8f2787b1cb134954773f.jpg'
        }]

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

    },
  }
})
