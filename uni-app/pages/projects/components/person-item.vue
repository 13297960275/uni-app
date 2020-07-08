<template>
	<view class="cell-item">
		<view class="cell-img">
			<image :src="image || '/static/imgs/tx.png'"></image>
			<text>{{name || '环球美食'}}</text>
		</view>
		<view>
			<text class="m-cell">{{job || 'A区1/2/3车位'}}</text>
		</view>
		<view>
			<text class="cell">{{jobName || '立柱'}}</text>
		</view>
		<view>
			<text class="cell" :style="{ color: fontColor }">{{status || '未开始'}}</text>
		</view>
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
			jobName: {
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
		display: flex;
		justify-content: space-around;
		align-items: center;
		flex-wrap: nowrap;
		padding: 15upx 11upx;
		background: #fff;
		border-left: 10upx #21caad solid;
	}

	.cell-img {
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: $font-sm + 2upx;
		color: $font-color-dark;
	}

	/* 原图标颜色太深,不想改图了,所以加了透明度 */
	image {
		width: 88upx;
		height: 88upx;
		/* margin-bottom: 14upx; */
		border-radius: 50%;
		/* opacity: .7; */
		/* box-shadow: 4upx 4upx 20upx rgba(250, 67, 106, 0.3); */
	}

	.cell {
		flex: 1;
		font-size: $font-lg;
		color: $font-color-dark;
		/* font-weight: 600; */
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
</style>
