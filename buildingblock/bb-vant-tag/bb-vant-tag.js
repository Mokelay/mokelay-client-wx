// buildingblock/bb-vant-tag/bb-vant-tag.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    //标签值，可选中时有效   如: a,b,c
    value:{
      type:String
    },
    //标签静态
    tags:{
      type:Array
    },
    //标签动态
    tagDs:{
      type:Object
    },
    //是否可点击
    isActive:{
      type:Boolean,
      value:false
    },
    //是否多选
    multiple:{
      type:Boolean,
      value:false
    },
    //标签item样式
    cssStyle:{
      type:Object
    },
    //点击后的样式
    activeStyle:{
      type:Object
    },
    //是否全圆角
    radius:{
      type:Boolean,
      value:false
    },
    domStyle:{
      type:String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    show: false,
    /**
     * [{
     *  text:'标签',
     *  value:'1',
     *  selected:false,
     *  css:""//选中或者默认样式
     * }]
     */
    list:[],
    selected: [],//选中对象
    selectedVal: ''//选中val值
  },
  attached:function(){
    let t = this;
    t.setData({
      list: t.properties.tags ? t.properties.tags:[]
    });
    t.getData();
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //获取数据
    getData() {
      const t = this;
      if (t.properties.tagDs) {
        app.globalData._TY_Tool.getDSData(t.properties.tagDs, app.globalData._TY_Tool.buildTplParams(t), function (data) {
          t.properties.tagDs.type = t.properties.tagDs.type ? t.properties.tagDs.type : "dynamic";
          if (t.properties.tagDs.type == "dynamic") {
            data.forEach((item) => {
              var _list = [];
              if (item['valueKey'].split('.').length > 1) {//支持定制接口
                _list = item['value']
              } else {
                if (item['value'] && item['value']['currentRecords']) {
                  _list = item['value']['currentRecords'];
                } else if (item['value'] && item['value']['list']) {
                  _list = item['value']['list'];
                } else {
                  _list = item['value'];
                }
              }
              t.setData({
                list: _list||[]
              });
              t.initList();
              t.buildListCss();
            });
          } else {
            t.setData({
              list: data || []
            });
            t.initList();
            t.buildListCss();
          }
        }, function (code, msg) {
        });
      }
    },
    //初始化list的选中值
    initList:function(){
      let t=this;
      if(t.properties.value){
        const vals = t.properties.value.split(",");
        let _list = t.data.list;
        if (!_list || _list.length<=0){
          return;
        }
        _list.forEach((item)=>{
          vals.forEach((val)=>{
            if (item.value ==val) {
              item.selected = true;
              return false;//结束内循环
            }
          });
        });
        t.setData({
          list:_list
        });
      }
    },
    /**
     * 构建 list 主要选中和非选中样式
     */
    buildListCss:function(){
      let t=this;
      if (t.data.list && t.data.list.length>0){
        let _list = t.data.list;
        _list.forEach((item,index)=>{
          let _css = {};
          if (t.properties.cssStyle){
            let defaultCss = app.globalData._TY_Tool.setSimpleStyle(t.properties.cssStyle,true);
            _css = Object.assign(_css, defaultCss);
          }
          if (item.selected && t.properties.activeStyle){
            let activeCss = app.globalData._TY_Tool.setSimpleStyle(t.properties.activeStyle, true);
            _css = Object.assign(_css, activeCss);
          }
          if (t.properties.radius){
            //全圆角
            _css = Object.assign(_css,{
              "border-radius":"50%"
            });
          }
          item.css = app.globalData._TY_Tool.cssToString(_css);
        });
        t.setData({
          list:_list
        });
      }
    },
    //tag点击事件
    tagClick: function (event) {
      let t = this;
      const current = event&&event.currentTarget.dataset.item||null;
      const index = event && event.currentTarget.dataset.index;
      if (current && t.properties.isActive){
        let _list = t.data.list;
        if (current.selected){
          //如果是选中的 再次点击取消选中
          _list[index].selected = false;
        }else{
          if (!t.properties.multiple){
            //单选 先清空所有选中
            _list.forEach((item)=>{
              if(item.selected){
                item.selected = false;
              }
            });
          }
          _list[index].selected = true;
        }
        //更新list
        t.setData({
          list:_list
        });
      }
      t.triggerEvent('itemClick', { value: t._calculateSelected(), item: current });
      t.triggerEvent('input', { value: t._calculateSelected()});
      t.triggerEvent('change', { value: t._calculateSelected()});
      //刷新页面
      t.buildListCss();
    },
    //计算选中值
    _calculateSelected: function () {
      let t = this;
      let tmpVal = [];
      t.data.list.forEach((item) => {
        if (item.selected) {
          tmpVal.push(item.value);
        }
      });
      return tmpVal.length>0?tmpVal.join(","):'';
    }
  }
})
