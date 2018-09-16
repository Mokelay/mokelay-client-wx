
  module.exports = function (...args) {
    const app = getApp();
    const realDataMap = args[0].realDataMap;
 
  app.globalData._TY_Tool.findBBByUuid('DC153712-8BC6-48B5-BE74-969CE47364F7').setValue(realDataMap.data.mobilephone||'');
  debugger;
	return realDataMap.data;


  }
