const DB = wx.cloud.database();
var util = require("../../utils/utils");
var Time = util.formatTime(new Date());
let id = "";
let openid = "";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 1,
        name: "Person",
        active: false,
      },
      {
        id: 2,
        name: "Ours",
        active: true,
      },
      {
        id: 3,
        name: "Lover",
        active: false,
      },
    ],
    userInfo: {},
    value: "",
    tabIndex: 1,
    mind: [],
  },

  switchWrite() {
    wx.navigateTo({
      url: "/pages/write/write",
    });
  },

  textInput(e) {
    let { value } = this.data;
    let { mind } = this.data;
    let { index } = e.currentTarget.dataset;
    let { talkList } = mind[index];
    let { _id } = mind[index];
    if (!value == "") {
      talkList.unshift({
        text: value,
        time: Time,
      });
      value = "";
      this.setData({
        [`mind[${index}].talkList`]: talkList,
        value,
      });
      DB.collection("mind").doc(_id).update({
        data: {
          talkList,
        },
      });
    }
  },

  getText(e) {
    let { value } = e.detail;
    if (!value == "") {
      value = value.replace(/\s+/g, "");
      this.setData({
        value,
      });
    }
  },

  showInput(e) {
    let { index } = e.currentTarget.dataset;
    var { mind } = this.data;
    let { textAct } = mind[index];
    textAct = !textAct;
    // console.log(textAct);
    this.setData({
      [`mind[${index}].textAct`]: textAct,
    });
  },

  changeActive(e) {
    let { index } = e.currentTarget.dataset;
    var { mind } = this.data;
    let { loveAct } = mind[index];
    let { _id } = mind[index];
    loveAct = !loveAct;
    this.setData({
      [`mind[${index}].loveAct`]: loveAct,
    });
    DB.collection("mind").doc(_id).update({
      data: {
        loveAct,
      },
    });
  },

  changeTitleByIndex(index) {
    let { tabs } = this.data;
    tabs.forEach((v, i) =>
      i === index ? (v.active = true) : (v.active = false)
    );
    this.setData({
      tabs,
    });
  },

  tabsItemChange(e) {
    // console.log(e);
    const { index } = e.detail;
    this.setData({
      tabIndex: index,
    });
    this.changeTitleByIndex(index);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    openid = wx.getStorageSync("openid");
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.cloud.callFunction({
      name: "login",
      success(res) {
        // console.log(res);
      },
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that = this;
    DB.collection("userList")
      .where({
        _openid: openid,
      })
      .get({
        success(res) {
          // console.log('查询成功',res.data);
          let { _id } = res.data[this.length - 1];
          let { talkList } = res.data[this.length - 1];
          let { userInfo } = res.data[this.length - 1];
          id = _id;
          that.setData({
            textList: talkList || [],
            userInfo,
          });
        },
        fail(err) {
          console.log("查询失败", err);
        },
      }),
      DB.collection("mind")
        .where({
          _openid: openid,
        })
        .get({
          success(res) {
            // console.log(res);
            that.setData({
              mind: res.data.reverse(),
            });
          },
        });
  },

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
  onReachBottom: function () {
    wx.showToast({
      title: "没有更多了",
      icon: "error",
      image: "",
      duration: 1500,
      mask: false,
      success: (result) => {},
      fail: () => {},
      complete: () => {},
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
});
