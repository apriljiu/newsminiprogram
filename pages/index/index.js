Page({
  data:{
    newsList: [1, 2, 3, 4, 5, 6, 7, 8, 9]
  },
  onLoad(){
    this.getNewsList()
  },
  getNewsList(){
    wx.request({
      url:'https://test-miniprogram.com/api/news/list',
      data:{
        type: 'gn'
      },
      success: res =>{
        let result = res.data.result
        this.setNewsList(result)
      }
    })
  },
  setNewsList(result){
    let newsList = []
    for (let i = 0; i<9; i++){
      newsList.push({
        title: result[i].title,
        date: result[i].date,
        source: result[i].source,
        image: result[i].firstImage
      })
    }
    this.setData({
      newsList:newsList
    })
  }
})