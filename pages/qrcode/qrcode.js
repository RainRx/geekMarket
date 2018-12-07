const QR = require('../../utils/wxqrcode.js');

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
    var that = this,
      openid = wx.getStorageSync('openid');

    let date = Date.parse(new Date()).toString()

    var imgdata = QR.createQrCodeImg(that.safe(date, openid), {
      size: 300
    })


    that.setData({
      openid: openid,
      imgdata: imgdata
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

  //自定义函数区

  safe: function (date, openid) {
    let temp = date + openid
    let newStr = "01"
    for (var i = 0; i < temp.length; i++) {
      newStr += String.fromCharCode(temp.charCodeAt(i) + 1);
    }
    return newStr
  }



})