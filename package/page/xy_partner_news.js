module.exports = {"id":1134,"name":"新闻中心","description":"","alias":"xy_partner_news","createDate":"2018-08-29 23:59:51","layout":null,"layoutType":"seriation","template":false,"templatePageAlias":"","custom":false,"customFile":"","appAlias":"xy_partner","parentId":0,"enable":false,"type":"sub","icon":"","sort":0,"ds":"[\"xy_partner_news_page\"]","platform":"H5","createrId":11729,"createrName":"张学超","layoutObject":"{\"uuid\":\"76116\",\"title\":\"新闻中心\",\"type\":\"true\"}","content":"[{\"uuid\":\"602D2FFA-B671-4508-B6B5-9094AA065412\",\"alias\":\"bb-vant-tab-bar\",\"aliasName\":\"标签栏\",\"attributes\":{\"fields\":[{\"text\":\"新闻\",\"to\":\"xy_partner_news\",\"iconStyle\":{},\"textStyle\":{\"font\":{\"size\":\".24rem\",\"lineHeight\":\".24rem\",\"align\":\"center\"},\"display\":\"inline\",\"bgColor\":\"rgba(255, 255, 255, 1)\",\"size\":{\"width\":\"2.4rem\"},\"border\":{\"padding\":\"0.013rem 0 0 0\"}},\"icon\":\"ty-icon_biaodan2\"},{\"text\":\"首页\",\"url\":\"\",\"to\":\"xy_partner_home\",\"iconStyle\":{},\"textStyle\":{\"font\":{\"color\":\"rgba(0, 0, 0, 1)\",\"size\":\".24rem\",\"lineHeight\":\".24rem\"}},\"icon\":\"ty-icon_home\"},{\"text\":\"我的\",\"to\":\"xy_partner_my\",\"iconStyle\":{},\"textStyle\":{\"font\":{\"color\":\"rgba(0, 0, 0, 1)\",\"size\":\".24rem\",\"lineHeight\":\".24rem\"}},\"icon\":\"ty-wo1\"}],\"value\":0,\"activeStyle\":{\"textStyle\":{\"font\":{\"color\":\"rgba(9, 187, 7, 1)\",\"size\":\"0.266666666666667rem\",\"lineHeight\":\"0.266666666666667rem\",\"align\":\"center\"},\"display\":\"inline\",\"bgColor\":\"rgba(255, 255, 255, 1)\"},\"iconStyle\":{\"font\":{\"color\":\"rgba(9, 187, 7, 1)\"}}}},\"animation\":[],\"interactives\":[],\"layout\":{\"positionType\":\"fixed\",\"zIndex\":7,\"size\":{\"width\":\"100%\",\"height\":\"1.306666666666667rem\"},\"bgColor\":\"rgba(255, 255, 255, 1)\",\"font\":{\"color\":\"rgba(255, 255, 255, 1)\",\"size\":\"0.266666666666667rem\"},\"border\":{\"color\":\"rgba(229, 229, 229, 1)\",\"style\":\"solid\",\"size\":\"1px 0 0 0\"}},\"onFocus\":false,\"type\":\"Navigation\"},{\"uuid\":\"C00C9752-FF94-4876-A372-2B185048155A\",\"alias\":\"bb-layout-seriation\",\"aliasName\":\"顺序布局\",\"attributes\":{\"horizontal\":false,\"layoutType\":\"\",\"content\":[{\"uuid\":\"DC24D480-8CA7-4F37-B151-DAA6690D9061\",\"alias\":\"bb-indep-ul\",\"aliasName\":\"新闻列表\",\"attributes\":{\"show\":true,\"staticList\":\"[\\n    \\n]\",\"itemContent\":[{\"uuid\":\"BDBC3EA1-7944-4775-8215-8BD27625F3CA\",\"alias\":\"bb-words\",\"aliasName\":\"标题\",\"attributes\":{\"show\":true,\"text\":\"<%=rowData.title%>\"},\"animation\":[],\"interactives\":[],\"layout\":{\"border\":{\"padding\":\"0.16rem 0 0.48rem 0\"},\"font\":{\"size\":\"0.426666666666667rem\",\"lineHeight\":\"0.466666666666667rem\"}}},{\"uuid\":\"8C12BAB9-4802-4572-BCF1-E36889594D0B\",\"alias\":\"bb-photo-single\",\"aliasName\":\"封面\",\"attributes\":{\"show\":true,\"src\":\"<%=rowData.cover%>\",\"styleConfig\":{\"width\":\"100%\"}},\"animation\":[],\"interactives\":[],\"layout\":{\"size\":{\"height\":\"4.746666666666667rem\"}}}],\"itemStyle\":{\"border\":{\"style\":\"solid\",\"color\":\"rgba(229, 229, 229, 1)\",\"size\":\"1px\",\"radius\":\"0.133333333333333rem\",\"margin\":\"0 0 0.266666666666667rem 0\",\"padding\":\"0.266666666666667rem\"}},\"ds\":{\"type\":\"dynamic\",\"api\":\"xy_partner_news_page\",\"inputs\":[{\"paramName\":\"pageSize\",\"variable\":\"<%=bb.pageSize%>\",\"valueType\":\"template\"},{\"paramName\":\"page\",\"variable\":\"<%=bb.page%>\",\"valueType\":\"template\"}],\"category\":\"config\",\"method\":\"POST\",\"url\":\"\",\"outputs\":[{\"valueKey\":\"page_data\"}]}},\"animation\":[],\"interactives\":[{\"uuid\":\"02373\",\"fromContentUUID\":\"bb-indep-ul\",\"fromContentEvent\":\"itemClick\",\"executeArgument\":\"window.location.href='/#/xy_partner_news_detail?s='+params[0].serialNumber;\\n//debugger;\"},{\"uuid\":\"15305\",\"fromContentUUID\":\"bb-indep-ul\",\"fromContentEvent\":\"itemClick\",\"executeType\":\"trigger_method\",\"executeContentUUID\":\"DC24D480-8CA7-4F37-B151-DAA6690D9061\",\"executeContentMethodName\":\"navigateTo\",\"executeArgument\":\"index?alias=xy_partner_news_detail&serialNumber=<%=item.serialNumber%>\"}],\"layout\":{}}],\"distributeBlock\":[]},\"animation\":[],\"interactives\":[{\"uuid\":\"02373\",\"fromContentUUID\":\"bb-indep-ul\",\"fromContentEvent\":\"itemClick\",\"executeArgument\":\"window.location.href='/#/xy_partner_news_detail?s='+params[0].serialNumber;\\ndebugger;\"}],\"layout\":{\"border\":{\"padding\":\"0.466666666666667rem\"}},\"onFocus\":false}]","_index":7}