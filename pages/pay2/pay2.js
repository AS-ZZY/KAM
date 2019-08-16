// pages/pay2/pay2.js
const app = getApp();
const { $Message } = require('../../dist/base/index');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    datas: [],
    address: [],
    addressS: "*",
    visibleAddress: false,
    newAddress: ""
  },

  addAddress() {
    this.setData({ visibleAddress: true })
  },

  closeAddAddress() {
    this.setData({ visibleAddress: false })
  },

  setAddress(e) {
    this.setData({ newAddress: e.detail.value })
  },

  addNewAddres() {
    let { newAddress, address } = this.data;
    try {
      let that = this;
      let token = wx.getStorageSync('token')
      wx.request({
        url: app.globalData.url + 'addaddress',
        method: "POST",
        data: {
          newAddress: newAddress
        },
        header: {
          'content-type': 'application/json',
          "token": token
        },
        success(res) {
          if(res.data){
            address.push(newAddress)
            that.setData({ 
              address: address,
              visibleAddress: false })
          }
          else{
            $Message({
              content: '失败 请重试',
              type: 'error'
            });
          }
        }
      })
    } catch (e) {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    const eventChannel = this.getOpenerEventChannel();
    eventChannel.on('acceptDataFromOpenerPage', function (data) {
      that.setData({ datas: data })
    })
    try {
      var token = wx.getStorageSync('token')
      wx.request({
        url: app.globalData.url + 'getaddress',
        header: {
          'content-type': 'application/json',
          "token": token
        },
        success(res) {
          that.setData({address: res.data})
        }
      })
    } catch (e) {
      // Do something when catch error
    }
  },

  selectaddress(e) {
    let index = e.currentTarget.dataset.item;
    this.setData({ addressS: this.data.address[index] })
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