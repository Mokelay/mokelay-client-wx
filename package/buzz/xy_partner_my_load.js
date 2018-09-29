
  module.exports = function (...args) {
const app = getApp();
    const realDataMap = args[0].realDataMap;

    realDataMap.data.commissionBalanceAmount = realDataMap.data.commissionBalanceAmount+' 元';

    realDataMap.data.activationDevicesCount = realDataMap.data.activationDevicesCount+' 台';
 
  app.globalData._TY_Tool.findBBByUuid('DC153712-8BC6-48B5-BE74-969CE47364F7').setValue(realDataMap.data.mobilephone||'');
	return realDataMap.data;
  }
