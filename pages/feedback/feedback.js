const app = getApp()
const { $Message } = require('../../dist/base/index');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    maxlen: 140,
    len: 0,
    content:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this,
      openid = wx.getStorageSync('openid');

    that.setData({
      openid: openid
    })
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

  },

  input: function (e) {
    var that = this;
    var value = e.detail.value;
    var len = parseInt(value.length);
    that.setData({
      content: value,
      len: len
    })
  },

  submit: function () {
    
    var that = this,
      content = that.data.content,
      openid = that.data.openid
    if (content != '') {
      wx.showLoading();
      wx.request({
        url: app.globalData.url + '/user/feedback',
        method: 'POST',
        data: {
          description: content,
          openId: openid
        },
        success: res => {
          $Message({
            content: '反馈成功',
            type: 'success',
          })
          setTimeout(function () {
            wx.navigateBack({
              delta: 1
            });
          }, 1000)
        },

        fail:res=>{
          $Message({
            content:'反馈失败，请检查您的网络状态',
            type:'error'
          })
        },

        complete:res=>{
          wx.hideLoading();
        }
      })
    }else{
      $Message({
        content:'内容不能为空',
        type:'error'
      })
    }

  }
})