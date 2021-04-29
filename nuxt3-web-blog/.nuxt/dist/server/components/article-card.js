exports.ids = [1];
exports.modules = {

/***/ 85:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(91);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
var add = __webpack_require__(4).default
module.exports.__inject__ = function (context) {
  add("aa80c854", content, true, context)
};

/***/ }),

/***/ 86:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return timeFormat; });
/**
 * 格式化时间戳
 * @param {时间戳} date
 * @param {*} type
 */
function timeFormat(date, type) {
  if (!date) return '';
  const time = new Date(date);
  if (!time) return '';
  const year = time.getFullYear();
  const month = time.getMonth() < 9 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1;
  const day = time.getDate() < 10 ? '0' + time.getDate() : time.getDate();
  const hour = time.getHours() < 10 ? '0' + time.getHours() : time.getHours();
  const minute = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes(); // var second = time.getSeconds() < 10 ? "0" + time.getSeconds() : time.getSeconds()

  if (type === 'yyyy-mm-dd') {
    return [year, month, day].join('-');
  } else if (type === 'mm-dd') {
    return [month, day].join('-');
  } else if (type === 'MM-DD') {
    return `${month}月${day}日`;
  } else {
    return [year, month, day].join('-') + ' ' + [hour, minute].join(':'); // 取消秒的转换
    // return [year, month, day].join("-") + " " + [hour, minute, second].join(":")
  }
}

/***/ }),

/***/ 89:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@nuxt/components/dist/loader.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./components/ArticleCard.vue?vue&type=template&id=b932a4a0&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('nuxt-link',{attrs:{"custom":"","to":("/article/" + (_vm.item._id))}},[_c('div',{staticClass:"article-card"},[_c('img',{staticClass:"card-img",attrs:{"src":_vm.item.image,"alt":_vm.item.title}}),_vm._v(" "),_c('div',{staticClass:"card-content"},[_c('h4',{staticClass:"card-title"},[_vm._v(_vm._s(_vm.item.title))]),_vm._v(" "),_c('div',{staticClass:"card-desc"},[_vm._v("\n        "+_vm._s(_vm.item.info)+"\n      ")])]),_vm._v(" "),_c('div',{staticClass:"card-foot"},[_c('span',[_vm._v("更新时间："+_vm._s(_vm.time))])])])])}
var staticRenderFns = []


// CONCATENATED MODULE: ./components/ArticleCard.vue?vue&type=template&id=b932a4a0&scoped=true&

// EXTERNAL MODULE: ./node_modules/@nuxtjs/composition-api/dist/index.js
var dist = __webpack_require__(5);

// EXTERNAL MODULE: ./plugins/timeFormat.ts
var timeFormat = __webpack_require__(86);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--13-0!./node_modules/ts-loader??ref--13-1!./node_modules/@nuxt/components/dist/loader.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./components/ArticleCard.vue?vue&type=script&lang=ts&


/* harmony default export */ var ArticleCardvue_type_script_lang_ts_ = ({
  name: 'ArticleCard',
  props: {
    item: {
      type: Object,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: {}
    }
  },

  setup(props) {
    const time = Object(dist["computed"])(() => {
      return Object(timeFormat["a" /* timeFormat */])(props.item.updated);
    });
    return {
      time
    };
  }

});
// CONCATENATED MODULE: ./components/ArticleCard.vue?vue&type=script&lang=ts&
 /* harmony default export */ var components_ArticleCardvue_type_script_lang_ts_ = (ArticleCardvue_type_script_lang_ts_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(2);

// CONCATENATED MODULE: ./components/ArticleCard.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__(90)
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_ArticleCardvue_type_script_lang_ts_,
  render,
  staticRenderFns,
  false,
  injectStyles,
  "b932a4a0",
  "1af0b7d7"
  
)

/* harmony default export */ var ArticleCard = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 90:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_nuxt_components_dist_loader_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ArticleCard_vue_vue_type_style_index_0_id_b932a4a0_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(85);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_nuxt_components_dist_loader_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ArticleCard_vue_vue_type_style_index_0_id_b932a4a0_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_nuxt_components_dist_loader_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ArticleCard_vue_vue_type_style_index_0_id_b932a4a0_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_nuxt_components_dist_loader_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ArticleCard_vue_vue_type_style_index_0_id_b932a4a0_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_nuxt_components_dist_loader_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ArticleCard_vue_vue_type_style_index_0_id_b932a4a0_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ 91:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(3);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(false);
// Module
___CSS_LOADER_EXPORT___.push([module.i, "a[data-v-b932a4a0]{text-decoration:none}.article-card[data-v-b932a4a0]{width:240px;height:350px;margin-top:30px;margin-right:15px;margin-left:15px;background:#008b8b;border-radius:4px;display:flex;flex-direction:column;justify-content:space-between;cursor:pointer;transition:.5s}.article-card[data-v-b932a4a0]:hover{box-shadow:0 0 15px #9d7ac7;transition:.5s;transform:scale(1.04)}.article-card .card-img[data-v-b932a4a0]{width:100%;height:200px;overflow:hidden;border-radius:4px 4px 0 0}.article-card .card-content[data-v-b932a4a0]{color:#f8f9fa;margin:15px}.article-card .card-content .card-title[data-v-b932a4a0]{font-size:20px}.article-card .card-content .card-desc[data-v-b932a4a0]{margin-top:10px}.article-card .card-foot[data-v-b932a4a0]{color:#f8f9fa;margin:10px}", ""]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ })

};;
//# sourceMappingURL=article-card.js.map