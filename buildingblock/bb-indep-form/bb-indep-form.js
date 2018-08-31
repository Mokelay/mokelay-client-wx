// buildingblock/bb-indep-form/bb-indep-form.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    /*表单值 支持v-model*/
    value: {
      type: Object
    },
    //动态表单值
    formDataDs: {
      type: Object
    },
    /*
    content:积木数据,
        content:[{                      //页面内容
                uuid:'',
                alias:'',                   //积木别名
                aliasName:'',               //中文名称
                group:'',                   //积木分组 表单项显示的位置
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
    //提交ds
    commitDs: {
      type: Object
    },
    //其他属性设置
    option: {
      type: Object,
      value: {
        itemStyle: {
          display: "block"
        },
        labelStyle: {
          size: {
            width: "80px"
          }
        }
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  ready: function () {
  },
  attached: function () {
  },
  /**
   * 组件的方法列表
   */
  methods: {
    commit: function (e) {
      console.log('form发生了submit事件，携带数据为：', e.detail.value)
      this.triggerEvent("input", e.detail.value);
      this.triggerEvent("change", e.detail.value);
    },
    formReset: function () {
      console.log('form发生了reset事件')
    },
    input:function(e){
      this.triggerEvent("input", e.detail.value);
      this.triggerEvent("change", e.detail.value);
    },
    change: function (e) {
      this.triggerEvent("input", e.detail.value);
      this.triggerEvent("change", e.detail.value);
    },
    blur: function (e) {
      this.triggerEvent("input", e.detail.value);
      this.triggerEvent("change", e.detail.value);
    },
  }
})
