<template>
	<view style="position: fixed; width: 100%; height: 100%;">
		
		<image :src="urls[0]" @click="clk(0)" class="myimg"></image> 
		<image :src="urls[1]" @click="clk(1)" class="myimg2"></image> 

		<avatar @upload="doUpload" @avtinit="doBefore" quality="0.8" ref="avatar"></avatar>
	</view>
</template>

<script>
	import avatar from "@/components/yq-avatar/yq-avatar";
	export default {
		data() {
			return {
				urls: ["./../../../static/uni.png","./../../../static/uni.png"],
			}
		},
		onReady() {
			let _this = this
			uni.getImageInfo({
				src: 'https://avatars2.githubusercontent.com/u/15681693?s=460&v=4',
				success: function (data) {
					console.log(data);
					_this.$refs.avatar.fChooseImg(0,{
						selWidth: '350rpx', selHeight: '350rpx', 
						expWidth: '260rpx', expHeight: '260rpx',
						inner: 'true'
					}, data.path);
				}
			});
		},
		methods: {
			doBefore() {
				console.log('doBefore');
			},
			clk(index) {
				this.$refs.avatar.fChooseImg(index,{
					selWidth: '350rpx', selHeight: '350rpx', 
					expWidth: '260rpx', expHeight: '260rpx',
					inner: index ? 'true' : 'false'
				});
			},
			doUpload(rsp) {
				console.log(rsp);
				this.$set(this.urls, rsp.index, rsp.path);
				return;
				uni.uploadFile({
					url: '', //仅为示例，非真实的接口地址
					filePath: rsp.path,
					name: 'avatar',
					formData: {
						'avatar': rsp.path
					},
					success: (uploadFileRes) => {
						console.log(uploadFileRes.data);
					},
					complete(res) {
						console.log(res)
					}
				});
			}
		},
		components: {
			avatar
		}
	}
</script>

<style>
	.myimg {
		width: 200rpx;
		height: 200rpx;
		border-radius: 0 !important;
		margin: 40px;
	}
	.myimg2 {
		width: 200rpx;
		height: 200rpx;
		border-radius: 100%;
		margin: 40px;
	}
</style>
