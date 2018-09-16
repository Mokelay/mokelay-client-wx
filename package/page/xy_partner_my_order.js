module.exports = {"id":1170,"name":"订单商品","description":"","alias":"xy_partner_my_order","createDate":"2018-09-12 02:13:48","layout":null,"layoutType":"seriation","template":false,"templatePageAlias":"","custom":false,"customFile":"","appAlias":"xy_partner","parentId":0,"enable":true,"type":"sub","icon":"","sort":0,"ds":"[\"xy_partner_my_order_page\",\"xy_partner_my_order_detail_page\"]","platform":"WX","createrId":11729,"createrName":"张学超","layoutObject":"{\"uuid\":\"9d04fe4d-cb68-4fa7-b8bf-e461709e6f4f\",\"title\":\"订单商品\",\"type\":\"true\"}","content":"[{\"uuid\":\"jlpbW3IcXtj8m7Cb\",\"type\":\"Container\",\"alias\":\"bb-indep-ul\",\"aliasName\":\"自主列表组件(I)\",\"attributes\":{\"columns\":0,\"theme\":\"\",\"itemContent\":[{\"uuid\":\"5BF17ECE-E389-452A-A9AC-9EC59B21D649\",\"alias\":\"bb-layout-seriation\",\"aliasName\":\"content\",\"attributes\":{\"content\":[{\"uuid\":\"38A048B2-310D-49C6-A6F0-65DE66C74E2E\",\"alias\":\"bb-layout-seriation\",\"aliasName\":\"row1\",\"attributes\":{\"horizontal\":true,\"layoutType\":\"leftauto\",\"content\":[{\"uuid\":\"3A200899-3D3F-482E-B2E2-59BCA1649E8A\",\"alias\":\"bb-text\",\"aliasName\":\"店铺名称\",\"attributes\":{\"show\":true,\"value\":\"<p>店铺：小蚁旗舰店</p>\"},\"animation\":[],\"interactives\":[],\"layout\":{\"font\":{\"align\":\"left\",\"color\":\"rgba(34,34,34, 1)\",\"size\":\"0.373333333333333rem\",\"lineHeight\":\"0.533333333333333rem\"}},\"type\":\"Form\"},{\"uuid\":\"FD0ED6DB-48BC-4F09-8C16-908BFFEA034B\",\"alias\":\"bb-text\",\"aliasName\":\"订单状态\",\"attributes\":{\"show\":true,\"value\":\"<%=rowData.orderStatusDesc%>\"},\"animation\":[],\"interactives\":[],\"layout\":{\"font\":{\"align\":\"right\",\"color\":\"rgba(245, 102, 73, 1)\",\"size\":\"0.373333333333333rem\",\"lineHeight\":\"0.533333333333333rem\"}},\"type\":\"Form\"}],\"distributeBlock\":[{\"alias\":\"1\",\"name\":\"1\"},{\"alias\":\"1\",\"name\":\"1\"}]},\"animation\":[],\"interactives\":[],\"layout\":{\"border\":{\"padding\":\"0.4rem 0.266666666666667rem 0 0.266666666666667rem\"}},\"type\":\"Container\"},{\"uuid\":\"D7DECD7A-113E-45C0-B703-5D4BF378A518\",\"alias\":\"bb-layout-seriation\",\"aliasName\":\"row2\",\"attributes\":{\"content\":[{\"uuid\":\"A1FB6CE6-1E1B-4926-B8C9-F586475799AC\",\"alias\":\"bb-text\",\"aliasName\":\"订单号\",\"attributes\":{\"show\":true,\"value\":\"<p>订单号：<%=rowData.serialNumber%></p>\"},\"animation\":[],\"interactives\":[],\"layout\":{\"font\":{\"color\":\"rgba(34, 34, 34, 1)\",\"size\":\"0.32rem\",\"lineHeight\":\"0.44rem\"}},\"type\":\"Form\"}]},\"animation\":[],\"interactives\":[],\"layout\":{\"border\":{\"padding\":\"0.133333333333333rem 0 0.266666666666667rem 0.266666666666667rem \"}},\"type\":\"Container\"},{\"uuid\":\"3A07CE22-79B7-4DA5-812D-EFC139D42022\",\"alias\":\"bb-layout-seriation\",\"aliasName\":\"row3\",\"attributes\":{\"content\":[{\"uuid\":\"1AD7C3FB-4469-4487-B2CA-3C571116354B\",\"alias\":\"bb-indep-ul\",\"aliasName\":\"商品列表\",\"attributes\":{\"itemContent\":[{\"uuid\":\"2DB93551-B8B4-46E9-9BD1-AC9D4B57A0FD\",\"alias\":\"bb-layout-seriation\",\"aliasName\":\"顺序布局\",\"attributes\":{\"content\":[{\"uuid\":\"4822BDD4-4B75-4285-9B9E-AC3B58602C13\",\"alias\":\"bb-layout-seriation\",\"aliasName\":\"left\",\"attributes\":{\"content\":[{\"uuid\":\"6F5D63F2-7DAC-42A2-8F61-ED4C63535494\",\"alias\":\"bb-img\",\"aliasName\":\"封面\",\"attributes\":{\"src\":\"https://chisong-resource.oss-cn-shanghai.aliyuncs.com/chisong/other/QQ20180912-002804%402x.png\"},\"animation\":[],\"interactives\":[],\"layout\":{\"size\":{\"width\":\"2.4rem\",\"height\":\"2.4rem\"},\"border\":{\"style\":\"solid\",\"color\":\"rgba(151, 151, 151, 1)\",\"size\":\"1px\"}},\"type\":\"Social\"}]},\"animation\":[],\"interactives\":[],\"layout\":{},\"type\":\"Container\"},{\"uuid\":\"64F43AAC-3750-425E-B672-469F29CA87D0\",\"alias\":\"bb-layout-seriation\",\"aliasName\":\"right\",\"attributes\":{\"content\":[{\"uuid\":\"3959E181-2BB6-4E2F-9635-2A6D41158A15\",\"alias\":\"bb-layout-seriation\",\"aliasName\":\"row1\",\"attributes\":{\"content\":[{\"uuid\":\"258E3385-E9AD-45C1-939A-AC83637B6195\",\"alias\":\"bb-text\",\"aliasName\":\"商品名称\",\"attributes\":{\"show\":true,\"value\":\"<#=rowData.name#>\"},\"animation\":[],\"interactives\":[],\"layout\":{},\"type\":\"Form\"},{\"uuid\":\"6AC199B4-C126-4F59-B221-349E965A6693\",\"alias\":\"bb-text\",\"aliasName\":\"价格\",\"attributes\":{\"show\":true,\"value\":\"<p>¥ <#=rowData.price#></p>\"},\"animation\":[],\"interactives\":[],\"layout\":{\"font\":{\"align\":\"right\"}},\"type\":\"Form\"}],\"horizontal\":true,\"layoutType\":\"leftauto\"},\"animation\":[],\"interactives\":[],\"layout\":{\"font\":{\"lineHeight\":\"0.533333333333333rem\",\"size\":\"0.373333333333333rem\",\"color\":\"rgba(34, 34, 34, 1)\",\"align\":\"justify\"}},\"type\":\"Container\"},{\"uuid\":\"41E26BE7-F54C-4BB6-A33F-0D0929B3689A\",\"alias\":\"bb-text\",\"aliasName\":\"数量\",\"attributes\":{\"show\":true,\"value\":\"X <#=rowData.count#>\"},\"animation\":[],\"interactives\":[],\"layout\":{\"border\":{\"padding\":\"0.2rem 0\",\"color\":null},\"font\":{\"size\":\"0.32rem\",\"lineHeight\":\"0.44rem\",\"color\":\"rgba(34, 34, 34, 1)\",\"align\":\"right\"},\"size\":{\"width\":\"100%\"}},\"type\":\"Form\"}]},\"animation\":[],\"interactives\":[],\"layout\":{\"border\":{\"padding\":\"0 0 0 0.133333333333333rem\"}},\"type\":\"Container\"}],\"horizontal\":true,\"layoutType\":\"rightauto\"},\"animation\":[],\"interactives\":[],\"layout\":{\"border\":{\"padding\":\"0.266666666666667rem\"},\"bgColor\":\"rgba(245, 245, 245, 1)\",\"size\":{\"width\":\"100%\"}},\"type\":\"Container\"}],\"staticList\":\"\",\"ds\":{\"type\":\"dynamic\",\"api\":\"xy_partner_my_order_detail_page\",\"inputs\":[{\"paramName\":\"orderSerialNumber\",\"variable\":\"<%=rowData.serialNumber%>\",\"valueType\":\"template\"}],\"outputs\":[{\"valueKey\":\"data_list\"}],\"category\":\"config\",\"method\":\"POST\",\"url\":\"\"},\"closePullLoading\":true},\"animation\":[],\"interactives\":[],\"layout\":{},\"type\":\"Container\"}]},\"animation\":[],\"interactives\":[],\"layout\":{},\"type\":\"Container\"},{\"uuid\":\"AC1B12D7-EFB0-4FDD-BE30-C7517AED148D\",\"alias\":\"bb-layout-seriation\",\"aliasName\":\"row4\",\"attributes\":{\"content\":[{\"uuid\":\"8B5FA7AD-088D-4F5E-8501-81A8427F09C2\",\"alias\":\"bb-layout-seriation\",\"aliasName\":\"kong\",\"attributes\":{},\"animation\":[],\"interactives\":[],\"layout\":{},\"type\":\"Container\"},{\"uuid\":\"584128D2-8E40-4493-9199-18D905639FC7\",\"alias\":\"bb-text\",\"aliasName\":\"合计价格\",\"attributes\":{\"show\":true,\"value\":\"<p>合计：¥ <%=rowData.amount%></p>\"},\"animation\":[],\"interactives\":[],\"layout\":{\"font\":{\"align\":\"right\",\"color\":\"rgba(245, 166, 35, 1)\",\"size\":\"0.373333333333333rem\",\"lineHeight\":\"0.893333333333333rem\"},\"size\":{\"width\":\"100%\"}},\"type\":\"Form\"}],\"horizontal\":true,\"layoutType\":\"rightauto\"},\"animation\":[],\"interactives\":[],\"layout\":{\"border\":{\"padding\":\"0 0.266666666666667rem\"}},\"type\":\"Container\"}],\"horizontal\":false},\"animation\":[],\"interactives\":[],\"layout\":{},\"type\":\"Container\"}],\"itemStyle\":{\"border\":{\"margin\":\"0 0 0.2rem 0\",\"size\":\"\",\"color\":null,\"style\":\"\",\"radian\":\"0.1rem\",\"padding\":\"0\"}},\"staticList\":\"\",\"ds\":{\"type\":\"dynamic\",\"api\":\"xy_partner_my_order_page\",\"inputs\":[{\"paramName\":\"pageSize\",\"variable\":\"<%=bb.pageSize%>\",\"valueType\":\"template\"},{\"paramName\":\"page\",\"variable\":\"<%=bb.page%>\",\"valueType\":\"template\"}],\"outputs\":[{\"valueKey\":\"page_data\"}],\"category\":\"config\",\"method\":\"POST\",\"url\":\"\"}},\"animation\":[],\"interactives\":[],\"layout\":{},\"onFocus\":false}]","_index":17}