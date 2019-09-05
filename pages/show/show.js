// pages/show/show.js
const app = getApp();
const { $Message } = require('../../dist/base/index');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    id: "",
    url: "",
    info: {},
    visible: false,
    comment: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    wx.request({
      url: app.globalData.url + "commodity/id=" + options.id,
      header: app.globalData.header,
      success(res) {
        if(res.data.success){
          that.setData({
            id: options.id,
            info: res.data
          })
        }
        else{
          wx.switchTab({
            url: '../index/index'
          })
        }
      }
    })
  },

  setComment(e) {
    this.setData({
      comment: e.detail.value
    })
  },

  addComment() {
    if (wx.getStorageSync('token')){
      this.setData({
        visible: true
      })
    }
    else{
      $Message({
        content: '请先绑定账号',
        type: 'warning'
      });
    }
  },
  handleClose(){
    this.setData({
      visible: false,
      comment: ""
    })
  },
  handleSubmit() {
    const that = this;
    let { info, comment, id }  = this.data;
    wx.request({
      url: app.globalData.url + 'addComment',
      method: "POST",
      data: {
        comment: comment,
        id: id,
        time: (new Date()).toString().split("G")[0]
      },
      header: {
        'content-type': 'application/json',
        "token": wx.getStorageSync('token')
      },
      success(res) {
        if(res.data){
          $Message({
            content: '评论成功',
            type: 'success'
          });
          info.comment = res.data;
          that.setData({
            info: info,
            visible: false,
            comment: ""
          })
        }
        else{
          $Message({
            content: '失败 稍后再试',
            type: 'warning'
          });
        }
      }
    })
  },
  addShoppingCart(){
    try{
      let token = wx.getStorageSync('token');
      wx.request({
        method: "POST",
        data: {
          id: this.data.id,
          time: (new Date()).toString().split("G")[0]
        },
        url: app.globalData.url + "addShoppingCart",
        header: {
          'content-type': 'application/json',
          'token':  token
        },
        success(res) {
          switch(res.data){
            case "t":
              $Message({
                content: '已在购物车中',
                type: 'warning'
              });
              break;
            case "w":
              $Message({
                content: '稍后再试',
                type: 'warning'
              });
              break;
            case true:
              $Message({
                content: '加入成功',
                type: 'success'
              });
              break;
            default:
              $Message({
                content: '你的账号安全有问题 请检查密码后重新登陆',
                type: 'error'
              });
          }          
        }
      })
    }catch (e) {
      $Message({
        content: '请先绑定账号',
        type: 'warning'
      });
    }
  },
  
  buyNow() {
    let that = this;
    wx.navigateTo({
      url:"../pay1/pay1",
      events: {
        // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
        acceptDataFromOpenedPage: function (data) {
        },
      },
      success: function (res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', { data: that.data.info,
                                                            id: that.data.id })
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