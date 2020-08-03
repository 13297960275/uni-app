<template>
	<view class="uni-padding-wrap" style="background: #fff;">
		<image src="../../static/teamMember/02.png" mode="aspectFill"></image>
		<view class="">
			<title-item title="当前项目" tips="合肥市福广场停车场三号口施工">
				<view class="flex-center" slot="tipsRight">
					<button class="mini-btn" type="primary" size="mini" @click="switchProject">切换项目</button>
					<!-- <button class="mini-btn icon-btn" type="primary" size="mini">
						<uni-icons :type="'gear-filled'" :color="'#fff'" size="15" />
					</button> -->
				</view>
			</title-item>
			<view class="error-box">今日任务</view>

			<view class="uni-card-border" v-for="(el, idx) in priceList" :key="idx">
				<title-item :title="el.name" tips="" icon="no-border">
					<view class="flex-center" slot="tipsRight">
						<text style="color: #21caad">详情</text>
						<uni-icons :type="'arrowright'" :color="'#21caad'" size="15" />
					</view>
				</title-item>
				<list-item :dataList="el.dataList" :borderColor="el.borderColor">
					<view class="flex-center" slot="tipsRight">
						<button class="mini-btn" style="border-color: #80dd87; color: #80dd87; line-height: 2;" plain="true" size="mini"
						 @click="switchProject">
							<uni-icons :type="'gear-filled'" :color="'#80dd87'" size="15" />完成</button>
					</view>
				</list-item>
			</view>

			<view class="primary-box">已领任务</view>
			<view class="uni-card-border" v-for="(el, idx) in priceList" :key="'1-' + idx">
				<title-item :title="el.name" tips="" icon="no-border">
					<view class="flex-center" slot="tipsRight">
						<text style="color: #21caad">详情</text>
						<uni-icons :type="'arrowright'" :color="'#21caad'" size="15" />
					</view>
				</title-item>
				<list-item :dataList="el.dataList" :borderColor="el.borderColor">
					<view class="flex-center" slot="tipsRight">
						<button class="mini-btn" style="border-color: #80dd87; color: #80dd87; line-height: 2;" plain="true" size="mini"
						 @click="switchProject">
							<uni-icons :type="'gear-filled'" :color="'#80dd87'" size="15" />完成</button>
					</view>
				</list-item>
			</view>

		</view>
		<view class="uni-common-mt task-add">
			<view class="uni-panel" v-for="(item, index) in list" :key="item.id">
				<view class="uni-panel-h" :class="item.open ? 'uni-panel-h-on' : ''" @click="triggerCollapse(index)"
				 @touchmove.stop="">
					<view class="">
						<text class="uni-panel-text">{{item.name}}</text>
						<checkbox style="margin-left: 25rpx;" :checked="seletedAll" @tap.stop="_seletedAll">全选</checkbox>
					</view>
					<uni-icons :type="item.open ? 'arrowdown' : 'arrowup'" :color="'#fff'" size="15" />
					<!-- <text class="uni-panel-icon uni-icon" :class="item.open ? 'uni-panel-icon-on' : ''">{{item.pages ? '&#xe581;' : '&#xe470;'}}</text> -->
				</view>
				<view class="uni-panel-c" v-if="item.open">
					<checkbox-group class="checkbox-group" @change="seletedStatus" checked @touchmove.stop="">
						<label class="checkbox-label-box" v-for="(item2,key) in item.items" :key="key">
							<view class="checkbox-name">{{item2.name}}</view>
							<view class="checkbox-label">
								<numSelect style="padding: 0rpx 10rpx;;" model="5" size="30" icoSshrink="0.8" bgColor="#cefef6" color="#21caad"
								 @getValue="getValue"></numSelect>
								<checkbox :value="item2.value" style="margin-left: 10rpx;" :checked="item.checkList.includes(String(item2.value))" />
							</view>
						</label>
						<!-- <checkbox v-for="(item2,key) in item.items" :key="key" :value="item2.value" :checked="item.checkList.includes(String(item2.value))">
							<view class="">{{item2.name}}</view>
						</checkbox> -->
					</checkbox-group>
					<!-- <view class="uni-navigate-item" v-for="(item2,key) in item.pages" :key="key" @click="goDetailPage(item2)">
						<view style="width: 20%;">
							<numSelect model="2" size="20" color="#c1faf0" @getValue="getValue"></numSelect>
						</view>
						<text class="uni-navigate-text">{{item2.name ? item2.name : item2}}</text>
						<text class="uni-navigate-icon uni-icon">&#xe470;</text>
					</view> -->
				</view>
			</view>
		</view>

		<view class="content">
			<view class="top">
				<checkbox-group @change="seletedStatus" checked>
					<checkbox :value="item.value" v-for="(item,index) in items" :key="index" :checked="checkList.includes(String(item.value))">{{item.name}}</checkbox>
				</checkbox-group>
			</view>
			<view class="bottom">
				<checkbox :checked="seletedAll" @tap="_seletedAll">全选</checkbox>
			</view>

			<view class="container">
				<view>
					<label>宽度30%-风格1-默认尺寸-值3-默认颜色</label>
					<view style="width: 30%;">
						<numSelect model="1" :value="3"></numSelect>
					</view>
				</view>

				<view>
					<label>宽度30%-风格1-默认尺寸-默认颜色-禁用</label>
					<view style="width: 30%;">
						<numSelect model="1" disable></numSelect>
					</view>
				</view>

				<view>
					<label>宽度40%-风格2-默认尺寸-颜色#6fb1f9</label>
					<view style="width: 40%;">
						<numSelect model="2" color="#6fb1f9" @getValue="getValue"></numSelect>
					</view>
					<label>选择的值：{{value}}</label>
				</view>

				<view>
					<label>宽度45%-风格3-尺寸45-颜色#16c2c2</label>
					<view style="width: 45%;">
						<numSelect model="3" size="45" color="#16c2c2"></numSelect>
					</view>
				</view>

				<view>
					<label>宽度60%-风格4-尺寸30-颜色#9266f9</label>
					<view style="width: 60%;">
						<numSelect model="4" size="30" color="#9266f9" :step="0.03"></numSelect>
					</view>
				</view>

				<view>
					<label>宽度60%-风格4-尺寸30-颜色#9266f9-禁用</label>
					<view style="width: 60%;">
						<numSelect model="4" size="30" disable color="#9266f9"></numSelect>
					</view>
				</view>

				<view>
					<label>宽度50%-风格5-尺寸45-颜色#aaaa00</label>
					<view style="width: 50%;">
						<numSelect model="5" size="45" color="#aaaa00"></numSelect>
					</view>
				</view>
			</view>
		</view>
		<view class="uni-common-mt">
			<button class="mini-btn" type="primary">新建任务</button>
		</view>

		<!-- 回退弹窗 -->
		<uni-dialog :show="showDailog" type="center" :custom="false" :mask-click="true" @change="change">
			<view class="uni-tip-title">
				项目切换
			</view>
			<uni-list>
				<uni-list-item v-for="(item, index) in projects" :key="item.id" :title="item.name" :showArrow="false">
					<template v-slot:right="">
						<button class="mini-btn" type="primary" plain="true" size="mini" @click="selectProject(item.id)">选定</button>
					</template>
				</uni-list-item>
			</uni-list>
		</uni-dialog>
	</view>
