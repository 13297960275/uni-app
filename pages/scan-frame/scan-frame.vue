<template>
	<view>
		<camera device-position="back" flash="auto" @error="error" style="width: 100%; height: 500upx;">
			<cover-image src="../../static/scan-frame/scan-img.png" class="scan-img"></cover-image>
		</camera>
		<view class="scan-text">请将XXX放置白色框内</view>
		<button type="primary" @click="takePhoto">拍照</button>
		<image mode="widthFix" class="photos-box" :src="src"></image>
		<text>{{src}}</text>
		<view class="content">
			<an-upload-img></an-upload-img>
		</view>
	</view>
</template>

<script>
	import {
		pathToBase64,
		base64ToPath
	} from '@/js_sdk/gsq-image-tools/image-tools/'
	import anUploadImg from '@/components/an-uploadImg/an-uploadImg'

	export default {
		components: {
			anUploadImg
		},
		data() {
			return {
				src: ""
			}
		},
		methods: {
			takePhoto() {
				const ctx = uni.createCameraContext();
				ctx.takePhoto({
					quality: 'high',
					success: (res) => {
						this.src = res.tempImagePath
						console.log(this.src);

						/* 返回调用页面并把图片URL传递过去 */
						/* let pages = getCurrentPages();
						let prevPage = pages[pages.length - 2]; 
						prevPage.setData({
							"image": res.tempImagePath,
						})
						uni.navigateBack(); */

						/* 调用页面获取图片URL方法 */
						/* let pages = getCurrentPages();
						let currPage = pages[pages.length-1];
						if(typeof(currPage.data.image) != undefined && currPage.data.image != null){
							console.log('获取图片：', currPage.data.image)
						} */

						// pathToBase64: 从图像路径转换为base64，uni-app、微信小程序和5+APP使用的路径不支持网络路径，如果是网络路径需要先使用下载API下载下来。
						pathToBase64(this.src)
							.then(base64 => {
								console.log(base64)
							})
							.catch(error => {
								console.error(error)
							})

						// base64ToPath: 将图像base64保存为文件，返回文件路径。
						// base64ToPath(base64)
						// .then(path => {
						// 	console.log(path)
						// })
						// .catch(er => {
						// 	console.error(er)
						// })

						// 可以利用promise来串行和并行的执行多个任务
						// 并行
						// Promise.all(paths.map(path => pathToBase64(path)))
						// 	.then(res => {
						// 		console.log(res)
						// 		// [base64, base64...]
						// 	})
						// 	.catch(error => {
						// 		console.error(error)
						// 	})
						// // 串行
						// paths.reduce((promise, path) => promise.then(res => pathToBase64(path).then(base64 => (res.push(
						// 		base64), res))), Promise.resolve([]))
						// 	.then(res => {
						// 		console.log(res)
						// 		// [base64, base64...]
						// 	})
						// 	.catch(error => {
						// 		console.error(error)
						// 	})
					}
				});
			},
			error(e) {
				console.log(e.detail);
			}
		}
	}
</script>

<style>
	.content {
		background-color: #f2f2f2;
	}

	.scan-img {
		opacity: 0.4;
		width: 100%;
		height: 500upx;
	}

	.scan-text {
		font-size: 20px;
		text-align: center;
		line-height: 60upx;
	}
</style>
