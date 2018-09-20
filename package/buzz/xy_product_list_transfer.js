
  module.exports = function (...args) {
const newfields = [];
    const shop_list = args[0].realDataMap.page_data.currentRecords;
    const device_list = args[0].realDataMap.device_list.list;
    shop_list.forEach((shop,index)=>{
      let price = 0;
      let field = {
          titleData: {
            text: shop.name,
            value: shop.serialNumber,
            subtitle: shop.serialNumber,
            checked: false,
            price: 0
          },
          fields: []
      }
      field.titleData = Object.assign(field.titleData,shop);
      device_list.forEach((device,key)=>{
        if (shop.merchant == device.merchantSN){
          let item = {
            text: device.name,
            value: device.serialNumber,
            disabled: false,
            subtitle: device.rebateAmount.toString(),
            price: device.rebateAmount
          };
          price = price + device.rebateAmount;
          item = Object.assign(item,device);
          field.fields.push(item);
        }
      });
      field.titleData.price = price;
      field.titleData.subtitle = "￥" + price;
      newfields.push(field);
    });
    return newfields;
  }
