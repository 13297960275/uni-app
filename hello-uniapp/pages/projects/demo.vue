<template>
  <view class="container projects">
    <view
      class="cover-container"
      :style="[
        {
          transform: coverTransform,
          transition: coverTransition,
        },
      ]"
      @touchstart="coverTouchstart"
      @touchmove="coverTouchmove"
      @touchend="coverTouchend"
    >
      <image class="arc" src="/static/arc.png"></image>

      <view class="tj-sction">
        <view class="tj-item">
          <text class="num">128.8</text>
          <text>余额</text>
        </view>
        <view class="tj-item">
          <text class="num">0</text>
          <text>优惠券</text>
        </view>
        <view class="tj-item">
          <text class="num">20</text>
          <text>积分</text>
        </view>
      </view>
      <!-- 订单 -->
      <view class="order-section">
        <view
          class="order-item"
          @click="navTo('/pages/order/order?state=0')"
          hover-class="common-hover"
          :hover-stay-time="50"
        >
          <text class="yticon icon-shouye"></text>
          <text>全部订单</text>
        </view>
        <view
          class="order-item"
          @click="navTo('/pages/order/order?state=1')"
          hover-class="common-hover"
          :hover-stay-time="50"
        >
          <text class="yticon icon-daifukuan"></text>
          <text>待付款</text>
        </view>
        <view
          class="order-item"
          @click="navTo('/pages/order/order?state=2')"
          hover-class="common-hover"
          :hover-stay-time="50"
        >
          <text class="yticon icon-yishouhuo"></text>
          <text>待收货</text>
        </view>
        <view
          class="order-item"
          @click="navTo('/pages/order/order?state=4')"
          hover-class="common-hover"
          :hover-stay-time="50"
        >
          <text class="yticon icon-shouhoutuikuan"></text>
          <text>退款/售后</text>
        </view>
      </view>
      <!-- 浏览历史 -->
      <view class="history-section icon">
        <view class="sec-header">
          <text class="yticon icon-lishijilu"></text>
          <text>浏览历史</text>
        </view>
        <scroll-view scroll-x class="h-list">
          <image
            @click="navTo('/pages/product/product')"
            src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553105186633&di=c121a29beece4e14269948d990f9e720&imgtype=0&src=http%3A%2F%2Fimg004.hc360.cn%2Fm8%2FM04%2FDE%2FDE%2FwKhQplZ-QteEBvsbAAAAADUkobU751.jpg"
            mode="aspectFill"
          ></image>
          <image
            @click="navTo('/pages/product/product')"
            src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553105231218&di=09534b9833b5243296630e6d5b728eff&imgtype=0&src=http%3A%2F%2Fimg002.hc360.cn%2Fm1%2FM05%2FD1%2FAC%2FwKhQcFQ3iN2EQTo8AAAAAHQU6_8355.jpg"
            mode="aspectFill"
          ></image>
          <image
            @click="navTo('/pages/product/product')"
            src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553105320890&di=c743386be51f2c4c0fd4b75754d14f3c&imgtype=0&src=http%3A%2F%2Fimg007.hc360.cn%2Fhb%2FMTQ1OTg4ODY0MDA3Ny05OTQ4ODY1NDQ%3D.jpg"
            mode="aspectFill"
          ></image>
          <image
            @click="navTo('/pages/product/product')"
            src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2691146630,2165926318&fm=26&gp=0.jpg"
            mode="aspectFill"
          ></image>
          <image
            @click="navTo('/pages/product/product')"
            src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553105443324&di=8141bf13f3f208c61524d67f9bb83942&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01ac9a5548d29b0000019ae98e6d98.jpg"
            mode="aspectFill"
          ></image>
          <image
            @click="navTo('/pages/product/product')"
            src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=191678693,2701202375&fm=26&gp=0.jpg"
            mode="aspectFill"
          ></image>
        </scroll-view>
        <title-item
          navigateType="arrowright"
          iconColor="#e07472"
          title="我的钱包"
          tips="您的会员还有3天过期"
          ><text slot="tipsRight">过期</text></title-item
        >
        <title-item
          icon="camera-filled"
          iconColor="#5fcda2"
          title="地址管理"
          @eventClick="navTo('/pages/address/address')"
        >
          <button slot="tipsRight" class="mini-btn" type="primary" size="mini">
            按钮
          </button></title-item
        >
        <title-item
          icon="camera-filled"
          iconColor="#9789f7"
          title="分享"
          tips="邀请好友赢10万大礼"
        ></title-item>
        <title-item
          icon="camera-filled"
          iconColor="#ee883b"
          title="晒单"
          tips="晒单抢红包"
        ></title-item>
        <title-item
          icon="camera-filled"
          iconColor="#54b4ef"
          title="我的收藏"
        ></title-item>
        <title-item
          icon="camera-filled"
          iconColor="#e07472"
          title="设置"
          @eventClick="navTo('/pages/set/set')"
        ></title-item>
      </view>
    </view>
  </view>
</template>
<script>
import titleItem from './components/title-item';
import {
  mapState
} from 'vuex';
let startY = 0,
  moveY = 0,
  pageAtTop = true;
export default {
  components: {
    titleItem
  },
  data () {
    return {
      coverTransform: 'translateY(0px)',
      coverTransition: '0s',
      moving: false,
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

    /**
     *  会员卡下拉和回弹
     *  1.关闭bounce避免ios端下拉冲突
     *  2.由于touchmove事件的缺陷（以前做小程序就遇到，比如20跳到40，h5反而好很多），下拉的时候会有掉帧的感觉
     *    transition设置0.1秒延迟，让css来过渡这段空窗期
     *  3.回弹效果可修改曲线值来调整效果，推荐一个好用的bezier生成工具 http://cubic-bezier.com/
     */
    coverTouchstart (e) {
      if (pageAtTop === false) {
        return;
      }
      this.coverTransition = 'transform .1s linear';
      startY = e.touches[0].clientY;
    },
    coverTouchmove (e) {
      moveY = e.touches[0].clientY;
      let moveDistance = moveY - startY;
      if (moveDistance < 0) {
        this.moving = false;
        return;
      }
      this.moving = true;
      if (moveDistance >= 80 && moveDistance < 100) {
        moveDistance = 80;
      }

      if (moveDistance > 0 && moveDistance <= 80) {
        this.coverTransform = `translateY(${moveDistance}px)`;
      }
    },
    coverTouchend () {
      if (this.moving === false) {
        return;
      }
      this.moving = false;
      this.coverTransition = 'transform 0.3s cubic-bezier(.21,1.93,.53,.64)';
      this.coverTransform = 'translateY(0px)';
    }
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
</style>
