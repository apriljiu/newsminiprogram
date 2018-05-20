const app = getApp()
Page({
  data:{
    newsType: ['国内', '国际', '财经', '娱乐', '军事', '体育', '其他'],
    newsList: [1,2,3,4,5,6,7,8,9],
  },

  onLoad(){
    this.getNewsList()
  },

  onPullDownRefresh() {
    this.getNewsList(() => {
      wx.stopPullDownRefresh()
    })
  },

  getNewsList(){
    wx.request({
  url:'https://test-miniprogram.com/api/news/list',
      data:{
        type: 'yl'
      },
      success: res =>{
        let result = res.data.result
        this.setNewsList(result)
      }
    })
  },

  setNewsList(result){
    let newsList = []
    for (let i = 0; i < result.length; i++){
      var firstImage
        newsList.push({
        title: result[i].title,
        time: result[i].date.split('T')[1].split(':')[0] + ':' + result[i].date.split('T')[1].split(':')[1],
        source: result[i].source == '' ? '未知来源' : result[i].source,
        image: result[i].firstImage = "" ? '/images/news.png' : result[i].firstImage,
        newsListId: result[i].id
      })
    }
    this.setData({
      newsList:newsList
    })
  },

  complete: () =>{
    callback && callback(
      wx.stopPullDownRefresh()
    )
  },

   onTapType() {
    getNewsList()
  },
  
  onTapDetail(){
  wx.navigateTo({
    url: '/pages/content/content?id=app.globalData.newsId',
  })
  }
})