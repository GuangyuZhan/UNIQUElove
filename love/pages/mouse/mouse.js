const db = wx.cloud.database();
let openId = "";
let userInfos = {};
let owner = {};
Page({
  /**
   * 页面的初始数据
   */
  data: {
    contentText: [
      "This is no one else,you are everywhere",
      "For you,a thousand times over",
    ],
  },

  async handleGetUserInfo(e) {
		let { userInfo } = e.detail;
    wx.setStorageSync("userInfo", userInfo);
    await db
      .collection("userList")
      .aggregate()
      .match({
        _openid: openId,
      })
      .end()
      .then((res) => {
        owner = res.list[0];
      })
			.catch((err) => console.log(err));
			
    if (!owner) {
      db.collection("userList").add({
        data: {
          coupleId: openId + "123",
          userInfo
        },
        success(res) {
          console.log(res);
        },
        fail(err) {
          console.log("aaa", err);
        },
      });
    }
    
    wx.showToast({
      title: "欢迎回家！",
      icon: "success",
      image: "",
      duration: 1000,
      mask: false,
      success: (result) => {},
      fail: () => {},
      complete: () => {},
    });
    setTimeout(() => {
      wx.navigateTo({
        url: "/pages/passw/passw",
        success: (result) => {},
        fail: () => {},
        complete: () => {},
      });
    }, 1500);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    openId = await getApp().getOpenid();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
});
