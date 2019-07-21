<template>
	<view>
		<view class="an-uploadImg-group">
			<view>
				<view class="an-img" v-for="(item, index) in imgList" :key="index" @click="perviewImg(index)">
					<image :src="item" v-if="item"></image>
					<view class="an-icon-close" @click.stop="handleRemove(index)">
						<uni-icon type="closeempty" size="45" color="#F00"></uni-icon>
					</view>
				</view>
				<view class="an-img-add" v-if="!showAdd" @click="chooseImage">
					<view class="">身份证正面照</view>
					<uni-icon type="plus" size="36" color="#FFFFFF"></uni-icon>
				</view>
			</view>
		</view>

		<view v-if="showAdd">
			<view class="c-list">
				<view class="c-row b-b" v-for="(value, key, index) in words" :key="key">
					<text class="tit">{{key}}</text>
					<view class="con-list">
						<text>{{words[key].words}}</text>
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import uniIcon from '@/components/uni-icon/uni-icon.vue'
	import {
		getAccexxToken,
		getIdCard
	} from '@/utils/bdAI'

	export default {
		components: {
			uniIcon
		},
		data() {
			return {
				imgList: [],
				imgBase64List: [],
				words: {}
			};
		},
		onLoad() {
			// console.log(getAccexxToken());
			console.log('页面加载')
		},
		computed: {
			showAdd() {
				// return false;
				return this.imgList.length > 0
			}
		},
		methods: {
			chooseImage() {
				console.log('chooseImage');
				uni.chooseImage({
					count: 1,
					success: (chooseImageRes) => {
						for (var i = 0; i < chooseImageRes.tempFilePaths.length; i++) {
							this.imgList.push(chooseImageRes.tempFilePaths[i]);
							uni.getFileSystemManager().readFile({
								filePath: chooseImageRes.tempFilePaths[i], //选择图片返回的相对路径
								encoding: 'base64', //编码格式
								success: res => { //成功的回调
									let base64 = 'data:image/jpeg;base64,' + res.data //不加上这串字符，在页面无法显示的哦
									this.imgBase64List.push(base64);
									// console.log(this.imgBase64List);
									getIdCard(res.data).then(resp => {
										this.words = resp.data.words_result
										console.log(this.words['姓名'].words);
									}).catch(function(reason) {
										uni.showToast({
											title: '文字识别失败',
											icon: 'none',
											duration: 1500
										})
									});
								}
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
			perviewImg(index) {
				console.log('previewImg');
				let urls = [];
				if (index != -1) {
					urls[0] = this.imgList[index];
				} else {
					urls = this.imgList;
				}
				uni.previewImage({
					urls: urls
				});
			},
			handleRemove(index) {
				console.log('removeImage');
				let il = [],
					ibl = [];
				for (var i = 0; i < this.imgList.length; i++) {
					if (i != index) {
						il.push(this.imgList[i]);
						ibl.push(this.imgBase64List[i]);
					}
				}
				this.imgList = il;
				this.imgBase64List = ibl;
				// console.log(il, ibl);
			}
		}
	}
</script>

<style>
	.show-inline {
		display: inline-block !important;
	}

	.show {
		display: block !important;
	}

	.hide {
		display: none !important;
	}

	.an-uploadImg-group {
		margin: 5upx 20upx;
	}

	.an-img {
		float: left;
		margin-right: 10upx;
	}

	.an-img-add {
		float: left;
		/* margin-right: 10upx; */
		height: 45vw;
		width: 45vw;
		background-color: #C8C7CC;
		text-align: center;
		line-height: 45vw;
	}

	.an-img>image {
		/* height: 45vw; */
		/* width: 45vw; */
		width: 90vw;
	}

	.an-icon-close {
		position: absolute;
		left: 0;
		top: 0;
		width: 45px;
		/* background-color: #C8C7CC; */
	}

	.c-list {
		/* font-size: $font-sm + 2upx; */
		/* color: $font-color-base; */
		background: #fff;
	}

	.c-row {
		display: flex;
		align-items: center;
		padding: 20upx 30upx;
		position: relative;
	}

	.tit {
		width: 8rem;
	}

	.con {
		flex: 1;
		color: dark;
	}

	.bz-list {
		height: 40upx;
		/* font-size: $font-sm+2upx; */
		color: dark;
	}

	.bz-list text {
		display: inline-block;
		margin-right: 30upx;
	}

	.con-list {
		flex: 1;
		display: flex;
		flex-direction: column;
		color: dark;
		line-height: 40upx;
	}
</style>
