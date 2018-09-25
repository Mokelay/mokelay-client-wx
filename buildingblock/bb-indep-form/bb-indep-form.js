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
    formData:{},
    isOldData:false,
    realContent:[]
  },
  created:function(){
  },
  attached: function () {
    this.checkContentType(this.properties.content);
    this.getData();
    if (Object.keys(this.data.formData).length){
      this.setValue();
    }
  },
  ready: function () {
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //提交表单
    commit:function(e) {
      const t = this;
      if (t.properties.commitDs) {
        t.loading = true;
        wx._TY_Tool.getDSData(t.properties.commitDs, wx._TY_Tool.buildTplParams(t), function (data) {
          t.triggerEvent("commitSuccess", data);
        }, function (code, msg) {
          t.loading = false;
          t.triggerEvent("commitFail");
        });
      }
    },
    formReset: function () {
      console.log('form发生了reset事件')
    },
    triggerPublicEvent:function(e){
      const t = this;
      const value = e.detail.detail;
      const target = e.detail.target;
      t.properties.content.forEach((content,key)=>{
        if(content.uuid == target.id){
          const newFormData = t.data.formData;
          newFormData[content.attributes.attributeName] = value;
          t.setData({
            formData: newFormData
          });
        }
      })
      this.triggerEvent(e.detail.type, value);
    },
    //动态获取卡片内容
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
              formData: _value
            });
            t.setValue();
            t.triggerEvent("afterLoadData", t);
          });
        }, function (code, msg) {
          t.loading = false;
        });
      }
    },
    checkContentType:function(content){
      const t = this;
      if (content&&content[0]&&(content[0].alias == "bb-layout-seriation" || content[0].alias.indexOf("vant") != -1)){
        t.setData({
          isOldData:true,
          realContent:t.properties.content
        });
      }else{
        t.setData({
          isOldData: false,
          realContent: t.properties.content
        });
      }
    },
    setValue:function(){
      const t = this;
      const realContent = t.properties.realContent;
      t.setData({
        realContent: []
      });
      realContent.forEach((content,key)=>{
        const attributeName = content["attributes"]["attributeName"] || "";
        content["attributes"].value = t.data.formData[attributeName];
      })
      t.setData({
        realContent: realContent
      });
    }
  }
})
