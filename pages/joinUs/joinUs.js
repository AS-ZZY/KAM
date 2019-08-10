// pages/joinUs/joinUs.js
const app = getApp();

const { $Message } = require('../../dist/base/index');
Page({

  /**
   * 页面的初始数据
   */ 
  data: {
    items: ["姓名", "商品类别", "商品标题","商品价格", "商品描述", "商品图"],
    categorys: ["画稿", "摄影", "手工", "美工", "其他"],
    data: ["","", "", 0,""],
    tempFilePaths: '',
    selectItems: [],
    spinShow: false
  },
  inputChange(e) {
    let names = this.data.data;
    let index = e.currentTarget.dataset.index;
    names[index] = e.detail.value;
    this.setData({
      data: names
    })
  },

  delImg(){
    this.setData({
      tempFilePaths: ''
    })
  },

  upload: function() {
    const that = this;
    wx.chooseImage({
      count: 1,
      success(res){
        const tempFilePaths = res.tempFilePaths[0];
        that.setData({
          tempFilePaths: tempFilePaths
        });
      }
    })
  },
  handlein(){
    let that = this;
    const { selectItems, data, tempFilePaths } = this.data;
    if (data[0].length * data[2].length * data[3].length * data[4].length === 0){
      $Message({
        content: '不能有空项',
        type: 'warning',
        spinShow: false
      });
      return;
    }
    this.setData({ spinShow: true });
    if(tempFilePaths){
      wx.uploadFile({
        url: app.globalData.url + "upload",
        filePath: tempFilePaths,
        name: 'file',
        header: {
          token: wx.getStorageSync('token')
        },
        formData: {
          'user': 'test'
        },
        success(res) {
          if(res.data){
            that.upload2(res.data);
          }
          else{
            $Message({
              content: '错误 稍后再试',
              type: 'warning'
            });
          }
        }
      })
    }
    else{
      this.setData({ spinShow: false });
    }
  },

  upload2(img){
    let that = this;
    let { selectItems, data } = this.data;
    wx.request({
      method: "POST",
      url: app.globalData.url + "upload2",
      data: {
        tags: selectItems,
        word: data,
        img: img
      },
      header: {
        'content-type': 'application/json',
        "token": wx.getStorageSync('token')
      },
      success(res) {
        that.setData({spinShow: false})
        if(res.data){
          $Message({
            content: '成功',
            type: 'success'
          });
        }
        else{
          $Message({
            content: '稍后再试',
            type: 'warning'
          });
        }
      }
    });
  },
  
  checkboxChange: function (e) {
    this.setData({selectItems: e.detail.value})
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