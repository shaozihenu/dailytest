// new.js
const AV = require('../../libs/av-weapp-min.js')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  //获取应用实例
  data: {
    topicType: ['单选', '多选'],
    topicTypeIdx: 0,
    phaseIdx: 0,
    phaseArray: [],
    topicOptions: ['topicOption0'],
    beginDate: '',
    endDate: '',
    errorMsg: '',
    showTopTips: false,
    topicOptionArr: [{}],
    userInfo: {},
  },
  removeOptions: function (e) {
    console.log('当前携带值为', this.data.topicOptions.length)
    var that = this
    const length = that.data.topicOptions.length
    var topicOptions = that.data.topicOptions
    topicOptions.splice(length - 1, length - 1)
    that.setData({
      topicOptions: topicOptions
    })
    console.log('当前携带值为', this.data.topicOptions)
  },
  addToOptions: function (e) {
    console.log('当前携带值为', this.data.topicOptions.length)
    var that = this
    const length = that.data.topicOptions.length
    if (length === 10) {
      this.setData({
        showTopTips: true,
        errorMsg: '题目选项最多为10个'
      })
      this.ohShitfadeOut();
      return;
    }
    var topicOptions = that.data.topicOptions
    topicOptions[length] = 'topicOption' + length
    that.setData({
      topicOptions: topicOptions
    })
    console.log('当前携带值为', this.data.topicOptions)
  },
  bindPhaseChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      phaseIdx: e.detail.value
    })
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      topicTypeIdx: e.detail.value
    })
  },
  bindBeginDateChange: function (e) {
    this.setData({
      beginDate: e.detail.value
    })
  },
  bindEndDateChange: function (e) {
    this.setData({
      endDate: e.detail.value
    })
  },
  formReset: function () {
    console.log('form发生了reset事件')
  },
  formSubmit: function (e) {

    if (e.detail.value.topicTitle == "") {
      this.setData({
        showTopTips: true,
        errorMsg: '题目标题不能为空'
      })
      this.ohShitfadeOut();
      return;
    }
    if (e.detail.value.phase == "") {
      this.setData({
        showTopTips: true,
        errorMsg: '期次不能为空'
      })
      this.ohShitfadeOut();
      return;
    }
    var that = this
    const length = that.data.topicOptions.length
    var topicOptions = that.data.topicOptions
    var flag = false
    var cnt = 0;
    for (var i = 0; i < length; i++) {
      switch (i) {
        case 0:
          if (e.detail.value.topicOption0 == "") {
            this.setData({
              showTopTips: true,
              errorMsg: '题目选项' + (i + 1) + '不能为空'
            })
            this.ohShitfadeOut();
            return;
          }
          if (e.detail.value.isResult0) {
            flag = true
            cnt++
          }
          var option = new Object();
          option.seqno = i + 1;
          option.optionCotent = e.detail.value.topicOption0
          option.isAnswer = e.detail.value.isResult0
          option.publisher = this.data.userInfo.nickName
          this.data.topicOptionArr[i] = option;
          break;
        case 1:
          if (e.detail.value.topicOption1 == "") {
            this.setData({
              showTopTips: true,
              errorMsg: '题目选项' + (i + 1) + '不能为空'
            })
            this.ohShitfadeOut();
            return;
          }
          if (e.detail.value.isResult1) {
            flag = true
            cnt++
          }
          var option = new Object();
          option.seqno = i + 1;
          option.optionCotent = e.detail.value.topicOption1
          option.isAnswer = e.detail.value.isResult1
          option.publisher = this.data.userInfo.nickName
          this.data.topicOptionArr[i] = option;
          break;
        case 2:
          if (e.detail.value.topicOption2 == "") {
            this.setData({
              showTopTips: true,
              errorMsg: '题目选项' + (i + 1) + '不能为空'
            })
            this.ohShitfadeOut();
            return;
          }
          if (e.detail.value.isResult2) {
            flag = true
            cnt++
          }
          var option = new Object();
          option.seqno = i + 1;
          option.optionCotent = e.detail.value.topicOption2
          option.isAnswer = e.detail.value.isResult2
          option.publisher = this.data.userInfo.nickName
          this.data.topicOptionArr[i] = option;
          break;
        case 3:
          if (e.detail.value.topicOption3 == "") {
            this.setData({
              showTopTips: true,
              errorMsg: '题目选项' + (i + 1) + '不能为空'
            })
            this.ohShitfadeOut();
            return;
          }
          if (e.detail.value.isResult3) {
            flag = true
            cnt++
          }
          var option = new Object();
          option.seqno = i + 1;
          option.optionCotent = e.detail.value.topicOption3
          option.isAnswer = e.detail.value.isResult3
          option.publisher = this.data.userInfo.nickName
          this.data.topicOptionArr[i] = option;
          break;
        case 4:
          if (e.detail.value.topicOption4 == "") {
            this.setData({
              showTopTips: true,
              errorMsg: '题目选项' + (i + 1) + '不能为空'
            })
            this.ohShitfadeOut();
            return;
          }
          if (e.detail.value.isResult4) {
            flag = true
            cnt++
          }
          var option = new Object();
          option.seqno = i + 1;
          option.optionCotent = e.detail.value.topicOption4
          option.isAnswer = e.detail.value.isResult4
          option.publisher = this.data.userInfo.nickName
          this.data.topicOptionArr[i] = option;
          break;
        case 5:
          if (e.detail.value.topicOption5 == "") {
            this.setData({
              showTopTips: true,
              errorMsg: '题目选项' + (i + 1) + '不能为空'
            })
            this.ohShitfadeOut();
            return;
          }
          if (e.detail.value.isResult5) {
            flag = true
            cnt++
          }
          var option = new Object();
          option.seqno = i + 1;
          option.optionCotent = e.detail.value.topicOption5
          option.isAnswer = e.detail.value.isResult5
          option.publisher = this.data.userInfo.nickName
          this.data.topicOptionArr[i] = option;
          break;
        case 6:
          if (e.detail.value.topicOption6 == "") {
            this.setData({
              showTopTips: true,
              errorMsg: '题目选项' + (i + 1) + '不能为空'
            })
            this.ohShitfadeOut();
            return;
          }
          if (e.detail.value.isResult6) {
            flag = true
            cnt++
          }
          var option = new Object();
          option.seqno = i + 1;
          option.optionCotent = e.detail.value.topicOption6
          option.isAnswer = e.detail.value.isResult6
          option.publisher = this.data.userInfo.nickName
          this.data.topicOptionArr[i] = option;
          break;
        case 7:
          if (e.detail.value.topicOption7 == "") {
            this.setData({
              showTopTips: true,
              errorMsg: '题目选项' + (i + 1) + '不能为空'
            })
            this.ohShitfadeOut();
            return;
          }
          if (e.detail.value.isResult7) {
            flag = true
            cnt++
          }
          var option = new Object();
          option.seqno = i + 1;
          option.optionCotent = e.detail.value.topicOption7
          option.isAnswer = e.detail.value.isResult7
          option.publisher = this.data.userInfo.nickName
          this.data.topicOptionArr[i] = option;
          break;
        case 8:
          if (e.detail.value.topicOption8 == "") {
            this.setData({
              showTopTips: true,
              errorMsg: '题目选项' + (i + 1) + '不能为空'
            })
            this.ohShitfadeOut();
            return;
          }
          if (e.detail.value.isResult8) {
            flag = true
            cnt++
          }
          var option = new Object();
          option.seqno = i + 1;
          option.optionCotent = e.detail.value.topicOption8
          option.isAnswer = e.detail.value.isResult8
          option.publisher = this.data.userInfo.nickName
          this.data.topicOptionArr[i] = option;
          break;
        case 9:
          if (e.detail.value.topicOption9 == "") {
            this.setData({
              showTopTips: true,
              errorMsg: '题目选项' + (i + 1) + '不能为空'
            })
            this.ohShitfadeOut();
            return;
          }
          if (e.detail.value.isResult9) {
            flag = true
            cnt++
          }
          var option = new Object();
          option.seqno = i + 1;
          option.optionCotent = e.detail.value.topicOption9
          option.isAnswer = e.detail.value.isResult9
          option.publisher = this.data.userInfo.nickName
          this.data.topicOptionArr[i] = option;
          break;
      }
    }

    console.log('topicOptionArr', this.data.topicOptionArr)
    wx.setStorageSync('topicOptionArr', this.data.topicOptionArr)
    if (cnt == 0) {
      this.setData({
        showTopTips: true,
        errorMsg: '题目选项至少有一项须为答案'
      })
      this.ohShitfadeOut();
      return;
    }
    if (e.detail.value.topicType == "0" && cnt != 1) {
      this.setData({
        showTopTips: true,
        errorMsg: '题目类型为单选时有且仅有一项为答案'
      })
      this.ohShitfadeOut();
      return;
    }
    if (e.detail.value.topicAnalysis == "") {
      this.setData({
        showTopTips: true,
        errorMsg: '题目解析不能为空'
      })
      this.ohShitfadeOut();
      return;
    }
    if (e.detail.value.beginDate == "") {
      this.setData({
        showTopTips: true,
        errorMsg: '生效起始日期不能为空'
      })
      this.ohShitfadeOut();
      return;
    }
    if (e.detail.value.endDate == "") {
      this.setData({
        showTopTips: true,
        errorMsg: '生效截止日期不能为空'
      })
      this.ohShitfadeOut();
      return;
    }
    if (e.detail.value.endDate < e.detail.value.beginDate) {
      this.setData({
        showTopTips: true,
        errorMsg: '生效截止日期不能小于生效起始日期'
      })
      this.ohShitfadeOut();
      return;
    }
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    this.addToTopic(e)
  },
  addToTopic(e) {
    //声明类型
    var TopicFolder = AV.Object.extend('topic');
    //新建对象
    var topicFolder = new TopicFolder();
    //设置属性
    topicFolder.set("topicType", parseInt(e.detail.value.topicType));
    topicFolder.set("phase", this.data.phaseArray[e.detail.value.phase].get('phaseNum'));
    topicFolder.set("status", 0);
    topicFolder.set("title", e.detail.value.topicTitle);
    topicFolder.set("subTitle", e.detail.value.topicSubTitle);
    topicFolder.set("analysis", e.detail.value.topicAnalysis);
    topicFolder.set("canLook", e.detail.value.canLook);
    topicFolder.set("canDiscuss", e.detail.value.canDiscuss);
    var beginDate = e.detail.value.beginDate
    beginDate = beginDate.replace(/-/g, '/')
    var endDate = e.detail.value.endDate
    endDate = endDate.replace(/-/g, '/')
    topicFolder.set("beginDate", new Date(beginDate + " 00:00:00"));
    topicFolder.set("endDate", new Date(endDate + " 23:59:59"));
    topicFolder.set("publisher", this.data.userInfo.nickName);
    topicFolder.set("topicOptionArr", this.data.topicOptionArr);

    topicFolder.save().then(function (topicFolder) {
      //添加选项
      console.log(topicFolder.toJSON())
      console.log(topicFolder.id)
      var query = new AV.Query('topic');
      var topicId
      query.get(topicFolder.id).then(function (topic) {
        // 成功获得实例
        topicId = topic.get('topicId');
        console.log(topicId);
        //声明类型
        var TopicOptionFolder = AV.Object.extend('topicOption')
        //新建对象

        var topicOptionArr = wx.getStorageSync('topicOptionArr')
        const length = topicOptionArr.length
        var arr = new Array();
        //设置属性
        for (var i = 0; i < length; i++) {
          var topicOptionFolder = new TopicOptionFolder();
          topicOptionFolder.set("topicId", topicId);
          topicOptionFolder.set("seqno", topicOptionArr[i].seqno);
          topicOptionFolder.set("optionContent", topicOptionArr[i].optionCotent);
          topicOptionFolder.set("isAnswer", topicOptionArr[i].isAnswer);
          topicOptionFolder.set("publisher", topicOptionArr[i].publisher);
          topicOptionFolder.set("userId", topicOptionArr[i].publisher);
          arr[i] = topicOptionFolder;
        }
        AV.Object.saveAll(arr).then(function (objects) {
          // 成功
          wx.navigateTo({
            url: 'new_success'
          })
        }, function (error) {
          // 异常处理
          console.error(error);
        })
      }, function (error) {
        // 异常处理
        console.error(error);
      });
    }, function (error) {
      console.error(error);
    });
  },
  addOption(e, id) {
    var query = new AV.Query('topic');
    var topicId
    query.get(id).then(function (topic) {
      // 成功获得实例
      topicId = topic.get('topicId');
      console.log(topicId);
      //声明类型
      var TopicOptionFolder = AV.Object.extend('topicOption')
      //新建对象
      var topicOptionArr = this.data.topicOptionArr
      const length = topicOptionArr.length
      var arr = new Array();
      //设置属性
      for (var i = 0; i < length; i++) {
        var topicOptionFolder = new TopicOptionFolder();
        topicOptionFolder.set("topicId", topicId);
        topicOptionFolder.set("seqno", topicOptionArr[i].seqno);
        topicOptionFolder.set("optionContent", topicOptionArr[i].optionCotent);
        topicOptionFolder.set("isAnswer", topicOptionArr[i].isAnswer);
        topicOptionFolder.set("publisher", topicOptionArr[i].publisher);
        topicOptionFolder.set("userId", topicOptionArr[i].publisher);
        arr[i] = topicOptionFolder;
      }
      AV.Object.saveAll(arr).then(function (objects) {
        // 成功
        wx.navigateTo({
          url: 'new_success'
        })
      }, function (error) {
        // 异常处理
        console.error(error);
      })
    }, function (error) {
      // 异常处理
      console.error(error);
    });


  },
  ohShitfadeOut() {
    var fadeOutTimeout = setTimeout(() => {
      this.setData({ showTopTips: false, errorMsg: '' });
      clearTimeout(fadeOutTimeout);
    }, 3000);
  },
  queryPhases: function () {
    new AV.Query('phases').ascending('endDate')
      .find()
      .then((data => {
        this.setData({ phaseArray: data })
      })).catch(console.error)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    console.log('new onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })

    console.log(that.data.userInfo)
    that.queryPhases()
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