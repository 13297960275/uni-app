// 百度AI开放接口相关方法

// 配置信息
const apiKey = 'mAgLjoMEGOMPoxdxwtD9vpF0'
const secretKey = 'SbgFlyhqYfigKF6exxbUoEYePuQzaFcd'
let apiUrl = 'https://aip.baidubce.com'

// #ifdef H5
apiUrl = '/aip'
// #endif

function request(data) {
	return new Promise(function(resolve, reject) {
		uni.request({
			url: data.url, // 接口地址。
			data: data.params || {}, // 请求参数
			header: data.header || {}, // 请求头信息
			method: data.method || 'GET', // 请求方法
			dataType: data.json || 'json', // 如果设为 json，会尝试对返回的数据做一次 JSON.parse
			success: (res) => { // 请求成功
				console.log('request 请求成功');
				resolve(res)
			},
			fail: (err) => { // 请求失败
				console.log('request 请求失败');
				reject(err)
			}
		});
	})
}

// 获取AccessToken
export async function getAccexxToken() {
	return new Promise(function(resolve, reject) {
		try {
			let accesstoken = uni.getStorageSync('accesstoken_key');
			let expirein = uni.getStorageSync('expirein_key');
			let attime = uni.getStorageSync('attime_key');
			if (accesstoken && expirein && attime) {
				if (parseInt(attime) > new Date().getTime()) {
					console.log('getAccexxToken getStorageSync 请求成功');
					return resolve(accesstoken)
				}
			}
		} catch (e) {
			// error
		}
		let url = apiUrl + '/oauth/2.0/token?grant_type=client_credentials&client_id=' + apiKey +
			'&client_secret=' + secretKey

		request( { url }).then(res => {
			console.log('getAccexxToken 请求成功');
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
			resolve(res.data.access_token)
		})
	})
}

export function getIdCard(img, side) {
	return new Promise(function(resolve, reject) {
		getAccexxToken().then(res => {
			let url = apiUrl + '/rest/2.0/ocr/v1/idcard?access_token=' + res
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
				console.log('getIdCard 请求失败');
				resolve(res)
			})
		})
	})
}

export function getOcrInfo(data, type) {
	data.image = data.image.replace(/^data:image\/\w+;base64,/, "")
	return new Promise(function(resolve, reject) {
		getAccexxToken().then(res => {
			let url = apiUrl + '/rest/2.0/ocr/v1/' + type + '?access_token=' + res
			request({
				url,
				params: data,
				header: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				method: 'POST'
			}).then(res => {
				console.log('getOcrInfo 请求失败');
				resolve(res)
			})
		})
	})
}
