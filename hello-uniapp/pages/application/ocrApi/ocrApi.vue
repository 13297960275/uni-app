<template>
  <view>
    <view class="an-uploadImg-group">
      <view>
        <view
          class="an-img"
          v-for="(item, index) in imgList"
          :key="index"
          @click="perviewImg(index)"
        >
          <image :src="item" v-if="item" mode="widthFix"></image>
          <!-- <view class="image-view" v-if="item">
						<image class="uni-product-image" mode="widthFix" :src="item"></image>
					</view> -->
          <view class="an-icon-close" @click.stop="handleRemove(index)">
            <uni-icons type="closeempty" size="45" color="#F00"></uni-icons>
          </view>
        </view>
        <view class="an-img-add" v-if="!showAdd" @click="chooseImage">
          <!-- <view class="">身份证正面照</view> -->
          <uni-icons type="plus" size="36" color="#FFFFFF"></uni-icons>
        </view>

        <yq-avatar
          @upload="doUpload"
          @avtinit="doBefore"
          quality="0.8"
          ref="avatar"
        ></yq-avatar>

        <view>
          <!-- <view class="uni-title uni-common-mt uni-common-pl">识别类型</view> -->
          <view class="uni-list">
            <radio-group @change="radioChange">
              <label
                class="uni-title-item uni-title-item-pd"
                v-for="(item, index) in types"
                :key="item.value"
              >
                <view>
                  <radio :value="item.value" :checked="index === current" />
                </view>
                <view>{{ item.name }}</view>
              </label>
            </radio-group>
          </view>
        </view>
      </view>
    </view>

    <view v-if="showAdd && words">
      <view class="page">
        <view class="uni-list">
          <block v-for="(value, key, index) in words" :key="key">
            <!-- <view class="uni-title-item" hover-class="uni-title-item-hover"> -->
            <view v-if="current === 1">
              <view
                class="uni-triplex-row"
                v-if="current === 1 && key === 'number'"
              >
                <view class="uni-triplex-left">
                  <text class="uni-title uni-ellipsis">车牌号</text>
                </view>
                <view class="uni-triplex-right">
                  <text class="uni-h5">{{ words[key] }}</text>
                </view>
              </view>
              <view
                class="uni-triplex-row"
                v-else-if="current === 1 && key === 'color'"
              >
                <view class="uni-triplex-left">
                  <text class="uni-title uni-ellipsis">颜色</text>
                </view>
                <view class="uni-triplex-right">
                  <text class="uni-h5">{{ words[key] }}</text>
                </view>
              </view>
            </view>
            <view class="uni-triplex-row" v-else>
              <view class="uni-triplex-left">
                <text class="uni-title uni-ellipsis">{{ key }}</text>
                <!-- <text class="uni-text">列表副标题</text> -->
                <!-- <text class="uni-text-small uni-ellipsis">列表内容文字,列表内容文字,列表内容文字,列表内容文字,列表内容文字,列表内容文字</text> -->
              </view>
              <view class="uni-triplex-right">
                <text class="uni-h5">{{ words[key].words }}</text>
              </view>
            </view>
            <!-- </view> -->
          </block>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { getAccexxToken, getIdCard, getOcrInfo } from '@/services/bdAI'
import { pathToBase64, base64ToPath, getImgSize } from '@/common/imgTools'

