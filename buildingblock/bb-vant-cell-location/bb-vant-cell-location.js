// buildingblock/bb-vant-cell-location/bb-vant-cell-location.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    domStyle:{
      type:String
    },
    /*位置信息 支持v-model
               
            */
    value: {
      type: String
    },
    /*其他属性配置
      {
          scale: 1 // 地图缩放级别,整形值,范围从1~28。默认为最大
          ak:'xxxxxx' 百度地图接口 ak   需要根据经纬度获取地址详细名称
      }
    */
    option: {
      type: Object,
      value: {
        scale: 22,
        ak:''
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    cellOpt:{
      icon: "ty-wj_mall_address_ques",
      title: "所在位置",
      label: "",
      required: false,
      isLink: true,
      center: true
    },
    /**
     * 真正的地址对象，包括经纬度 和详细地址名称
     *  {
            latitude: 0, // 纬度，浮点数，范围为90 ~ -90
            longitude: 0, // 经度，浮点数，范围为180 ~ -180。
            name: '', // 位置名
            address: '', // 地址详情说明
        }
     */
    locationObj:{},
    locationClass:''//location样式

  },
  attached:function(){
    let t=this;
    t.wxLocation();
  },
  /**
   * 组件的方法列表
   */
  methods: {
    renderLocation:function(){
      let t=this;
      const _tmp = t.data.cellOpt;
      _tmp.title = t.data.value;
      t.setData({
        cellOpt: _tmp
      });
    },
    //微信定位
    wxLocation() {
      const t = this;
      wx.getLocation({
        type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
        success: function (res) {
          t.data.locationObj.latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
          t.data.locationObj.longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
          const speed = res.speed; // 速度，以米/每秒计
          const accuracy = res.accuracy; // 位置精度
          t.data.locationObj = res;
          t.getLocationName(t.data.locationObj.latitude, t.data.locationObj.longitude);
        }
      });
    },
    getLocationName(latitude, longitude) {
      const t = this;
      const ak = t.data.option.ak ? t.data.option.ak:"HycR3XEV2OG3zLRM6AF2jo2iBsjgiqVo";  //xlx
      const url = `http://api.map.baidu.com/geocoder/v2/?location=${latitude},${longitude}&output=json&pois=1&ak=${ak}`;
      wx.request({
        data: {},
        header: {
          'Content-Type': 'application/json'
        },
        url: url,
        success: function (res) {
          let data = res.data;
          t.data.locationObj.address = data.result.formatted_address;
          t.data.locationObj.name = data.result.sematic_description;
          t.data.value = data.result.sematic_description;
          t.setData({
            value: t.data.value,
            locationClass:"locationClass"
          });
          t.triggerEvent("change", { value: t.data.value});
          t.triggerEvent("input", { value: t.data.value });
          if (data.status!=0) {
            console.error("百度地址获取失败!");
            t.setData({
              locationClass: ""
            });
          } else {
            console.log(data);
          }
          t.renderLocation();
        },
        fail: function (res) {
          console.log(res)
        },
      });
    },
    openMap() {
      const t = this;
      wx.openLocation({
        latitude: t.data.locationObj.latitude, // 纬度，浮点数，范围为90 ~ -90
        longitude: t.data.locationObj.longitude, // 经度，浮点数，范围为180 ~ -180。
        name: t.data.locationObj.name, // 位置名
        address: t.data.locationObj.address, // 地址详情说明
        scale: t.data.option.scale, // 地图缩放级别,整形值,范围从1~28。默认为最大
      })
    }
  }
})
