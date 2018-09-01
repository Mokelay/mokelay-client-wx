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
      type: Array,
      value: [{
        text: '选项1',
        value: '1',
        subDescription: "默认值1",
        disabled: false
      }, {
        text: '选项2',
        value: '2',
        subDescription: "默认值2",
        disabled: false
      }]
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

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
