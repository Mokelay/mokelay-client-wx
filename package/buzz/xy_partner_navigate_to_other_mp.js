
  module.exports = function (...args) {
debugger;
var url =args[0].item.itemUrl;
var goodsIdArray = url.split("=");
var goodsId = goodsIdArray[goodsIdArray.length-1];
wx.navigateToMiniProgram({
	"appId":"wxe6a1d92e6f43654b",
  	"path":"lib/item/dist/pages/index/index?itemId="+goodsId,
  	success:function(res){
		console.log("切换成功！");
    }
});
  }
