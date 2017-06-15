//index.js
//获取应用实例
var util = require('../../utils/util.js')
const AV = require('../../libs/av-weapp-min.js')
var app = getApp()
var page = getCurrentPages()

Page({
  data: {
    userInfo: {},
    topicList: null,
    items: null,
    errorMsg: '',
    showTopTips: false,
    disableflag: false,
    answerYet: null,
    answerDetail: null
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
    that.getMyTopicList()
  },
  getMyTopicList: function () {
    var query = new AV.Query('answerDetail')
    const user = AV.User.current()
    var lastDate = util.dateSubtractDate(new Date())
    console.log('lastDate', lastDate)
    query.equalTo("userId", user.get('username'))
    query.lessThanOrEqualTo('endTime', new Date(lastDate))
    query.first()
      .then((data => {
        this.setData({ answerDetail: data, answerYet: data ? true : false, disableflag: data ? true : false, topicList: data ? data.get('topicObj') : null })
      }
      )).catch(console.error)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  }
})
