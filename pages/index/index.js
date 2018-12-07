const app = getApp()


Page({
  data: {
    //余额
    balance: 0.0,

    swiperIndex: 0,
    //banner列表
    bannerList: [
      'http://118.24.92.182/test/test.jpg',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1536315296213&di=bb20471931ed29fc01228221f157ac1c&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Fback_pic%2F05%2F00%2F91%2F48594a198b0d695.jpg',
      'http://118.24.92.182/test/test.jpg', 
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1536315296213&di=bb20471931ed29fc01228221f157ac1c&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Fback_pic%2F05%2F00%2F91%2F48594a198b0d695.jpg'
    ]

  },
  onLoad: function () {
    var that = this,
      openid = wx.getStorageSync('openid');

    that.setData({
      openid: openid
    })

    that.getBalance(openid)
  },

  onShow: function () {
    var that = this
    that.getBalance(that.data.openid)
  },

  //自定义函数区

  //跳转充值页
  toTopup: function () {
    wx.navigateTo({ url: '../topup/topup' });
  },

  //跳转二维码页
  toQrcode: function () {
    wx.navigateTo({ url: '../qrcode/qrcode' });
  },

  //获取用户余额
  getBalance: function (openId) {
    var that = this
    wx.request({
      url: app.globalData.url + '/vip/getInfo',
      method: 'POST',
      data: {
        'openId': openId
      },
      success: res => {
        console.log(res.data)
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

  //滑动swiper
  swiperChange: function (e) {
    this.setData({
      swiperIndex: e.detail.current
    })
  }
})
