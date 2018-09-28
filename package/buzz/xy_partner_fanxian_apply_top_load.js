
  module.exports = function (...args) {
 const app = getApp();
    const realDataMap = args[0].realDataMap;
    //debugger;
    //DE1C3E00-6560-4B9B-8D08-41C33F0B08C0
   //8D6769BD-E060-4610-8E66-00DB95A68BAA
    if (realDataMap && realDataMap.data && realDataMap.data.cc){
      app.globalData._TY_Tool.findBBByUuid('8D6769BD-E060-4610-8E66-00DB95A68BAA').setValue(realDataMap.data.cc+' 台');
    }
    if (realDataMap && realDataMap.data && realDataMap.data.ra) {
      debugger;
      app.globalData._TY_Tool.findBBByUuid('DE1C3E00-6560-4B9B-8D08-41C33F0B08C0').setValue(realDataMap.data.ra+'');
    }else{
      debugger;
      app.globalData._TY_Tool.findBBByUuid('DE1C3E00-6560-4B9B-8D08-41C33F0B08C0').setValue(0+'');
    }
  }
