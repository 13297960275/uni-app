// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import Home from './components/cropper'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  component: Home
}]

const router = new VueRouter({
  routes
})

FastClick.attach(document.body)

Vue.config.productionTip = false
Vue.prototype.images =  {
  cut(param){
    var images = new Image()
    var vm = this
    images.crossOrigin = '*';
    images.src = param.url
    let el = param.el
    images.onload = function () {
      let width =  this.width
      let height =  this.height
      let w = this.width / document.body.offsetWidth
      let h = this.height / document.body.offsetHeight
      let sx = w * el.offsetLeft
      let sy = h * el.offsetTop
      var myCanvas =  document.createElement('canvas')
      var cxt =  myCanvas.getContext("2d")
      myCanvas.width = w * el.offsetWidth
      myCanvas.height =  h * el.offsetHeight
      cxt.drawImage(images,sx,sy,width,height,0,0,width,height)
      var dataURL = myCanvas.toDataURL("image/jpeg");
      vm.compress({url:dataURL,success:path=> {
        vm.compress({url:dataURL,width:400,height:400,success:path2 => {
          param.success && param.success({
            image:path,
            image2:path2
          })
        }})
      }})
    }
  },
  compress(param){
    var img = new Image()
    img.crossOrigin = 'Anonymous';
    img.onload = function () {
      var canvas = document.createElement('canvas');
      var context = canvas.getContext('2d');
      // 图片原始尺寸
      var originWidth = this.width;
      var originHeight = this.height;
      // 最大尺寸限制
      var maxWidth = param.width || 120, maxHeight = param.height ||  120;
      // 目标尺寸
      var targetWidth = originWidth, targetHeight = originHeight;
      if (originWidth > maxWidth || originHeight > maxHeight) {
        if (originWidth / originHeight > maxWidth / maxHeight) {
          // 更宽，按照宽度限定尺寸
          targetWidth = maxWidth;
          targetHeight = Math.round(maxWidth * (originHeight / originWidth));
        } else {
          targetHeight = maxHeight;
          targetWidth = Math.round(maxHeight * (originWidth / originHeight));
        }
      }
      // canvas对图片进行缩放
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      // 图片压缩
      context.drawImage(img, 0, 0, targetWidth, targetHeight);
      let dataURL =  canvas.toDataURL( 'image/jpg');
      param.success && param.success(dataURL);
    }
    img.src =  param.url
  }
}
/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')
