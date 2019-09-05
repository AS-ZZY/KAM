//index.js
//获取应用实例
const app = getApp()

Page({
  seacrh: "",
  data: {
    url: "http://47.101.182.211/src/static/",
    userInfo: {},
    hasUserInfo: false,
    imgUrls: [
      "2.png",
      "3.png",
    ],
    interval: 2000,
    duration: 500,
    classificationsImg: [
      "../../img/home.png",
      "../../img/index.png",
      "../../img/joinUs.png",
      "../../img/shoppingCart.png",
      "../../img/others.png"
    ],
    classificationsText: [
      "啾画师","啾手工娘","啾摄影","啾美工","其他"
    ],
    announcements: [
      "欢迎来到KAM吖",
      "(●'◡'●)"
    ],
    commodityData: []
  },
  jumpTo: function(event){
    wx.navigateTo({
      url: "../show/show?id=" + event.currentTarget.dataset.id
    });
  },
  jumpTo2: function (event) {
    this.jumpTo3(event.currentTarget.dataset.id);
  },
  jumpTo3(id) {
    wx.navigateTo({
      url: "../page/page?id=" + id
    });
  },
  searchValue(e) {
    if (e.detail.value){
      this.jumpTo3(e.detail.value);
    }
  },

  getData(num) {
    let that = this;
    wx.request({
      url: app.globalData.url + "homeCommodity&receive=" + num + "&num=10",
      success(res) {
        if(num === 0){
          that.setData({
            commodityData: res.data
          })
        }
        else {
          that.setData({
            commodityData: [...that.data.commodityData, ...res.data]
          })
        }
      }
    })
  },
  //事件处理函数
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    let a = wx.canIUse('button.open-type.getUserInfo');
    if (app.globalData.userInfo.nickName) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } 
    else if (a){
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } 
    else {
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    };
  },

  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
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
    this.getData(0);
    this.setData({
      userInfo: app.globalData.userInfo,
      hasUserInfo: true
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
    this.getData(this.data.commodityData.length);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
