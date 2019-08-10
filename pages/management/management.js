// pages/management/management.js
const app = getApp();
const { $Message } = require('../../dist/base/index');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    url: "http://47.101.182.211/src/static/",
    apps: {},
    visible: false,
    tag: ""
  },

  delTag(e) {
    let index = e.currentTarget.dataset.index;
    let apps = this.data.apps;
    apps.tags.splice(index, 1);
    this.sendData(apps.tags, apps);
  },
  handleClose(){
    this.setData({
      visible: false
    });
  },
  handleAddTag() {
    this.setData({
      visible: true
    });
  },
  addValue(e){
    this.setData({
      tag: e.detail.value
    })
  },
  addTag(){
    let { apps, tag } = this.data;
    if(!tag){
      $Message({
        content: '标签不能为空',
        type: 'warning',
      });
      return;
    }
    if(apps.tags.indexOf(tag) >= 0){
      $Message({
        content: '不能添加相同的标签',
        type: 'warning',
      });
      return;
    }
    if(apps.tags.length > 5){
      $Message({
        content: '不能超过5个标签',
        type: 'warning',
      });
      return;
    }
    if(tag.length > 5){
      $Message({
        content: '长度不能超过5个字',
        type: 'warning',
      });
      return;
    }
    apps.tags.push(tag);
    this.sendData(apps.tags, apps);
  },
  sendData(tags, apps){
    let that = this;
    wx.request({
      method: "POST",
      url: app.globalData.url + "addTags",
      data: {
        tags: tags
      },
      header: {
        'content-type': 'application/json',
        "token": wx.getStorageSync('token')
      },
      success(res) {
        if (res.data) {
          that.setData({
            apps: apps,
            tag: "",
            visible: false
          });
          app.globalData.app = apps;
        }
        else {
          $Message({
            content: '失败',
            type: 'warning',
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
    this.setData({
      apps: app.globalData.app
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