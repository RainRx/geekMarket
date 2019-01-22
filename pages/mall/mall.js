// pages/mall/mall.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    adList: [
      {
        src: ''
      },
      {
        src: ''
      },
      {
        src: ''
      },
      {
        src: ''
      }
    ],
    swiperIndex: 0,
    categoryList:[
      {
        name:'休闲食品',
        checked:true
      },
      {
        name:'奶品水饮',
        checked:false
      },
      {
        name:'精选',
        checked:false
      },
      {
        name:'精选',
        checked:false
      },
      {
        name:'精选',
        checked:false
      },
      {
        name:'精选',
        checked:false
      },
      {
        name:'精选',
        checked:false
      },
      {
        name:'精选',
        checked:false
      },

    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  //滑动swiper
  swiperChange: function (e) {
    this.setData({
      swiperIndex: e.detail.current
    })
  },

  //点击种类
  changeCategory:function(e){
    var that = this,
    id = e.currentTarget.id,
    list = that.data.categoryList;

    list.forEach(element => {
      element.checked = false
    });

    list[id].checked = true
    that.setData({
      categoryList:list
    })

    //发送网络请求 获取该种类商品
    //
    

  }
})