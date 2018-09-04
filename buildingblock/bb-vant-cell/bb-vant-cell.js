// buildingblock/bb-vant-cell/bb-vant-cell.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    //内容
    value: {
      type: [Number, String]
    },
    /*模板默认值*/
    defaultValTpl: {
      type: [String, Number, Boolean]
    },
    /*其他属性配置
        {
            icon:String 左侧图标,
            title:String 左侧标题,
            label:String 标题下方的描述信息,
            required:Boolean 是否显示表单必填星号,
            isLink:Boolean 展示右侧箭头并开启点击反馈
            center:Boolean 使内容垂直居中
            url:""  跳转链接
            clickable:Boolean 开启点击反馈
            valueStyle:{}
         }
    */
    option: {
      type: Object
    },
    /*
    content:积木数据,
        content:[{                      //页面内容
                uuid:'',
                alias:'',                   //积木别名
                aliasName:'',               //中文名称
                group:'',                   //对应slot  空 对应 内容 icon  自定义icon  title   自定义title  right-icon  自定义右侧按钮，默认是arrow

                attributes:{
                    attributeName:''    //表单项键值别名
                    rules:[]            //验证规则
                    width:''            //表单项宽度
                    ........            //其他积木属性
                },              //积木属性
                animation:[{                //动画
                    style:"",               //方式
                    time:0,                 //时间
                    delay:0,                //延迟时间
                    playNum:1               //播放次数
                    loop:true|false,        //循环
                    direction:""            //方向
                }],
                interactives:[{             //触发交互
                    uuid:'',
                    fromContentEvent:'',    //触发积木的事件,fromContentUUID为当前content的UUID
                    executeType:'',         //执行类型(预定义方法 trigger_method,
                                            //自定义方法 custom_script,
                                            //容器类方法 container_method)
                    executeScript:'',       //执行脚本 executeType = custom_script
                    executeContentUUID:'',  //执行积木的UUID executeType = trigger_method
                    executeContentMethodName:'',
                                            //执行积木的方法
                    containerMethodName:''  //容器方法 executeType = container_method
                }],
                layout:{                    //积木布局
                    sort:0,                 //排序 顺序排列布局下有效
                    bgColor:"",             //背景颜色
                    rotate:0,               //旋转
                    transparency:0,         //透明度
                    border:{                //边框
                        style:"",           //边框样式
                        color:"",           //边框颜色
                        size:"",            //边框尺寸
                        radius:"",          //边框弧度
                        margin:""           //边距
                    },
                    shadow:{                //阴影
                        color:"",           //阴影颜色
                        size:"",            //阴影大小
                        direction:'',       //阴影方向
                        vague:''            //阴影模糊
                    }
                }
            }]
    */
    content: {
      type: Array,

    },
    //动态内容
    contentDs: {
      type: Object
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    realOption:{}
  },
  created: function () {
  },
  attached: function () {
  },
  ready: function () {
  },
  /**
   * 组件的方法列表
   */
  methods: {
    getData() {
      const t = this;
      if (t.properties.formDataDs) {
        t.loading = true;
        wx._TY_Tool.getDSData(t.properties.formDataDs, wx._TY_Tool.buildTplParams(t), function (data) {
          data.forEach((item) => {
            t.loading = false;
            let _value = {};
            if (item['value'] && item['value']['currentRecords']) {
              _value = item['value']['currentRecords'];
              const totalPage = item['value']['totalPages'];
              if (t.page >= totalPage) {
                t.end = true;
              } else {
                t.end = false;
              }
            } else if (item['value'] && item['value']['list']) {
              _value = item['value']['list'];
            } else {
              _value = item['value'];
            }
            t.setData({
              content: _value
            });
            t.triggerEvent("afterLoadData", t);
          });
        }, function (code, msg) {
          t.loading = false;
        });
      }
    },
    goUrl: function () {
      this.triggerEvent("click",this);
      let url = this.properties.option.url || "";
      const currentUrl = wx._TY_Tool.getCurrentUrl();
      if (this.properties.option.url.split("#/")[1]) {
        url = currentUrl.split("=")[0] + "=" + url.split("#/")[1];
        url = url[0] == "/" ? url : "/" + url;
      }
      if (!url.split("alias")[1]) {
        url = url.split("=")[0] + "?alias=" + url.split("=")[1]
      }
      // const url = wx.tpl(this.option.url, t);
      wx.navigateTo({
        url: url
      })
    }
  }
})
