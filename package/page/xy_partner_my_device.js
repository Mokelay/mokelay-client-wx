module.exports = {"id":1190,"name":"激活设备列表","description":"","alias":"xy_partner_my_device","createDate":"2018-09-12 23:52:23","layout":null,"layoutType":"seriation","template":false,"templatePageAlias":"","custom":false,"customFile":"","appAlias":"xy_partner","parentId":0,"enable":true,"type":"sub","icon":"","sort":0,"ds":"[\"xy_partner_my_merchant_page\",\"xy_partner_my_device_page\"]","platform":"WX","createrId":11729,"createrName":"张学超","layoutObject":"{\"uuid\":\"20b06c6f-3644-4013-a848-c1dbfaa20434\",\"title\":\"激活设备\",\"type\":\"true\",\"pageTitle\":\"激活设备\",\"cssStyle\":{\"bgColor\":\"rgba(243, 243, 243, 1)\"}}","content":"[{\"uuid\":\"IHhHvjDJjqwQK04B\",\"type\":\"Container\",\"alias\":\"bb-indep-ul\",\"aliasName\":\"自主列表组件(I)\",\"attributes\":{\"columns\":0,\"theme\":\"\",\"itemContent\":[{\"uuid\":\"1DDCDB15-8D5B-40BE-A324-FC80FC52F82C\",\"alias\":\"bb-layout-seriation\",\"aliasName\":\"row\",\"attributes\":{\"content\":[{\"uuid\":\"65027301-E904-4FEC-BB1B-CB304CE1B89D\",\"alias\":\"bb-text\",\"aliasName\":\"商户名称\",\"attributes\":{\"show\":true,\"value\":\"<%=rowData.name%>\"},\"animation\":[],\"interactives\":[],\"layout\":{\"font\":{\"color\":\"rgba(34, 34, 34, 1)\",\"size\":\"0.453333333333333rem\",\"lineHeight\":\"\"},\"border\":{\"padding\":\"0 0 0 0.2rem\",\"margin\":\"0.2rem 0 0.4rem 0.2rem\",\"size\":\"0 0 0 0.1rem\",\"style\":\"solid\",\"color\":\"rgba(73, 216, 245, 1)\"},\"display\":\"inline-block\"},\"type\":\"Form\"},{\"uuid\":\"5E27EC8A-AB0C-4B94-ABEC-7D47BECDB8CF\",\"alias\":\"bb-indep-ul\",\"aliasName\":\"门店列表\",\"attributes\":{\"closePullLoading\":true,\"itemContent\":[{\"uuid\":\"E4532D59-44CB-4AC2-A2B3-8E7E2E957677\",\"alias\":\"bb-layout-seriation\",\"aliasName\":\"row\",\"attributes\":{\"content\":[{\"uuid\":\"94C37799-A2B6-4C7D-AE36-32AAEBAFD904\",\"alias\":\"bb-text\",\"aliasName\":\"门店名称\",\"attributes\":{\"show\":true,\"value\":\"<#=rowData.shop_name#>\"},\"animation\":[],\"interactives\":[],\"layout\":{\"font\":{\"color\":\"rgba(34, 34, 34, 1)\",\"size\":\"0.346666666666667rem\",\"lineHeight\":\"\"}},\"type\":\"Form\"},{\"uuid\":\"C61FC632-71DD-402E-85FA-1752AD3EBBE7\",\"alias\":\"bb-text\",\"aliasName\":\"设备类型\",\"attributes\":{\"show\":true,\"value\":\" <#=rowData.name#>\"},\"animation\":[],\"interactives\":[],\"layout\":{\"font\":{\"color\":\"rgba(153, 153, 153, 1)\",\"size\":\"0.346666666666667rem\",\"lineHeight\":\"0.346666666666667rem\"},\"border\":{\"padding\":\"0 0 0 0.346666666666667rem\"},\"display\":\"inline-block\"},\"type\":\"Form\"},{\"uuid\":\"F5BEA3DC-E038-48A4-9F56-4D7E9A233E27\",\"alias\":\"bb-text\",\"aliasName\":\"设备号\",\"attributes\":{\"show\":true,\"value\":\" 设备号：<#=rowData.serialNumber#>\"},\"animation\":[],\"interactives\":[],\"layout\":{\"font\":{\"color\":\"rgba(153, 153, 153, 1)\",\"size\":\"0.346666666666667rem\",\"lineHeight\":\"0.346666666666667rem\"},\"display\":\"inline-block\",\"border\":{\"padding\":\"0 0 0 0.346666666666667rem\"}},\"type\":\"Form\"},{\"uuid\":\"6792FD00-219E-495D-8793-A355C5F82E45\",\"alias\":\"bb-text\",\"aliasName\":\"激活时间\",\"attributes\":{\"show\":true,\"value\":\" 激活时间：<#=rowData.activationTime#>\"},\"animation\":[],\"interactives\":[],\"layout\":{\"font\":{\"color\":\"rgba(153, 153, 153, 1)\",\"size\":\"0.346666666666667rem\",\"lineHeight\":\"0.346666666666667rem\"},\"display\":\"inline-block\",\"border\":{\"padding\":\"0 0 0 0.346666666666667rem\"}},\"type\":\"Form\"}]},\"animation\":[],\"interactives\":[],\"layout\":{},\"type\":\"Container\"}],\"staticList\":\"\",\"itemStyle\":{\"border\":{\"color\":\"rgba(229, 229, 229, 1)\",\"style\":\"solid\",\"size\":\"1px 0 0 0\",\"padding\":\"0.133333333333333rem 0\"}},\"firstItemStyle\":{\"border\":{\"size\":\"0px\",\"padding\":\"0 0 0.133333333333333rem 0\"}},\"ds\":{\"type\":\"dynamic\",\"api\":\"xy_partner_my_device_page\",\"outputs\":[{\"valueKey\":\"data_list\"}],\"inputs\":[{\"paramName\":\"merchantSN\",\"variable\":\"<%=rowData.serialNumber%>\",\"valueType\":\"template\"}],\"category\":\"config\",\"method\":\"POST\",\"url\":\"\"}},\"animation\":[],\"interactives\":[],\"layout\":{\"border\":{\"margin\":\"0 0 0 0.2rem\"}},\"type\":\"Container\"}]},\"animation\":[],\"interactives\":[],\"layout\":{\"font\":{\"size\":\"0.346666666666667rem\",\"lineHeight\":\"0.493333333333333rem\"}},\"type\":\"Container\"}],\"itemStyle\":{\"border\":{\"margin\":\"0 0 0.133333333333333rem 0\",\"size\":\"\",\"color\":\"rgba(234, 234, 234, 1)\",\"style\":\"\",\"radian\":\"0.1rem\",\"padding\":\"\"},\"bgColor\":\"rgba(255, 255, 255, 1)\"},\"staticList\":\"\",\"ds\":{\"type\":\"dynamic\",\"api\":\"xy_partner_my_merchant_page\",\"inputs\":[{\"paramName\":\"pageSize\",\"variable\":\"<%=bb.pageSize%>\",\"valueType\":\"template\"},{\"paramName\":\"page\",\"variable\":\"<%=bb.page%>\",\"valueType\":\"template\"}],\"outputs\":[{\"valueKey\":\"page_data\"}],\"category\":\"config\",\"method\":\"POST\",\"url\":\"\"},\"itemClickConfig\":{\"action\":\"url\",\"urlType\":\"default\",\"url\":\"index?alias=xy_partner_merchant_shop&s=<%=rowData.serialNumber%>\"},\"emptyContent\":[{\"uuid\":\"221EF065-31A0-42C2-A974-61DF0361DDB8\",\"alias\":\"bb-img\",\"aliasName\":\"图片\",\"attributes\":{\"src\":\"https://mokelay.com/config/ty_oss_download?bucketName=ty-storage&fileName=4b18125b1dbe0db6b25c95584f50379f.png\"},\"animation\":[],\"interactives\":[],\"layout\":{\"size\":{\"width\":\"500rpx\",\"height\":\"376rpx\"},\"display\":\"block\",\"border\":{\"margin\":\"0 auto\"},\"other\":{\"margin-top\":\"254rpx\"}},\"type\":\"Social\"},{\"uuid\":\"4EDB50D9-84A0-4920-8D6A-31A94DF94ACA\",\"alias\":\"bb-text\",\"aliasName\":\"文本\",\"attributes\":{\"show\":true,\"value\":\"<p>暂无数据</p>\"},\"animation\":[],\"interactives\":[],\"layout\":{\"display\":\"block\",\"size\":{\"width\":\"100%\"},\"border\":{\"margin\":\"60rpx 0 0 0\"},\"font\":{\"align\":\"center\",\"color\":\"rgba(136, 136, 136, 1)\",\"size\":\"30rpx\"}},\"type\":\"Form\"}]},\"animation\":[],\"interactives\":[],\"layout\":{\"border\":{\"margin\":\"0.266666666666667rem 0 0 0\"},\"other\":{\"min-height\":\"100vh\"}},\"onFocus\":false}]","_index":18}