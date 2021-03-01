// pages/passw/passw.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
		value:""
	},
	
	checkPassw(){
		// console.log(this.data.value);
		if(this.data.value==11240722){
			wx.switchTab({
				url: '/pages/index/index',
			});
			return;	
		}
		wx.showToast({
			title: '您输入的秘钥错误，请重新输入！',
			icon: 'none',
			image: '',
			duration: 1500,
			mask: true,
		});
			
	},

	handleInput(e){
		const {value}=e.detail
		setTimeout(()=>{
			this.setData({
				value
			})
		},100)
		// console.log(value);
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