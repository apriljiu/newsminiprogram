App({
  globalData:{
    newsId: null
  },
  data:{
    newsIdList: []
  },
  onLoad(){
    this.getNewsIdList()
  },
  getNewsIdList(){
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',
      data: {
        type: 'yl'
      },
      success: res => {
        let result = res.data.result
        that.globalData.newsId = newsIdList.id
        this.setNewsIdList(result)
      },
      setNewsIdList(result){
        let newsIdList = []
        for (let i = 0; i < newsIdList.length; i++){
          newsIdList.push({
            id: result[i].id,
          })
          this.setData({
            newsIdList
          })
        }
      }
    })
  }
  

})