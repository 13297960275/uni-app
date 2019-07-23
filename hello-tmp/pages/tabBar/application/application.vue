<template>
	<view class="uni-padding-wrap uni-common-pb">
		<view class="uni-header-logo">
			<image src="/static/applicationIndex.png"></image>
		</view>
		<view class="uni-hello-text uni-common-pb">
			以下是uni-app应用示例
		</view>
		<view class="uni-card">
			<view class="uni-list">
                <navigator url="/pages/application/ocrApi/ocrApi" hover-class="other-navigator-hover">
                    <button type="default">OCR测试</button>
                </navigator>
                <navigator url="/pages/application/imgCut/imgCut" hover-class="other-navigator-hover">
                    <button type="default">图片裁剪</button>
                </navigator>
                <navigator url="/pages/template/ucharts/ucharts" hover-class="other-navigator-hover">
                    <button type="default">ucharts图表</button>
                </navigator>
                <navigator url="/pages/API/video/video" hover-class="other-navigator-hover">
                    <button type="default">视频</button>
                </navigator>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			};
		},
		onLoad() {
			// #ifdef APP-PLUS
			plus.nativeUI.showWaiting('加载中……');
			// #endif
		},
		onReady() {
			// #ifdef APP-PLUS
			plus.nativeUI.closeWaiting();
			// #endif
		},
		onShareAppMessage() {
			return {
				title: '欢迎体验uni-app',
				path: '/pages/tabBar/extUI/extUI'
			}
		},
		onNavigationBarButtonTap(e) {
			uni.navigateTo({
				url: '/pages/about/about'
			});
		},
		methods: {
		}
	}
</script>

<style>
	page {
		height: auto;
		min-height: 100%;
	}

	.uni-card {
		box-shadow: none;
	}

	.uni-list:after {
		height: 0;
	}

	.uni-list:before {
		height: 0;
	}

	.uni-hello-text {
		word-break: break-all;
	}
</style>
