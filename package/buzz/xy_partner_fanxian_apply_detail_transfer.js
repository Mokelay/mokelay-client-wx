
  module.exports = function (...args) {
 //realDataMap 含有数据源中配置的返回值，下面是以list返回数据为例 分页数据:page_data.currentRecords
    var dataList = args[0].realDataMap.device_list.list;
    var data = args[0].realDataMap.data;
    const deviceSNArr = [];
    dataList.forEach((item, index) => {
      deviceSNArr.push(item.deviceSN);
    });
    var deviceSNString = deviceSNArr.join("</br>");
    data.deviceSNString = deviceSNString;
    return data;
  }
