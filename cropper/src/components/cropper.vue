<template>
    <div class="cropper-box" >
      <x-header :left-options="{backText:''}" ref="hader" class="hader">
          <a slot="right" @click="submit">确定</a>
          <input  id="inputImage"  type="file" ref="inputer" @change="changeFile">
      </x-header>
      <img src="" ref="img">
      <div class="tool">
        <div class="range">
          <range v-model="rotateVal" :max="360" :range-bar-height="4" @on-change="rotate" :step="1"></range>
        </div>
        <flexbox>
          <flexbox-item  class="buttons">
            <!--左右翻转-->
            <span class="fa fa-arrows-h" @click="scaleX"></span>
          </flexbox-item>
          <flexbox-item class="buttons">
            <!--重置-->
            <span class="fa fa-refresh" @click="reset"></span>
          </flexbox-item>
          <flexbox-item  class="buttons">
            <!--上下翻转-->
            <span class="fa fa-arrows-v" @click="scaleY"></span>
          </flexbox-item>
        </flexbox>
      </div>
    </div>
</template>

<script>
  import { Range,Flexbox, FlexboxItem,XButton,XHeader} from 'vux'
  import Cropper from 'cropperjs'
  export default {
    components: {Range,Flexbox, FlexboxItem,XButton,XHeader},
    data () {
      return {
        rotateVal:0,
        cropper:null,
        scaleYval:false,
        scaleXval:false,
        options:{
          minContainerHeight :document.body.offsetHeight,
          minContainerWidth :document.body.offsetWidth,
          viewMode :1,//显示
          guides :false,//裁剪框虚线 默认true有
          dragMode : "move",
          center:false //是否显示裁剪框 中间的+
        }
      }
    },
    mounted(){
      this.init()
    },
    methods:{
      changeFile(){
        var URL = window.URL || window.webkitURL;
        var files = this.$refs.inputer.files[0];
        var blobURL = URL.createObjectURL(files);
        this.setImg(blobURL)
      },
      init(){
        this.cropper = new Cropper(this.$refs.img, this.options);
      },
      setImg(src){
        this.images.compress({
          url:src,
          width:document.body.offsetWidth,
          height:document.body.offsetHeight,
          success:path =>{
            this.cropper.reset().replace(path)
          }
        })
      },
      scaleY(){
        this.scaleYval = !this.scaleYval
        this.cropper.scaleY(this.scaleYval ? -1 : 1 )
      },
      scaleX(){
        this.scaleXval = !this.scaleXval
        this.cropper.scaleX(this.scaleXval ? -1 : 1)
      },
      reset(){
        this.rotateVal = 0
        this.scaleXval = false
        this.scaleYval = false
        this.cropper.reset()
      },
      rotate(){
        this.cropper.rotateTo(this.rotateVal)
      },
      submit(){
        const img = this.cropper.getCroppedCanvas().toDataURL('image/jpeg')
        console.log(img)
        this.$emit('submit',img)
      }
    }
  }
</script>
<style  lang="less">
   @import "../assets/cropper/cropper.css";
   @import "../assets/css/font-awesome.css";
   body,html{
     width:100%;
     height:100%;
     overflow: hidden;
   }
  .cropper-box{
    width:100%;
    height:100%;
    .hader{
      position: absolute;
      width:100%;
      left:0;
      top: 0;
      z-index: 9;
    }
    .tool{
      padding: 0;
      margin: 0;
      width: 100%;
      position: fixed;
      bottom: 15px;
      .buttons{
        text-align: center;
        span{
          width:60%;
          background-color: #4683ff!important;
          color:#ffffff!important;
          padding: 5px 10px;
          border-radius: 3px;
        }
      }
      .range{
        height:30px;
        .vux-range-input-box{
          margin-left:30px!important;
        }
        .range-handle{
          width:20px;
          height:20px;
          margin-top:5px;
        }
      }
    }
  }
</style>
