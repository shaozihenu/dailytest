// topic.js
const AV = require('../../libs/av-weapp-min.js')
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topicId: null,
    topic: null,
    errorMsg: '',
    showTopTips: false,
    correctCount: 0,
    errorCount: 0,
    allCount: 0,
    answerDetail: null,
    myAnswer: null
  },
  getTopic: function (topicId) {
    console.log('getTopic topicId', topicId)
    new AV.Query('topic')
      .equalTo('topicId', parseInt(topicId))
      .first()
      .then((data => {
        console.log('data', data)
        this.setData({ topic: data, disableflag: data ? true : false, errorMsg: data ? null : '没有题目信息' })
      }
      )).catch(console.error)
  },
  getCorrectCount: function (topicId) {
    new AV.Query('answerDetail')
      .equalTo('topicId', parseInt(topicId))
      .equalTo('isCorrect', true)
      .count()
      .then((count => {
        this.setData({ correctCount: count })
      }
      )).catch(console.error)
  },
  getErrorCount: function (topicId) {
    new AV.Query('answerDetail')
      .equalTo('topicId', parseInt(topicId))
      .equalTo('isCorrect', false)
      .count()
      .then((count => {
        this.setData({ errorCount: count })
      }
      )).catch(console.error)
  },
  getAllCount: function (topicId) {
    new AV.Query('answerDetail')
      .equalTo('topicId', parseInt(topicId))
      .count()
      .then((count => {
        this.setData({ allCount: count })
      }
      )).catch(console.error)
  },
  getCorrectAnswer: function (topicId) {
    var query = new AV.Query('answerDetail')
    query.equalTo('topicId', parseInt(topicId))
    query.equalTo('isCorrect', true)
    query.addAscending('timeElapsed')
    query.addDescending('endTime')
    query.limit(5)
    query.find().then((data => {
      if (data) {
        for (var i = 0, len = data.length; i < len; ++i) {
          data[i].set('beginTime', util.formatTime(data[i].get('beginTime')))
          data[i].set('endTime', util.formatTime(data[i].get('endTime')))
        }
      }
      this.setData({ answerDetail: data })
    }
    )).catch(console.error)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('topicId', options.topicId)
    this.setData({ topicId: options.topicId })
    var myAnswer = new Object
    myAnswer.optionIds = options.optionIds
    myAnswer.timeElapsed = options.timeElapsed
    myAnswer.isCorrect = options.isCorrect
    this.setData({ myAnswer: myAnswer })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    that.getTopic(that.data.topicId)
    that.getCorrectCount(that.data.topicId)
    that.getErrorCount(that.data.topicId)
    that.getAllCount(that.data.topicId)
    that.getCorrectAnswer(that.data.topicId)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})