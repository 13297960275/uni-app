(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/application/ocrApi/ocrApi"],{

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:\\workspace\\demo\\vue\\uni-app\\hello-tmp\\pages\\application\\ocrApi\\ocrApi.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/workspace/demo/vue/uni-app/hello-tmp/pages/application/ocrApi/ocrApi.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;















































































var _bdAI = __webpack_require__(/*! @/services/bdAI */ "E:\\workspace\\demo\\vue\\uni-app\\hello-tmp\\services\\bdAI.js");
var _imgTools = __webpack_require__(/*! @/common/imgTools */ "E:\\workspace\\demo\\vue\\uni-app\\hello-tmp\\common\\imgTools.js");var avatar = function avatar() {return Promise.all(/*! import() | components/yq-avatar/yq-avatar */[__webpack_require__.e("common/vendor"), __webpack_require__.e("components/yq-avatar/yq-avatar")]).then(__webpack_require__.bind(null, /*! @/components/yq-avatar/yq-avatar */ "E:\\workspace\\demo\\vue\\uni-app\\hello-tmp\\components\\yq-avatar\\yq-avatar.vue"));};var uniIcon = function uniIcon() {return __webpack_require__.e(/*! import() | components/uni-icon/uni-icon */ "components/uni-icon/uni-icon").then(__webpack_require__.bind(null, /*! @/components/uni-icon/uni-icon.vue */ "E:\\workspace\\demo\\vue\\uni-app\\hello-tmp\\components\\uni-icon\\uni-icon.vue"));};var _default =

{
  components: {
    uniIcon: uniIcon,
    avatar: avatar },

  data: function data() {
    return {
      types: [
      {
        value: 'idcard',
        name: '身份证识别',
        checked: 'true' },

      {
        value: 'license_plate',
        name: '车牌识别' },

      {
        value: 'handwriting',
        name: '手写字识别' },

      {
        value: 'accurate_basic',
        name: '通用文字识别' }],






      current: 0,
      imgList: [],
      // imgBase64List: [],
      words: {} };

  },
  onLoad: function onLoad() {
    // console.log(getAccexxToken());
    console.log('页面加载');
  },
  computed: {
    showAdd: function showAdd() {
      // return false;
      // this.words = {};
      return this.imgList.length > 0;
    } },




  methods: {
    doBefore: function doBefore() {
      console.log('doBefore');
    },
    doUpload: function doUpload(rsp) {var _this = this;
      console.log(rsp);
      this.$set(this.imgList, rsp.index, rsp.path);
      return;
      (0, _imgTools.pathToBase64)(rsp.path).then(function (res) {
        // console.log(res);
        console.log((0, _imgTools.getImgSize)(res));
        var size = (0, _imgTools.getImgSize)(res);
        if (size > 2500) {
          uni.showToast({
            title: '图片超过2.5M，请进行裁剪',
            icon: 'none',
            duration: 1500 });

          _this.$refs.avatar.fChooseImg(0, {
            selWidth: '240upx', selHeight: '151upx',
            expWidth: '480upx', expHeight: '302upx',
            inner: 'true',
            canRotate: 'true' },
          rsp.path);
        } else {
          _this.getOcrInfo(res);
        }
      }).catch(function (err) {
        console.log(err);
        uni.showToast({
          title: '图片解析失败',
          icon: 'none',
          duration: 1500 });

      });
      return;
      uni.uploadFile({
        url: '', //仅为示例，非真实的接口地址
        filePath: rsp.path,
        name: 'avatar',
        formData: {
          'avatar': rsp.path },

        success: function success(uploadFileRes) {
          console.log(uploadFileRes.data);
        },
        complete: function complete(res) {
          console.log(res);
        } });

    },
    radioChange: function radioChange(evt) {
      this.imgList = [];
      for (var i = 0; i < this.types.length; i++) {
        if (this.types[i].value === evt.target.value) {
          this.current = i;
          console.log(this.current);
          break;
        }
      }
    },
    chooseImage: function chooseImage() {var _this2 = this;
      this.words = {};
      console.log('chooseImage');
      uni.chooseImage({
        count: 1, //默认9
        sizeType: ['compressed'], //original 原图，compressed 压缩图，默认二者都有
        sourceType: ['album', 'camera '], //album 从相册选图，camera 使用相机，默认二者都有
        success: function success(chooseImageRes) {
          for (var i = 0; i < chooseImageRes.tempFilePaths.length; i++) {
            _this2.imgList.push(chooseImageRes.tempFilePaths[i]);
            (0, _imgTools.pathToBase64)(chooseImageRes.tempFilePaths[i]).then(function (res) {
              // console.log(res);
              var size = (0, _imgTools.getImgSize)(res);
              console.log(size);
              // if (size > 2500) {
              // 	uni.showToast({
              // 		title: '图片超过2.5M，请进行裁剪',
              // 		icon: 'none',
              // 		duration: 1500
              // 	});
              // 	this.$refs.avatar.fChooseImg(0, {
              // 		selWidth: '240upx', selHeight: '151upx', 
              // 		expWidth: '480upx', expHeight: '302upx',
              // 		avatarSrc: chooseImageRes.tempFilePaths[0],
              // 		inner: 'true',
              // 		canRotate: 'true'
              // 	});
              // } else{
              _this2.getOcrInfo(res);
              // }
            }).catch(function (err) {
              console.log(err);
              uni.showToast({
                title: '图片解析失败',
                icon: 'none',
                duration: 1500 });

            });
          }
        },
        fail: function fail(err) {
          uni.showToast({
            title: '未选择图片',
            icon: 'none',
            duration: 1500 });

          // console.log(err);
        } });

    },
    perviewImg: function perviewImg(index) {
      console.log('previewImg');
      var urls = [];
      if (index != -1) {
        urls[0] = this.imgList[index];
      } else {
        urls = this.imgList;
      }
      uni.previewImage({
        urls: urls });

    },
    handleRemove: function handleRemove(index) {
      console.log('removeImage');
      var il = [];
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
    getOcrInfo: function getOcrInfo(base64) {var _this3 = this;
      uni.showLoading({
        mask: true,
        title: '加载中' });

      // let base64 = 'data:image/jpeg;base64,' + res.data //不加上这串字符，在页面无法显示的哦
      // this.imgBase64List.push(base64);
      // console.log(this.imgBase64List);
      var dataSet = {
        image: base64 };

      console.log(this.types[this.current].value);
      switch (this.types[this.current].value) {
        case 'idcard':
          dataSet.id_card_side = 'front';
          break;
        default:
          break;}

      (0, _bdAI.getOcrInfo)(dataSet, this.types[this.current].value).then(function (resp) {
        _this3.words = resp.data.words_result;
        uni.hideLoading();
        // console.log(this.words['姓名'].words);
      }).catch(function (reason) {
        uni.showToast({
          title: '文字识别失败',
          icon: 'none',
          duration: 1500 });

      });
    } } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["default"]))

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:\\workspace\\demo\\vue\\uni-app\\hello-tmp\\pages\\application\\ocrApi\\ocrApi.vue?vue&type=style&index=0&lang=css&":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-1!./node_modules/css-loader??ref--6-oneOf-1-2!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/workspace/demo/vue/uni-app/hello-tmp/pages/application/ocrApi/ocrApi.vue?vue&type=style&index=0&lang=css& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:\\workspace\\demo\\vue\\uni-app\\hello-tmp\\pages\\application\\ocrApi\\ocrApi.vue?vue&type=template&id=2bd3b8c8&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/workspace/demo/vue/uni-app/hello-tmp/pages/application/ocrApi/ocrApi.vue?vue&type=template&id=2bd3b8c8& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "E:\\workspace\\demo\\vue\\uni-app\\hello-tmp\\pages\\application\\ocrApi\\ocrApi.vue":
/*!***********************************************************************************!*\
  !*** E:/workspace/demo/vue/uni-app/hello-tmp/pages/application/ocrApi/ocrApi.vue ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ocrApi_vue_vue_type_template_id_2bd3b8c8___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ocrApi.vue?vue&type=template&id=2bd3b8c8& */ "E:\\workspace\\demo\\vue\\uni-app\\hello-tmp\\pages\\application\\ocrApi\\ocrApi.vue?vue&type=template&id=2bd3b8c8&");
