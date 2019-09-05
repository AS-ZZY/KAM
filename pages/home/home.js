// pages/home/home.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    binding: false,
    userInfo: {},
    token: "",
    app: {},
    block: ["积分","卡","券"],
    blockInfo: ["point","card","paperCard"],
    orderIcon: ["coupons", "commodity", "tasklist","activity","homepage"],
    orderInfo: ["待付款","待发货","待收货","待评价","售后"],
    clickInfo: ["shoppingCart", "group", "management"],
    items: ["我的购物车","我的拼团","管理账号"]
  },

  login: function() {
    wx.navigateTo({
      url: "../login/login"
    })
  },
  click(e) {
    let index = e.currentTarget.dataset.index;
    if(index === "shoppingCart"){
      wx.switchTab({
        url: '../shoppingCart/shoppingCart'
      })
    }
    else if (index !== "group"){
      wx.navigateTo({ url: "../" + index + "/" + index });
    }
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
    try {
      var value = wx.getStorageSync('token')
      this.setData({
        token: value,
        app: app.globalData.app,
        userInfo: app.globalData.userInfo,
        binding: app.globalData.binding
      })
    } catch (e) {
      
    }
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