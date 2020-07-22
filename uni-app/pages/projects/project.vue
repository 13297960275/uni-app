<template>
	<view class="uni-padding-wrap" style="background: #fff;">
		<title-item title="附加项目" tips="">
			<view class="flex-center" slot="tipsRight">
				<button class="mini-btn" type="primary" size="mini" @click="add">新增</button>
				<!-- 				<button class="mini-btn icon-btn" type="primary" size="mini">
					<uni-icons :type="'gear-filled'" :color="'#fff'" size="15" />
				</button> -->
			</view>
		</title-item>
		<view class="uni-common-mt">
			<view v-if="dynamicList.length!==0" class="grid-dynamic-box">
				<!-- @change="change" -->
				<uni-grid :column="3" :show-border="false" :highlight="true">
					<uni-grid-item style="height: auto;" v-for="(item, index) in dynamicList" :index="index" :key="index">
						<text class="time">{{item.time}}</text>
						<view class="grid-item-box">
							<image :src="item.url" class="image" mode="aspectFill" @click="perviewImg(item.urls)" />
							<uni-icons :type="'camera'" :color="'#bbb'" size="25" @click="chooseImage(index)" />
						</view>
						<text class="text">{{item.text}}</text>
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
		timeFilter
	} from '@/common/util.js'
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
				list: []
			}
		},
		methods: {
			change(e) {
				let {
					index
				} = e.detail
				console.log(index, e)
				return;
				this.list[index].badge && this.list[index].badge++

				uni.showToast({
					title: `点击第${index+1}个宫格`,
					icon: 'none'
				})
			},
			perviewImg(urls) {
				console.log('previewImg');
				uni.previewImage({
					urls: urls
				});
			},
			chooseImage(index) {
				console.log('chooseImage');
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['compressed'], //original 原图，compressed 压缩图，默认二者都有
					sourceType: ['album', 'camera '], //album 从相册选图，camera 使用相机，默认二者都有
					success: (chooseImageRes) => {
						for (var i = 0; i < chooseImageRes.tempFilePaths.length; i++) {
							this.dynamicList[index].urls = []
							this.dynamicList[index].urls.push(chooseImageRes.tempFilePaths[i]);
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
						time: timeFilter.formatDate(new Date(), 'yyyy/MM/dd'),
						text: this.dynamicList.length + 1 % 3 === 1 ? '进场' : this.dynamicList.length + 1 % 3 === 2 ? '施工' : "结束",
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
	.image {
		width: 120rpx;
		height: 120rpx;
	}

	.text {
		font-size: 26rpx;
		/* margin-top: 10rpx; */
		text-align: center;
		background-color: #eee;
		padding: 10rpx;
		margin: 10rpx;
	}
	
	.time {
		font-size: 26rpx;
		/* margin-top: 10rpx; */
		text-align: center;
		/* background-color: #eee; */
		/* padding: 10rpx; */
		margin: 10rpx;
	}

	.grid-dynamic-box {
		margin-bottom: 26rpx;
	}

	.grid-item-box {
		flex: 1;
		/* position: relative; */
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		/* flex-direction: column; */
		align-items: center;
		/* justify-content: center; */
		justify-content: space-around;
		/* padding: 26rpx 0; */
	}
</style>
