const app = getApp()
Page({
  data: {
    detailTitle: 'this is a title',
    detailSource: 'example',
    detailTime: '10:20',
    detailReadCount: 23, 
  },

  onLoad: function (option) {
    console.log(option.id)
    this.getNewsDetail()
  },

  getNewsDetail(){
    wx.request({
      url: 'https://test-miniprogram.com/api/news/detail',
      data: {
        id: 1523074607654
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