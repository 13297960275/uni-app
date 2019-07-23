<template>
	<view>
		<image :src="mpWxQr" class="myimg"></image>
		<view style="height: 32upx;"></view>
		<view v-if="mpWxQr" style="margin: 0 32upx;">
			<canvas canvas-id="mini_poster" :style="{ width: canvasW + 'px', height: canvasH + 'px' }"></canvas>
		</view>
		<view style="height: 80upx;"></view>
		<view v-if="mpWxQr" style="margin: 0 32upx;">
			<button style="background-color: #4A5061; color: #FFFFFF;" @tap="toSaveImage">保存到相册</button>
		</view>
	</view>
</template>

<script>
	// import { getMiniWxQrCode } from '@/api/user.js'
	export default {
		data() {
			return {
				nickname: '热豆科技',
				mpWxQr: null,
				canvasW: 0,
				canvasH: 0
			}
		},
		onLoad() {
			const systemInfo = uni.getSystemInfoSync()
			this.canvasW = systemInfo.windowWidth - uni.upx2px(64)
			this.canvasH = uni.upx2px(640)
			const that = this
			// getMiniWxQrCode().then(respone => {
				// that.mpWxQr = respone.data.mp_wx_qr
				this.mpWxQr = "https://ai.bdstatic.com/file/AC78E70C4B6848A7BDE261FD08244AEE"
				this.toDrawCanvas()
			// }).catch(err=>{
			// 	if (err.data && err.data.detail) {
			// 		uni.showToast({
			// 			icon: 'none',
			// 			title: err.data.detail
			// 		})
			// 	}
			// })
		},
		methods: {
			toSaveImage() {
				const that = this
				uni.canvasToTempFilePath({
					canvasId: 'mini_poster',
					success: (res) => {
						uni.saveImageToPhotosAlbum({
							filePath: res.tempFilePath,
							success: () => {
								uni.showToast({
									title: '保存成功'
								})
							},
							fail() {
								uni.showToast({
									icon: 'none',
									title: '保存名片码失败'
								})
							}
						})
					},
					fail() {
						uni.showToast({
							icon: 'none',
							title: '保存名片码失败'
						})
					}
				})
			},
			toDrawCanvas() {
				const left_padding = uni.upx2px(64)
				const top_padding = uni.upx2px(120)
				let ctx = uni.createCanvasContext('mini_poster')
				ctx.fillStyle = '#FFFFFF'
				ctx.fillRect(0, 0, this.canvasW, this.canvasH)

				ctx.setFillStyle('#333333')
				ctx.setFontSize(20)
				ctx.setTextAlign('center')
				ctx.fillText(this.nickname, 0.5 * this.canvasW, top_padding)
				
				const that = this
				uni.downloadFile({
					url: this.mpWxQr,
					success: (res) => {
						ctx.drawImage(res.tempFilePath, (that.canvasW - 180) * 0.5, top_padding + 20, 180, 180)
						ctx.draw()
					},
					fail() {
						uni.showToast({
							icon: 'none',
							title: '小程序码下载失败'
						})
					}
				})
			}
		}
	}
</script>

<style>
</style>
