<template>
	<view class="content group-section">
		<!-- <swiper-item class="g-swiper-item" v-for="(item, index) in goodsList" :key="index" v-if="index%2 === 0" @click="navToDetailPage(item)"> -->
		<view class="g-swiper-item" :style="{ borderColor: borderColor }">
			<view class="g-item left" :style="{ borderColor: borderColor }">
				<image :src="image || '/static/imgs/money.png'" mode="aspectFill"></image>
			</view>
			<view class="g-item right">
				<view class="t-box">
					<view class="cell-box">
						<text class="cell">{{title}}</text>
						<slot name="tipsRight"></slot>
					</view>
					<view class="pro-box" :class="showInfo ? '' : 'martb10'">
						<view class="progress-box">
							<progress :percent="percent" :activeColor="activeColor || '#21caad'" :backgroundColor="backgroundColor || '#dadcde'"
							 :duration="duration" :stroke-width="strokeWidth" :font-size="fontSize" :active="active" :show-info="showInfo" />
						</view>
					</view>
					<view class="cell-box">
						<text class="m-cell">总费用：{{total}}万元</text>
						<text class="m-cell">已用：{{used}}万元</text>
					</view>
				</view>
			</view>
		</view>
		<!-- </swiper-item> -->
	</view>
</template>

<script>
	/**
	 *  简单封装了下， 应用范围比较狭窄，可以在此基础上进行扩展使用
	 *  比如加入image， iconSize可控等
	 */
	export default {
		data() {
			return {}
		},
		props: {
			borderColor: {
				type: String,
				default: '#21caad4d'
			},
			image: {
				type: String,
				default: ''
			},
			title: {
				type: String,
				default: '#21caad'
			},
			percent: {
				type: Number,
				default: 0
			},
			activeColor: {
				type: String,
				default: '#21caad'
			},
			backgroundColor: {
				type: String,
				default: '#dadcde'
			},
			duration: {
				type: Number,
				default: 1
			},
			strokeWidth: {
				type: Number,
				default: 6
			},
			fontSize: {
				type: Number,
				default: 16
			},
			active: {
				type: Boolean,
				default: true
			},
			showInfo: {
				type: Boolean,
				default: true
			},
			total: {
				type: Number,
				default: 20
			},
			used: {
				type: Number,
				default: 20
			},
		},
		methods: {
			eventClick() {
				this.$emit('eventClick');
			}
		},
	}
</script>

<style lang='scss'>
	/* 团购楼层 */
	.group-section {
		background: #fff;

		.g-swiper {
			height: 650upx;
			padding-bottom: 30upx;
		}

		.g-swiper-item {
			/* width: 100%; */
			padding: 15upx 30upx;
			display: flex;
			border: 1upx solid #cfcfcf;
		}

		image {
			width: 80upx;
			height: 80upx;
			border-radius: 4px;
		}

		.g-item {
			display: flex;
			flex-direction: column;
			overflow: hidden;
		}

		.left {
			flex: 0.2;
			margin-right: 24upx;
			padding-right: 24upx;
			border-right: 2upx solid #cfcfcf;
			display: flex;
			align-items: center;
			align-content: center;
			justify-content: center;

			.t-box {
				padding-top: 20upx;
			}
		}

		.right {
			flex: 0.8;
			flex-direction: column-reverse;

			.t-box {
				padding-top: 20upx;
			}
		}

		.t-box {
			height: 160upx;
			font-size: $font-base+2upx;
			color: $font-color-dark;
			line-height: 1.6;
		}

		.cell-box {
			display: flex;
			justify-content: space-between;
			align-items: center;
			align-content: center;
		}

		.cell {
			flex: 1;
			font-size: $font-lg;
			color: $font-color-dark;
			font-weight: 600;
			margin-right: 10upx;
			/* line-height: unset; */
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}

		.m-cell {
			font-size: $font-sm+2upx;
			/* text-decoration: line-through; */
			color: $font-color-light;
		}

		.pro-box {
			display: flex;
			align-items: center;
			margin-top: 10upx;
			font-size: $font-sm;
			color: $font-base;
			/* padding-right: 10upx; */
		}
		
		.martb10 {
			margin-top: 20upx;
			margin-bottom: 20upx;
		}

		.progress-box {
			flex: 1;
			border-radius: 10px;
			overflow: hidden;
			/* margin-right: 8upx; */
			/* padding-right: 12upx; */
		}
	}
</style>
