module.exports = {"id":1133,"name":"首页","description":"","alias":"xy_partner_home","createDate":"2018-08-29 23:46:35","layout":null,"layoutType":"seriation","template":false,"templatePageAlias":"","custom":false,"customFile":"","appAlias":"xy_partner","parentId":0,"enable":false,"type":"sub","icon":"","sort":0,"ds":"[\"xy_partner_home_product_page\",\"xy_partner_init\"]","platform":"WX","createrId":11729,"createrName":"张学超","layoutObject":"{\"uuid\":\"329ebd39-dd15-402a-be28-9696e16daf5d\",\"title\":\"首页\",\"type\":\"true\",\"cssStyle\":{\"bgColor\":\"rgba(243, 243, 243, 1)\"}}","content":"[{\"uuid\":\"602D2FFA-B671-4508-B6B5-9094AA065412\",\"alias\":\"bb-vant-tab-bar\",\"aliasName\":\"标签栏\",\"attributes\":{\"fields\":[{\"text\":\"新闻\",\"to\":\"xy_partner_news\",\"iconStyle\":{},\"textStyle\":{\"font\":{\"size\":\".24rem\",\"lineHeight\":\".24rem\",\"align\":\"center\"},\"display\":\"inline\",\"bgColor\":\"rgba(255, 255, 255, 1)\",\"size\":{\"width\":\"2.4rem\"},\"border\":{\"padding\":\"0.013rem 0 0 0\"}},\"icon\":\"ty-icon_biaodan2\"},{\"text\":\"首页\",\"url\":\"\",\"to\":\"xy_partner_home\",\"iconStyle\":{},\"textStyle\":{\"font\":{\"color\":\"rgba(0, 0, 0, 1)\",\"size\":\".24rem\",\"lineHeight\":\".24rem\"}},\"icon\":\"ty-icon_home\"},{\"text\":\"我的\",\"to\":\"xy_partner_my\",\"iconStyle\":{},\"textStyle\":{\"font\":{\"color\":\"rgba(0, 0, 0, 1)\",\"size\":\".24rem\",\"lineHeight\":\".24rem\"}},\"icon\":\"ty-wo1\"}],\"value\":1,\"activeStyle\":{\"textStyle\":{\"font\":{\"color\":\"rgba(9, 187, 7, 1)\",\"size\":\"0.266666666666667rem\",\"lineHeight\":\"0.266666666666667rem\",\"align\":\"center\"},\"display\":\"inline\",\"bgColor\":\"rgba(255, 255, 255, 1)\"},\"iconStyle\":{\"font\":{\"color\":\"rgba(9, 187, 7, 1)\"}}}},\"animation\":[],\"interactives\":[],\"layout\":{\"positionType\":\"fixed\",\"zIndex\":7,\"size\":{\"width\":\"100%\",\"height\":\"1.306666666666667rem\"},\"bgColor\":\"rgba(255, 255, 255, 1)\",\"font\":{\"color\":\"rgba(255, 255, 255, 1)\",\"size\":\"0.266666666666667rem\"},\"border\":{\"color\":\"rgba(229, 229, 229, 1)\",\"style\":\"solid\",\"size\":\"1px 0 0 0\"}},\"onFocus\":false,\"type\":\"Navigation\"},{\"uuid\":\"ORmvOMS9ghsGkfWP\",\"type\":\"Container\",\"alias\":\"bb-layout-seriation\",\"aliasName\":\"顺序布局\",\"attributes\":{\"horizontal\":false,\"layoutType\":\"\",\"content\":[{\"uuid\":\"CFB26C40-3B8E-4646-B535-951AA496DC09\",\"alias\":\"bb-indep-ul\",\"aliasName\":\"列表\",\"attributes\":{\"staticList\":\"[\\n    {\\n        \\\"a\\\": \\\"aa\\\"\\n    },\\n    {\\n        \\\"a\\\": \\\"aa\\\"\\n    },\\n    {\\n        \\\"a\\\": \\\"aa\\\"\\n    }\\n]\",\"itemContent\":[{\"uuid\":\"AA5FDE26-9692-45E7-AACA-400E43FA117D\",\"alias\":\"bb-layout-seriation\",\"aliasName\":\"row\",\"attributes\":{\"content\":[{\"uuid\":\"71E795C8-E707-4524-BE0E-4C47A7C80773\",\"alias\":\"bb-layout-seriation\",\"aliasName\":\"left\",\"attributes\":{\"content\":[{\"uuid\":\"45C8E404-BB07-4B49-8FDE-CC33C4E96EEB\",\"alias\":\"bb-img\",\"aliasName\":\"封面图\",\"attributes\":{\"src\":\"<%=rowData.cover%>\"},\"animation\":[],\"interactives\":[],\"layout\":{\"size\":{\"width\":\"2.986666666666667rem\",\"height\":\"2.986666666666667rem\"},\"border\":{\"radius\":\"0.106666666666667rem\"},\"display\":\"block\"},\"type\":\"Social\"}]},\"animation\":[],\"interactives\":[],\"layout\":{},\"type\":\"Container\"},{\"uuid\":\"C766ADC9-1A79-45C6-B653-BA84F4766553\",\"alias\":\"bb-layout-seriation\",\"aliasName\":\"right\",\"attributes\":{\"content\":[{\"uuid\":\"CE84A662-A905-4683-AFDB-A095C945F72B\",\"alias\":\"bb-text\",\"aliasName\":\"商品名称\",\"attributes\":{\"show\":true,\"value\":\"<%=rowData.name%>\"},\"animation\":[],\"interactives\":[],\"layout\":{\"font\":{\"size\":\"0.373333333333333rem\",\"lineHeight\":\"0.48rem\",\"color\":\"rgba(38, 50, 56, 1)\"},\"display\":\"block\"},\"type\":\"Form\"},{\"uuid\":\"1C224ED9-E261-4513-802C-EBC4961D9E4B\",\"alias\":\"bb-text\",\"aliasName\":\"标签\",\"attributes\":{\"show\":true,\"value\":\"<%=rowData.tags%>\"},\"animation\":[],\"interactives\":[],\"layout\":{\"font\":{\"size\":\"0.373333333333333rem\",\"lineHeight\":\"0.373333333333333rem\",\"color\":\"rgba(120,144,156, 1)\"},\"border\":{\"padding\":\"0.48rem 0\"},\"display\":\"block\"},\"type\":\"Form\"},{\"uuid\":\"F39E22B5-CF3F-46C8-849F-527ADADAF62D\",\"alias\":\"bb-text\",\"aliasName\":\"价格\",\"attributes\":{\"show\":true,\"value\":\"¥<%=rowData.price%>\"},\"animation\":[],\"interactives\":[],\"layout\":{\"font\":{\"size\":\"0.426666666666667rem\",\"lineHeight\":\"0.506666666666667rem\",\"color\":\"rgba(38, 50, 56, 1)\"},\"display\":\"block\"},\"type\":\"Form\"}]},\"animation\":[],\"interactives\":[],\"layout\":{\"border\":{\"padding\":\"0.266666666666667rem 0 0 0.426666666666667rem\"}},\"type\":\"Container\"}],\"horizontal\":true,\"layoutType\":\"compact\"},\"animation\":[],\"interactives\":[],\"layout\":{},\"type\":\"Container\"}],\"itemStyle\":{\"border\":{\"padding\":\"0.32rem 0.426666666666667rem\",\"margin\":\"0 0 0.133333333333333rem 0\"},\"bgColor\":\"rgba(255, 255, 255, 1)\",\"shadow\":{\"color\":\"rgba(38, 50, 56, 0.16)\",\"size\":\"0 2px 0 0\"}},\"ds\":{\"type\":\"dynamic\",\"api\":\"xy_partner_home_product_page\",\"inputs\":[{\"paramName\":\"pageSize\",\"variable\":\"<%=bb.pageSize%>\",\"valueType\":\"template\"},{\"paramName\":\"page\",\"variable\":\"<%=bb.page%>\",\"valueType\":\"template\"}],\"outputs\":[{\"valueKey\":\"page_data\"}],\"category\":\"config\",\"method\":\"POST\",\"url\":\"\"},\"itemClickConfig\":{\"action\":\"\",\"url\":\"\",\"urlType\":\"default\"}},\"animation\":[],\"interactives\":[{\"uuid\":\"42075\",\"fromContentUUID\":\"bb-indep-ul\",\"fromContentEvent\":\"itemClick\",\"executeType\":\"custom_script\",\"executeScript\":\"xy_partner_navigate_to_other_mp\"}],\"layout\":{},\"type\":\"Container\"}],\"distributeBlock\":[{\"alias\":\"2\",\"name\":\"2\"},{\"alias\":\"8\",\"name\":\"8\"}]},\"animation\":[],\"interactives\":[],\"layout\":{\"border\":{\"padding\":\"0.266666666666667rem 0 0 0\"}},\"onFocus\":false},{\"uuid\":\"MHf838EmkwD8ngxK\",\"type\":\"Container\",\"alias\":\"bb-indep-form\",\"aliasName\":\"表单(I)\",\"attributes\":{\"content\":[],\"formDataDs\":{\"type\":\"dynamic\",\"api\":\"\",\"inputs\":[],\"category\":\"config\",\"method\":\"POST\",\"url\":\"\"}},\"animation\":[],\"interactives\":[],\"layout\":{\"display\":\"none\"},\"onFocus\":false}]","_index":6}