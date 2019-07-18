// 百度AI开放接口相关方法

// 配置信息
const apiKey = 'mAgLjoMEGOMPoxdxwtD9vpF0'
const secretKey = 'SbgFlyhqYfigKF6exxbUoEYePuQzaFcd'

function request(data) {
	return new Promise(function(resolve, reject) {
		uni.request({
			url: data.url, // 接口地址。
			data: data.params || {}, // 请求参数
			header: data.header || {}, // 请求头信息
			method: data.method || 'GET', // 请求方法
			dataType: data.json || 'json', // 如果设为 json，会尝试对返回的数据做一次 JSON.parse
			success: (res) => { // 请求成功
				console.log('请求成功');
				resolve(res)
			},
			fail: (err) => { // 请求失败
				console.log('请求失败');
				reject(err)
			}
		});
	})
}

// 获取AccessToken
export function getAccexxToken() {
	try {
		let accesstoken = uni.getStorageSync('accesstoken_key');
		let expirein = uni.getStorageSync('expirein_key');
		let attime = uni.getStorageSync('attime_key');
		if (accesstoken && expirein && attime) {
			if (parseInt(attime) > new Date().getTime()) {
				return accesstoken
			}
		}
	} catch (e) {
		// error
	}
	let url = 'https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=' + apiKey +
		'&client_secret=' + secretKey
	request({
		url
	}).then(res => {
		// console.log(res);
		try {
			uni.setStorageSync('accesstoken_key', res.data.access_token);
			uni.setStorageSync('expirein_key', res.data.expires_in);
			uni.setStorageSync('attime_key', new Date().getTime() + parseInt(res.data.expires_in));
		} catch (e) {
			// error
			uni.setStorage('accesstoken_key', res.data.access_token);
			uni.setStorage('expirein_key', res.data.expires_in);
			uni.setStorage('attime_key', new Date().getTime() + parseInt(res.data.expires_in));
		}
		return res.data.access_token
	})
}

export function getIdCard(img, side) {
	return new Promise(function(resolve, reject) {
		let url = 'https://aip.baidubce.com/rest/2.0/ocr/v1/idcard?access_token=' + getAccexxToken()
		let params = {
			image: img,
			id_card_side: side || 'front'
		}
		request({
			url,
			params,
			header: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			method: 'POST'
		}).then(res => {
			// console.log('res', res);
			resolve(res)
		})
	})
}
