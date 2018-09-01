// buildingblock/bb-photo-single/bb-photo-single.js

const app = getApp();

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    domStyle:{
      type:String
    },
    //src 图片地址
    src: {
      type: String,
    },
    //srcDs 动态图片地址
    srcDs: {
      type: Object
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    
  },
  attached:function(){
    let t=this;
    t.getData();
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //获取图片地址
    getData: function () {
      const t = this;
      if (t.properties.srcDs) {
        app.globalData._TY_Tool.getDSData(t.properties.srcDs, app.globalData._TY_Tool.buildTplParams(t), function (map) {
          map.forEach((val, key) => {
            const dataKey = val.dataKey
            t.setData({
              src: val.value
            });
          })
        }, function (code, msg) {
        });
      }
    },
  }
})
