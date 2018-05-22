let NEWSID = 0
//不知道为什么放到data里就不管用了

Page({
  data: {
    detailTitle: 'this is a title',
    detailSource: 'example',
    detailTime: '10:20',
    detailReadCount: 23, 
  },

//页面跳转传递参数
  onLoad: function (options) {
    NEWSID = options.id
    this.getNewsDetail(NEWSID)
  },

//获取具体页面信息：标题，时间，来源，图片，阅读数量，内容
  getNewsDetail(){
    wx.request({
      url: 'https://test-miniprogram.com/api/news/detail',
      data: {
        id: NEWSID
      },
      success: res => {
        let result = res.data.result
        let title = result.title
        let readCount = result.readCount
        let source = result.source == '' ? '未知来源' : result.source
        let time = result.date.split('T')[1].split(':')[0] + ':' + result.date.split('T')[1].split(':')[1]
        let content = result.content
        console.log(content)
        this.setData({
          detailTitle: title,
          detailSource: source,
          detailTime: time,
          detailReadCount: readCount,
          detailContent:content
        })
      }
    })
  }
})