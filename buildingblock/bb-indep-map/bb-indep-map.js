// buildingblock/bb-indep-map/bb-indep-map.js

const app = getApp();

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    //中心经度
    longitude:{
      type:Number
    },
    //中心纬度
    latitude:{
      type:Number
    },
    //缩放级别 5-18
    scale:{
      type:Number,
      value:16
    },
    //线路
    polyline:{
      type:Array
    },
    //当前定位是否显示方向
    showLocation:{
      type:Boolean
    },
    //是否支持缩放
    enableZoom:{
      type:Boolean
    },
    //是否支持拖动
    enableScroll:{
      type:Boolean
    },
    /**
     * 标点ds接口 标记点
     * {
     *  id:'标记点id Number',
     *  latitude:'纬度 Number',
     *  longitude:'经度 Number',
     *  title:'标注点名 String',
     *  zIndex:'显示层级 Number',
     *  iconPath:'显示的图标 String',// '/image/location.png'
     *  rotate:'旋转的角度 Number',
     *  alpha:'标注的透明度 Number 0-1',
     *  width:'标注图标宽度 Number',
     *  height:'标注图标高度 Number'
     * }
     */
    markersDs:{
      type:Object
    },
    //动态数据源时，标记点属性 对应关系 
    markerProps:{
      type:Object,
      value:{
        latitude:'latitude',
        longitude:'longitude',
        title:'title',
        zIndex:'zIndex',
        iconPath:'iconPath',
        rotate:'rotate',
        alpha:'alpha',
        width:'width',
        height:'height'
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentLatitue:0,//当前经纬度
    currentLongitude:0,//当前经度
    markers:[]//标记点
  },
  //数据初始化好后
  attached:function(){
    let t=this;
    wx.getLocation({
      success:function(res){
        t.data.currentLatitue = res.latitude;
        t.data.currentLongitude = res.longitude;
        t.setData({
          latitude: res.latitude,
          longitude: res.longitude
        });
        t.loadData();
      },
    });
  },
  ready: function (e) {
    //地图上下文
    this.mapCtx = wx.createMapContext('myMap',this);
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //加载数据
    loadData: function () {
      let t = this;
      if (t.data.markersDs) {
        wx.showLoading({
          title: '加载中',
        })
        //如果配置的ds说明是动态的数据
        app.globalData._TY_Tool.getDSData(t.data.markersDs, app.globalData._TY_Tool.buildTplParams(t), function (map) {
          wx.hideLoading();
          t.data.markersDs.type = t.data.markersDs.type ? t.data.markersDs.type : "dynamic";
          if (t.data.markersDs.type =='dynamic'){
            map.forEach(function (item) {
              var _list = [];
              if (item['valueKey'].split('.').length > 1) {//支持定制接口
                _list = item['value']
              } else {
                if (item['value'] && item['value']['list']) {
                  _list = item['value']['list'];
                } else {
                  _list = item['value'];
                }
              }
              //处理标点列表
              var markerList = [];
              _list.forEach((item,index)=>{
                //|| '/image/location.png'
                markerList.push({
                  id:index,
                  latitude: item[t.data.markerProps.latitude ||'latitude'],
                  longitude: item[t.data.markerProps.latitude || 'longitude'],
                  title: item[t.data.markerProps.latitude || 'title'],
                  zIndex: item[t.data.markerProps.latitude || 'zIndex'],
                  iconPath: item[t.data.markerProps.latitude || 'iconPath'],
                  rotate: item[t.data.markerProps.latitude || 'rotate'],
                  alpha: item[t.data.markerProps.latitude || 'alpha'],
                  width: item[t.data.markerProps.latitude || 'width'],
                  height: item[t.data.markerProps.latitude || 'height']
                });
              });
              t.setData({
                markers: markerList
              });
            });
          }else{
            // map.forEach((item,index)=>{
            //   if(!item.iconPath){
            //     item.iconPath = '/images/location.png';
            //   }
            // });
            t.setData({
              markers:map
            });
          }
          t.triggerEvent("loaded", { bb: t });
        }, function (code, msg) {
          wx.hideLoading();
        });
      }
    },
    //回到当前那位置
    coverReset:function(){
      this.mapCtx.getCenterLocation({
        success: function (res) {
          console.log(res.longitude)
          console.log(res.latitude)
        }
      });
      this.mapCtx.moveToLocation();
    }
  }
})
