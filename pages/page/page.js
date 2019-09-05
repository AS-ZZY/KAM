// pages/page/page.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classificationsText: [
      "啾画师", "啾手工娘", "啾摄影", "啾美工", "其他"
    ],
    visible: false,
    url: "",
    id: "",
    textId: 0,
    type:"",
    actions1: [
      {
        name: '降序'
      },
      {
        name: '升序'
      }
    ],
    classificationData: [],
    classificationData1: [],
  },
  jumpTo: function (event) {
    wx.navigateTo({
      url: "../show/show?id=" + event.currentTarget.dataset.id
    });
  },

  searchValue(e) {
    if (e.detail.value){
      this.getData(e.detail.value);      
    }
  },
  
  getData(id) {
    let that = this;
    wx.request({
      url: app.globalData.url + "classification",
      method: "POST",
      data: {
        classes: id
      },
      success(res) {
        if(res.data){
          that.setData({
            textId: id,
            classificationData: res.data,
            classificationData1: res.data
          })
        }
        else{

        }
      }
    })
  },
  handleClickItem({ detail }) {
    let { classificationData, type } = this.data;
    let a = detail.index ? 1 : -1;
    classificationData.sort(function(b, c){
      return a * (b[type] - c[type])
    });
    this.setData({
      visible: false,
      classificationData1: classificationData
    })
  },
  openSort(e) {
    this.setData({
      visible: true,
      type: e.currentTarget.dataset.id
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id;
    this.setData({
      textId: id
    });
    this.getData(id);
  },
  handleCancel() {
    this.setData({
      visible: false
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