</template>
<script>
	import titleItem from './components/title-item';
	import progressItem from './components/progress-item';
	import personItem from './components/person-item';
	import uniDialog from './components/uni-dialog';
	import listItem from './components/list-item';
	import numSelect from '@/components/poiuy-numSelect/numSelect'
	import {
		mapState
	} from 'vuex';
	let startY = 0,
		moveY = 0,
		pageAtTop = true;
	export default {
		components: {
			titleItem,
			progressItem,
			personItem,
			uniDialog,
			listItem,
			numSelect
		},
		data() {
			return {
				value: null,

				seletedAll: false,
				items: [{
						value: 'USA',
						name: '美国'
					},
					{
						value: 'CHN',
						name: '中国',
						checked: 'true'
					},
					{
						value: 'BRA',
						name: '巴西'
					},
					{
						value: 'JPN',
						name: '日本'
					}
				],
				checkList: [], //选中值

				list: [{
						id: 'view',
						name: '视图容器',
						open: false,
						pages: [
							'view',
							'scroll-view',
							'swiper'
							// #ifndef MP-TOUTIAO
							,
							'movable-view',
							'cover-view'
							// #endif
						],

						seletedAll: false,
						items: [{
								value: 'USA',
								name: '美国'
							},
							{
								value: 'CHN',
								name: '中国',
								checked: 'true'
							},
							{
								value: 'BRA',
								name: '巴西'
							},
							{
								value: 'JPN',
								name: '日本'
							}
						],
						checkList: [], //选中值
					}, {
						id: 'content',
						name: '基础内容',
						open: false,
						pages: ['text', 'rich-text', 'progress']
					}, {
						id: 'form',
						name: '表单组件',
						open: false,
						pages: ['button', 'checkbox', 'form', 'input', 'label', 'picker', 'picker-view', 'radio',
							'slider',
							'switch', 'textarea',
							// #ifdef APP-PLUS || MP-WEIXIN || H5
							'editor',
							// #endif
						]
					}, {
						id: 'nav',
						name: '导航',
						open: false,
						pages: ['navigator']
					}, {
						id: 'media',
						name: '媒体组件',
						open: false,
						pages: [
							'image',
							'video',
							// #ifndef MP-ALIPAY || MP-TOUTIAO
							'audio',
							// #endif
						],
					},
					// #ifndef MP-TOUTIAO
					{
						id: 'map',
						name: '地图',
						open: false,
						pages: ['map']

					},
					// #endif
					// #ifndef QUICKAPP-WEBVIEW-UNION
					{
						id: 'canvas',
						name: '画布',
						open: false,
						pages: ['canvas']
					},
					// #endif
					// #ifdef APP-PLUS || H5
					{
						id: 'web-view',
						name: '网页',
						open: false,
						pages: [{
							name: '网络网页',
							url: '/pages/component/web-view/web-view'
						}, {
							name: '本地网页',
							url: '/pages/component/web-view-local/web-view-local'
						}]
					},
					// #endif
					// #ifndef APP-PLUS || H5
					{
						id: 'web-view',
						name: '网页',
						open: false,
						pages: ['web-view']
					},
					// #endif
					// #ifndef H5 || MP-BAIDU || QUICKAPP-WEBVIEW
					{
						url: 'ad',
						name: 'AD组件',
						open: false
					},
					// #endif
				],
				navigateFlag: false,

				priceList: [{
						borderColor: '',
						name: '任务名称',
						dataList: [{
								type: 'cell',
								direction: '',
								noImage: true,
								image: '',
								value: '放线',
								fontColor: '',
							},
							{
								type: 'm-cell',
								direction: '',
								noImage: true,
								image: '',
								value: 'A!，A2，A3，B1，B2，B3',
								fontColor: '',
							}
						]
					},
					{
						borderColor: '',
						name: '任务名称',
						dataList: [{
								type: 'cell',
								direction: '',
								noImage: true,
								image: '',
								value: '放线',
								fontColor: '',
							},
							{
								type: 'm-cell',
								direction: '',
								noImage: true,
								image: '',
								value: 'A!，A2，A3，B1，B2，B3',
								fontColor: '',
							}
						]
					},
					{
						borderColor: '',
						name: '任务名称',
						dataList: [{
								type: 'cell',
								direction: '',
								noImage: true,
								image: '',
								value: '放线',
								fontColor: '',
							},
							{
								type: 'm-cell',
								direction: '',
								noImage: true,
								image: '',
								value: 'A!，A2，A3，B1，B2，B3',
								fontColor: '',
							}
						]
					},
					{
						borderColor: '',
						name: '任务名称',
						dataList: [{
								type: 'cell',
								direction: '',
								noImage: true,
								image: '',
								value: '放线',
								fontColor: '',
							},
							{
								type: 'm-cell',
								direction: '',
								noImage: true,
								image: '',
								value: 'A!，A2，A3，B1，B2，B3',
								fontColor: '',
							}
						]
					},

				],

				coverTransform: 'translateY(0px)',
				coverTransition: '0s',
				moving: false,
				showDailog: false, // 是否显示弹窗
				projects: [{
					id: 1,
					name: '项目名称一项目名称一'
				}, {
					id: 2,
					name: '项目名称二'
				}],
				projectList: [{
						borderColor: '#47c4dfb3',
						image: '/static/imgs/piece.png',
						title: '计件详情',
						percent: '25',
						activeColor: '#47c4df',
						total: '100',
						used: '25',
					},
					{
						borderColor: '#f9b55db3',
						image: '/static/imgs/time.png',
						title: '工时详情',
						percent: '25',
						activeColor: '#f9b55d',
						total: '100',
						used: '25',
					},
					{
						borderColor: '#80dd87b3',
						image: '/static/imgs/money.png',
						title: '预借费用详情',
						percent: '25',
						activeColor: '#80dd87',
						total: '100',
						used: '25',
					},
					{
						borderColor: '#ff7272b3',
						image: '/static/imgs/time1.png',
						title: '时间详情',
						percent: '25',
						activeColor: '#ff7272',
						total: '100',
						used: '25',
					},
				],
				groupList: [{
						image: '/static/imgs/tx.png',
						name: '张一',
						job: 'A区1/2/3车位',
						jobName: '立柱',
						fontColor: '#80dd87',
						status: '已完结',
					},
					{
						image: '/static/imgs/tx.png',
						name: '张二',
						job: 'A区1/2/3车位',
						jobName: '打桩',
						fontColor: '#47c4df',
						status: '进展中',
					},
					{
						image: '/static/imgs/tx.png',
						name: '张三',
						job: 'A区1/2/3车位\nB区1/2/3车位',
						jobName: '刷漆',
						fontColor: '#ff7272',
						status: '未开始',
					}
				]
			}
		},
		onLoad() {},
		// #ifndef MP
		onNavigationBarButtonTap(e) {
			const index = e.index;
			if (index === 0) {
				this.navTo('/pages/set/set');
			} else if (index === 1) {
				// #ifdef APP-PLUS
				const pages = getCurrentPages();
				const page = pages[pages.length - 1];
				const currentWebview = page.$getAppWebview();
				currentWebview.hideTitleNViewButtonRedDot({
					index
				});
				// #endif
				uni.navigateTo({
					url: '/pages/notice/notice'
				})
			}
		},
		// #endif
		computed: {
			...mapState(['hasLogin', 'userInfo'])
		},
		methods: {
			getValue(e) {
				this.value = e;
			},
			seletedStatus(e) {
				this.checkList = e.detail.value
				console.log(this.checkList)
				if (this.checkList.length === this.items.length) {
					this.seletedAll = true
				}
			},
			_seletedAll() {
				if (!this.seletedAll) {
					this.seletedAll = true
					this.items.map(item => {
						this.checkList.push(item.value)
					})
					console.log(this.checkList)
					console.log('true')
				} else {
					this.seletedAll = false
					this.checkList = []
					console.log('false')
				}
			},
			triggerCollapse(e) {
				if (!this.list[e].pages) {
					// this.goDetailPage(this.list[e].url);
					return;
				}
				for (var i = 0; i < this.list.length; ++i) {
					if (e === i) {
						this.list[i].open = !this.list[e].open;
					} else {
						this.list[i].open = false;
					}
				}
			},
			/** 回退方法 */
			switchProject() {
				this.showDailog = true
			},
			/** 回退弹窗取消方法 */
			selectProject(id) {
				console.log(id)
				this.showDailog = false
			},
			/** 监听弹窗状态是否打开 */
			change(e) {
				console.log(e.show)
			},

			/**
			 * 统一跳转接口,拦截未登录路由
			 * navigator标签现在默认没有转场动画，所以用view
			 */
			navTo(url) {
				if (!this.hasLogin) {
					url = '/pages/public/login';
				}
				uni.navigateTo({
					url
				})
			},

		}
	}
