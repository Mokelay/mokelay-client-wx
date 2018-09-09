// buildingblock/bb-indep-tabs/bb-indep-tabs.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    /**
                tab主题:
                [{
                    text:'默认',
                    value:'default'
                },{
                    text:'白蓝块',
                    value:'FB_card'
                },{
                    text:'大长块',
                    value:'big_card'
                }]
            */
    tabTheme: {
      type: String,
      default: 'FB_card'
    },
    //默认展开的tab名称
    activeName: {
      type:String
    },
    //tab的位置
    tabPosition: {
      type: String,
      default: 'top'
    },
    //tab的icon样式
    tabIconStyle: {
      type: Object
    },
    /**
        记录所有的tab  static和 dynamic区分
        tabs:[{
            type:'static',
            label:'全部',
            name:'all'
        },{
            type:'dynamic',
            name:'d',//content中的group
            ds:{
                ...
            }
        }]
    **/
    tabs: {
      type: Array,
      value: []
    },
    //内容模板，或者静态内容
    content: {
      type: [Array, String],
      value:[]
    },
    //单个tab的样式
    itemStyle: {
      type: Object
    },
    //单个tab选中的样式
    activeItemStyle: {
      type: Object
    },
    //header 的样式设置
    headerStyle: {
      type: Object
    },
    //content的样式设置
    panelStyle: {
      type: Object
    },
    //是否可以影藏panel
    hidePanel: {
      type: Boolean,
      value:false
    },
    //文本对应的接口变量名
    textProp: {
      type: String
    },
    //值对应的接口变量名
    valueProp: {
      type: String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    realTabs: [],
    tabsData: [],
    bbContent: [],
    canRender: false,
    p_activeName: ""
  },
  created:function(){
    let t = this;
    t.getTabHeaders();
  },
  attached: function () {
    const content = typeof (this.properties.content) === 'string' ? JSON.parse(this.properties.content) : this.properties.content;
    const p_activeName = wx._TY_Tool.tpl(this.properties.activeName, wx._TY_Tool.buildTplParams(this));

    this.setData({
      bbContent:content,
      p_activeName: p_activeName,
      tabsData:this.properties.tabs
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //渲染头部
    renderHeader: function (createElement) {
      let t = this;
    },
    //渲染panel
    renderPanel: function (createElement) {
      let t = this;
    },
    //影藏某个tab
    hideTab: function (tabName) {
      let t = this;
      if (t.data.tabsData) {
        t.data.tabsData.forEach((tab, index) => {
          if (tab.name == tabName) {
            tab.show = false;
            return false;
          }
        });
      }
    },
    //显示某个tab
    showTab: function (tabName) {
      let t = this;
      if (t.data.tabsData) {
        t.data.tabsData.forEach((tab, index) => {
          if (tab.name == tabName) {
            tab.show = true;
            return false;
          }
        });
      }
    },
    //选中某个tab
    activeTab: function (tabName) {
      let t = this;
      if (t.data.tabsData) {
        t.data.tabsData.forEach((tab, index) => {
          if (tab.name == tabName) {
            tab.show = true;
            t.setData({
              p_activeName:tab.name
            })
            return false;
          }
        });
      }
    },
    //根据index 选中某个tab
    activeTabIndex: function (index) {
      let t = this;
      if (t.data.tabsData) {
        t.data.tabsData.forEach((tab, key) => {
          if (index == key) {
            tab.show = true;
            t.setData({
              p_activeName: tab.name
            })
            return false;
          }
        });
      }
    },
    //根据tabs 获取所有的
    getTabHeaders: function () {
      let t = this;
      const realTabs = [];
      if (t.properties.tabs && t.properties.tabs.length > 0) {
        const promiseArr = [];
        t.properties.tabs.forEach(function (tab, index) {
          if (tab.type === 'static') {
            realTabs.push({
              label: tab.label,
              name: tab.name,
              group: tab.name,
              icon: tab.icon
            });
          } else if (tab.type === 'dynamic') {
            const textKey = t.properties.textProp || 'text';
            const valueKey = t.properties.valueProp || 'value';
            const item = new Promise((resolve, reject) => {
              wx._TY_Tool.getDSData(tab.ds, _TY_Tool.buildTplParams(t), function (map) {
                map[0].value.forEach((item, key) => {
                  realTabs.push({
                    label: item[textKey],
                    name: item[valueKey],
                    group: tab.name,
                    icon: item.icon
                  })
                });
                resolve();
              }, function (code, msg) {
                reject();
              });
            });
            promiseArr.push(item);
          }
        });
        t.setData({
          realTabs: realTabs
        })
        Promise.all(promiseArr).then(values => {
          //tab 头设置完了之后，将tab头和content转换成tabData
          t.contentToTabData();
        });
      }
    },
    //转换content 让bb-tab能渲染  同一个group组装content
    contentToTabData: function () {
      let t = this;
      tabsData = [];
      if (t.data.realTabs && t.data.realTabs.length > 0 && t.bbContent && t.bbContent.length > 0) {
        for (let i = 0; i < t.data.realTabs.length; i++) {
          let data = {
            label: t.data.realTabs[i].label,
            name: t.data.realTabs[i].name,
            icon: t.data.realTabs[i].icon,
            show: true,
            content: []
          };
          for (let j = 0; j < t.bbContent.length; j++) {
            let item = t.bbContent[j];
            if (item.group == t.data.realTabs[i].group) {
              //同一个group
              let itemCopy = _TY_Tool.deepClone(item);
              let itemAttrStr = JSON.stringify(item['attributes']);
              itemCopy['attributes'] = JSON.parse(itemAttrStr.replace(new RegExp('<%=tab.name%>', 'g'), data.name).replace(new RegExp('<%=tab.label%>', 'g'), data.label));
              data.content.push(itemCopy);
            }
          }
          tabsData.push(data);
        }
        t.setData({
          tabsData: tabsData
        })
      }
      t.canRender = true;
    },
    //tab点击事件
    tabClick: function (e) {
      const t = this;
      const tab = { name: e.currentTarget.dataset.name}
      if (t.properties.hidePanel && t.properties.p_activeName == tab.name) {
        //再次点击，取消选中
        t.setData({
          p_activeName:"",
          tabsData:[].concat(this.data.tabsData)
        })
      } else {
        t.setData({
          p_activeName: tab.name,
          tabsData: [].concat(this.data.tabsData)
        })
      }
      //分发tab点击事件
      t.triggerEvent('tab-click', tab, t);
    },
    renderTabData: function (createElement) {
      const t = this;
      const headerArr = [];
      const paneArr = [];
      if (t.data.tabsData && t.data.tabsData.length > 0) {
        t.data.tabsData.forEach((tabData, key) => {
          if (!tabData.show) {
            return true;
          }
          const _itemStyle = _TY_Tool.setSimpleStyle(t.properties.itemStyle);
          const _activeItemStyle = _TY_Tool.setSimpleStyle(t.properties.activeItemStyle);

          let iconDom = '';
          if (tabData.icon) {
            //如果有icon
            let iconStyle = {}
            if (t.tabIconStyle) {
              //如果有css样式配置
              iconStyle = _TY_Tool.setSimpleStyle(t.properties.tabIconStyle);
            }
            iconDom = createElement('i', {
              attrs: {
                class: tabData.icon
              },
              style: iconStyle
            }, []);
          }

          const label = createElement('div', {
            class: "bb-tab-header-item " + (t.properties.p_activeName == tabData.name ? 'is-active' : ''),
            attrs: {
              'tab-name': 'tab_' + tabData.name
            },
            style: (t.p_activeName == tabData.name ? Object.assign(_itemStyle, _activeItemStyle) : _itemStyle),
            on: {
              click: function () {
                t.tabClick(tabData, t);
              }
            },
            ref: "tab_header_" + tabData.name
          }, [iconDom, createElement('span', {
            attrs: {
              'tab-name': tabData.name
            }
          }, tabData.label)
            ]);

          headerArr.push(label);

          const tabPaneItem = createElement('div', {
            class: "bb-tab-panel " + (t.properties.p_activeName == tabData.name ? 'tab-show' : 'tab-hide'),
            attrs: {
              'tab-name': 'tab_' + tabData.name
            },
            ref: "tab_panel_" + tabData.name
          }, _TY_Tool.bbRender(tabData.content, createElement, t));
          paneArr.push(tabPaneItem);
        });
      }
      const headerBox = createElement('div', {
        class: ['bb-tab-header'],
        style: Object.assign({
          float: (t.properties.tabPosition === 'left' || t.properties.tabPosition === 'right') ? t.properties.tabPosition : 'none'
        }, _TY_Tool.setSimpleStyle(t.headerStyle))
      }, [createElement('div', {
        class: ['bb-tab-header-scroll', 'clearfix']
      }, [createElement('div', {
        class: ['bb-tab-header-box']
      }, headerArr)]
      )
        ]);

      const panelBox = createElement('div', {
        class: ['bb-tab-panel-box'],
        style: Object.assign({}, _TY_Tool.setSimpleStyle(t.properties.panelStyle), {
          display: (t.properties.p_activeName ? 'block' : 'none')
        })
      }, paneArr);
      const tabBox = t.properties.tabPosition !== 'bottom' ? [headerBox, panelBox] : [panelBox, headerBox];

      return tabBox;
    }
  }
})
