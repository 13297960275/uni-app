<template>
	<view class="cell-item" :style="{ border: !borderColor ? 'none' : '', borderColor: borderColor ? borderColor : 'transparent'}">
		<view class="cell-img" :style="{flexDirection: direction}">
			<image v-if="noImage" :src="image || '/static/imgs/tx.png'"></image>
			<text>{{name}}</text>
		</view>
		<view>
			<text class="m-cell" v-if="job">{{job}}</text>
		</view>
		<view>
			<text class="m-cell" v-if="cost">{{cost}}</text>
		</view>
		<view>
			<text class="cell" v-if="jobName">{{jobName}}</text>
		</view>
		<view>
			<text class="m-cell" v-if="workStatus">{{workStatus}}</text>
		</view>
		<view>
			<text class="cell" :style="{ color: fontColor }" v-if="status">{{status}}</text>
		</view>

		<slot name="tipsRight"></slot>
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
				default: '#21caad'
			},
			direction: {
				type: String,
				default: 'column'
			},
			noImage: {
				type: Boolean,
				default: true
			},
			image: {
				type: String,
				default: ''
			},
			name: {
				type: String,
				default: ''
			},
			job: {
				type: String,
				default: ''
			},
			cost: {
				type: String,
				default: ''
			},
			jobName: {
				type: String,
				default: ''
			},
			workStatus: {
				type: String,
				default: ''
			},
			fontColor: {
				type: String,
				default: '#21caad'
			},
			status: {
				type: String,
				default: ''
			},
		},
		methods: {
			eventClick() {
				this.$emit('eventClick');
			}
		},
	}
</script>

<style lang='scss' scoped>
	.cell-item {
		/* margin: 18rpx 0rpx; */
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: nowrap;
		padding: 10rpx 10rpx 10rpx 15rpx;
		background: #fff;
		border-left: 10rpx solid #21caad;
	}

	.cell-img {
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: $font-sm + 2rpx;
		color: $font-color-dark;
	}

	/* 原图标颜色太深,不想改图了,所以加了透明度 */
	image {
		width: 68rpx;
		height: 68rpx;
		/* margin-bottom: 14rpx; */
		border-radius: 50%;
		/* opacity: .7; */
		/* box-shadow: 4rpx 4rpx 20rpx rgba(250, 67, 106, 0.3); */
	}

	.cell {
		flex: 1;
		font-size: $font-lg;
		color: $font-color-dark;
		/* font-weight: 600; */
		margin-right: 10rpx;
		/* line-height: unset; */
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.m-cell {
		font-size: $font-sm+2rpx;
		/* text-decoration: line-through; */
		color: $font-color-light;
	}
</style>
