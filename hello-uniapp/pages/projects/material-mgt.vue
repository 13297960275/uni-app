<template>
  <view class="uni-padding-wrap projects" style="background: #fff">
    <view class="">
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
        </view>
      </title-item>
      <view class="uni-card-border" v-for="(el, idx) in priceList" :key="idx">
        <view class="cell">
          横梁
          <text class="m-cell">（ 总需求：{{ "100" }} )</text>
        </view>
        <list-item
          :dataList="el.dataList"
          :borderColor="el.borderColor"
        ></list-item>
      </view>
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
          v-for="(item, index) in projects"
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
import listItem from './components/list-item';
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
    listItem
  },
  data () {
    return {
      priceList: [{
        borderColor: '',
        dataList: [{
          type: 'bot',
          direction: '',
          noImage: true,
          image: '',
          value: '发货中：20',
          fontColor: '',
          backgroundColor: '#47c4df',
        },
        {
          type: 'bot',
          direction: '',
          noImage: true,
          image: '',
          value: '库存：30',
          fontColor: '',
          backgroundColor: '#80dd87',
        },
        {
          type: 'bot',
          direction: '',
          noImage: true,
          image: '',
          value: '已使用：50',
          fontColor: '',
          backgroundColor: '#ff7272',
        },
        ]
      },
      {
        borderColor: '',
        dataList: [{
          type: 'bot',
          direction: '',
          noImage: true,
          image: '',
          value: '发货中：20',
          fontColor: '',
          backgroundColor: '#47c4df',
        },
        {
          type: 'bot',
          direction: '',
          noImage: true,
          image: '',
          value: '库存：30',
          fontColor: '',
          backgroundColor: '#80dd87',
        },
        {
          type: 'bot',
          direction: '',
          noImage: true,
          image: '',
          value: '已使用：50',
          fontColor: '',
          backgroundColor: '#ff7272',
        },
        ]
      },
      {
        borderColor: '',
        dataList: [{
          type: 'bot',
          direction: '',
          noImage: true,
          image: '',
          value: '发货中：20',
          fontColor: '',
          backgroundColor: '#47c4df',
        },
        {
          type: 'bot',
          direction: '',
          noImage: true,
          image: '',
          value: '库存：30',
          fontColor: '',
          backgroundColor: '#80dd87',
        },
        {
          type: 'bot',
          direction: '',
          noImage: true,
          image: '',
          value: '已使用：50',
          fontColor: '',
          backgroundColor: '#ff7272',
        },
        ]
      },
      {
        borderColor: '',
        dataList: [{
          type: 'bot',
          direction: '',
          noImage: true,
          image: '',
          value: '发货中：20',
          fontColor: '',
          backgroundColor: '#47c4df',
        },
        {
          type: 'bot',
          direction: '',
          noImage: true,
          image: '',
          value: '库存：30',
          fontColor: '',
          backgroundColor: '#80dd87',
        },
        {
          type: 'bot',
          direction: '',
          noImage: true,
          image: '',
          value: '已使用：50',
          fontColor: '',
          backgroundColor: '#ff7272',
        },
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
        borderColor: '#47c4df4d',
        image: '/static/imgs/piece.png',
        title: '计件详情',
        percent: '25',
        activeColor: '#47c4df',
        total: '100',
        used: '25',
      },
      {
        borderColor: '#f9b55d4d',
        image: '/static/imgs/time.png',
        title: '工时详情',
        percent: '25',
        activeColor: '#f9b55d',
        total: '100',
        used: '25',
      },
      {
        borderColor: '#80dd874d',
        image: '/static/imgs/money.png',
        title: '预借费用详情',
        percent: '25',
        activeColor: '#80dd87',
        total: '100',
        used: '25',
      },
      {
        borderColor: '#ff72724d',
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
