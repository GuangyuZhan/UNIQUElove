const cloud = require('wx-server-sdk')
cloud.init()
exports.main=async()=>{return cloud.getWXContext()}
