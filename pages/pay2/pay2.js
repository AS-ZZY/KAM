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
    newAddress: "",
    money: 0,
    phone: "",
    addMessage: "",
    confirmVis: false
  },

  confirm() {
    let { addressS, phone } = this.data;
    if(addressS === "*"){
      $Message({
        content: '请添加收货地址',
        type: 'warning'
      });
      return;
    }
    if(phone.length !== 11){
      $Message({
        content: '请输入正确的手机号码',
        type: 'warning'
      });
      return;
    }
    this.setData({ confirmVis: true })
  },

  addAddress() {
    this.setData({ visibleAddress: true })
  },

  closeConfirm() {
    this.setData({ confirmVis: false })
  },

  closeAddAddress() {
    this.setData({ visibleAddress: false })
  },

  setAddress(e) {
    this.setData({ newAddress: e.detail.value })
  },

  inputPhone(e) {
    this.setData({ phone: e.detail.value })
  },

  inputMessage(e) {
    this.setData({ addMessage: e.detail.value })
  },

  addNewAddress() {
    let { newAddress, address } = this.data;
    if (newAddress){
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
            if (res.data) {
              address.push(newAddress)
              that.setData({
                address: address,
                visibleAddress: false
              })
            }
            else {
              $Message({
                content: '失败 请重试',
                type: 'error'
              });
            }
          }
        })
      } catch (e) { }
    }
    else{
      $Message({
        content: '地址不能为空',
        type: 'warning'
      }); 
    }
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    const eventChannel = this.getOpenerEventChannel();
    eventChannel.on('acceptDataFromOpenerPage', function (data) {
      that.setData({ 
        datas: data[1],
        money: data[0]
      })
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
    } catch (e) {}
  },

  selectaddress(e) {
    let index = e.currentTarget.dataset.item;
    this.setData({ addressS: this.data.address[index] })
  },

  randomString() {
    　　let len = 32;
    　　let $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';   
    　　let maxPos = $chars.length;
    　　let pwd = '';
    　　for (let i = 0; i < len; i++) {
      　　　　pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    　　}
    　　return pwd;
  },

  getpackage(time) {
    let that = this;
    wx.request({
      url: app.globalData.url + "getnotifyurl",
      method: "POST",
      header: {
        'content-type': 'application/json',
        "token": wx.getStorageSync('token')
      },
      data: {
        money: this.data.money,
        time: time
      },
      success: (res)=> {
        if(res.data){
          
        }
      }
    })
  },

  confirmBuy() {
  /*  let a = new Date();
    let timestamp = Date.parse(a);
    console.log(a.toString().split("G")[0])
    let aa = this.randomString();
    this.getpackage(a.toString().split("G")[0]);*/
    $Message({
      content: '请先绑定网页端账号',
      type: 'warning'
    });
    return;
/*    wx.requestPayment(
      {
        'timeStamp': (timestamp/1000).toString(),
        'nonceStr': '',
        'package': '',
        'signType': 'MD5',
        'paySign': '',
        'success': function (res) { },
        'fail': function (res) { },
        'complete': function (res) { }
      })*/
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