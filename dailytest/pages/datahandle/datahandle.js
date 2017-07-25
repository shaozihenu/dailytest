// datahandle.js
const AV = require('../../libs/av-weapp-min.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 执行 CQL 语句实现更新一个 TodoFolder 对象
    AV.Query.doCloudQuery("update rankingList set totalCountNew=10 and errorCountNew=5 and correctCountNew=5 and errorElapsedNew=2 and correctElapsedNew=2 and totalElapsedNew=2 where objectId='595352820ce46300578e5963'")
      .then(function (data) {
        // data 中的 results 是本次查询返回的结果，AV.Object 实例列表
        var results = data.results;
      }, function (error) {
        // 异常处理
        console.error(error);
      });
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