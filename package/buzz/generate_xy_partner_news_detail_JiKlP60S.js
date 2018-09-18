
  module.exports = function (...args) {
//debugger;

//return data.data.data;

 const app = getApp();
    const realDataMap = args[0].realDataMap;
	
	const realData = []
	realData.push(realDataMap.data);
	return realData;

  }
