let TYPEID = 0

Page({
  data:{
    newsType: [
      {id: 'gn', name:'国内'}, 
      {id: 'gj', name:'国际'},
      {id: 'cj', name: '财经'},
      {id: 'yl', name: '娱乐'},
      {id: 'js', name: '军事'},
      {id: 'ty', name: '体育'},
      {id: 'other', name: '其他'}],
      currentTab:'gn',
    newsList: [],
  },

  onLoad(){
    this.getNewsList()
  },
//点击选择新闻类型
  onTapType(event){
    TYPEID = event.currentTarget.dataset.id
    this.getNewsList(TYPEID)
  },
//点击跳转详情页面
  onTapDetail(event) {
    let id = event.currentTarget.dataset.id
    let newsType = this.data.newsType[TYPEID].id
    console.log(id, newsType)
    wx.navigateTo({
      url: '/pages/content/content?id=' + id + '&type=' + newsType
    })
  },
//设置下拉刷新
  onPullDownRefresh() {
    this.getNewsList(() => {
      wx.stopPullDownRefresh()
    })
  },
//获取新闻列表信息
  getNewsList(callback){
    wx.request({
  url:'https://test-miniprogram.com/api/news/list',
      data:{
        'type': this.data.newsType[TYPEID].id
      },
      success: res =>{
        let result = res.data.result
        this.setNewsList(result)
      },
      complete: () => {
        callback && callback
      },
    })
  },
//从新闻列表中获取新闻标题，时间，来源及图片
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
})