// buildingblock/bb-vant-steps/bb-vant-steps.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    //当前激活指针  支持模板
    value: {
      type: [String, Number]
    },
    //  显示方向，可选值为 vertical horizontal
    direction: {
      type: String
    },
    //激活状态颜色
    activeColor: {
      type: String
    },
    /*静态内容
        content:[{                      //页面内容
                uuid:'',
                alias:'',                   //积木别名 
                aliasName:'',               //中文名称 
                group:'',                   //积木分组 对应slot  header main footer
                attributes:{
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
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    stepsArr: []
  },

  /** 
   * 组件的方法列表
   */
  methods: {
    renderContent: function() {
      const t = this;
      const steps = {};
      t.data.content.forEach((ele, key) => {
        steps[ele.group] = steps[ele.group] ? steps[ele.group] : [];
        steps[ele.group].push(ele);
      });


      const stepsArr = [];
      Object.keys(steps).forEach((name, index) => {
        stepsArr.push(steps(name));
      });

      t.setData({
        stepsArr: stepsArr
      });
    }
  }
});