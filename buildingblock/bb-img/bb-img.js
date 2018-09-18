// buildingblock/bb-img/bb-img.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    value:{
      type:String
    },
    src:{
      type:String
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
    realSrc:""
  },

  attached:function(){
    const src = this.properties.value || this.properties.src;
    const realSrc = wx._TY_Tool.tpl(src, wx._TY_Tool.buildTplParams(this));
    this.setData({
      realSrc: realSrc
    })
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
      const src = wx._TY_Tool.tpl(val, wx._TY_Tool.buildTplParams(this));
      t.setData({
        realSrc:src
      });
    },
    getValue:function(){
      return this.data.realSrc;
    }
  }
})
