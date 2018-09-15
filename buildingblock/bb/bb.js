// component/bb/bb.js
/**
 * 类似 h5中的 bbRender方法 用于渲染content
 */
const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    value: {
      type: null
    },
    alias: {
      type: String,
      value:"bb-img"
    },
    //渲染content 的属性
    attributes: {
      type: Object
    },
    //content的某一项
    bb: {
      type: Object
    },
    on: {
      type: Object
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
     domStyle:""
  },

  //设置css样式
  attached:function(){
    let t=this;
    if (t.data.bb && t.data.bb.layout){
      let _css = getApp().globalData._TY_Tool.setSimpleStyle(t.data.bb.layout);
      t.setData({
        domStyle: _css
      });
    }
  },

  ready:function(){
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //转换content中h5的event和小城程序的event名称，比如 tap 转成 click
    transferContentEventName:function(eventName){
      let t=this;
      if (eventName==='tap'){
        return "click";
      }
      return eventName;
    },
    //公共事件触发
    publicEventEmit:function(e){
      let t=this;
      t.triggerEvent(e.type, e);
      const eventType = e.type;
      let args = e.detail;
      let val = args.value||'';
      const bb = t.properties.bb;
      if (bb && bb.interactives && bb.interactives.length>0){
        for(let i=0;i<bb.interactives.length;i++){
          //交互
          let _on = bb.interactives[i];
          if (_on.fromContentEvent == t.transferContentEventName(eventType)){
            //有这个事件的交互配置，执行交互
            const executeType = _on['executeType'];//获取交互的类型
            let fun = null;

            //处理executeArgument 交互参数
            let params = _on.executeArgument;
            try {
              params = JSON.parse(params);
            } catch (e) {
              //如果不是json数据，返回一般字符串
            }
            const customArg = {
              type: 'custom',
              arguments: params
            }
            const realParams = [args].concat(customArg, t, _on.fromContentEvent);

            if (executeType == 'trigger_method'){
              const uuid = _on.executeContentUUID;
              let componentNode = app.globalData._TY_Tool.findBBByUuid(uuid);
              fun = componentNode ? componentNode[_on.executeContentMethodName] : null;
              //调用
              if(fun){
                fun.apply(componentNode, realParams);
              }
            } else if (executeType == 'custom_script') {
              //自定义方法
              const buzz = _on['executeScript'];
              fun = app.globalData._TY_Tool.loadBuzz(buzz);
              if (fun){
                fun.apply(this, realParams);
              }
            } else if (executeType == 'container_method') {
              //容器方法
              const executeContentUUID = _on['executeContentUUID'];
              const containerMethodName = _on['containerMethodName'];
              fun = t[containerMethodName] || app.globalData._TY_Root[containerMethodName];
              //调用
              if (fun){
                fun.apply(app.globalData._TY_Root, realParams);
              }
            }

          }
        }
      }
    }
  }
})
