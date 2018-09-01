// buildingblock/bb-words/bb-words.js

const app = getApp();

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    domStyle:{
      type:String
    },
    //文字内容，支持模板<%=params%>
    text: {
      type: [String, Number]
    },
    //动态数据源获取文字内容
    textDs: {
      type: Object
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    realText:"",
    external: {},
  },
  attached:function(){
    let t=this;
    t.setData({
      realText: t.properties.value || t.properties.text,
    });
    t.getData();
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //外部联动 接收交互参数
    linkage: function (data) {
      const t = this;
      t.data.external['linkage'] = data;
      if (data) {
        t.data.realText = data;
      }
    },
    //获取动态数据
    getData: function () {
      const t = this;
      if (t.properties.textDs) {
        app.globalData._TY_Tool.getDSData(t.properties.textDs, app.globalData._TY_Tool.buildTplParams(t), function (map) {
          map.forEach((val, key) => {
            // t.data.realText = val.value;
            t.setData({
              realText: val.value,
            });
          })
        }, function (code, msg) {
        });
      }
    },
  }
})
