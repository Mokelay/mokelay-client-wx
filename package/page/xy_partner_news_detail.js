module.exports = {"id":1138,"name":"新闻详情","description":"","alias":"xy_partner_news_detail","createDate":"2018-08-30 22:59:47","layout":null,"layoutType":"seriation","template":false,"templatePageAlias":"","custom":false,"customFile":"","appAlias":"xy_partner","parentId":0,"enable":false,"type":"sub","icon":"","sort":0,"ds":"[\"xiaoyi_partner_xy_news_article_read_09850\"]","platform":"H5","createrId":11729,"createrName":"张学超","layoutObject":"{\"uuid\":\"675bc5c1-ebd3-44de-9f60-87027fd2e88c\",\"title\":\"新闻详情\",\"type\":\"true\"}","content":"[{\"uuid\":\"pdxQUjaTiTXkXlCU\",\"type\":\"Container\",\"alias\":\"bb-indep-ul\",\"aliasName\":\"自主列表组件(I)\",\"attributes\":{\"columns\":1,\"theme\":\"card\",\"itemContent\":[{\"uuid\":\"0DFC6870-3EB0-4692-B87B-4175509731D6\",\"alias\":\"bb-words\",\"aliasName\":\"标题\",\"attributes\":{\"value\":\"<%=rowData.title%>\",\"show\":true,\"attributeName\":\"title\",\"hideLabel\":true},\"animation\":[],\"interactives\":[],\"layout\":{\"font\":{\"size\":\"0.64rem\",\"lineHeight\":\"0.893333333333333rem\"}},\"type\":\"Form\"},{\"uuid\":\"3BAD14B0-C341-489E-AF94-53B3C2E2559F\",\"alias\":\"bb-words\",\"aliasName\":\"时间\",\"attributes\":{\"show\":true,\"value\":\"<%=rowData.createTime%>\",\"attributeName\":\"createTime\",\"hideLabel\":true},\"animation\":[],\"interactives\":[],\"layout\":{\"font\":{\"color\":\"rgba(136, 136, 136, 1)\",\"size\":\"0.4rem\",\"lineHeight\":\"0.48rem\"},\"display\":\"block\",\"border\":{\"padding\":\"0.213333333333333rem 0 0.8rem 0\"}},\"type\":\"ImageText\"},{\"uuid\":\"B0C5870C-354E-48AA-A5E5-B3C4449E3194\",\"alias\":\"bb-img\",\"aliasName\":\"封面\",\"attributes\":{\"show\":true,\"value\":\"<%=rowData.cover%>\",\"attributeName\":\"cover\",\"hideLabel\":true},\"animation\":[],\"interactives\":[],\"layout\":{\"size\":{\"height\":\"5.2rem\",\"width\":\"100%\"},\"display\":\"block\"},\"type\":\"Social\"},{\"uuid\":\"C141E722-BC21-4C15-9E6F-2655A2FCB319\",\"alias\":\"bb-text\",\"aliasName\":\"正文\",\"attributes\":{\"show\":true,\"attributeName\":\"contentText\",\"value\":\"<%=rowData.contentText%>\",\"hideLabel\":true},\"animation\":[],\"interactives\":[],\"layout\":{\"font\":{\"lineHeight\":\"0.666666666666667rem\",\"size\":\"0.453333333333333rem\"}},\"type\":\"Form\"},{\"uuid\":\"1E217A6C-7881-4741-855B-E871559A06F0\",\"alias\":\"bb-input\",\"aliasName\":\"\",\"attributes\":{\"show\":true,\"attributeName\":\"aa\",\"hideLabel\":true},\"animation\":[],\"interactives\":[],\"layout\":{},\"type\":\"Form\"}],\"ds\":{\"type\":\"dynamic\",\"api\":\"xiaoyi_partner_xy_news_article_read_09850\",\"outputs\":[{\"valueKey\":\"data\",\"handle\":\"generate_xy_partner_news_detail_JiKlP60S\"}],\"inputs\":[{\"paramName\":\"serialNumber\",\"variable\":\"<%=route.query.s%>\",\"valueType\":\"template\"}],\"category\":\"config\",\"method\":\"GET\",\"url\":null},\"option\":{\"labelStyle\":{\"display\":\"none\"}}},\"animation\":[],\"interactives\":[],\"layout\":{},\"onFocus\":false}]","_index":9}