</script>
<style lang='scss' scoped>
	.uni-panel {
		margin-bottom: 12rpx;
	}

	.uni-panel-h {
		background-color: #21caad;
		color: #fff;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		align-content: center;
		padding: 0px 12rpx;
	}

	.uni-panel-h-on {
		background-color: #21caad;
	}

	.uni-panel-text {
		flex: 1;
		color: #fff;
		font-size: 14px;
		font-weight: normal;
	}

	.uni-panel-icon {
		/* margin-left: 15px; */
		color: #fff;
		font-size: 14px;
		font-weight: normal;
		transform: rotate(0deg);
		transition-duration: 0s;
		transition-property: transform;
	}

	.uni-panel-icon-on {
		transform: rotate(180deg);
	}

	.checkbox-group {
		display: flex;
		width: 100%;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	.checkbox-label-box {
		display: flex;
		/* justify-content: space-between; */
		align-content: center;
		align-items: center;
		/* width: 45%; */
		font-size: 12px;
		border: 1rpx solid #21CAAD;
		margin: 8rpx;
		/* flex: 1; */
		width: calc(50% - 3rpx - 16rpx);
	}

	.checkbox-name {
		color: #21CAAD;
		background-color: #e8fdf9;
		border-right: 1rpx solid #21CAAD;
		padding: 0rpx 10rpx;
		width: 30%;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.checkbox-label {
		display: flex;
		/* justify-content: space-between; */
		align-content: center;
		align-items: center;
		/* width: 45%; */
		font-size: 12px;
		/* border: 1rpx solid #21CAAD; */
		margin: 8rpx;
		/* flex: 1; */
		width: 70%;
	}

	.error-box {
		padding: 10rpx 20rpx;
		margin: 10rpx 0rpx;
		color: #ff7272;
		background-color: #fff1f0;
	}

	.primary-box {
		padding: 10rpx 20rpx;
		margin: 10rpx 0rpx;
		color: #47c4df;
		background-color: #e6f7ff;
	}



	.bot {
		width: $font-base/2;
		height: $font-base/2;
		background-color: #fff;
		border-radius: 50%;
		display: inline-block;
		line-height: 1;
		margin-right: $font-base/2;
	}

	.m-cell {
		font-size: $font-sm+2rpx;
		/* text-decoration: line-through; */
		color: $font-color-light;
	}

	%flex-center {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	%section {
		display: flex;
		justify-content: space-around;
		align-content: center;
		background: #fff;
		border-radius: 10rpx;
	}

	.user-section {
		height: 520rpx;
		padding: 100rpx 30rpx 0;
		position: relative;

		.bg {
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			filter: blur(1px);
			opacity: .7;
		}
	}

	.user-info-box {
		height: 180rpx;
		display: flex;
		align-items: center;
		position: relative;
		z-index: 1;

		.portrait {
			width: 130rpx;
			height: 130rpx;
			border: 5rpx solid #fff;
			border-radius: 50%;
		}

		.username {
			font-size: $font-lg + 6rpx;
			color: $font-color-dark;
			margin-left: 20rpx;
		}
	}

	.vip-card-box {
		display: flex;
		flex-direction: column;
		color: #f7d680;
		height: 240rpx;
		background: linear-gradient(left, rgba(0, 0, 0, .7), rgba(0, 0, 0, .8));
		border-radius: 16rpx 16rpx 0 0;
		overflow: hidden;
		position: relative;
		padding: 20rpx 24rpx;

		.card-bg {
			position: absolute;
			top: 20rpx;
			right: 0;
			width: 380rpx;
			height: 260rpx;
		}

		.b-btn {
			position: absolute;
			right: 20rpx;
			top: 16rpx;
			width: 132rpx;
			height: 40rpx;
			text-align: center;
			line-height: 40rpx;
			font-size: 22rpx;
			color: #36343c;
			border-radius: 20px;
			background: linear-gradient(left, #f9e6af, #ffd465);
			z-index: 1;
		}

		.tit {
			font-size: $font-base+2rpx;
			color: #f7d680;
			margin-bottom: 28rpx;

			.yticon {
				color: #f6e5a3;
				margin-right: 16rpx;
			}
		}

		.e-b {
			font-size: $font-sm;
			color: #d8cba9;
			margin-top: 10rpx;
		}
	}

	.cover-container {
		background: $page-color-base;
		/* margin-top: -150rpx; */
		/* padding: 0 30rpx; */
		position: relative;
		background: #f5f5f5;
		padding-bottom: 20rpx;

		.arc {
			position: absolute;
			left: 0;
			top: -34rpx;
			width: 100%;
			height: 36rpx;
		}
	}

	.tj-sction {
		@extend %section;

		.tj-item {
			@extend %flex-center;
			flex-direction: column;
			height: 140rpx;
			font-size: $font-sm;
			color: #75787d;
		}

		.num {
			font-size: $font-lg;
			color: $font-color-dark;
			margin-bottom: 8rpx;
		}
	}

	.order-section {
		@extend %section;
		padding: 28rpx 0;
		margin-top: 20rpx;

		.order-item {
			@extend %flex-center;
			width: 120rpx;
			height: 120rpx;
			border-radius: 10rpx;
			font-size: $font-sm;
			color: $font-color-dark;
		}

		.yticon {
			font-size: 48rpx;
			margin-bottom: 18rpx;
			color: #fa436a;
		}

		.icon-shouhoutuikuan {
			font-size: 44rpx;
		}
	}

	.history-section {
		padding: 30rpx 0 0;
		margin-top: 20rpx;
		background: #fff;
		border-radius: 10rpx;

		.sec-header {
			display: flex;
			align-items: center;
			font-size: $font-base;
			color: $font-color-dark;
			line-height: 40rpx;
			margin-left: 30rpx;

			.yticon {
				font-size: 44rpx;
				color: #5eba8f;
				margin-right: 16rpx;
				line-height: 40rpx;
			}
		}

		.h-list {
			white-space: nowrap;
			padding: 30rpx 30rpx 0;

			image {
				display: inline-block;
				width: 160rpx;
				height: 160rpx;
				margin-right: 20rpx;
				border-radius: 10rpx;
			}
		}
	}

	.uni-tip {
		padding: 15px;
		border-radius: 10px;
		box-sizing: border-box;
		background: #fff;
	}

	.uni-tip-title {
		font-size: $font-em;
		text-align: center;
		font-weight: bold;
		color: #333;
	}

	.uni-tip-content {
		padding: 15px;
		color: #666666;
		border-radius: 10px;
		border: 2px solid #ccc;
	}

	.uni-tip-content-textarea {
		height: 300rpx;
		width: 100%;
		text-align: left;
	}

	.uni-tip-group-button {
		margin-top: 10px;
		display: flex;
	}

	.uni-tip-group-button>button {
		font-size: 24rpx;
		height: 40rpx;
		line-height: 40rpx;
	}
</style>
