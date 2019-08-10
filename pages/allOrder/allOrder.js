// pages/allOrder/allOrder.js
const app = getApp();
const { $Message } = require('../../dist/base/index');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: "",
    info: {}
  },

  delCommodity(e) {
    let that = this;
    wx.request({
      url: app.globalData.url + "delCommodity&id=" + e.currentTarget.dataset.id,
      header: {
        'content-type': 'application/json',
        "token": wx.getStorageSync('token')
      },
      success(res) {
        if(res.data) {
          let info = that.data.info;
          info.splice(Number(e.currentTarget.dataset.index), 1);
          that.setData({
            info: info
          })
        }
        else {
          $Message({
            content: '失败 稍后再试',
            type: 'warning'
          });
        }
      }
    })
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
    let that = this;
    try {
      var token = wx.getStorageSync('token')
      wx.request({
        url: app.globalData.url + "getOrder",
        header: {
          'content-type': 'application/json',
          "token": token
        },
        success(res) {
          if (res.data) {
            that.setData({
              info: res.data,
              url: app.globalData.imgurl
            });
          }
          else {
            $Message({
              content: '错误',
              type: 'error'
            });
          }
        }
      });
    } catch (e) {

    }
  },

  modify(e) {
    wx.navigateTo({
      url: '../modify/modify?id=' + e.currentTarget.dataset.id
    })
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