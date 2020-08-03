<template>
	<view class="content">

		<view class="mix-list-cell" @click="eventClick" hover-class="cell-hover" :hover-stay-time="50">
			<!-- <text v-if="icon" class="cell-icon yticon" :style="[{
					color: iconColor,
				}]" :class="icon"></text> -->
			<uni-icons v-if="icon && icon != 'no-border'" class="cell-icon" :type="icon" :color="iconColor" :size="iconSize" />
			<view class="cell-tit" :class="icon ? '' : border">
				<text :title="title">{{title}}</text>
				<text v-if="tips" class="cell-tip" :title="tips">{{tips}}</text>
			</view>
			<!-- <text v-if="tips" class="cell-tip">{{tips}}</text> -->
			<!-- <view> -->
			<slot name="tipsRight"></slot>
			<!-- </view> -->
			<!-- <text class="cell-more yticon" :class="typeList[navigateType]"></text> -->
			<uni-icons class="cell-more" :type="navigateType" />
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
			return {
				typeList: {
					left: 'icon-zuo',
					right: 'icon-you',
					up: 'icon-shang',
					down: 'icon-xia'
				},
			}
		},
		props: {
			icon: {
				type: String,
				default: ''
			},
			iconSize: {
				type: String,
				default: '25'
			},
			title: {
				type: String,
				default: '标题'
			},
			tips: {
				type: String,
				default: ''
			},
			navigateType: {
				type: String,
				default: 'right'
			},
			border: {
				type: String,
				default: 'mix-list-border'
			},
			hoverClass: {
				type: String,
				default: 'cell-hover'
			},
			iconColor: {
				type: String,
				default: '#21caad'
			}
		},
		methods: {
			eventClick() {
				this.$emit('eventClick');
			}
		},
	}
</script>

<style lang='scss' scoped>
	.icon .mix-list-cell.b-b:after {
		left: 90rpx;
	}

	.mix-list-border {
		border-left: 10rpx #21caad solid;
		padding-left: 20rpx;
	}

	.mix-list-cell {
		display: flex;
		align-items: baseline;
		padding: 20rpx $page-row-spacing;
		line-height: 60rpx;
		position: relative;
	}

	.cell-hover {
		background: #fafafa;
	}

	.b-b:after {
		left: 30rpx;
	}

	.cell-icon {
		align-self: center;
		width: 56rpx;
		max-height: 60rpx;
		font-size: 38rpx;
	}

	.cell-more {
		align-self: center;
		font-size: 30rpx;
		color: $font-color-base;
		margin-left: $uni-spacing-row-sm;
	}

	.cell-tit {
		flex: 1;
		font-size: $font-lg;
		color: $font-color-dark;
		margin-right: 10rpx;
		/* line-height: unset; */
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.cell-tip {
		font-size: $font-sm;
		color: $font-color-light;
		margin-left: $font-sm/2;
	}
</style>