export default {
  data () {
    return {
      types: [
        {
          value: 'idcard',
          name: '身份证识别',
          checked: 'true'
        },
        {
          value: 'license_plate',
          name: '车牌识别'
        },
        {
          value: 'handwriting',
          name: '手写字识别'
        },
        {
          value: 'accurate_basic',
          name: '通用文字识别'
        },
        // {
        // 	value: 'FRA',
        // 	name: '法国'
        // },
      ],
      current: 0,
      imgList: [],
      // imgBase64List: [],
      words: {},
    };
  },
  onLoad () {
    // console.log(getAccexxToken());
    console.log('页面加载')
  },
  computed: {
    showAdd () {
      // return false;
      // this.words = {};
      return this.imgList.length > 0
    },
    // showInfo() {
    // return this.imgList.length > 0 && this.words
    // }
  },
  methods: {
    doBefore () {
      console.log('doBefore');
    },
    doUpload (rsp) {
      console.log(rsp);
      this.$set(this.imgList, rsp.index, rsp.path);
      pathToBase64(rsp.path).then(res => {
        // console.log(res);
        console.log(getImgSize(res));
        let size = getImgSize(res)
        if (size > 2500) {
          uni.showToast({
            title: '图片超过2.5M，请进行裁剪',
            icon: 'none',
            duration: 1500
          });
          this.$refs.avatar.fChooseImg(0, {
            selWidth: '240rpx', selHeight: '151rpx',
            expWidth: '480rpx', expHeight: '302rpx',
            inner: 'true',
            canRotate: 'true'
          }, rsp.path);
        } else {
          this.getOcrInfo(res)
        }
      }).catch(err => {
        console.log(err);
        uni.showToast({
          title: '图片解析失败',
          icon: 'none',
          duration: 1500
        });
      })
      return;
      uni.uploadFile({
        url: '', //仅为示例，非真实的接口地址
        filePath: rsp.path,
        name: 'avatar',
        formData: {
          'avatar': rsp.path
        },
        success: (uploadFileRes) => {
          console.log(uploadFileRes.data);
        },
        complete (res) {
          console.log(res)
        }
      });
    },
    radioChange: function (evt) {
      this.imgList = []
      for (let i = 0; i < this.types.length; i++) {
        if (this.types[i].value === evt.target.value) {
          this.current = i;
          console.log(this.current);
          break;
        }
      }
    },
    chooseImage () {
      this.words = {}
      console.log('chooseImage');
      uni.chooseImage({
        count: 1, //默认9
        sizeType: ['compressed'], //original 原图，compressed 压缩图，默认二者都有
        sourceType: ['album', 'camera '], //album 从相册选图，camera 使用相机，默认二者都有
        success: (chooseImageRes) => {
          for (var i = 0; i < chooseImageRes.tempFilePaths.length; i++) {
            this.imgList.push(chooseImageRes.tempFilePaths[i]);
            pathToBase64(chooseImageRes.tempFilePaths[i]).then(res => {
              // console.log(res);
              let size = getImgSize(res)
              console.log(size);
              if (size > 2500) {
                uni.showToast({
                  title: '图片超过2.5M，请进行裁剪',
                  icon: 'none',
                  duration: 1500
                });
                this.$refs.avatar.fChooseImg(0, {
                  selWidth: '240rpx', selHeight: '151rpx',
                  expWidth: '480rpx', expHeight: '302rpx',
                  avatarSrc: chooseImageRes.tempFilePaths[0],
                  inner: 'true',
                  canRotate: 'true'
                }, chooseImageRes.tempFilePaths[0]);
              } else {
                this.getOcrInfo(res)
              }
            }).catch(err => {
              console.log(err);
              uni.showToast({
                title: '图片解析失败',
                icon: 'none',
                duration: 1500
              });
            })
          }
        },
        fail: (err) => {
          uni.showToast({
            title: '未选择图片',
            icon: 'none',
            duration: 1500
          });
          // console.log(err);
        }
      })
    },
    perviewImg (index) {
      console.log('previewImg');
      let urls = [];
      if (index != -1) {
        urls[0] = this.imgList[index];
      } else {
        urls = this.imgList;
      }
      uni.previewImage({
        urls: urls
      });
    },
    handleRemove (index) {
      console.log('removeImage');
      let il = [];
      // let ibl = [];
      for (var i = 0; i < this.imgList.length; i++) {
        if (i != index) {
          il.push(this.imgList[i]);
          // ibl.push(this.imgBase64List[i]);
        }
      }
      this.imgList = il;
      // this.imgBase64List = ibl;
      // console.log(il, ibl);
    },
    getOcrInfo (base64) {
      uni.showLoading({
        mask: true,
        title: '加载中'
      })
      // let base64 = 'data:image/jpeg;base64,' + res.data //不加上这串字符，在页面无法显示的哦
      // this.imgBase64List.push(base64);
      // console.log(this.imgBase64List);
      let dataSet = {
        image: base64,
      }
      console.log(this.types[this.current].value);
      switch (this.types[this.current].value) {
        case 'idcard':
          dataSet.id_card_side = 'front'
          break;
        default:
          break;
      }
      getOcrInfo(dataSet, this.types[this.current].value).then(resp => {
        this.words = resp.data.words_result
        uni.hideLoading()
        // console.log(this.words['姓名'].words);
      }).catch(function (reason) {
        uni.showToast({
          title: '文字识别失败',
          icon: 'none',
          duration: 1500
        })
      });
    }
  }
}
</script>

<style>
.uni-triplex-left {
  width: 30%;
}
.uni-triplex-right {
  width: 70%;
}

.show-inline {
  display: inline-block !important;
}

.show {
  display: block !important;
}

.hide {
  display: none !important;
}

.an-uploadImg-group {
  margin: 5rpx 20rpx;
}

.an-img {
  float: left;
  /* margin-right: 10rpx; */
}

.an-img-add {
  float: left;
  /* margin-right: 10rpx; */
  height: 45vw;
  width: calc(100vw - 40rpx);
  background-color: #c8c7cc;
  text-align: center;
  line-height: 45vw;
}

.an-img > image {
  /* height: 45vw; */
  /* width: 45vw; */
  width: calc(100vw - 40rpx);
}

.an-icon-close {
  position: absolute;
  left: 0;
  top: 0;
  width: 45px;
  /* background-color: #C8C7CC; */
}

.c-list {
  /* font-size: $font-sm + 2rpx; */
  /* color: $font-color-base; */
  background: #fff;
}

.c-row {
  display: flex;
  align-items: center;
  padding: 20rpx 30rpx;
  position: relative;
}

.tit {
  width: 8rem;
}

.con {
  flex: 1;
  color: dark;
}

.bz-list {
  height: 40rpx;
  /* font-size: $font-sm+2rpx; */
  color: dark;
}

.bz-list text {
  display: inline-block;
  margin-right: 30rpx;
}

.con-list {
  flex: 1;
  display: flex;
  flex-direction: column;
  color: dark;
  line-height: 40rpx;
}
</style>
