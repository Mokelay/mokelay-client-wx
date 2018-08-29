// buildingblock/bb-layout-seriation.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    /*水平排列*/
    horizontal: {
      type: Boolean,
      value:false
    },
    content: {
      type: [Array, String]
    },
    //排版  下拉：均分(average),按比例分配(proportion),紧凑(compact),右侧自动填充(rightauto)，左侧自动填充(leftauto)
    layoutType: {
      type: String,
      value: "average"
    },
    //用bb-tag标签配置。结构是数组["1","2"]
    distributeBlock: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    itemClass: "db",
    realContent:[]
  },
  //此时不能setData
  created:function(){
  },
  //此时可以setData
  attached:function(){
    let t=this;
    this.setData({
      itemClass:t.data.horizontal ? "df" : "db",
      realContent:t.data.content
    });
  },
  //页面准备结束，此时可以用select获取节点
  ready:function(){

  },
  /**
   * 组件的方法列表
   */
  methods: {

  }
})
