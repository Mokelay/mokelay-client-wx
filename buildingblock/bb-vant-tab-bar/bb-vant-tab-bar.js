// buildingblock/bb-vant-tab-bar/bb-vant-tab-bar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    //v-model 当前索引
    value: {
      type: Number
    },
    /*静态标签数据
        [{
            text:"标签名称"  标签名称
            icon:"chat", 图标
            dot:false, 显示小红点
            info:"String || Number" 图标右上角提示信息
            url:"String" 跳转链接
            to:"String || Object"   路由跳转对象，同 vue-router 的 to
            replace:false  跳转时是否替换当前history
            iconStyle:{},  图标样式
            textStyle:{}   字体样式

        }]
    */
    fields: {
      type: Array
    },
    valueKey: {
      type:Object,
      value:{
        text: "text",
        icon: "icon",
        dot: "dot",
        info: "info",
        url: "url",
        iconStyle: "iconStyle",
        textStyle: "textStyle",
      }
    },
    //动态标签数据
    fieldsDs: {
      type: Object
    },
    /*  自定义图标
        content:[{                      //页面内容
                uuid:'',
                alias:'',                   //积木别名
                aliasName:'',               //中文名称
                group:'',                   //对应图标的text
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
      type: Array
    },
    /*动态自定义图标*/
    contentDs: {
      type: Object
    },
    /*激活的样式
        {
            iconStyle:{},
            textStyle:{}
        }
    */
    activeStyle: {
      type: Object,
      value:{
        iconStyle: {
          font: {
            color: "#0091ea"
          },
        },
        textStyle: {
          font: {
            color: "#0091ea"
          },
        }
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    realFields: [{
      text: '标签1',
      icon: 'ty-yy_ty',
      url: "/pages/index/index?alias=wx-test-page",
      iconStyle: {},
      textStyle: {}
    }, {
        text: '标签2',
        icon: 'ty-yy_ty',
        url: "/pages/index/index?alias=xy_partner_home",
        iconStyle: {},
        textStyle: {}
      }, {
        text: '标签3',
        icon: 'ty-yy_ty',
        url: "/pages/index/index?alias=xy_partner_my",
        iconStyle: {},
        textStyle: {}
      }],
    realActiveStyle:{
      iconStyle: {
        color: "#0091ea"
      },
      textStyle: {
        color: "#0091ea"
      }
    },
    currentUrl:""
  },
  attached: function () {
    const newField = this.properties.fields;
    const activeStyle = this.properties.activeStyle;
    let currentUrl = wx._TY_Tool.getCurrentUrl();
    newField.forEach((field,key)=>{
      field.iconStyle = wx._TY_Tool.setStyle(null,{layout: field.iconStyle});
      field.textStyle = wx._TY_Tool.setStyle(null, {layout: field.textStyle });
      field.url = field.url || field.to
      if (!field.url.split("/")[1]) {
        field.url = currentUrl.split("=")[0] + "=" + field.url;
        field.url = field.url[0] == "/" ? field.url : "/" + field.url;
      }
      // field.url = wx._TY_Tool.tpl(field.url, this);
    });
    const newActiveStyle = {
      iconStyle: wx._TY_Tool.setStyle(null, {layout: activeStyle.iconStyle}),
      textStyle: wx._TY_Tool.setStyle(null, {layout: activeStyle.textStyle})
    }
    this.setData({
      realFields: newField,
      realActiveStyle:newActiveStyle,
      currentUrl: currentUrl
    })

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