/* harmony import */ var _ocrApi_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ocrApi.vue?vue&type=script&lang=js& */ "E:\\workspace\\demo\\vue\\uni-app\\hello-tmp\\pages\\application\\ocrApi\\ocrApi.vue?vue&type=script&lang=js&");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _ocrApi_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _ocrApi_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _ocrApi_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ocrApi.vue?vue&type=style&index=0&lang=css& */ "E:\\workspace\\demo\\vue\\uni-app\\hello-tmp\\pages\\application\\ocrApi\\ocrApi.vue?vue&type=style&index=0&lang=css&");
/* harmony import */ var _D_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_D_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _ocrApi_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ocrApi_vue_vue_type_template_id_2bd3b8c8___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ocrApi_vue_vue_type_template_id_2bd3b8c8___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "E:/workspace/demo/vue/uni-app/hello-tmp/pages/application/ocrApi/ocrApi.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "E:\\workspace\\demo\\vue\\uni-app\\hello-tmp\\pages\\application\\ocrApi\\ocrApi.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************!*\
  !*** E:/workspace/demo/vue/uni-app/hello-tmp/pages/application/ocrApi/ocrApi.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_ocrApi_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./ocrApi.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:\\workspace\\demo\\vue\\uni-app\\hello-tmp\\pages\\application\\ocrApi\\ocrApi.vue?vue&type=script&lang=js&");
