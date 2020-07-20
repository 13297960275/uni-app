<template>
	<view class="uni-padding-wrap" style="background: #fff;">
		<title-item title="附加项目:" tips="">
			<view class="flex-center" slot="tipsRight">
				<button class="mini-btn" type="primary" size="mini" @click="add">新增</button>
				<!-- 				<button class="mini-btn icon-btn" type="primary" size="mini">
					<uni-icons :type="'gear-filled'" :color="'#fff'" size="15" />
				</button> -->
			</view>
		</title-item>
		<view class="example-body">
			<view v-if="dynamicList.length!==0" class="grid-dynamic-box">
				<uni-grid :column="3" :highlight="true" @change="change">
					<uni-grid-item v-for="(item, index) in dynamicList" :index="index" :key="index">
						<view class="grid-item-box">
							<image :src="item.url" class="image" mode="aspectFill" />
							<uni-icons :type="'camera'" :color="'#bbb'" size="25" @click="chooseImage(index)" />
						</view>
					</uni-grid-item>
				</uni-grid>
			</view>
			<!-- <button type="primary" @click="add">点击添加一个宫格</button> -->
			<!-- <button v-if="dynamicList.length !== 0" type="primary" style="margin-top: 15px;" @click="del">点击删除一个宫格</button> -->
		</view>
	</view>
</template>

<script>
	import titleItem from './components/title-item';
	import {
		pathToBase64,
		base64ToPath,
		getImgSize
	} from '@/common/imgTools'
	export default {
		components: {
			titleItem
		},
		data() {
			return {
				dynamicList: [],
				list: [{
						url: '/static/c1.png',
						text: 'Grid 1',
						badge: '0',
						type: "primary"
					},
					{
						url: '/static/c2.png',
						text: 'Grid 2',
						badge: '1',
						type: "success"
					},
					{
						url: '/static/c3.png',
						text: 'Grid 3',
						badge: '99',
						type: "warning"
					},
					{
						url: '/static/c4.png',
						text: 'Grid 4',
						badge: '2',
						type: "error"
					},
					{
						url: '/static/c5.png',
						text: 'Grid 5'
					},
					{
						url: '/static/c6.png',
						text: 'Grid 6'
					},
					{
						url: '/static/c7.png',
						text: 'Grid 7'
					},
					{
						url: '/static/c8.png',
						text: 'Grid 8'
					},
					{
						url: '/static/c9.png',
						text: 'Grid 9'
					}
				]
			}
		},
		methods: {
			change(e) {
				let {
					index
				} = e.detail
				this.list[index].badge && this.list[index].badge++

				uni.showToast({
					title: `点击第${index+1}个宫格`,
					icon: 'none'
				})
			},
			chooseImage(index) {
				console.log('chooseImage');
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['compressed'], //original 原图，compressed 压缩图，默认二者都有
					sourceType: ['album', 'camera '], //album 从相册选图，camera 使用相机，默认二者都有
					success: (chooseImageRes) => {
						for (var i = 0; i < chooseImageRes.tempFilePaths.length; i++) {
							pathToBase64(chooseImageRes.tempFilePaths[i]).then(res => {
								// console.log(res);
								let size = getImgSize(res)
								console.log(size);
								if (size > 2500) {
									uni.showToast({
										title: '图片超过2.5M，请进行裁剪',
										icon: 'none',
										duration: 1500
									});
								} else {
									this.dynamicList[index].url = res
								}
							}).catch(err => {
								console.log(err);
								uni.showToast({
									title: '图片解析失败',
									icon: 'none',
									duration: 1500
								});
							})
						}
					},
					fail: (err) => {
						uni.showToast({
							title: '未选择图片',
							icon: 'none',
							duration: 1500
						});
						// console.log(err);
					}
				})
			},
			add() {
				if (this.dynamicList.length < 9) {
					this.dynamicList.push({
						url: `/static/c${this.dynamicList.length+1}.png`,
						text: `Grid ${this.dynamicList.length+1}`,
						color: this.dynamicList.length % 2 === 0 ? '#f5f5f5' : "#fff"
					})
				} else {
					uni.showToast({
						title: '最多添加9个',
						icon: 'none'
					});
				}
			},
			del() {
				this.dynamicList.splice(this.dynamicList.length - 1, 1)
			}
		}
	}
</script>

<style>
	/* 头条小程序组件内不能引入字体 */
	/* #ifdef MP-TOUTIAO */
	@font-face {
		font-family: uniicons;
		font-weight: normal;
		font-style: normal;
		src: url('~@/static/uni.ttf') format('truetype');
	}

	/* #endif */

	/* #ifndef APP-NVUE */
	page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background-color: #efeff4;
		min-height: 100%;
		height: auto;
	}

	view {
		font-size: 14px;
		line-height: inherit;
	}

	.example {
		padding: 0 15px 15px;
	}

	.example-info {
		padding: 15px;
		color: #3b4144;
		background: #ffffff;
	}

	.example-body {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		padding: 0;
		font-size: 14px;
		background-color: #ffffff;
	}

	/* #endif */
	.example {
		padding: 0 15px;
	}

	.example-info {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		padding: 15px;
		color: #3b4144;
		background-color: #ffffff;
		font-size: 14px;
		line-height: 20px;
	}

	.example-info-text {
		font-size: 14px;
		line-height: 20px;
		color: #3b4144;
	}


	.example-body {
		flex-direction: column;
		padding: 15px;
		background-color: #ffffff;
	}

	.word-btn-white {
		font-size: 18px;
		color: #FFFFFF;
	}

	.word-btn {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: center;
		border-radius: 6px;
		height: 48px;
		margin: 15px;
		background-color: #21caad;
	}

	.word-btn--hover {
		background-color: #4ca2ff;
	}


	.image {
		width: 120rpx;
		height: 120rpx;
	}

	.text {
		font-size: 26rpx;
		margin-top: 10rpx;
	}

	.example-body {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
	}

	.grid-dynamic-box {
		margin-bottom: 15px;
	}

	.grid-item-box {
		flex: 1;
		/* position: relative;
 */
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		/* flex-direction: column; */
		align-items: center;
		/* justify-content: center; */
		justify-content: space-around;
		padding: 15px 0;
	}

	.grid-dot {
		position: absolute;
		top: 5px;
		right: 15px;
	}

	.swiper {
		height: 420px;
	}
</style>
