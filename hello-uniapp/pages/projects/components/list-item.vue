<template>
  <view
    class="cell-item projects"
    :style="{
      border: !borderColor ? 'none' : '',
      borderColor: borderColor ? borderColor : 'transparent',
    }"
  >
    <view v-for="(item, index) in dataList" :key="index">
      <view
        v-if="item.type == 'img'"
        class="cell-img"
        :style="{ flexDirection: item.direction }"
      >
        <image
          v-if="item.noImage"
          :src="item.image || '/static/imgs/tx.png'"
        ></image>
        <text>{{ item.value }}</text>
      </view>
      <view>
        <text
          class="m-cell"
          :style="{ color: item.fontColor }"
          v-if="item.type == 'm-cell'"
          >{{ item.value }}</text
        >
      </view>
      <view>
        <text
          class="cell"
          :style="{ color: item.fontColor }"
          v-if="item.type == 'cell'"
          >{{ item.value }}</text
        >
      </view>
      <view class="" v-if="item.type == 'bot'">
        <view
          class="bot"
          :style="{ backgroundColor: item.backgroundColor }"
        ></view>
        <text class="m-cell" :style="{ color: item.fontColor }">{{
          item.value
        }}</text>
      </view>
      <view class="" v-if="item.type == 'mix'">
        <text class="cell" :style="{ color: item.fontColor }">{{
          item.value
        }}</text
        >：
        <text class="m-cell">{{ item.tip }}</text>
      </view>
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
  data () {
    return {}
  },
  props: {
    borderColor: {
      type: String,
      default: '#21caad'
    },
    dataList: {
      type: Array,
      default: []
    }
  },
  methods: {
    eventClick () {
      this.$emit('eventClick');
    }
  },
}
</script>

<style lang='scss' scoped>
.cell-item {
  /* margin: 15rpx 0rpx; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;
  /* padding: 10rpx 11rpx; */
  background: #fff;
  border-left: 10rpx #21caad solid;
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
  font-size: $font-base;
  color: $font-color-dark;
  /* font-weight: 600; */
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

.bot {
  width: $font-lg/2;
  height: $font-lg/2;
  background-color: #fff;
  border-radius: 50%;
  display: inline-block;
  line-height: 1;
  margin-right: $font-lg/2;
}
</style>
