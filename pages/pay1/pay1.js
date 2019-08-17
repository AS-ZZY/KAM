// pages/pay1/pay1.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: "http://47.101.182.211/src/static/",
    id : "",
    info: {},
    value: 1
  },
  handleChange({ detail }) {
    this.setData({
      value: detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('acceptDataFromOpenerPage', function (data) {
      that.setData({info: data.data,id: data.id})      
    })
  },

  buy() {
    let that = this;
    wx.navigateTo({
      url: "../pay2/pay2",
      events: {
        // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
        acceptDataFromOpenedPage: function (data) {
          console.log(data)
        },
      },
      success: function (res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', [Number(that.data.value) * Number(that.data.info.price) ,[{
          value: Number(that.data.value),
          price: Number(that.data.info.price),
          title: that.data.info.title,
          id: that.data.id
        }]])
      }
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

  }
})