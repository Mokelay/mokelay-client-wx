// buildingblock/bb-vant-uploader/bb-vant-uploader.js

const app = getApp();

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    domStyle:{
      type:String
    },
    value: {
      type: String
    },
    //接受的文件类型。默认值image/*  vant组件有这个属性，后面实现视频和音频的上传
    accept: {
      type: String,
      value: "image/*"
    },
    //是否禁用图片上传
    disabled: {
      type: Boolean,
      value: false
    },
    //文件大小限制，单位为byte
    maxSize: {
      type: Number
    },
    content: {
      type: Array
    },
    //上传接口配置
    uploadDs: {
      type: Object
    },
    /*其他属性设置  "picture" 表示图片view
        {
            theme:"card" "photograph" "picture" "custom" "video",
            replace:false//超过限制图片替换
            max:-1//最大上传个数  -1表示不限制
        }
    */
    option: {
      type: Object,
      value: {
        theme: "card",
        max: -1,//最大上传个数
        replace: false//超过最大上传后，是否替换
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    uploadUrl:"",//上传地址
    renderData:{},//渲染对象
    list:[]
  },
  attached:function(){
    let t=this;
    if (t.data.uploadDs) {
      const api = t.data.uploadDs['api'];
      const type = t.data.uploadDs['category'];
      let apiUrl = api;
      if (type == 'config') {
        //如果不是自定义接口
        apiUrl = app.globalData._TY_ContentPath + "/" + api;
      }
      t.data.uploadUrl = app.globalData._TY_APIHost+apiUrl;
    }
    //渲染数据
    t.render();
  },
  /**
   * 组件的方法列表
   */
  methods: {
    render:function(){
      let t=this;
      t.setData({
        list: t.data.value ? t.data.value.split(",") : [],
        // list:["http://xlx.saiyachina.com/config/ty_oss_download?bucketName=ty-storage&fileName=8ce8aec7da3d17a34acd505bda785495.jpg","http://xlx.saiyachina.com/config/ty_oss_download?bucketName=ty-storage&fileName=c9d72e7f0a9e2d05c747f8960f8c691f.jpg"]
      });
    },
    //删除图片
    remove(e) {
      const t = this;
      const index = e.currentTarget.dataset.index;
      let _list = t.data.value.split(",");
      _list.splice(index, 1);
      let val = _list.length > 0 ? _list.join(",") : "";
      t.setData({
        value: val,
        list: _list
      });
      t.triggerEvent('input', {value:val});
      t.triggerEvent('change', { value:val });
    },
    upload:function(){
      let t=this;
      wx.chooseImage({
        count: 1,  //最多可以选择的图片总数  
        sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有  
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
        success: function (res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
          var tempFilePaths = res.tempFilePaths;
          //启动上传等待中...  
          wx.showToast({
            title: '正在上传...',
            icon: 'loading',
            mask: true,
            duration: 10000
          });
          var uploadImgCount = 0;
          for (var i = 0, h = tempFilePaths.length; i < h; i++) {
            wx.uploadFile({
              url: t.data.uploadUrl,
              filePath: tempFilePaths[i],
              name: 'file',
              formData: {
                'imgIndex': i
              },
              header: {
                "Content-Type": "multipart/form-data"
              },
              success: function (res) {
                uploadImgCount++;
                var response = JSON.parse(res.data);
                console.log(res);
                let data = response.data;
                //服务器返回文件地址 file_url   序列化文件名：file_serialize_name
                const url = data.file_url;
                let _val = t.data.value;
                if (t.data.option.replace && t.data.option.max > 0 && t.data.value.length >= t.data.option.max) {//如果是替换的话
                  _val.splice(0, 1, url);//替换第一个位置的文件
                } else {
                  if (_val){
                    _val +=",";
                  }
                  _val +=url;
                }
                t.setData({
                  value: _val
                });
                //渲染list
                t.render();

                //如果是最后一张,则隐藏等待中  
                if (uploadImgCount == tempFilePaths.length) {
                  wx.hideToast();
                }
              },
              fail: function (res) {
                wx.hideToast();
                wx.showModal({
                  title: '错误提示',
                  content: '上传图片失败',
                  showCancel: false,
                  success: function (res) { }
                })
              }
            });
          }
        }
      }); 

    }
  }
})
