//app.js

App({
	onLaunch: function () {
		wx.cloud.init({
			env: "yuhan-4j7gn"
		})
	},
	getCloudOpenid: async function () {
		return this.openid = this.openid || (await wx.cloud.callFunction({
			name: 'login'
		})).result.OPENID
	},
	getOpenid: async function () {
		(this.openid = this.openid || wx.getStorageSync('openid')) || wx.setStorageSync('openid', await this.getCloudOpenid())
		return this.openid
	}	
})