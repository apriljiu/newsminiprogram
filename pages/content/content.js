const app = getApp()
let NEWSID = 0

Page({
  data: {
    detailTitle: 'this is a title',
    detailSource: 'example',
    detailTime: '10:20',
    detailReadCount: 23, 
  },

  onLoad: function (options) {
    NEWSID = options.id
    this.getNewsDetail(NEWSID)
  },

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
        let image = result.firstImage
        this.setData({
          detailTitle: title,
          detailSource: source,
          detailTime: time,
          detailReadCount: readCount
        })
      }
    })
  }
})