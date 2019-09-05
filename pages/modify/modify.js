// pages/modify/modify.js
const app = getApp();
const { $Message } = require('../../dist/base/index');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: "",
    info: {},
    items: ["商品类别", "商品标题", "商品价格", "商品描述", "商品图"],
    categorys: ["画稿", "摄影", "手工", "美工", "其他"],
    names: ["tags","title","price","content"],
    check: [false,false,false,false,false],
    tempFilePaths: ""
  },

  inputChange(e) {
    let index = e.currentTarget.dataset.index;
    let value = e.detail.value;
    let { info, names }= this.data;
    info[names[index]] = value;
    this.setData({
      info: info
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    try {
      var token = wx.getStorageSync('token')
      wx.request({
        url: app.globalData.url + "modify&id=" + options.id,
        header: {
          'content-type': 'application/json',
          "token": token
        },
        success(res) {
          let info = res.data;
          let { check, categorys } = that.data;
          for(let i in categorys){
            if(info.tags.indexOf(categorys[i]) >= 0){
              check[i] = true; 
            }
          }
          if (res.data) {
            that.setData({
              info: info,
              url: app.globalData.imgurl,
              check: check,
              id: options.id
            })
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

  upload() {
    let info = this.data.info;
    let that = this;
    if(info.img !== ""){
      $Message({
        content: '只能上传一张图片',
        type: 'warning'
      });
      return;
    }
    wx.chooseImage({
      count: 1,
      success(res) {
        const tempFilePaths = res.tempFilePaths[0];
        that.setData({
          tempFilePaths: tempFilePaths
        });
      }
    })
  },

  delImg() {
    let info = this.data.info;
    info.img = "";
    this.setData({
      info: info,
      tempFilePaths: ""
    })
  },

  checkboxChange(e) {
    let info = this.data.info;
    info.tags = e.detail.value;
    this.setData({
      info: info
    })
  },

  handlein() {
    let that = this;
    let { tempFilePaths, info } = this.data;
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
          if (res.data) {
            info.img = res.data;
            that.upload2(info);
          }
          else {
            $Message({
              content: '错误 稍后再试',
              type: 'warning'
            });
          }
        }
      })
    }
    else {
      that.upload2(info);
    }
  },

  upload2(info) {
    let that = this;
    let { selectItems, data } = this.data;
    wx.request({
      method: "POST",
      url: app.globalData.url + "modify",
      data: {
        id: that.data.id,
        info: info
      },
      header: {
        'content-type': 'application/json',
        "token": wx.getStorageSync('token')
      },
      success(res) {
        if (res.data) {
          $Message({
            content: '成功',
            type: 'success'
          });
          wx.navigateBack({
            delta: 1
          })
        }
        else {
          $Message({
            content: '稍后再试',
            type: 'warning'
          });
        }
      }
    });
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
    let id = this.data.id;
    if(id){
      try {
        var token = wx.getStorageSync('token')
        wx.request({
          url: app.globalData.url + "modify&id=" + id,
          header: {
            'content-type': 'application/json',
            "token": token
          },
          success(res) {
            let info = res.data;
            let { check, categorys } = that.data;
            for (let i in categorys) {
              if (info.tags.indexOf(categorys[i]) >= 0) {
                check[i] = true;
              }
            }
            if (res.data) {
              that.setData({
                info: info,
                check: check,
              })
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