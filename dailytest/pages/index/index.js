//index.js
//获取应用实例
const AV = require('../../libs/av-weapp-min.js')
var app = getApp()
var page = getCurrentPages()

Page({
  data: {
    userInfo: {},
    topicList: null,
    answerDetail: null,
    items: null,
    errorMsg: '',
    showTopTips: false,
    beginTime: new Date(),
    disableflag: false,
    answerYet: null,
    answerArr: []
  },
  formReset: function () {
    console.log('form发生了reset事件')
  },
  formSubmit: function (e) {
    console.log('formsubmit', e.detail.value)
    var topic = this.data.topicList
    var topicType = topic.get('topicType')
    var topicId = topic.get('topicId')
    var topicOptionArr = topic.get('topicOptionArr')
    console.log('topicOptionArr', topicOptionArr)
    var correctAnswer = ''
    for (var i = 0, len = topicOptionArr.length; i < len; ++i) {
      if (topicOptionArr[i].isAnswer == true) {
        correctAnswer += topicOptionArr[i].seqno + ",";
      }
    }
    console.log('beforecorrectAnswer', correctAnswer)
    correctAnswer = correctAnswer.substring(0, correctAnswer.length - 1)
    console.log('aftercorrectAnswer', correctAnswer)
    var beginTime = this.data.beginTime
    console.log('topicType', topicType)
    if (topicType === 0) {
      if (e.detail.value.radio_group == null || e.detail.value.radio_group == "") {
        this.setData({
          showTopTips: true,
          errorMsg: '选项不能为空'
        })
        this.ohShitfadeOut();
        return;
      }
      var answerArr = new Array(topicOptionArr.length)
      for (var i = 0, len = topicOptionArr.length; i < len; ++i) {
        var answerObj = new Object
        answerObj.seqno = topicOptionArr[i].seqno
        answerObj.checked = false
        if (topicOptionArr[i].seqno == e.detail.value.radio_group) {
          answerObj.checked = true
        }
        answerArr[i] = answerObj
      }
      var obj = new Object
      obj.topicId = topicId
      obj.topic = topic
      obj.beginTime = beginTime
      obj.answerArr = answerArr
      obj.userName = this.data.userInfo.nickName
      obj.gender = this.data.userInfo.gender
      obj.avatarUrl = this.data.userInfo.avatarUrl

      obj.optionIds = e.detail.value.radio_group
      console.log('obj.optionIds', obj.optionIds)
      if (correctAnswer == obj.optionIds) {
        obj.isCorrect = true;
      } else {
        obj.isCorrect = false;
      }
      this.addAnswerDetail(obj)
    }
    if (topicType === 1) {
      if (e.detail.value.check_group == null || e.detail.value.check_group.length == 0) {
        this.setData({
          showTopTips: true,
          errorMsg: '选项不能为空'
        })
        this.ohShitfadeOut();
        return;
      }
      //保存答题的选项结果
      var arr = e.detail.value.check_group
      var answerArr = new Array(topicOptionArr.length)
      for (var i = 0, len = topicOptionArr.length; i < len; ++i) {
        var answerObj = new Object
        answerObj.seqno = topicOptionArr[i].seqno
        answerObj.checked = false
        for (var j = 0, len2 = arr.length; j < len2; ++j) {
          if (topicOptionArr[i].seqno == arr[j]) {
            answerObj.checked = true
          }
          answerArr[i] = answerObj
        }
      }
      var obj = new Object
      obj.topicId = topicId
      obj.topic = topic
      obj.beginTime = beginTime
      obj.answerArr = answerArr
      obj.userName = this.data.userInfo.nickName
      obj.gender = this.data.userInfo.gender
      obj.avatarUrl = this.data.userInfo.avatarUrl

      arr.sort()
      obj.optionIds = arr.toString()
      if (correctAnswer == obj.optionIds) {
        obj.isCorrect = true;
      } else {
        obj.isCorrect = false;
      }
      this.addAnswerDetail(obj)
    }
    this.setData({
      disableflag: true,
      answerArr: answerArr
    })
  },
  addAnswerDetail(obj) {
    //声明类型
    var AnswerDetail = AV.Object.extend('answerDetail');
    //新建对象
    var answerDetail = new AnswerDetail();
    const user = AV.User.current();

    //设置属性
    answerDetail.set("optionIds", obj.optionIds);
    answerDetail.set("topicId", obj.topicId);
    answerDetail.set("userId", user.get('username'));
    answerDetail.set("isCorrect", obj.isCorrect);
    var beginTime = obj.beginTime;
    if (typeof beginTime == "string") {
      beginTime = new Date(beginTime)
    }
    var endTime = new Date();
    answerDetail.set("beginTime", beginTime);
    console.log('typeof beginTime', typeof beginTime)
    answerDetail.set("endTime", endTime);
    var elapsedTime = Math.floor((endTime.getTime() - beginTime.getTime()) / 1000);
    answerDetail.set("timeElapsed", elapsedTime);
    answerDetail.set("topicObj", obj.topic.toJSON());
    answerDetail.set("answerArr", obj.answerArr);
    answerDetail.set("userName", obj.userName);
    answerDetail.set("gender", obj.gender);
    answerDetail.set("avatarUrl", obj.avatarUrl);
    console.log(answerDetail.toJSON())
    answerDetail.save().then(function (answerDetail) {
      //添加选项
      console.log(answerDetail.toJSON())
      wx.showToast({
        title: '已完成',
        icon: 'success',
        duration: 3000
      });
    }, function (error) {
      console.error(error);
    });
  },
  ohShitfadeOut() {
    var fadeOutTimeout = setTimeout(() => {
      this.setData({ showTopTips: false, errorMsg: '' });
      clearTimeout(fadeOutTimeout);
    }, 3000);
  },
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)

    var items = this.data.items;
    for (var i = 0, len = items.length; i < len; ++i) {
      items[i].checked = items[i].value == e.detail.value
    }

    this.setData({
      items: items
    });
  },
  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)

    var items = this.data.items, values = e.detail.value;
    for (var i = 0, lenI = items.length; i < lenI; ++i) {
      items[i].checked = false;

      for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (items[i].value == values[j]) {
          items[i].checked = true;
          break
        }
      }
    }

    this.setData({
      items: items
    })
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
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

  },
  onShow: function () {
    var that = this
    that.setData({
      beginTime: new Date()
    })
    that.getTopicList()
  },
  getTopicList: function () {
    var now = new Date();
    var startDateQuery = new AV.Query('topic');
    startDateQuery.lessThanOrEqualTo('beginDate', now);

    var endDateQuery = new AV.Query('topic');
    endDateQuery.greaterThan('endDate', now);
    var query = AV.Query.and(startDateQuery, endDateQuery);

    query.descending('createdAt').first()
      .then((data => {
        this.setData({ topicList: data })
        if (!data) {
          this.setData({ errorMsg: '还没有出题呢，再等等吧' })
          return
        }
        this.checkComplteTpoic(data)
      }
      )).catch(console.error)
  },
  checkComplteTpoic: function (topicList) {
    var query = new AV.Query('answerDetail')
    const user = AV.User.current()
    query.equalTo("userId", user.get('username'))
    query.equalTo("topicId", topicList.get('topicId'))
    query.first()
      .then((data => {
        this.setData({ answerDetail: data, answerYet: data ? true : false, disableflag: data ? true : false, answerArr: data ? data.get('answerArr') : [] })
      }
      )).catch(console.error)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
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
    var that = this
    that.setData({
      beginTime: new Date()
    })
    that.getTopicList()
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
