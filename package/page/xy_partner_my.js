module.exports = {"id":1135,"name":"我的","description":"","alias":"xy_partner_my","createDate":"2018-08-30 00:00:16","layout":null,"layoutType":"seriation","template":false,"templatePageAlias":"","custom":false,"customFile":"","appAlias":"xy_partner","parentId":0,"enable":false,"type":"sub","icon":"","sort":0,"ds":"[\"xy_partner_account_info\"]","platform":"H5","createrId":11729,"createrName":"张学超","layoutObject":"{\"uuid\":\"75471\",\"title\":\"首页\",\"type\":\"true\",\"cssStyle\":{\"bgColor\":\"rgba(243, 243, 243, 1)\"}}","content":"[{\"uuid\":\"84985865-9A28-48DF-A468-E1AFA74BC5A0\",\"alias\":\"bb-vant-tab-bar\",\"aliasName\":\"标签栏\",\"attributes\":{\"fields\":[{\"text\":\"新闻\",\"to\":\"xy_partner_news\",\"iconStyle\":{},\"textStyle\":{\"font\":{\"size\":\".24rem\",\"lineHeight\":\".24rem\",\"align\":\"center\"},\"display\":\"inline\",\"bgColor\":\"rgba(255, 255, 255, 1)\",\"size\":{\"width\":\"2.4rem\"},\"border\":{\"padding\":\"0.013rem 0 0 0\"}},\"icon\":\"ty-icon_biaodan2\"},{\"text\":\"首页\",\"url\":\"\",\"to\":\"xy_partner_home\",\"iconStyle\":{},\"textStyle\":{\"font\":{\"color\":\"rgba(0, 0, 0, 1)\",\"size\":\".24rem\",\"lineHeight\":\".24rem\"}},\"icon\":\"ty-icon_home\"},{\"text\":\"我的\",\"to\":\"xy_partner_my\",\"iconStyle\":{},\"textStyle\":{\"font\":{\"color\":\"rgba(0, 0, 0, 1)\",\"size\":\".24rem\",\"lineHeight\":\".24rem\"}},\"icon\":\"ty-wo1\"}],\"value\":2,\"activeStyle\":{\"textStyle\":{\"font\":{\"color\":\"rgba(9, 187, 7, 1)\",\"size\":\"0.266666666666667rem\",\"lineHeight\":\"0.266666666666667rem\",\"align\":\"center\"},\"display\":\"inline\",\"bgColor\":\"rgba(255, 255, 255, 1)\"},\"iconStyle\":{\"font\":{\"color\":\"rgba(9, 187, 7, 1)\"}}}},\"animation\":[],\"interactives\":[],\"layout\":{\"positionType\":\"fixed\",\"zIndex\":7,\"size\":{\"width\":\"100%\",\"height\":\"1.306666666666667rem\"},\"bgColor\":\"rgba(255, 255, 255, 1)\",\"font\":{\"color\":\"rgba(255, 255, 255, 1)\",\"size\":\"0.266666666666667rem\"},\"border\":{\"color\":\"rgba(229, 229, 229, 1)\",\"style\":\"solid\",\"size\":\"1px 0 0 0\"}},\"onFocus\":false},{\"uuid\":\"X89PRMPUsVpempIG\",\"type\":\"Container\",\"alias\":\"bb-layout-seriation\",\"aliasName\":\"顺序布局\",\"attributes\":{\"horizontal\":true,\"layoutType\":\"compact\",\"content\":[{\"uuid\":\"AF5D8254-92B2-4890-AC24-B2B2A46B9218\",\"alias\":\"bb-img\",\"aliasName\":\"头像\",\"attributes\":{\"src\":\"https://chisong-resource.oss-cn-shanghai.aliyuncs.com/chisong/other/%E5%A4%B4%E5%83%8F.png\"},\"animation\":[],\"interactives\":[],\"layout\":{\"display\":\"block\",\"size\":{\"width\":\"1.786666666666667rem\",\"height\":\"1.786666666666667rem\"}},\"type\":\"Social\"},{\"uuid\":\"DC153712-8BC6-48B5-BE74-969CE47364F7\",\"alias\":\"bb-text\",\"aliasName\":\"手机号\",\"attributes\":{\"show\":true,\"value\":\"<p>18299991929</p>\"},\"animation\":[],\"interactives\":[],\"layout\":{\"font\":{\"size\":\"0.453333333333333rem\",\"lineHeight\":\"0.64rem\"},\"display\":\"block\",\"border\":{\"padding\":\"0.533333333333333rem 0 0 0.4rem\"}},\"type\":\"Form\"}],\"distributeBlock\":[{\"alias\":\"2\",\"name\":\"2\"},{\"alias\":\"8\",\"name\":\"8\"}]},\"animation\":[],\"interactives\":[],\"layout\":{\"border\":{\"padding\":\"0.293333333333333rem 0.4rem\",\"margin\":\"0.266666666666667rem 0 0.4rem 0\",\"color\":\"rgba(229, 229, 229, 1)\",\"style\":\"solid\",\"size\":\"1px 0\"},\"bgColor\":\"rgba(255, 255, 255, 1)\"},\"onFocus\":false},{\"uuid\":\"2690F6FB-3A59-4C6A-A3E9-519D3D5F032B\",\"alias\":\"bb-indep-form\",\"aliasName\":\"表单(I)\",\"attributes\":{\"content\":[{\"uuid\":\"31D4466F-CC6B-45B0-9C1A-2FC06A7EA7AE\",\"alias\":\"bb-vant-cell\",\"aliasName\":\"扫描设备二维码\",\"attributes\":{\"show\":true,\"option\":{\"title\":\"扫描设备二维码\",\"isLink\":false,\"rightIcon\":\"ty-qt__shopping_card\",\"scanBuzz\":\"xy_partner_scan_load\",\"isScanCode\":true}},\"animation\":[],\"interactives\":[{\"uuid\":\"23654\",\"fromContentUUID\":\"bb-vant-cell\",\"fromContentEvent\":\"click\",\"executeType\":\"custom_script\",\"executeScript\":\"xy_partner_scan_device_qr\"}],\"layout\":{},\"type\":\"Form\"},{\"uuid\":\"24A9456C-79FD-4838-BB74-450666AC42F6\",\"alias\":\"bb-vant-cell\",\"aliasName\":\"佣金返现\",\"attributes\":{\"show\":true,\"option\":{\"title\":\"佣金返现\",\"isLink\":true,\"url\":\"/#/xy_partner_fanxian_apply\"},\"attributeName\":\"commissionBalanceAmount\"},\"animation\":[],\"interactives\":[],\"layout\":{},\"type\":\"Form\"},{\"uuid\":\"91D16852-3DDF-44EA-894B-7ABDD1C68217\",\"alias\":\"bb-vant-cell\",\"aliasName\":\"邀请码\",\"attributes\":{\"show\":true,\"option\":{\"title\":\"邀请码\",\"isLink\":true,\"url\":\"/#/xy_partner_invitation_code?t=<%=bb.valueBase%>\"},\"attributeName\":\"recommendCode\"},\"animation\":[],\"interactives\":[],\"layout\":{},\"type\":\"Form\"},{\"uuid\":\"DC89BBC3-0563-46AF-A1E3-5DA49AD6ADE1\",\"alias\":\"bb-vant-cell\",\"aliasName\":\"激活设备\",\"attributes\":{\"show\":true,\"option\":{\"title\":\"激活设备\",\"isLink\":true,\"url\":\"/#/xy_partner_my_device\"},\"attributeName\":\"activationDevicesCount\"},\"animation\":[],\"interactives\":[],\"layout\":{},\"type\":\"Form\"},{\"uuid\":\"383B8250-60DF-48DA-8B14-1AFD44375E23\",\"alias\":\"bb-vant-cell\",\"aliasName\":\"我的订单\",\"attributes\":{\"show\":true,\"option\":{\"title\":\"我的订单\",\"isLink\":true,\"url\":\"/#/xy_partner_my_order\"},\"attributeName\":\"buyOrderCount\"},\"animation\":[],\"interactives\":[],\"layout\":{},\"type\":\"Form\"}],\"formDataDs\":{\"type\":\"dynamic\",\"api\":\"xy_partner_account_info\",\"category\":\"config\",\"method\":\"POST\",\"url\":\"\",\"outputs\":[{\"valueKey\":\"data\",\"handle\":\"xy_partner_my_load\"}]}},\"animation\":[],\"interactives\":[],\"layout\":{\"border\":{\"padding\":\"\",\"margin\":\"\"}},\"onFocus\":false,\"type\":\"Container\"},{\"uuid\":\"392C2B8D-AB35-447B-98D7-24532A69FBD5\",\"alias\":\"bb-indep-button\",\"aliasName\":\"按钮(I)\",\"attributes\":{\"text\":\"退出登录\",\"button\":{\"text\":\"退出登录\",\"type\":\"default\",\"style\":{}}},\"animation\":[],\"interactives\":[],\"layout\":{\"size\":{\"width\":\"100%\",\"height\":\"\"},\"bgColor\":\"rgba(255, 255, 255, 1)\",\"border\":{\"color\":\"rgba(229, 229, 229, 1)\",\"style\":\"solid\",\"size\":\"1px 0\",\"padding\":\"0.4rem 0.5rem\"},\"font\":{\"color\":\"rgba(245, 102, 73, 1)\",\"size\":\"0.453333333333333rem\",\"lineHeight\":\"0.33333rem\"},\"positionType\":\"fixed\",\"other\":{\"bottom\":\"2.24rem\"},\"display\":\"none\"},\"onFocus\":false,\"type\":\"Basic\"}]","_index":8}