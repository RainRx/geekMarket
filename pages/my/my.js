const app = getApp();
const { $Message } = require('../../dist/base/index');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    balance:0.0,

    //个人页列表
    lists:[
      {
        imageUrl:'../../pages/img/label.png',
        title:'购物指南',
        function:'toGuide'
      },
      {
        imageUrl:'../../pages/img/feedback.png',
        title:'吐槽',
        function:'toFeedback'
      },
      {
        imageUrl:'../../pages/img/computer.png',
        title:'QQ群',
        function:'QQGrounp'
      },
      {
        imageUrl:'../../pages/img/people.png',
        title:'开发者',
        function:'toDevelopers'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this,
    openid = wx.getStorageSync('openid');

    that.setData({
      openid:openid
    })

    that.getBalance(openid)
    
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
    that.getBalance(that.data.openid)
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


  //自定义函数区//
  

  //获取用户信息
  getBalance:function(openId){
    var that = this
    wx.request({
      url:app.globalData.url +'/vip/getInfo',
      method: 'POST',
      data: {
        'openId': openId
      }, 
      success:res=>{
        var balance = res.data.balance.toFixed(1)
        that.setData({
          balance:balance
        })
      },
      fail:res=>{
        $Message({
          content:'获取余额失败，请检查您的网络状态',
          type:'error'
        })
      }
    })
  },

  //复制QQ群号到粘贴板上
  QQGrounp:function(){
    wx.setClipboardData({
      data: '866049796', //需要设置的内容,
      success: res => {
        $Message({
          content:'已将群号复制到剪贴板上',
          type:'success'
        })
        
      }
    });
    
  },

  //页面跳转
  toTopup:function(){
    var that = this
    wx.navigateTo({ url: '../topup/topup' });
  },

  toGuide:function(){
    var that = this
    wx.navigateTo({ url: '../guide/guide' });
  },

  toFeedback:function(){
    wx.navigateTo({ url: '../feedback/feedback' });
  },

  toDevelopers:function(){
    wx.navigateTo({ url: '../developer/developer' });
  },

  toQrcode:function(){
    wx.navigateTo({ url: '../qrcode/qrcode' });
  }

})