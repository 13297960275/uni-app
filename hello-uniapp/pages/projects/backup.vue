<template>
  <view class="projects">
    <title-item title="当前项目" tips="合肥市福广场停车场三号口施工">
      <view class="flex-center" slot="tipsRight">
        <button
          class="mini-btn"
          type="primary"
          size="mini"
          @click="switchProject"
        >
          切换项目
        </button>
        <button class="mini-btn icon-btn" type="primary" size="mini">
          <uni-icons :type="'gear-filled'" :color="'#fff'" size="15" />
        </button>
      </view>
    </title-item>
    <view class="uni-common-mt">
      <progress-item title="当前项目" tips="合肥市福广场停车场三号口施工">
        <view class="flex-center" slot="tipsRight"
          ><button
            class="mini-btn"
            type="primary"
            plain="true"
            size="mini"
            @click="switchProject"
          >
            切换项目
          </button>
          <uni-icons :type="'gear-filled'" :color="'#21caad'" size="25" />
        </view>
      </progress-item>
      <person-item
        :image="'/static/imgs/tx.png'"
        :name="'吴刚'"
        :job="'A区1/2/3车位'"
        :jobName="'立柱'"
        :status="'未开始'"
      ></person-item>
      <!-- 浏览历史 -->
      <!-- <view class="history-section icon">
				<title-item navigateType="arrowright" iconColor="#e07472" title="我的钱包" tips="您的会员还有3天过期"><text slot="tipsRight">过期</text></title-item>
				<title-item icon="camera-filled" iconColor="#5fcda2" title="地址管理" @eventClick="navTo('/pages/address/address')">
					<button slot="tipsRight" class="mini-btn" type="primary" size="mini">按钮</button></title-item>
				<title-item icon="camera-filled" iconColor="#9789f7" title="分享" tips="邀请好友赢10万大礼"></title-item>
				<title-item icon="camera-filled" iconColor="#ee883b" title="晒单" tips="晒单抢红包"></title-item>
				<title-item icon="camera-filled" iconColor="#54b4ef" title="我的收藏"></title-item>
				<title-item icon="camera-filled" iconColor="#e07472" title="设置" @eventClick="navTo('/pages/set/set')"></title-item>
			</view> -->
    </view>

    <!-- 回退弹窗 -->
    <uni-dialog
      :show="showDailog"
      type="center"
      :custom="false"
      :mask-click="true"
      @change="change"
    >
      <view class="uni-tip-title"> 项目切换 </view>
      <uni-list>
        <uni-list-item
          v-for="(item, index) in [
            { id: 1, name: '项目名称一项目名称一' },
            { id: 2, name: '项目名称二' },
          ]"
          :key="item.id"
          :title="item.name"
          :showArrow="false"
        >
          <template v-slot:right="">
            <button
              class="mini-btn"
              type="primary"
              plain="true"
              size="mini"
              @click="selectProject(item.id)"
            >
              选定
            </button>
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
    uniDialog
  },
  data () {
    return {
      coverTransform: 'translateY(0px)',
      coverTransition: '0s',
      moving: false,
      showDailog: false, // 是否显示弹窗
    }
  },
  onLoad () { },
  // #ifndef MP
  onNavigationBarButtonTap (e) {
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
    /** 回退方法 */
    switchProject () {
      this.showDailog = true
    },
    /** 回退弹窗取消方法 */
    selectProject (id) {
      console.log(id)
      this.showDailog = false
    },
    /** 监听弹窗状态是否打开 */
    change (e) {
      console.log(e.show)
    },

    /**
     * 统一跳转接口,拦截未登录路由
     * navigator标签现在默认没有转场动画，所以用view
     */
    navTo (url) {
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
    opacity: 0.7;
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
  background: linear-gradient(left, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.8));
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
    font-size: $font-base + 2rpx;
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

.uni-tip-group-button > button {
  font-size: 24rpx;
  height: 40rpx;
  line-height: 40rpx;
}
</style>
