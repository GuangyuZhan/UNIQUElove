const db = wx.cloud.database().collection('mind');
var util = require('../../utils/utils');
var Time = util.formatTime(new Date());
Page({
	data: {
		value: '',
		imgList: [],
		TFP:[]
	},

	async uploadFile() {
		let {value}=this.data;
		if(value==""||this.TFP.length==0){
			wx.showToast({
				title: '请输入内容记录心情',
				icon: 'none',
				image: '',
				duration: 1500,
				mask: true,
			});
			return;
		}
		this.imgList = []
		for (let i = 0; i < this.TFP.length; i++) {
			await wx.cloud.uploadFile({
				cloudPath: 'img/' + Math.random() + i + '.png',
				filePath: this.TFP[i]
			}).then(res => {
				this.imgList.push(res.fileID)
				// console.log(this.imgList);
			})
		}

		db.add({
			data: {
				imgList: this.imgList,
				text:value,
				date:Time,
				textAct:false,
				loveAct:false,
				talkList:[]
			}
		})
		wx.showToast({
			title: '提交成功',
			icon: 'success',
			image: '',
			duration: 1500,
			mask: true,
		});
		setTimeout(()=>{
			wx.switchTab({
				url: '/pages/index/index',
			})
		},2000)
				
	},

	deleteImg(e) {
		console.log(e);
		let {
			imgList
		} = this.data;
		let {
			index
		} = e.currentTarget.dataset;
		imgList.splice(index, 1)
		this.setData({
			imgList
		})
	},

	getText(e) {
		// console.log(e);
		let {
			value
		} = e.detail;
		if (!value == "") {
			value = value.replace(/\s+/g, '')
			this.setData({
				value
			})
		}
	},

	chooseImg() {
		let {imgList} = this.data;
		wx.chooseImage({
			count: 9,
			sizeType: ['original', 'compressed'],
			sourceType: ['album', 'camera'],
			success: (result) => {
				if(this.TFP.length==0){
					this.TFP=result.tempFilePaths;
				}else{
					this.TFP=this.TFP.concat(result.tempFilePaths);
				}
				this.setData({
					imgList:this.TFP
				})
			},
			fail: (err) => {
				console.log(err);
			}
		})
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.TFP=[]
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