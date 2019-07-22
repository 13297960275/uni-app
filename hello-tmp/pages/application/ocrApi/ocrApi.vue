<template>
	<view>
		<view class="an-uploadImg-group">
			<view>
				<view class="an-img" v-for="(item, index) in imgList" :key="index" @click="perviewImg(index)">
					<image :src="item" v-if="item" mode="widthFix"></image>
					<!-- <view class="image-view" v-if="item">
						<image class="uni-product-image" mode="widthFix" :src="item"></image>
					</view> -->
					<view class="an-icon-close" @click.stop="handleRemove(index)">
						<uni-icon type="closeempty" size="45" color="#F00"></uni-icon>
					</view>
				</view>
				<view class="an-img-add" v-if="!showAdd" @click="chooseImage">
					<!-- <view class="">身份证正面照</view> -->
					<uni-icon type="plus" size="36" color="#FFFFFF"></uni-icon>
				</view>
				<view>
					<!-- <view class="uni-title uni-common-mt uni-common-pl">识别类型</view> -->
					<view class="uni-list">
						<radio-group @change="radioChange">
							<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in types" :key="item.value">
								<view>
									<radio :value="item.value" :checked="index === current" />
								</view>
								<view>{{item.name}}</view>
							</label>
						</radio-group>
					</view>
				</view>
			</view>
		</view>

		<view v-if="showAdd && words">
			<view class="page">
				<view class="uni-list">
					<block v-for="(value, key, index) in words" :key="key">
						<!-- <view class="uni-list-cell" hover-class="uni-list-cell-hover"> -->
							<view v-if="current === 1">
								<view class="uni-triplex-row" v-if="current === 1 && key === 'number'">
									<view class="uni-triplex-left">
										<text class="uni-title uni-ellipsis">车牌号</text>
									</view>
									<view class="uni-triplex-right">
										<text class="uni-h5">{{words[key]}}</text>
									</view>
								</view>
								<view class="uni-triplex-row" v-else-if="current === 1 && key === 'color'">
									<view class="uni-triplex-left">
										<text class="uni-title uni-ellipsis">颜色</text>
									</view>
									<view class="uni-triplex-right">
										<text class="uni-h5">{{words[key]}}</text>
									</view>
								</view>
							</view>
							<view class="uni-triplex-row" v-else>
								<view class="uni-triplex-left">
									<text class="uni-title uni-ellipsis">{{key}}</text>
									<!-- <text class="uni-text">列表副标题</text> -->
									<!-- <text class="uni-text-small uni-ellipsis">列表内容文字,列表内容文字,列表内容文字,列表内容文字,列表内容文字,列表内容文字</text> -->
								</view>
								<view class="uni-triplex-right">
									<text class="uni-h5">{{words[key].words}}</text>
								</view>
							</view>
						<!-- </view> -->
					</block>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniIcon from '@/components/uni-icon/uni-icon.vue'
	import {
		getAccexxToken,
		getIdCard,
		getOcrInfo
	} from '@/services/bdAI'

	export default {
		components: {
			uniIcon
		},
		data() {
			return {
				types: [
					{
						value: 'idcard',
						name: '身份证识别',
						checked: 'true'
					},
					{
						value: 'license_plate',
						name: '车牌识别'
					},
					{
						value: 'handwriting',
						name: '手写字识别'
					},
					{
						value: 'accurate_basic',
						name: '通用文字识别'
					},
					// {
					// 	value: 'FRA',
					// 	name: '法国'
					// },
				],
				current: 0,
				imgList: [],
				// imgBase64List: [],
				words: {},
			};
		},
		onLoad() {
			// console.log(getAccexxToken());
			console.log('页面加载')
		},
		computed: {
			showAdd() {
				// return false;
				// this.words = {};
				return this.imgList.length > 0
			},
			// showInfo() {
				// return this.imgList.length > 0 && this.words
			// }
		},
		methods: {
			radioChange: function(evt) {
				this.imgList = []
				for (let i = 0; i < this.types.length; i++) {
					if (this.types[i].value === evt.target.value) {
						this.current = i;
						console.log(this.current);
						break;
					}
				}
			},
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
									// this.imgBase64List.push(base64);
									// console.log(this.imgBase64List);
									this.words = {}
									let dataSet = {
										image: res.data,
									}
									console.log(this.types[this.current].value);
									switch (this.types[this.current].value){
										case 'idcard':
											dataSet.id_card_side = 'front'
											break;
										default:
											break;
									}
									getOcrInfo(dataSet, this.types[this.current].value).then(resp => {
										this.words = resp.data.words_result
										// console.log(this.words['姓名'].words);
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
				let il = [];
					// let ibl = [];
				for (var i = 0; i < this.imgList.length; i++) {
					if (i != index) {
						il.push(this.imgList[i]);
						// ibl.push(this.imgBase64List[i]);
					}
				}
				this.imgList = il;
				// this.imgBase64List = ibl;
				// console.log(il, ibl);
			}
		}
	}
</script>

<style>
	.uni-triplex-left {
		width: 30%;
	}
	.uni-triplex-right {
		width: 70%;
	}
	
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
		/* margin-right: 10upx; */
	}

	.an-img-add {
		float: left;
		/* margin-right: 10upx; */
		height: 45vw;
		width: calc(100vw - 40upx);
		background-color: #C8C7CC;
		text-align: center;
		line-height: 45vw;
	}

	.an-img>image {
		/* height: 45vw; */
		/* width: 45vw; */
		width: calc(100vw - 40upx);
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
