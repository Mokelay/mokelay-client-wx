module.exports = {"id":1146,"name":"我的邀请码","description":"","alias":"xy_partner_invitation_code","createDate":"2018-09-06 03:15:05","layout":null,"layoutType":"seriation","template":false,"templatePageAlias":"","custom":false,"customFile":"","appAlias":"xy_partner","parentId":0,"enable":false,"type":"sub","icon":"","sort":0,"ds":"[]","platform":"H5","createrId":11729,"createrName":"张学超","layoutObject":"{\"uuid\":\"6285070c-9401-4781-931d-f23545d56915\",\"title\":\"邀请码\",\"type\":\"true\"}","content":"[{\"uuid\":\"tlGpRzYbGCSV4R1f\",\"type\":\"Container\",\"alias\":\"bb-layout-seriation\",\"aliasName\":\"顺序布局\",\"attributes\":{\"horizontal\":false,\"layoutType\":\"\",\"content\":[{\"uuid\":\"C10D65DC-C00F-4E34-8389-4911E4DF15AF\",\"alias\":\"bb-indep-QR\",\"aliasName\":\"二维码\",\"attributes\":{\"url\":\"\",\"size\":150,\"qrType\":\"wx\",\"wxOptions\":{\"page\":\"page/index/index\",\"scene\":\"xy_partner_invitation_code&t=<%=route.query.t%>\"}},\"animation\":[],\"interactives\":[],\"layout\":{\"size\":{\"width\":\"100%\",\"height\":\"\"},\"font\":{\"align\":\"center\"}},\"type\":\"Social\"},{\"uuid\":\"B758C9AE-175B-43CF-AF4C-6A0F1374BE20\",\"alias\":\"bb-words\",\"aliasName\":\"邀请码\",\"attributes\":{\"show\":true,\"text\":\"<%=route.query.t%>\"},\"animation\":[],\"interactives\":[],\"layout\":{\"border\":{\"margin\":\"1.066666666666667rem 0 0 0\",\"size\":\"\",\"padding\":\"\"},\"size\":{\"height\":\"0.64rem\",\"width\":\"8.626666666666667rem\"},\"font\":{\"size\":\"0.453333333333333rem\",\"lineHeight\":\"0.64rem\",\"align\":\"center\"},\"positionType\":\"\",\"other\":{\"top\":\"8.626666666666667rem\"},\"display\":\"block\"},\"type\":\"ImageText\"}],\"distributeBlock\":[]},\"animation\":[],\"interactives\":[],\"layout\":{\"font\":{\"align\":\"center\"},\"bgUrl\":\"https://chisong-resource.oss-cn-shanghai.aliyuncs.com/chisong/other/pic_qr_code.png\",\"bgRepeat\":\"no-repeat\",\"bgSize\":\"8.933333333333333rem 10.8rem\",\"size\":{\"width\":\"8.933333333333333rem\",\"height\":\"10.8rem\"},\"border\":{\"margin\":\"0.8rem 0 0 0.533333333333333rem\",\"padding\":\"2.85rem 0 0 0\"}},\"onFocus\":false},{\"uuid\":\"Wth5UnywCBRaRE5m\",\"type\":\"Social\",\"alias\":\"bb-img\",\"aliasName\":\"头像(图片)\",\"attributes\":{\"src\":\"https://chisong-resource.oss-cn-shanghai.aliyuncs.com/chisong/other/icon_wechat.png\",\"cssStyle\":\"\"},\"animation\":[],\"interactives\":[{\"uuid\":\"73306\",\"fromContentUUID\":\"bb-img\",\"fromContentEvent\":\"click\",\"executeType\":\"trigger_method\",\"executeContentUUID\":\"EY8EYXxFot5ZRRYw\",\"executeContentMethodName\":\"startShare\"}],\"layout\":{\"font\":{\"size\":\"\",\"lineHeight\":\"\",\"color\":\"rgba(136, 136, 136, 1)\",\"align\":\"center\"},\"border\":{\"margin\":\"\",\"padding\":\"2.666666666666667rem 0 0 4.626666666666667rem\"},\"display\":\"block\"},\"onFocus\":false},{\"uuid\":\"iZXAlGPSMymKJ4RL\",\"type\":\"Form\",\"alias\":\"bb-words\",\"aliasName\":\"纯文本(I)\",\"attributes\":{\"value\":\"\",\"text\":\"分享给微信好友\"},\"animation\":[],\"interactives\":[],\"layout\":{\"border\":{\"margin\":\"0.36rem 0 0 0\",\"padding\":\"\"},\"size\":{\"height\":\"0.44rem\"},\"font\":{\"size\":\"0.32rem\",\"lineHeight\":\"0.44rem\",\"color\":\"rgba(136, 136, 136, 1)\",\"align\":\"center\"},\"shadow\":{\"color\":null}},\"onFocus\":false},{\"uuid\":\"EY8EYXxFot5ZRRYw\",\"type\":\"Social\",\"alias\":\"bb-indep-share\",\"aliasName\":\"分享(I)\",\"attributes\":{\"option\":{\"shareArea\":\"timeline,appMessage\",\"text\":\"小蚁合伙人邀请码\"}},\"animation\":[],\"interactives\":[],\"layout\":{\"display\":\"none\"},\"onFocus\":false}]","_index":16}