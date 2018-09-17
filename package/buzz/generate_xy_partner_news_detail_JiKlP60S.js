
  module.exports = function (...args) {
//debugger;

//return data.data.data;


 const app = getApp();
    const realDataMap = args[0].realDataMap;

  app.globalData._TY_Tool.findBBByUuid('B0C5870C-354E-48AA-A5E5-B3C4449E3194').setValue(realDataMap.data.cover);
  app.globalData._TY_Tool.findBBByUuid('3BAD14B0-C341-489E-AF94-53B3C2E2559F').setValue(realDataMap.data.createTime);
	return realDataMap.data;

  }
