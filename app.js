//app.js

App({
  onLaunch: function () {
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })

    wx.login({
      success: res => {
        wx.request({
          url: this.globalData.url + "wxlogin&code=" + res.code,
          method: "GET",
          header: this.globalData.header,
          success: res => {
            if (res.data) {
              wx.setStorageSync('token', res.data.token)
              this.globalData.app = res.data.info;
              this.globalData.binding = res.data.binding;
            }
          }
        })
      }
    })
    // 获取用户信息
  },


  globalData: {
    binding: false,
    wxUserInfo: {},
    userInfo: {},
    app: {},
    //url: "http://127.0.0.1:3000/wx/",
    url: "https://zzyblog.cn/wx/",
    imgurl: "http://47.101.182.211/src/static/",
  }
})