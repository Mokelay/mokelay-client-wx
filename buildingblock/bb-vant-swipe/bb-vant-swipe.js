// buildingblock/bb-vant-swipe/bb-vant-swipe.js

const app = getApp();

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    domStyle:{
      type:String
    },
    /**
     * 静态数据
     * [{
          src:""  图片地址
          href:"" 跳转地址
        }]
     */
    images:{
      type:Array
    },
    //动态图组
    imageDs:{
      type:Object
    },
    //配置选项 字段转换
    props:{
      type:Object,
      value: {
        src: 'src',
        href: 'href'
      }
    },
    //其他配置
    option:{
      type:Object
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    list:[],
  },
  attached:function(){
    this.setData({
      option: Object.assign({
        autoplay: 3000,
        duration: 500,
        loop: true,
        vertical: false,
        touchable: true,
        showIndicators: true,
        initialSwipe: 0
      }, this.properties.option),
      props: Object.assign({
        src: 'src',
        href: 'href'
      },this.properties.props)
    });
    this.getData();
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //获取图片地址
    getData() {
      const t = this;
      if (t.properties.imageDs) {
        app.globalData._TY_Tool.getDSData(t.properties.imageDs, app.globalData._TY_Tool.buildTplParams(t), function (data) {
          t.properties.imageDs.type = t.properties.imageDs.type ? t.properties.imageDs.type : "dynamic";
          if (t.properties.imageDs.type == "dynamic") {
            data.forEach((item) => {
              let _list = [];
              if (item['value'] && item['value']['currentRecords']) {
                _list = item['value']['currentRecords'];
              } else if (item['value'] && item['value']['list']) {
                _list = item['value']['list'];
              } else {
                _list = item['value'];
              }
              let newValue = t.transferData(_list);
              t.setData({
                list: newValue
              });
            });
          } else {
            t.setData({
              list: data
            });
          }
        }, function (code, msg) {
        });
      }
    },
    //点击图片
    click(e) {
      const t = this;
      const item = e.currentTarget.dataset.item;
      t.triggerEvent("click", {item:item});
      if (item.href) {
        wx.navigateTo({
          url: item.href
        });
      }
    },
    //转换DS返回的数据
    transferData(data) {
      const t = this;
      const valueKey = t.properties.props["src"];
      const textKey = t.properties.props["href"];
      const dataString = JSON.stringify(data);
      let newString = valueKey ? dataString.replace(new RegExp(valueKey, 'g'), "src") : dataString;
      newString = textKey ? newString.replace(new RegExp(textKey, 'g'), "href") : newString;
      const newData = JSON.parse(newString);
      return newData;
    },
  }
})
