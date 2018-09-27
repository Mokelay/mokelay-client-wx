// buildingblock/bb-vant-product-list/bb-vant-product-list.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    domStyle: {
      type: String
    },
    /*选项数据 静态
                [{
                    text:'选项1'，
                    value:1,
                    disabled:false
                },{
                    text:'选项2'，
                    value:2,
                    disabled:false
                }]
            */
    fieldsData: {
      type: Array,
    },
    /*选项数据 动态
        通过DS接口获取
    */
    fieldsDs: {
      type: Object
    },
    //自定义内容
    contentTemplate: {
      type: Array
    },
    priceKey: {
      type: String
    },
    submitButton: {
      type: Object,
    },
    /*其他属性扩展 disabled 等
        disabled: 禁用
    */
    option: {
      type: Object
    },
  },
  /**
   * 组件的初始数据
   */
  data: {
    realFields:[],
    realSubmitButton:{
      selectText: "提现"
    },
    content: [],
    result: [],
    realPriceKey:"price",
    allResult: [],
    checkboxGroup: [{
      groupChecked: [],
      fullResult: [],
      fullChecked: false,
      checkedArr:[]
    }],
    allChecked: false,
    fromChange: false,
    fromSelectAll: false,
    totalPrice: 0,
    page:1,
    valueBase:"",
    end: false,//是否加载结束
    loading: false//是否加载中
  },
  attached: function () {
    let t = this;
    //获取数据
      t.data.realFields = t.properties.fieldsData.length ? t.properties.fieldsData: t.data.realFields;
      t.data.content = t.properties.contentTemplate.length ? t.properties.contentTemplate : t.data.content;
    t.data.realSubmitButton = t.properties.submitButton ? t.properties.submitButton : t.data.realSubmitButton;
    t.data.realPriceKey = t.properties.priceKey ? t.properties.priceKey : t.data.realPriceKey;
    t.setData({
      realSubmitButton: t.data.realSubmitButton
    });
    t.getData();
    t.transferContentArr();
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //获取数据
    getData() {
      const t = this;
      if (t.properties.fieldsDs) {
        wx.showLoading({
          title: '加载中',
        })
        wx._TY_Tool.getDSData(t.properties.fieldsDs, wx._TY_Tool.buildTplParams(t), function (data) {
          data.forEach((item) => {
            wx.hideLoading();
            const { dataKey, value } = item;
            let _list = [];
            if (value && value['currentRecords']) {
              _list = value['currentRecords'];
              const totalPage = value['totalPages'];
              if (t.data.page >= totalPage) {
                t.data.end = true;
              } else {
                t.data.end = false;
              }
            } else if (value && value['list']) {
              _list = value['list'];
            } else {
              _list = value;
            }
            t.data.loading = false;
            t.data.realFields = t.data.realFields.concat(_list);
            t.transferContentArr();
          });
        }, function (code, msg) {
          wx.hideLoading();
        });
      }
    },
    //值改变
    change(e) {
      const val = e.currentTarget.dataset.key;
      const result = e.detail.value;
      if (this.data.fromSelectAll) {
        this.data.fromSelectAll = false;
        return;
      }
      let newResult = this.data.checkboxGroup[val]["fullResult"];
      this.data.checkboxGroup[val]["checkedArr"] = result;
      //newResult如果长度改变了 则说明 result没有全部选中
      if (newResult.length == result.length) {
        this.data.realFields[val].titleData.checked = true;
      } else {
        this.data.realFields[val].titleData.checked = false;
      }
      this.setResult();
      this.totalPriceFn();
    },
    transferContentArr() {
      const t = this;
      const realFields = [].concat(t.data.realFields);
      realFields.forEach((fieldP, index) => {
        t.data.checkboxGroup[index] = t.data.checkboxGroup[index] ? t.data.checkboxGroup[index] : {
          groupChecked: [],
          fullResult: [],
          fullChecked: false
        };
        fieldP.fields.forEach((field, key) => {
          //数据解析到模板中去
          let _content = wx._TY_Tool.tpl(JSON.stringify(t.data.content), wx._TY_Tool.buildTplParams(t, {
            rowData: field
          }));
          if (!_content) {
            console.error("错误提示:", "列表组件没有配置模板或者没有匹配到参数");
            return true;
          }
          /*
              兼容 ul包含ul的情况
              子的ul中模板用<#= ... #>代替，否则第一层就会被模板参数替换
          */
          const reg = /<#=(.*?)#>/g;
          if (_content.match(reg)) {
            //如果字符串中含有<#=...#> 这样的标识，转换成 <%=...%>
            _content = _content.replace(reg, function () {
              return "<%=" + arguments[1] + "%>";
            });
          }
          field.content = JSON.parse(_content);
          t.data.checkboxGroup[index]["fullResult"].push(field.value);
          t.data.allResult.push(field.value);
        });
      });
      t.setData({
        realFields: realFields
      })
    },
    selectAll(e) {
      const t = this;
      const index = e.currentTarget.dataset.key;
      const isSelect = e.currentTarget.dataset.select;
      if (isSelect) {
        t.data.checkboxGroup[index]["checkedArr"] = t.data.checkboxGroup[index]["fullResult"];
        this.data.realFields[index].titleData.checked = true;
      } else {
        t.data.checkboxGroup[index]["checkedArr"] = [];
        this.data.realFields[index].titleData.checked = false;
      }
      this.setResult();
      this.totalPriceFn();
    },
    totalPriceFn() {
      const t = this;
      let price = 0;
      t.data.realFields.forEach((fieldP, index) => {
        fieldP.fields.forEach((field, key) => {
          t.data.result.forEach((val, ind) => {
            if (val == field.value) {
              price = price + field[t.data.realPriceKey]
            }
          })
        })
      });
      t.setData({
        totalPrice: price
      })
    },
    selectAllGroup(e) {
      const t = this;
      const isSelect = typeof e == "object"?e.currentTarget.dataset.select:e;
      if (isSelect) {
        t.data.result = t.data.allResult;
        t.data.realFields.forEach((val,key)=>{
          val.titleData.checked = true;
        })
        t.setData({
          allChecked : true
        })
      } else {
        t.data.result = []; 
        t.data.realFields.forEach((val, key) => {
          val.titleData.checked = false;
        });
        t.setData({
          allChecked: false
        })
      }
      t.refreshData(t.data.result);
      this.totalPriceFn();
    },
    onSubmit(e) {
      debugger
      this.triggerEvent("commit", this.data.result);
      this.setData({
        page:1,
        realFields:[]
      })
      this.getData();
    },
    setResult(){
      const t = this;
      let result = [];
      t.data.checkboxGroup.forEach((val,key)=>{
        result = result.concat(val.checkedArr);
      });
      if (result.length == t.data.allResult) {
        t.setData({
          allChecked: true
        })
      } else {
        t.setData({
          allChecked: false
        })
      }
      t.data.result = result;
      //t.data.valueBase = result.join(",");
      t.refreshData(result);
      this.setData({
        valueBase: result.join(",")
      });
      this.triggerEvent("change", t.data.valueBase);
    },
    refreshData: function (result) {
      const t = this;
      t.realFields.forEach((field,index)=>{
        field.fields.forEach((ele,key)=>{
          ele.checked = false;
        })
      })
      result.forEach((val, inde) => {
        t.realFields.forEach((field, index) => {
          field.fields.forEach((ele, key) => {
            if (ele.value == val) {
              ele.checked = true;
            }
          })
        })
      });
      t.setData({
        realFields: t.data.realFields,
        valueBase: t.data.valueBase
      })
    },
    //滚动到底部时触发
    lower: function (event) {
      let t = this;
      if (!t.data.end && !t.data.loading) {
        t.data.page = t.data.page + 1;
        t.getData();
      }
    },
  }
})
