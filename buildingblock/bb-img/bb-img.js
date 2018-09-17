// buildingblock/bb-img/bb-img.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    src:{
      type:String,
      value:""
    },
    domStyle:{
      type:String
    },
    button:{
      type:Object
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  attached:function(){
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //img点击事件
    imgClick: function () {
      let t = this;
      if (t.properties.button) {
        wx._TY_Tool.resolveButton(t.properties.button, _TY_Tool.buildTplParams(t));
      }
      t.triggerEvent("click", t);
    },
    setValue:function(val){
      const t=this;
      t.setData({
        src:val
      });
    },
    getValue:function(){
      return this.data.src;
    }
  }
})
