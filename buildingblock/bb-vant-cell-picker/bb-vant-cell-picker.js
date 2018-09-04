// buildingblock/bb-vant-cell-picker/bb-vant-cell-picker.js
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
      type: String
    },
    /*columns 选择器静态数据
        [{text:"浙江",value:0001,children:[
            { text: '杭州',value:'1'},
            { text: '宁波',value:'2'},
            { text: '温州',value:'3'},
            { text: '湖州',value:'4'}
            ]},
        {text:"福建",value:0001,children:[
            { text: '杭州',value:'1'},
            { text: '宁波',value:'2'},
            { text: '温州',value:'3'},
            { text: '湖州',value:'4'}
            ]}]
        
        单级['杭州', '宁波', '温州', '嘉兴', '湖州']
        多级[
            {
                values: Object.keys(citys),
                className: 'column1'
            },
            {
                values: citys['浙江'],
                className: 'column2',
                defaultIndex: 2
            }
        ]
    */
    columns: {
      type: Array
    },
    /*选择器动态数据*/
    columnsDs: {
      type: Object
    },
    /*选项名关键字 配合DS接口使用，从返回数据中获取需要的值*/
    valueKey: {
      type: Object,
      value: {
        value: "value",
        text: "text",
        children: "children"
      }
    },
    /*选择器属性
        type:"area"  area地址选择器  default默认值
        showToolbar:true //显示头部
        title:"标题"
    */
    pickerConfig: {
      type: Object,
      value: {
        type: "default",
        title:"地址选择器"
      }
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
            clickable:Boolean 开启点击反馈,
            valueStyle:{}  //内容样式
         }
    */
    option: {
      type: Object
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    realColumn:[],
    defaultColumn: [{
        text: "浙江", value:'01', children: [
          { text: '杭州', value: '1'},
          { text: '宁波', value: '2'},
          { text: '温州', value: '3'},
          { text: '湖州', value: '4'}
        ]
      },
      {
        text: "福建", value: '02', children: [
          { text: '福州', value: '1'},
          { text: '厦门', value: '2'},
          { text: '金门', value: '3'}
        ]
      }],
    //选中值的下标
    multiIndex:[1,3,0],
    //当前滑动的列数据
    changeInfo:{
      col:null,
      value:null
    },
    //选中值的文案
    valueText:"",
    realOption: {
      type: "default",
      title: "地址选择器",
      isLink:true
    },
    region:[]
  },
  attached: function () {
    this.data.realOption = this.properties.pickerConfig;
    if(this.properties.columnsDs){
      this.getData();
    }else{
      if (this.data.realOption == "area"){
        let region = this.properties.value;
        if (typeof region == "string") {
          region = region.split(",");
        }
        this.setData({
          region: region
        });
      }else{
        const newColumns = [];
        const multiIndex = this.transferValueToIndex(this.properties.value);
        this.data.multiIndex = multiIndex;
        const valueText = this.transferIndexToValue(multiIndex).valueText;
        this.transferData(this.data.defaultColumn, newColumns);
        this.setData({
          realColumn: newColumns.reverse(),
          multiIndex: multiIndex,
          valueText: valueText
        });
      }
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    getData() {
      const t = this;
      if (t.properties.columnsDs) {
        t.loading = true;
        wx._TY_Tool.getDSData(t.properties.columnsDs, wx._TY_Tool.buildTplParams(t), function (data) {
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
            _value = this.transferData(_value);
            t.triggerEvent("afterLoadData", t);
            t.data.defaultColumn = _value;
            const newColumns = [];
            const multiIndex = t.transferValueToIndex(t.properties.value);
            t.data.multiIndex = multiIndex;
            const valueText = t.transferIndexToValue(multiIndex).valueText;
            t.transferData(t.data.defaultColumn, newColumns);
            this.setData({
              realColumn: newColumns.reverse(),
              multiIndex: multiIndex,
              valueText: valueText
            });
          });
        }, function (code, msg) {
          t.loading = false;
        });
      }
    },
    //数据转换
    transferData: function (data, targetColumns, nowCol){
      const t = this;
      let nextCol = nowCol || 0;
      if (Array.isArray(data)){
        const col = [];
        data.forEach((ele, index) => {
          col.push(ele.text);
        });
        //获取第nextCol 列值为 第index个选项的子集
        let index = t.data.multiIndex[nextCol] || 0;
        if (nextCol == t.data.changeInfo.col){
          index = t.data.changeInfo.value;
        }
        if (data[index].children) {
          t.transferData(data[index].children, targetColumns, nextCol + 1);
        }
        targetColumns.push(col);
      }
    },
    columnChange: function (e){
      const t = this;
      const multiIndex = t.data.multiIndex;
      let col = e.detail.column;
      const value = e.detail.value;
      const changeInfo = {
        col:col,
        value:value
      };
      t.data.changeInfo = changeInfo;
      multiIndex.splice(col, 1, value);
      for (var i = col + 1; i < multiIndex.length;i++){
        multiIndex.splice(i, 1, 0);
      }
      const newColumns = [];
      this.transferData(this.data.defaultColumn, newColumns);
      this.setData({
        realColumn: newColumns.reverse(),
        multiIndex: multiIndex
      })
    },
    pickerChange:function(e){
      const value = e.detail.value;
      const valueObj = this.transferIndexToValue(value);
      const newValue = valueObj.value;
      const valueText = valueObj.valueText;
      const stringValue = newValue.join(",");
      if (Array.isArray(this.properties.value)) {
        this.triggerEvent("input", newValue, stringValue);
        this.triggerEvent("change", newValue, stringValue);
      }else{
        this.triggerEvent("input",stringValue,newValue);
        this.triggerEvent("change",stringValue,newValue);
      }
      this.setData({
        valueText: valueText
      })
    },
    //转换值为指针数组
    transferValueToIndex:function(value){
      const t = this;
      if(!value){
        return [];
      }
      let transferValue = value;
      let multiIndex = [];
      if(typeof value == "string"){
        transferValue = transferValue.split(",");
      }
      let column = t.data.defaultColumn
      transferValue.forEach((val,key)=>{
        column.forEach((col,index)=>{
          if(col.value == val){
            multiIndex.push(index);
            column = col.children;
          }
        })
      });
      return multiIndex;
    },
    //转换选中的指针数组为最后的输出值
    transferIndexToValue:function(indexArr){
      const t = this;
      const newValue = [];
      let valueText = [];
      let column = t.data.defaultColumn;
      indexArr.forEach((index,key)=>{
        newValue.push(column[index].value);
        valueText.push(column[index].text);
        column = column[index].children;
      });
      const valueObj = {
        value: newValue,
        valueText: valueText.join("，")
      }
      return valueObj;
    },
    //地址选择器
    regionChange:function(e){
      console.log('picker发送选择改变，携带值为', e.detail.value);
      const value = e.detail.value;
      let region = this.properties.value;
      const stringValue = value.join(",");
      if (typeof region == "string") {
        this.triggerEvent("input", stringValue, value);
        this.triggerEvent("change", stringValue, value);
      }else{
        this.triggerEvent("input", value, stringValue);
        this.triggerEvent("change", value, stringValue);
      }
      this.setData({
        region: value,
        valueText: value.join("，")
      });
      
    }
  }
})