/* harmony import */ var _D_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_ocrApi_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_ocrApi_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_ocrApi_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_ocrApi_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_ocrApi_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "E:\\workspace\\demo\\vue\\uni-app\\hello-tmp\\pages\\application\\ocrApi\\ocrApi.vue?vue&type=style&index=0&lang=css&":
/*!********************************************************************************************************************!*\
  !*** E:/workspace/demo/vue/uni-app/hello-tmp/pages/application/ocrApi/ocrApi.vue?vue&type=style&index=0&lang=css& ***!
  \********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_D_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_D_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_ocrApi_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-1!./node_modules/css-loader??ref--6-oneOf-1-2!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./ocrApi.vue?vue&type=style&index=0&lang=css& */ "./node_modules/mini-css-extract-plugin/dist/loader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:\\workspace\\demo\\vue\\uni-app\\hello-tmp\\pages\\application\\ocrApi\\ocrApi.vue?vue&type=style&index=0&lang=css&");
/* harmony import */ var _D_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_D_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_D_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_ocrApi_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_D_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_D_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_ocrApi_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_D_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_D_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_ocrApi_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_D_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_D_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_ocrApi_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_D_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_D_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_ocrApi_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "E:\\workspace\\demo\\vue\\uni-app\\hello-tmp\\pages\\application\\ocrApi\\ocrApi.vue?vue&type=template&id=2bd3b8c8&":
/*!******************************************************************************************************************!*\
  !*** E:/workspace/demo/vue/uni-app/hello-tmp/pages/application/ocrApi/ocrApi.vue?vue&type=template&id=2bd3b8c8& ***!
  \******************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_ocrApi_vue_vue_type_template_id_2bd3b8c8___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./ocrApi.vue?vue&type=template&id=2bd3b8c8& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:\\workspace\\demo\\vue\\uni-app\\hello-tmp\\pages\\application\\ocrApi\\ocrApi.vue?vue&type=template&id=2bd3b8c8&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _D_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_ocrApi_vue_vue_type_template_id_2bd3b8c8___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _D_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_ocrApi_vue_vue_type_template_id_2bd3b8c8___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

},[["E:\\workspace\\demo\\vue\\uni-app\\hello-tmp\\main.js?{\"page\":\"pages%2Fapplication%2FocrApi%2FocrApi\"}","common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/application/ocrApi/ocrApi.js.map