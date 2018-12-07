const app = getApp()
const { $Message } = require('../../dist/base/index');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    topupList: [
      {
        title: '100送7',
        value: '100',
        checked: false
      },
      {
        title: '50送2',
        value: '50',
        checked: false
      },
      {
        title: '30送1',
        value: '30',
        checked: false
      },
      {
        title: '10',
        value: '10',
        checked: false
      },

    ],

    //充值金额
    topupMoney: 0,

    //余额
    balance: 0.0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this,
      openId = wx.getStorageSync('openid');

    that.setData({
      openId: openId
    })

    that.getBalance(openId);
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

  //自定义函数区//

  //选择充值标签
  tapChoose: function (e) {
    var that = this,
      id = e.currentTarget.id,
      list = that.data.topupList

    for (var x in list) {
      list[x].checked = false
    }

    list[id].checked = true

    that.setData({
      topupList: list,
      topupMoney: list[id].value,
      //将输入框清空
      inputValue: ''
    })
  },



  //输入金额时触发
  moneyInput: function (e) {
    var that = this,
      value = e.detail.value


    if (value == '') {
      that.setData({
        topupMoney: 0
      })
    }
    else {
      that.setData({
        inputValue: value,
        topupMoney: value
      })
    }
  },

  //金额输入框聚焦时触发
  //将选项清空
  inputTouch:function(e){
    console.log(e)
    var that = this,
      list = that.data.topupList

    for (var x in list) {
      list[x].checked = false
    }

    that.setData({
      topupList: list,
      topupMoney: 0
    })
  },

  //点击按钮时触发

  //获取用户信息
  getBalance: function (openId) {
    var that = this
    wx.request({
      url: app.globalData.url + '/vip/getInfo',
      method: 'POST',
      data: {
        'openId': openId
      },
      success: res => {
        var balance = res.data.balance.toFixed(1)
        that.setData({
          balance: balance
        })
      },

      fail: res => {
        $Message({
          content: '获取余额失败，请检查您的网络状态',
          type: 'error'
        })
      }
    })
  },

  //弹出支付窗口
  topup: function () {
    var that = this,
      pay = that.data.topupMoney,
      openId = that.data.openId

    if (pay == 0) {
      $Message({
        content: '充值金额不能为0',
        type: 'error'
      })
    }
    else {
      wx.request({
        url: app.globalData.url + '/vip/rechargeExpense',
        method: 'POST',
        data: {
          openId: openId,
          fee: pay
        },

        success: res => {

          if (res.data.status == 'success') {

            wx.requestPayment({
              timeStamp: res.data.timeStamp,
              nonceStr: res.data.nonceStr,
              package: res.data.dataPackage,
              signType: 'MD5',
              paySign: res.data.paySign,

              success: res => {

                that.getBalance(openId)

                $Message({
                  content: '充值成功',
                  type: 'success'
                })
                that.setData({
                  inputValue: '',
                  topupMoney: 0
                })
              },

              fail: res => {
                $Message({
                  content: '充值失败或取消',
                  type: 'error'
                })
              }
            });

          }
        },
        fail: res => {
          $Message({
            content:'充值失败，请检查您的网络状态',
            type:'error'
          })
        }
      })
    }

  }
})