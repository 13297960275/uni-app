<template>
  <view class="content group-section projects">
    <!-- <swiper-item class="g-swiper-item" v-for="(item, index) in goodsList" :key="index" v-if="index%2 === 0" @click="navToDetailPage(item)"> -->
    <view
      class="g-swiper-item"
      :style="{ borderColor: borderColor + '!important' }"
    >
      <view
        class="g-item left"
        :style="{ borderColor: borderColor + '!important' }"
      >
        <image :src="image" mode="aspectFill"></image>
      </view>
      <view class="g-item right">
        <view class="t-box">
          <view class="cell-box">
            <text class="cell">{{ title }}</text>
            <slot name="tipsRight"></slot>
          </view>
          <view class="pro-box" :class="showInfo ? '' : 'martb10'">
            <view class="progress-box">
              <progress
                :percent="percent"
                :activeColor="activeColor || '#21caad'"
                :backgroundColor="backgroundColor || '#dadcde'"
                :duration="duration"
                :stroke-width="strokeWidth"
                :font-size="fontSize"
                :active="active"
                :show-info="showInfo"
              />
            </view>
          </view>
          <view class="cell-box">
            <text class="m-cell">总费用：{{ total }}万元</text>
            <text class="m-cell">已用：{{ used }}万元</text>
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
  data () {
    return {}
  },
  // watch: {
  // 	image: {
  // 		handler(val) {
  // 			console.log(val)
  // 		},
  // 		immediate: true
  // 	}
  // },
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
    eventClick () {
      this.$emit('eventClick');
    }
  },
}
</script>

<style lang='scss' scoped>
/* 团购楼层 */
.group-section {
  background: #fff;
  margin: 20rpx;

  .g-swiper {
    height: 650rpx;
    padding-bottom: 30rpx;
  }

  .g-swiper-item {
    /* width: 100%; */
    padding: 15rpx 30rpx;
    display: flex;
    border: 1rpx solid #cfcfcf;
  }

  image {
    width: 80rpx;
    height: 80rpx;
    border-radius: 4rpx;
  }

  .g-item {
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .left {
    flex: 0.3;
    margin-right: 24rpx;
    padding-right: 24rpx;
    border-right: 1rpx solid #cfcfcf;
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: center;

    .t-box {
      padding-top: 20rpx;
    }
  }

  .right {
    flex: 0.8;
    flex-direction: column-reverse;

    .t-box {
      padding-top: 16rpx;
    }
  }

  .t-box {
    height: 160rpx;
    font-size: $font-base + 2rpx;
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
    font-size: $font-base;
    color: $font-color-dark;
    font-weight: 600;
    margin-right: 10rpx;
    /* line-height: unset; */
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .m-cell {
    font-size: $font-sm + 2rpx;
    /* text-decoration: line-through; */
    color: $font-color-light;
  }

  .pro-box {
    display: flex;
    align-items: center;
    margin-top: 10rpx;
    font-size: $font-sm;
    color: $font-base;
    /* padding-right: 10rpx; */
  }

  .martb10 {
    margin-top: 20rpx;
    margin-bottom: 20rpx;
  }

  .progress-box {
    flex: 1;
    border-radius: 10rpx;
    overflow: hidden;
    /* margin-right: 8rpx; */
    /* padding-right: 12rpx; */
  }
}
</style>
