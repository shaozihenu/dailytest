//index.js
//获取应用实例
var util = require('../../utils/util.js')
const AV = require('../../libs/av-weapp-min.js')
var app = getApp()
var page = getCurrentPages()
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
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
    allCountTimes: 0,
    alltopicCount: 0,
    totalList: null,
    top5List: null,
    tabs: ["荣耀榜", "题目统计", "我的答题"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0
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
    });
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
    that.getNowTime()
  },
  getNowTime() {
    var nowTime = setInterval(() => {
      this.setData({ nowTime: util.formatTime(new Date()) })
      // clearTimeout(fadeOutTimeout);
    }, 1000);
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  onShow: function () {
    // Do something when page show.
    var that = this
    that.getTop5List()
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
    //modify by sunshao 20171205 支持查看当前已完成答题
    query.lessThanOrEqualTo('endTime', new Date())
    query.descending('createdAt')
    query.find()
      .then((data => {
        if (data) {
          for (var i = 0, len = data.length; i < len; ++i) {
            data[i].set('beginTime', util.formatTime(data[i].get('beginTime')))
            data[i].set('endTime', util.formatTime(data[i].get('endTime')))
          }
        }
        this.setData({ answerDetail: data, answerYet: data ? true : false, disableflag: data ? true : false })
      }
      )).catch(console.error)
  },
  getTotalList: function () {
    var query = new AV.Query('totalList')
    query.addDescending('correctCount')
    query.addAscending('correctElapsed')
    query.addDescending('totalCount')
    query.limit(20)
    query.find()
      .then((data => {
        if (data) {
          for (var i = 0, len = data.length; i < len; ++i) {
            if (data[i].get('correctCount') == 0) {
              data[i].set('correctAvgTime', 'N/A')
            } else {
              data[i].set('correctAvgTime', Math.round(data[i].get('correctElapsed') / data[i].get('correctCount')))

            }
          }
        }
        this.setData({ top5List: data })
      }
      )).catch(console.error)
  },
  getTop5List: function () {
    var query = new AV.Query('totalList')
    query.greaterThan('correctCount', 0)
    query.addDescending('correctCount')
    query.addAscending('correctElapsed')
    query.addDescending('totalCount')
    query.limit(5)
    query.find()
      .then((data => {
        if (data) {
          for (var i = 0, len = data.length; i < len; ++i) {
            if (data[i].get('correctCount') == 0) {
              data[i].set('correctAvgTime', 'N/A')
            } else {
              data[i].set('correctAvgTime', Math.round(data[i].get('correctElapsed') / data[i].get('correctCount')))

            }
          }
        }
        this.setData({ top5List: data })
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
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getTotalList()
  },
})
