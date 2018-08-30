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
    realContent:[],
    layouts:[]//用于模板渲染排版，均分，按比例分等
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
    //顺序布局排版设置
    let _layout = t._buildLayout();

  },
  //页面准备结束，此时可以用select获取节点
  ready:function(){

  },
  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 构建顺序布局排版
     */
    _buildLayout:function(){
      let t=this;
      let result = [];
      const content = t.data.realContent;
      if(content&&content.length>0){
        content.forEach((item,index)=>{
          let _style = "";
          if (!t.data.layoutType || t.data.layoutType === 'average') {
            _style = "flex: 1; width: 1%;";//1%解决flex1 不均分的bug
          } else if (t.data.layoutType === 'compact') {
            _style = "";
          } else if (t.data.layoutType === 'proportion') {
            let _flex = 1;
            if (typeof (t.data.distributeBlock[index]) === 'string') {
              _flex = Number(t.data.distributeBlock[index] || 1);
            } else if (typeof (t.data.distributeBlock[index]) === 'object') {
              _flex = Number(t.data.distributeBlock[index].alias || 1);
            }
            _style = "flex: " + _flex+"; width: 1%;";//1%解决flex1 不均分的bug
          } else if (t.data.layoutType === 'rightauto') {
            //左边固定宽度，右边自动填充
            if (index == 0) {
              _style = "flex:initial;display:block;";
            } else {
              _style = "flex:1;display:block;width:1%;";
            }
          } else if (t.data.layoutType === 'leftauto') {
            //左侧自动填充，右侧固定
            if (index == content.length - 1) {
              _style = "flex:initial;display:block;";
            } else {
              _style = "flex:1;display:block;width:1%;";
            }
          }
          if (!t.data.horizontal) {
            _style = "";
          }
          result.push(_style);
        });
      }
      t.setData({
        layouts: result
      });
    }
  }
})
