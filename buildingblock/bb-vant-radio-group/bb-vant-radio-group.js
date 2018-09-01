// buildingblock/bb-vant-radio-group/bb-vant-radio-group.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    //默认值  支持v-model
    value: {
      type: [Number, String, Boolean]
    },
    /*模板默认值*/
    defaultValTpl: {
      type: [String, Number, Boolean]
    },
    radioData: {
      type: [String, Number, Boolean],
      default: '1',
    },
    /*选项数据 静态
        [{
            text:'选项1'，
            value:1,
            disabled:false
        },{
            text:'选项2'，
            value:2,
            disabled:false
        }]
    */
    fields: {
      type: Array
    },
    /*选项数据 动态
        通过DS接口获取
    */
    fieldsDs: {
      type: Object
    },
    /*其他属性扩展 disabled 等
        disabled: 禁用
    */
    option: {
      type: Object,
      value: {
        disabled: false
      }
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    valueBase:false,
    realFields: [{
      text: '选项1',
      value: '1',
      subDescription: "默认值1",
      disabled: false,
      checked:false
    }, {
      text: '选项2',
      value: '2',
      subDescription: "默认值2",
      disabled: false,
      checked:false
    }]
  },
  attached: function () {
    this.getData();
    // this.setData({
    //   realFields: this.data.fields
    // });
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //获取数据
    getData:function() {
      const t = this;
      if (t.properties.fieldsDs) {
        wx._TY_Tool.getDSData(t.properties.fieldsDs,wx. _TY_Tool.buildTplParams(t), function (data) {
          data.forEach((item) => {
            const { dataKey, value } = item;
            t.setData({
              realFields:value
            })
          });
        }, function (code, msg) {
        });
      }
    },
    //值改变
    change:function(e) {
      this.triggerEvent("change", e.detail.value);
      // this.setData({
      //   valueBase: e.default.value
      // })
    },
  }
})
