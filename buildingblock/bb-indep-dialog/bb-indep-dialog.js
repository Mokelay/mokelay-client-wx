// buildingblock/bb-indep-dialog/bb-indep-dialog.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    //内容积木列表
    content: {
      type: [Array, String]
    },
    //是否显示
    isShow: {
      type: Boolean,
      value: true
    },
    //弹窗标题
    title: {
      type: String
    },
    //消息内容  针对H5
    message: {
      type: String
    },
    //是否展示确认按钮  针对H5
    showConfirmButton: {
      type: Boolean,
      value: true
    },
    //是否显示取消按钮  针对H5
    showCancelButton: {
      type: Boolean,
      value: false
    },
    //确认按钮文案  针对H5
    confirmButtonText: {
      type: String,
      value: "确认"
    },
    //取消按钮的文案  针对H5
    cancelButtonText: {
      type: String,
      value: "取消"
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isShow:true,
    content:[{alias:"bb-input"}],
    confirmButtonText:"确定"
  },
  ready: function () {
  },
  /**
   * 组件的方法列表
   */
  methods: {
    cancel(){
      this.setData({
        isShow: false
      });
    },
    confirm(){
      this.setData({
        isShow: false
      });
    }
  },
  created:function(){
    console.log(this);
  }
})
