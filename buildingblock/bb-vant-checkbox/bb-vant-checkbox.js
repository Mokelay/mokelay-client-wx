// buildingblock/bb-vant-checkbox/bb-vant-checkbox.js

const app = getApp();

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    domStyle:{
      type:String
    },
    value:{
      type:String
    },
    //静态选项
    fields:{
      type:Array
    },
    //动态选项
    fieldsDs:{
      type:Object
    },
    option:{
      type:Object,
      value:{
        disabled:false
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    list:[]
  },
  attached:function(){
    let t=this;
    t.setData({
      list: t.properties.fields
    });
    t.refrash();
    t.getData();
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //获取数据
    getData() {
      const t = this;
      if (t.properties.fieldsDs) {
        app.globalData._TY_Tool.getDSData(t.properties.fieldsDs, app.globalData._TY_Tool.buildTplParams(t), function (data) {
          data.forEach((item) => {
            const { dataKey, value } = item;
            t.setData({
              list: value
            });
            t.refrash();
          });
        }, function (code, msg) {
        });
      }
    },
    //刷新
    refrash:function(){
      let t=this;
      if(t.data.list && t.data.list.length>0 && t.properties.value){
        let _list = t.data.list;
        let vals = t.properties.value.split(",");
        _list.forEach((item)=>{
          vals.forEach((val)=>{
            if(item.value == val){
              item.checked = true;
              return false;
            }
          });
        });
        t.setData({
          list:_list
        });
      }
    },
    //值改变
    change(e) {
      this.triggerEvent("input", { value: e.detail.value });
      this.triggerEvent("change", {value:e.detail.value});
    }
  }
})
