<template>
  <view class="container projects">
    <hans-tabber
      :tabBar="tabBar"
      style="position: fixed; bottom: 0; width: 100%; left: 0; right: 0"
      @tabChange="tabChange"
    ></hans-tabber>
    <component style="margin-bottom: 70px" :is="compName"></component>
  </view>
</template>
<script>
import index from './index'
import titleItem from './components/title-item';
import {
  mapState
} from 'vuex';
let startY = 0,
  moveY = 0,
  pageAtTop = true;
export default {
  components: {
    titleItem,
    index
  },
  data () {
    return {
      coverTransform: 'translateY(0px)',
      coverTransition: '0s',
      moving: false,
      compName: '',

      "tabBar": {
        "color": "#7A7E83",
        "selectedColor": "#21caad",
        "borderStyle": "black",
        "backgroundColor": "#F8F8F8",

        "list": [
          {
            "pagePath": "pages/tabBar/component/component",
            "iconPath": "../../static/component.png",
            "selectedIconPath": "../../static/componentHL.png",
            "text": "内置组件"
          },
          {
            "pagePath": "pages/tabBar/API/API",
            "iconPath": "../../static/api.png",
            "selectedIconPath": "../../static/apiHL.png",
            "text": "接口"
          },
          {
            "pagePath": "pages/tabBar/extUI/extUI",
            "iconPath": "../../static/extui.png",
            "selectedIconPath": "../../static/extuiHL.png",
            "text": "扩展组件"
          },
          {
            "pagePath": "pages/tabBar/template/template",
            "iconPath": "../../static/template.png",
            "selectedIconPath": "../../static/templateHL.png",
            "text": "模板"
          },
          {
            "pagePath": "pages/tabBar/application/application",
            "iconPath": "../../static/application.png",
            "selectedIconPath": "../../static/applicationHL.png",
            "text": "应用实例"
          }
        ]
      },

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
    tabChange (index) {
      this.compName = 'index'
      console.log(index, this.tabBar.list[index].pagePath)
      this.navTo(this.tabBar.list[index].pagePath);
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
