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
    answerDetail: null,
    nowTime: util.formatTime(new Date()),
    correctCount: 0,
    errorCount: 0,
    allCount: 0,
    allCountTimes:0,
    alltopicCount:0
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
    that.getNowTime()
  },
  getNowTime() {
    var nowTime = setInterval(() => {
      this.setData({ nowTime: util.formatTime(new Date()) })
      // clearTimeout(fadeOutTimeout);
    }, 1000);
  },
  onShow: function () {
    // Do something when page show.
    var that = this
    that.getMyTopicList()
    that.getAllUserCount()
    that.getCorrectCount()
    that.getErrorCount()
    that.getAllCount()
    that.getAllTopicCount()
  },
  getMyTopicList: function () {
    var query = new AV.Query('answerDetail')
    const user = AV.User.current()
    var lastDate = util.dateSubtractDate(new Date())
    console.log('lastDate', lastDate)
    query.equalTo("userId", user.get('username'))
    query.lessThanOrEqualTo('endTime', new Date(lastDate))
    query.find()
      .then((data => {
        if (data) {
          for (var i = 0, len = data.length; i < len; ++i) {
            data[i].set('beginTime', util.formatTime(data[i].get('beginTime')))
            data[i].set('endTime', util.formatTime(data[i].get('endTime')))
          }
        }
        this.setData({ answerDetail: data, answerYet: data ? true : false, disableflag: data ? true : false})
      }
      )).catch(console.error)
  },
  getCorrectCount: function () {
    new AV.Query('answerDetail')
      .equalTo('isCorrect', true)
      .count()
      .then((count => {
        this.setData({ correctCount: count })
      }
      )).catch(console.error)
  },
  getErrorCount: function () {
    new AV.Query('answerDetail')
      .equalTo('isCorrect', false)
      .count()
      .then((count => {
        this.setData({ errorCount: count })
      }
      )).catch(console.error)
  },
  getAllCount: function () {
    new AV.Query('answerDetail')
      .count()
      .then((count => {
        this.setData({ allCountTimes: count })
      }
      )).catch(console.error)
  },
  getAllUserCount: function () {
    new AV.Query('_User')
      .count()
      .then((count => {
        this.setData({ allCount: count })
      }
      )).catch(console.error)
  },
  getAllTopicCount: function () {
    new AV.Query('topic')
      .count()
      .then((count => {
        this.setData({ alltopicCount: count })
      }
      )).catch(console.error)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  }
})
