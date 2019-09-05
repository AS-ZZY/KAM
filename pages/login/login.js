// pages/login/login.js
const app = getApp();
const { $Message } = require('../../dist/base/index');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    remember: false,
    logo: "\\(`<>`)/",
    password: "",
    username: "",
    verification: ""
  },

  checkboxChange: function (e) {
    
  },

  change: function(){
   this.setData({
     remember: !this.data.remember
   })
  },

  inputPassword: function(e) {
    this.setData({
      password: e.detail.value
    })
  },
  inputUsername: function (e) {
    let value = wx.getStorageSync(e.detail.value);
    this.setData({
      password: value,
      username: e.detail.value
    })
  },
  inputVerification: function (e) {
    this.setData({
      verification: e.detail.value
    })
  },
  login: function() {
    let { password, username, verification, remember } = this.data;
    let token = wx.getStorageSync('token')
    if(password.length * username.length * verification.length !== 0){
      wx.request({
        method: "POST",
        url: app.globalData.url + "login",
        data: {
          username: username,
          password: password,
        },
        header: {
          "token": token,
          'content-type': 'application/json',
        },
        success(res) {
          if(res.data){
            app.globalData.app = res.data.info;
            app.globalData.binding = res.data.binding;
            wx.setStorageSync('token', res.data.token)
            wx.switchTab({
              url: '../home/home'
            });
            wx.removeStorageSync('ra')
            $Message({
              content: '这是一条成功提醒',
              type: 'success'
            });
          }
          else{
            $Message({
              content: '错误',
              type: 'error'
            });
          }
        }
      });
    }
    else{
      $Message({
        content: '不能有空值',
        type: 'warning'
      });
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