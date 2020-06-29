<template>
	<view class="content">

		<view class="mix-list-cell" @click="eventClick" hover-class="cell-hover" :hover-stay-time="50">
			<!-- <text v-if="icon" class="cell-icon yticon" :style="[{
					color: iconColor,
				}]" :class="icon"></text> -->
			<uni-icons v-if="icon" class="cell-icon" :type="icon" :color="iconColor" size="25" />
			<view class="cell-tit" :class="icon ? '' : border">
				<text>{{title}}</text>
				<text v-if="tips" class="cell-tip">{{tips}}</text>
			</view>
			<!-- <text v-if="tips" class="cell-tip">{{tips}}</text> -->
			<view>
				 <slot name="tipsRight"></slot>
			</view>
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

<style lang='scss'>
	.icon .mix-list-cell.b-b:after {
		left: 90upx;
	}

	.mix-list-border {
		border-left: 10upx #21caad solid;
		padding-left: 20upx;
	}

	.mix-list-cell {
		display: flex;
		align-items: baseline;
		padding: 20upx $page-row-spacing;
		line-height: 60upx;
		position: relative;
	}

	.cell-hover {
		background: #fafafa;
	}

	.b-b:after {
		left: 30upx;
	}

	.cell-icon {
		align-self: center;
		width: 56upx;
		max-height: 60upx;
		font-size: 38upx;
	}

	.cell-more {
		align-self: center;
		font-size: 30upx;
		color: $font-color-base;
		margin-left: $uni-spacing-row-sm;
	}

	.cell-tit {
		flex: 1;
		font-size: $font-base;
		color: $font-color-dark;
		margin-right: 10upx;
		line-height: unset;
	}

	.cell-tip {
		font-size: $font-sm;
		color: $font-color-light;
		margin-left: $font-sm/2;
	}
</style>
