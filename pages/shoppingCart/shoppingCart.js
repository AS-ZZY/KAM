// pages/shoppingCart/shoppingCart.js
const app = getApp();
const { $Message } = require('../../dist/base/index');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: [],
    token: "",
    url: "http://47.101.182.211/src/static/",
    selectItems: [],
    selectMoney: 0,
  },
  getShoppingCart(token) {
    let that = this;
    wx.request({
      url: app.globalData.url + "getShoppingCart",
      header: {
        'content-type': 'application/json',
        "token": token
      },
      success(res) {
        if(res.data){
          that.setData({
            data: res.data
          })
        }
        else{
          $Message({
            content: '稍后再试',
            type: 'warning'
          });
        }
      }
    })
  },
  jumpTo: function (event) {
    wx.navigateTo({
      url: "../show/show?id=" + event.currentTarget.dataset.id
    });
  },
  checkboxChange: function (e) {
    let money = 0;
    let data = this.data.data;
    for(let i in e.detail.value){
      money += Number(data[Number(e.detail.value[i])].price);
    }
    this.setData({ 
      selectItems: e.detail.value,
      selectMoney: money })
  },
  del(e) {
    let index = e.currentTarget.dataset.index;
    let id = e.currentTarget.dataset.id;
    let { selectItems, selectMoney, data } = this.data;
    if(selectItems.indexOf(index.toString()) >= 0){
      console.log(1)
      selectMoney -= data[index].price
      selectItems.splice(selectItems.indexOf(index.toString()),1);
    }
    let that = this;
    wx.request({
      url: app.globalData.url + "delShoppingCart&id=" + id, 
      header: {
        'content-type': 'application/json',
        "token": this.data.token
      },
      success(res) {
        if(res.data){
          let data = that.data.data;
          data.splice(e.currentTarget.dataset.index, 1);
          that.setData({
            data: data,
            selectMoney: selectMoney,
            selectItems: selectItems,
          })
        }
        else{
          $Message({
            content: '稍后再试',
            type: 'warning'
          });
        }
      }
    })
  },

  buy() {
    let { selectItems, data, selectMoney } = this.data;
    if(selectItems.length === 0){
      return;
    }
    let d = [];
    for(let i in selectItems){
      let index = Number(i);
      d.push({
        value: 1,
        price: data[index].price,
        title: data[index].title,
        id: data[index].id
      })
    }
    wx.navigateTo({
      url: "../pay2/pay2",
      events: {
        // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
        acceptDataFromOpenedPage: function (data) {
          console.log(data)
        },
      },
      success: function (res) {
        res.eventChannel.emit('acceptDataFromOpenerPage', [selectMoney, d])
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
    try {
      let token = wx.getStorageSync('token');
      this.setData({ token: token })
      this.getShoppingCart(token);
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