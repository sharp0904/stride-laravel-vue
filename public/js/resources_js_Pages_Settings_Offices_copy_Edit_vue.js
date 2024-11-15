(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_Pages_Settings_Offices_copy_Edit_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/Common/Banner.vue?vue&type=script&lang=js":
/*!*******************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/Common/Banner.vue?vue&type=script&lang=js ***!
  \*******************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  data: function data() {
    return {
      show: true
    };
  },
  computed: {
    style: function style() {
      var _this$$page$props$fla;

      return ((_this$$page$props$fla = this.$page.props.flash) === null || _this$$page$props$fla === void 0 ? void 0 : _this$$page$props$fla.bannerStyle) || 'success';
    },
    message: function message() {
      var _this$$page$props$fla2;

      return ((_this$$page$props$fla2 = this.$page.props.flash) === null || _this$$page$props$fla2 === void 0 ? void 0 : _this$$page$props$fla2.banner) || '';
    }
  },
  watch: {
    style: function style() {
      this.show = true;
    },
    message: function message() {
      this.show = true;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/Common/Dropdown.vue?vue&type=script&lang=js":
/*!*********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/Common/Dropdown.vue?vue&type=script&lang=js ***!
  \*********************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  props: {
    align: {
      "default": "right"
    },
    width: {
      "default": "48"
    },
    contentClasses: {
      "default": function _default() {
        return ["py-1", "bg-white"];
      }
    }
  },
  setup: function setup() {
    var open = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(false);

    var closeOnEscape = function closeOnEscape(e) {
      if (open.value && e.keyCode === 27) {
        open.value = false;
      }
    };

    (0,vue__WEBPACK_IMPORTED_MODULE_0__.onMounted)(function () {
      return document.addEventListener("keydown", closeOnEscape);
    });
    (0,vue__WEBPACK_IMPORTED_MODULE_0__.onUnmounted)(function () {
      return document.removeEventListener("keydown", closeOnEscape);
    });
    return {
      open: open
    };
  },
  computed: {
    widthClass: function widthClass() {
      return {
        48: "w-48"
      }[this.width.toString()];
    },
    alignmentClasses: function alignmentClasses() {
      if (this.align === "left") {
        return "origin-top-left left-0";
      } else if (this.align === "right") {
        return "origin-top-right right-0";
      } else {
        return "origin-top";
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/Common/InputError.vue?vue&type=script&setup=true&lang=js":
/*!**********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/Common/InputError.vue?vue&type=script&setup=true&lang=js ***!
  \**********************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  __name: 'InputError',
  props: {
    message: null
  },
  setup: function setup(__props, _ref) {
    var expose = _ref.expose;
    expose();
    var __returned__ = {};
    Object.defineProperty(__returned__, '__isScriptSetup', {
      enumerable: false,
      value: true
    });
    return __returned__;
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Layouts/AppLayout.vue?vue&type=script&setup=true&lang=js":
/*!***********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Layouts/AppLayout.vue?vue&type=script&setup=true&lang=js ***!
  \***********************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Layouts_Partials_Navbar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/Layouts/Partials/Navbar */ "./resources/js/Layouts/Partials/Navbar.vue");
/* harmony import */ var _Components_Common_Banner__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/Components/Common/Banner */ "./resources/js/Components/Common/Banner.vue");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  __name: 'AppLayout',
  setup: function setup(__props, _ref) {
    var expose = _ref.expose;
    expose();
    var __returned__ = {
      Navbar: _Layouts_Partials_Navbar__WEBPACK_IMPORTED_MODULE_0__["default"],
      Banner: _Components_Common_Banner__WEBPACK_IMPORTED_MODULE_1__["default"]
    };
    Object.defineProperty(__returned__, '__isScriptSetup', {
      enumerable: false,
      value: true
    });
    return __returned__;
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Layouts/Partials/Navbar.vue?vue&type=script&setup=true&lang=js":
/*!*****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Layouts/Partials/Navbar.vue?vue&type=script&setup=true&lang=js ***!
  \*****************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");
/* harmony import */ var _Components_Common_Dropdown__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/Components/Common/Dropdown */ "./resources/js/Components/Common/Dropdown.vue");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  __name: 'Navbar',
  setup: function setup(__props, _ref) {
    var expose = _ref.expose;
    expose();
    var isBurgerMenu = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(false);

    var toggeBurgerMenu = function toggeBurgerMenu() {
      isBurgerMenu.value = !isBurgerMenu.value;
    };

    var __returned__ = {
      isBurgerMenu: isBurgerMenu,
      toggeBurgerMenu: toggeBurgerMenu,
      ref: vue__WEBPACK_IMPORTED_MODULE_0__.ref,
      Dropdown: _Components_Common_Dropdown__WEBPACK_IMPORTED_MODULE_1__["default"]
    };
    Object.defineProperty(__returned__, '__isScriptSetup', {
      enumerable: false,
      value: true
    });
    return __returned__;
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Layouts/SettingsLayout.vue?vue&type=script&setup=true&lang=js":
/*!****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Layouts/SettingsLayout.vue?vue&type=script&setup=true&lang=js ***!
  \****************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Layouts_AppLayout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/Layouts/AppLayout */ "./resources/js/Layouts/AppLayout.vue");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  __name: 'SettingsLayout',
  setup: function setup(__props, _ref) {
    var expose = _ref.expose;
    expose();
    var __returned__ = {
      AppLayout: _Layouts_AppLayout__WEBPACK_IMPORTED_MODULE_0__["default"]
    };
    Object.defineProperty(__returned__, '__isScriptSetup', {
      enumerable: false,
      value: true
    });
    return __returned__;
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Settings/Offices (copy)/Edit.vue?vue&type=script&setup=true&lang=js":
/*!****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Settings/Offices (copy)/Edit.vue?vue&type=script&setup=true&lang=js ***!
  \****************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Layouts_SettingsLayout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/Layouts/SettingsLayout */ "./resources/js/Layouts/SettingsLayout.vue");
/* harmony import */ var _Components_Common_InputError__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/Components/Common/InputError */ "./resources/js/Components/Common/InputError.vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");
/* harmony import */ var _inertiajs_inertia__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @inertiajs/inertia */ "./node_modules/@inertiajs/inertia/dist/index.js");
/* harmony import */ var vue_select__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vue-select */ "./node_modules/vue-select/dist/vue-select.js");
/* harmony import */ var vue_select__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(vue_select__WEBPACK_IMPORTED_MODULE_4__);





/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  __name: 'Edit',
  props: {
    errors: Object,
    office: Object,
    countries: Array
  },
  setup: function setup(__props, _ref) {
    var expose = _ref.expose;
    expose();
    var props = __props;
    var processing = (0,vue__WEBPACK_IMPORTED_MODULE_2__.ref)(false);
    var form = (0,vue__WEBPACK_IMPORTED_MODULE_2__.reactive)({
      name: props.office.name,
      email: props.office.email,
      phone_number: props.office.phone_number,
      address_line_1: props.office.address_line_1,
      address_line_2: props.office.address_line_2,
      zip_code: props.office.zip_code,
      city: props.office.city,
      state: props.office.state,
      country: props.office.country
    });

    var submit = function submit() {
      _inertiajs_inertia__WEBPACK_IMPORTED_MODULE_3__.Inertia.put(route('offices.update', props.office.id), form, {
        onStart: function onStart() {
          processing.value = true;
        },
        onFinish: function onFinish() {
          processing.value = false;
        }
      });
    };

    var __returned__ = {
      props: props,
      processing: processing,
      form: form,
      submit: submit,
      SettingsLayout: _Layouts_SettingsLayout__WEBPACK_IMPORTED_MODULE_0__["default"],
      InputError: _Components_Common_InputError__WEBPACK_IMPORTED_MODULE_1__["default"],
      reactive: vue__WEBPACK_IMPORTED_MODULE_2__.reactive,
      ref: vue__WEBPACK_IMPORTED_MODULE_2__.ref,
      Inertia: _inertiajs_inertia__WEBPACK_IMPORTED_MODULE_3__.Inertia,
      vSelect: (vue_select__WEBPACK_IMPORTED_MODULE_4___default())
    };
    Object.defineProperty(__returned__, '__isScriptSetup', {
      enumerable: false,
      value: true
    });
    return __returned__;
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/Common/Banner.vue?vue&type=template&id=e66c2896":
/*!***********************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/Common/Banner.vue?vue&type=template&id=e66c2896 ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

var _hoisted_1 = {
  "class": "max-w-screen-xl mx-auto py-2 px-3 sm:px-6 lg:px-8 mb-3"
};
var _hoisted_2 = {
  "class": "flex items-center justify-between flex-wrap"
};
var _hoisted_3 = {
  "class": "w-0 flex-1 flex items-center min-w-0"
};
var _hoisted_4 = {
  key: 0,
  "class": "h-5 w-5 text-white",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor"
};

var _hoisted_5 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
}, null, -1
/* HOISTED */
);

var _hoisted_6 = [_hoisted_5];
var _hoisted_7 = {
  key: 1,
  "class": "h-5 w-5 text-white",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor"
};

var _hoisted_8 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
}, null, -1
/* HOISTED */
);

var _hoisted_9 = [_hoisted_8];
var _hoisted_10 = {
  "class": "ml-3 font-medium text-sm text-white truncate"
};
var _hoisted_11 = {
  "class": "flex-shrink-0 sm:ml-3"
};

var _hoisted_12 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("svg", {
  "class": "h-5 w-5 text-white",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor"
}, [/*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  d: "M6 18L18 6M6 6l12 12"
})], -1
/* HOISTED */
);

var _hoisted_13 = [_hoisted_12];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", null, [$data.show && $options.message ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
    key: 0,
    "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["rounded", {
      'bg-tc-primary-dark': $options.style === 'success',
      'bg-red-700': $options.style === 'danger'
    }])
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["flex p-2 rounded-lg", {
      'bg-tc-primary': $options.style === 'success',
      'bg-red-600': $options.style === 'danger'
    }])
  }, [$options.style === 'success' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("svg", _hoisted_4, _hoisted_6)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $options.style === 'danger' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("svg", _hoisted_7, _hoisted_9)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)], 2
  /* CLASS */
  ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_10, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.message), 1
  /* TEXT */
  )]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_11, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["-mr-1 flex p-2 rounded-md focus:outline-none sm:-mr-2 transition", {
      'hover:bg-tc-primary focus:bg-tc-primary': $options.style === 'success',
      'hover:bg-red-600 focus:bg-red-600': $options.style === 'danger'
    }]),
    "aria-label": "Dismiss",
    onClick: _cache[0] || (_cache[0] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)(function ($event) {
      return $data.show = false;
    }, ["prevent"]))
  }, _hoisted_13, 2
  /* CLASS */
  )])])])], 2
  /* CLASS */
  )) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]);
}

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/Common/Dropdown.vue?vue&type=template&id=06d07dda":
/*!*************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/Common/Dropdown.vue?vue&type=template&id=06d07dda ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

var _hoisted_1 = {
  "class": "relative"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    onClick: _cache[0] || (_cache[0] = function ($event) {
      return $setup.open = !$setup.open;
    })
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.renderSlot)(_ctx.$slots, "trigger")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Full Screen Dropdown Overlay "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    "class": "fixed inset-0 z-40",
    onClick: _cache[1] || (_cache[1] = function ($event) {
      return $setup.open = false;
    })
  }, null, 512
  /* NEED_PATCH */
  ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, $setup.open]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(vue__WEBPACK_IMPORTED_MODULE_0__.Transition, {
    "enter-active-class": "transition ease-out duration-200",
    "enter-from-class": "transform opacity-0 scale-95",
    "enter-to-class": "transform opacity-100 scale-100",
    "leave-active-class": "transition ease-in duration-75",
    "leave-from-class": "transform opacity-100 scale-100",
    "leave-to-class": "transform opacity-0 scale-95",
    persisted: ""
  }, {
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
        "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["absolute z-50 mt-2 rounded-md shadow-lg", [$options.widthClass, $options.alignmentClasses]]),
        style: {
          "display": "none"
        },
        onClick: _cache[2] || (_cache[2] = function ($event) {
          return $setup.open = false;
        })
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
        "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["rounded-md ring-1 ring-black ring-opacity-5", $props.contentClasses])
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.renderSlot)(_ctx.$slots, "content")], 2
      /* CLASS */
      )], 2
      /* CLASS */
      ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, $setup.open]])];
    }),
    _: 3
    /* FORWARDED */

  })]);
}

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/Common/InputError.vue?vue&type=template&id=603cfb67":
/*!***************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/Common/InputError.vue?vue&type=template&id=603cfb67 ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

var _hoisted_1 = ["textContent"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)(((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
    textContent: (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.message),
    "class": "text-red-500 text-xs mt-1"
  }, null, 8
  /* PROPS */
  , _hoisted_1)), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, $props.message]]);
}

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Layouts/AppLayout.vue?vue&type=template&id=5663af57":
/*!****************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Layouts/AppLayout.vue?vue&type=template&id=5663af57 ***!
  \****************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

var _hoisted_1 = {
  "class": "max-w-7xl mx-auto py-3 px-2 sm:px-6 lg:px-8"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)($setup["Navbar"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("main", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)($setup["Banner"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderSlot)(_ctx.$slots, "default")])], 64
  /* STABLE_FRAGMENT */
  );
}

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Layouts/Partials/Navbar.vue?vue&type=template&id=00d9d70e":
/*!**********************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Layouts/Partials/Navbar.vue?vue&type=template&id=00d9d70e ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

var _hoisted_1 = {
  "class": "bg-gray-100 shadow"
};
var _hoisted_2 = {
  "class": "max-w-7xl mx-auto px-2 sm:px-6 lg:px-8"
};
var _hoisted_3 = {
  "class": "relative flex items-center justify-between h-16"
};
var _hoisted_4 = {
  "class": "absolute inset-y-0 left-0 flex items-center sm:hidden"
};

var _hoisted_5 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
  "class": "sr-only"
}, "Open main menu", -1
/* HOISTED */
);

var _hoisted_6 = {
  "class": "block h-6 w-6",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  "stroke-width": "2",
  stroke: "currentColor",
  "aria-hidden": "true"
};

var _hoisted_7 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M4 6h16M4 12h16M4 18h16"
}, null, -1
/* HOISTED */
);

var _hoisted_8 = [_hoisted_7];
var _hoisted_9 = {
  "class": "h-6 w-6",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  "stroke-width": "2",
  stroke: "currentColor",
  "aria-hidden": "true"
};

var _hoisted_10 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M6 18L18 6M6 6l12 12"
}, null, -1
/* HOISTED */
);

var _hoisted_11 = [_hoisted_10];
var _hoisted_12 = {
  "class": "flex-1 flex items-center justify-center sm:items-stretch sm:justify-start"
};

var _hoisted_13 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
  "class": "flex-shrink-0 flex items-center"
}, [/*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("img", {
  "class": "h-16 w-auto",
  src: "/assets/images/logo.png",
  alt: "Enhance"
})], -1
/* HOISTED */
);

var _hoisted_14 = {
  "class": "hidden sm:block sm:ml-6 lg:flex lg:items-center"
};
var _hoisted_15 = {
  "class": "flex items-center space-x-4"
};

var _hoisted_16 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Dashboard");

var _hoisted_17 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Calendar ");

var _hoisted_18 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Hosts");

var _hoisted_19 = {
  "class": "absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
};
var _hoisted_20 = {
  type: "button",
  "class": "flex text-sm hover:text-tc-primary",
  "aria-expanded": "false",
  "aria-haspopup": "true"
};

var _hoisted_21 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
  "class": "sr-only"
}, "Open user menu", -1
/* HOISTED */
);

var _hoisted_22 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Your Profile ");

var _hoisted_23 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Settings");

var _hoisted_24 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Sign out");

var _hoisted_25 = {
  "class": "sm:hidden"
};
var _hoisted_26 = {
  "class": "px-2 pt-2 pb-3 space-y-1"
};

var _hoisted_27 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Dashboard");

var _hoisted_28 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Calendar ");

var _hoisted_29 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Hosts ");

function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_Link = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("Link");

  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("nav", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Mobile menu button"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    onClick: _cache[0] || (_cache[0] = function ($event) {
      return $setup.toggeBurgerMenu();
    }),
    "class": "inline-flex items-center justify-center p-2 rounded-md text-tc-primary focus:outline-none",
    "aria-expanded": "false"
  }, [_hoisted_5, (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)(((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("svg", _hoisted_6, _hoisted_8, 512
  /* NEED_PATCH */
  )), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, !$setup.isBurgerMenu]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)(((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("svg", _hoisted_9, _hoisted_11, 512
  /* NEED_PATCH */
  )), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, $setup.isBurgerMenu]])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_12, [_hoisted_13, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_14, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_15, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Link, {
    href: _ctx.route('dashboard'),
    "class": "text-gray-500 hover:text-tc-primary px-3 py-2 rounded-md font-medium"
  }, {
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [_hoisted_16];
    }),
    _: 1
    /* STABLE */

  }, 8
  /* PROPS */
  , ["href"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Link, {
    href: "#",
    "class": "text-gray-500 hover:text-tc-primary px-3 py-2 rounded-md font-medium"
  }, {
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [_hoisted_17];
    }),
    _: 1
    /* STABLE */

  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Link, {
    href: _ctx.route('hosts.index'),
    "class": "text-gray-500 hover:text-tc-primary px-3 py-2 rounded-md font-medium"
  }, {
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [_hoisted_18];
    }),
    _: 1
    /* STABLE */

  }, 8
  /* PROPS */
  , ["href"])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_19, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)($setup["Dropdown"], {
    align: "right",
    width: "48"
  }, {
    trigger: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", _hoisted_20, [_hoisted_21, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.$page.props.user.first_name), 1
      /* TEXT */
      )])];
    }),
    content: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Link, {
        href: "#",
        "class": "block px-4 py-2 text-sm text-gray-700",
        role: "menuitem",
        tabindex: "-1"
      }, {
        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
          return [_hoisted_22];
        }),
        _: 1
        /* STABLE */

      }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Link, {
        href: _ctx.route('roles.index'),
        "class": "block px-4 py-2 text-sm text-gray-700",
        role: "menuitem",
        tabindex: "-1"
      }, {
        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
          return [_hoisted_23];
        }),
        _: 1
        /* STABLE */

      }, 8
      /* PROPS */
      , ["href"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Link, {
        href: _ctx.route('logout'),
        "class": "block px-4 py-2 text-sm text-gray-700",
        role: "menuitem",
        tabindex: "-1",
        method: "post",
        as: "button"
      }, {
        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
          return [_hoisted_24];
        }),
        _: 1
        /* STABLE */

      }, 8
      /* PROPS */
      , ["href"])];
    }),
    _: 1
    /* STABLE */

  })])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_25, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_26, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Link, {
    href: _ctx.route('dashboard'),
    "class": "bg-tc-primary text-white block px-3 py-2 rounded-md text-base font-medium"
  }, {
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [_hoisted_27];
    }),
    _: 1
    /* STABLE */

  }, 8
  /* PROPS */
  , ["href"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Link, {
    href: _ctx.route('dashboard'),
    "class": "text-gray-600 block px-3 py-2 rounded-md text-base font-medium"
  }, {
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [_hoisted_28];
    }),
    _: 1
    /* STABLE */

  }, 8
  /* PROPS */
  , ["href"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Link, {
    href: _ctx.route('hosts.index'),
    "class": "text-gray-600 block px-3 py-2 rounded-md text-base font-medium"
  }, {
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [_hoisted_29];
    }),
    _: 1
    /* STABLE */

  }, 8
  /* PROPS */
  , ["href"])])], 512
  /* NEED_PATCH */
  ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, $setup.isBurgerMenu]])]);
}

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Layouts/SettingsLayout.vue?vue&type=template&id=31b0a831":
/*!*********************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Layouts/SettingsLayout.vue?vue&type=template&id=31b0a831 ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

var _hoisted_1 = {
  "class": "grid grid-cols-5 gap-4"
};
var _hoisted_2 = {
  "class": "col-span-5 md:col-span-1 bg-white rounded shadow p-3"
};

var _hoisted_3 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Profile");

var _hoisted_4 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Roles");

var _hoisted_5 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Offices");

var _hoisted_6 = {
  "class": "col-span-5 md:col-span-4"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_Link = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("Link");

  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)($setup["AppLayout"], null, {
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("li", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Link, {
        href: "#",
        "class": "px-4 py-2 bg-gray-50 w-full block mb-1 hover:text-tc-primary"
      }, {
        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
          return [_hoisted_3];
        }),
        _: 1
        /* STABLE */

      })]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("li", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Link, {
        href: _ctx.route('roles.index'),
        "class": "px-4 py-2 bg-gray-50 w-full block mb-1 hover:text-tc-primary"
      }, {
        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
          return [_hoisted_4];
        }),
        _: 1
        /* STABLE */

      }, 8
      /* PROPS */
      , ["href"])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("li", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Link, {
        href: _ctx.route('offices.index'),
        "class": "px-4 py-2 bg-gray-50 w-full block mb-1 hover:text-tc-primary"
      }, {
        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
          return [_hoisted_5];
        }),
        _: 1
        /* STABLE */

      }, 8
      /* PROPS */
      , ["href"])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_6, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.renderSlot)(_ctx.$slots, "default")])])];
    }),
    _: 3
    /* FORWARDED */

  });
}

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Settings/Offices (copy)/Edit.vue?vue&type=template&id=54dfe8e1":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Settings/Offices (copy)/Edit.vue?vue&type=template&id=54dfe8e1 ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

var _hoisted_1 = {
  "class": "bg-white rounded shadow"
};
var _hoisted_2 = {
  "class": "flex items-center justify-between px-6 py-3"
};

var _hoisted_3 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h1", null, "Update Office", -1
/* HOISTED */
);

var _hoisted_4 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Back");

var _hoisted_5 = {
  "class": "border-t"
};
var _hoisted_6 = ["onSubmit"];
var _hoisted_7 = {
  "class": "px-6 py-4"
};
var _hoisted_8 = {
  "class": "grid grid-cols-2 gap-4"
};
var _hoisted_9 = {
  "class": "col-span-2 lg:col-span-1 mt-2"
};

var _hoisted_10 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
  "class": "block font-medium text-sm text-gray-700",
  "for": "name"
}, "Name", -1
/* HOISTED */
);

var _hoisted_11 = {
  "class": "grid grid-cols-2 gap-4"
};
var _hoisted_12 = {
  "class": "col-span-2 lg:col-span-1 mt-2"
};

var _hoisted_13 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
  "class": "block font-medium text-sm text-gray-700",
  "for": "email"
}, "Email", -1
/* HOISTED */
);

var _hoisted_14 = {
  "class": "grid grid-cols-2 gap-4"
};
var _hoisted_15 = {
  "class": "col-span-2 lg:col-span-1 mt-2"
};

var _hoisted_16 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
  "class": "block font-medium text-sm text-gray-700",
  "for": "phone"
}, "Phone Number", -1
/* HOISTED */
);

var _hoisted_17 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", {
  "class": "font-semibold text-gray-800 mt-3 mb-1 uppercase"
}, "Address", -1
/* HOISTED */
);

var _hoisted_18 = {
  "class": "grid grid-cols-2 gap-4"
};
var _hoisted_19 = {
  "class": "col-span-2 lg:col-span-1 mt-2"
};

var _hoisted_20 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
  "class": "block font-medium text-sm text-gray-700",
  "for": "address_line_1"
}, "Address Line 1", -1
/* HOISTED */
);

var _hoisted_21 = {
  "class": "col-span-2 lg:col-span-1 mt-2"
};

var _hoisted_22 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
  "class": "block font-medium text-sm text-gray-700",
  "for": "address_line_2"
}, "Address Line 2", -1
/* HOISTED */
);

var _hoisted_23 = {
  "class": "col-span-2 lg:col-span-1 mt-2"
};

var _hoisted_24 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
  "class": "block font-medium text-sm text-gray-700",
  "for": "zip_code"
}, "Zip Code", -1
/* HOISTED */
);

var _hoisted_25 = {
  "class": "col-span-2 lg:col-span-1 mt-2"
};

var _hoisted_26 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
  "class": "block font-medium text-sm text-gray-700",
  "for": "phone"
}, "City", -1
/* HOISTED */
);

var _hoisted_27 = {
  "class": "col-span-2 lg:col-span-1 mt-2"
};

var _hoisted_28 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
  "class": "block font-medium text-sm text-gray-700",
  "for": "state"
}, "State", -1
/* HOISTED */
);

var _hoisted_29 = {
  "class": "col-span-2 lg:col-span-1 mt-2"
};

var _hoisted_30 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
  "class": "block font-medium text-sm text-gray-700",
  "for": "country"
}, "Country", -1
/* HOISTED */
);

var _hoisted_31 = {
  "class": "px-6 pb-4 text-right"
};
var _hoisted_32 = ["processing"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_Head = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("Head");

  var _component_Link = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("Link");

  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Head, {
    title: "Update Office"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)($setup["SettingsLayout"], null, {
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      var _$props$errors, _$props$errors2, _$props$errors3, _$props$errors4, _$props$errors5, _$props$errors6, _$props$errors7, _$props$errors8, _$props$errors9;

      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [_hoisted_3, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Link, {
        "class": "btn btn-primary",
        href: _ctx.route('offices.index'),
        as: "button"
      }, {
        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
          return [_hoisted_4];
        }),
        _: 1
        /* STABLE */

      }, 8
      /* PROPS */
      , ["href"])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("form", {
        onSubmit: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($setup.submit, ["prevent"])
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_7, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_8, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_9, [_hoisted_10, (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
        id: "name",
        type: "text",
        "class": "form-input mt-1 block w-full",
        "onUpdate:modelValue": _cache[0] || (_cache[0] = function ($event) {
          return $setup.form.name = $event;
        }),
        autofocus: ""
      }, null, 512
      /* NEED_PATCH */
      ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $setup.form.name]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)($setup["InputError"], {
        message: (_$props$errors = $props.errors) === null || _$props$errors === void 0 ? void 0 : _$props$errors.name
      }, null, 8
      /* PROPS */
      , ["message"])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_11, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_12, [_hoisted_13, (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
        id: "email",
        type: "email",
        "class": "form-input mt-1 block w-full",
        "onUpdate:modelValue": _cache[1] || (_cache[1] = function ($event) {
          return $setup.form.email = $event;
        })
      }, null, 512
      /* NEED_PATCH */
      ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $setup.form.email]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)($setup["InputError"], {
        message: (_$props$errors2 = $props.errors) === null || _$props$errors2 === void 0 ? void 0 : _$props$errors2.email
      }, null, 8
      /* PROPS */
      , ["message"])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_14, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_15, [_hoisted_16, (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
        id: "phone",
        type: "text",
        "class": "form-input mt-1 block w-full",
        "onUpdate:modelValue": _cache[2] || (_cache[2] = function ($event) {
          return $setup.form.phone_number = $event;
        })
      }, null, 512
      /* NEED_PATCH */
      ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $setup.form.phone_number]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)($setup["InputError"], {
        message: (_$props$errors3 = $props.errors) === null || _$props$errors3 === void 0 ? void 0 : _$props$errors3.phone_number
      }, null, 8
      /* PROPS */
      , ["message"])])]), _hoisted_17, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_18, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_19, [_hoisted_20, (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("textarea", {
        id: "address_line_1",
        rows: "2",
        "class": "form-textarea mt-1 block w-full",
        "onUpdate:modelValue": _cache[3] || (_cache[3] = function ($event) {
          return $setup.form.address_line_1 = $event;
        })
      }, null, 512
      /* NEED_PATCH */
      ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $setup.form.address_line_1]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)($setup["InputError"], {
        message: (_$props$errors4 = $props.errors) === null || _$props$errors4 === void 0 ? void 0 : _$props$errors4.address_line_1
      }, null, 8
      /* PROPS */
      , ["message"])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_21, [_hoisted_22, (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("textarea", {
        id: "address_line_2",
        rows: "2",
        "class": "form-textarea mt-1 block w-full",
        "onUpdate:modelValue": _cache[4] || (_cache[4] = function ($event) {
          return $setup.form.address_line_2 = $event;
        })
      }, null, 512
      /* NEED_PATCH */
      ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $setup.form.address_line_2]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)($setup["InputError"], {
        message: (_$props$errors5 = $props.errors) === null || _$props$errors5 === void 0 ? void 0 : _$props$errors5.address_line_2
      }, null, 8
      /* PROPS */
      , ["message"])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_23, [_hoisted_24, (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
        id: "zip_code",
        type: "text",
        "class": "form-input mt-1 block w-full",
        "onUpdate:modelValue": _cache[5] || (_cache[5] = function ($event) {
          return $setup.form.zip_code = $event;
        })
      }, null, 512
      /* NEED_PATCH */
      ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $setup.form.zip_code]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)($setup["InputError"], {
        message: (_$props$errors6 = $props.errors) === null || _$props$errors6 === void 0 ? void 0 : _$props$errors6.zip_code
      }, null, 8
      /* PROPS */
      , ["message"])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_25, [_hoisted_26, (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
        id: "city",
        type: "text",
        "class": "form-input mt-1 block w-full",
        "onUpdate:modelValue": _cache[6] || (_cache[6] = function ($event) {
          return $setup.form.city = $event;
        })
      }, null, 512
      /* NEED_PATCH */
      ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $setup.form.city]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)($setup["InputError"], {
        message: (_$props$errors7 = $props.errors) === null || _$props$errors7 === void 0 ? void 0 : _$props$errors7.city
      }, null, 8
      /* PROPS */
      , ["message"])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_27, [_hoisted_28, (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
        id: "state",
        type: "text",
        "class": "form-input mt-1 block w-full",
        "onUpdate:modelValue": _cache[7] || (_cache[7] = function ($event) {
          return $setup.form.state = $event;
        })
      }, null, 512
      /* NEED_PATCH */
      ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $setup.form.state]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)($setup["InputError"], {
        message: (_$props$errors8 = $props.errors) === null || _$props$errors8 === void 0 ? void 0 : _$props$errors8.state
      }, null, 8
      /* PROPS */
      , ["message"])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_29, [_hoisted_30, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)($setup["vSelect"], {
        id: "country",
        options: $props.countries,
        label: "country_name",
        "class": "mt-1 block w-full",
        modelValue: $setup.form.country,
        "onUpdate:modelValue": _cache[8] || (_cache[8] = function ($event) {
          return $setup.form.country = $event;
        }),
        reduce: function reduce(country) {
          return country.country_name;
        }
      }, null, 8
      /* PROPS */
      , ["options", "modelValue", "reduce"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)($setup["InputError"], {
        message: (_$props$errors9 = $props.errors) === null || _$props$errors9 === void 0 ? void 0 : _$props$errors9.country
      }, null, 8
      /* PROPS */
      , ["message"])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_31, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
        type: "submit",
        "class": "ml-2 btn btn-primary",
        processing: $setup.processing
      }, "Save", 8
      /* PROPS */
      , _hoisted_32)])], 40
      /* PROPS, HYDRATE_EVENTS */
      , _hoisted_6)])])];
    }),
    _: 1
    /* STABLE */

  })], 64
  /* STABLE_FRAGMENT */
  );
}

/***/ }),

/***/ "./node_modules/vue-loader/dist/exportHelper.js":
/*!******************************************************!*\
  !*** ./node_modules/vue-loader/dist/exportHelper.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
// runtime helper for setting properties on components
// in a tree-shakable way
exports["default"] = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
        target[key] = val;
    }
    return target;
};


/***/ }),

/***/ "./resources/js/Components/Common/Banner.vue":
/*!***************************************************!*\
  !*** ./resources/js/Components/Common/Banner.vue ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Banner_vue_vue_type_template_id_e66c2896__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Banner.vue?vue&type=template&id=e66c2896 */ "./resources/js/Components/Common/Banner.vue?vue&type=template&id=e66c2896");
/* harmony import */ var _Banner_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Banner.vue?vue&type=script&lang=js */ "./resources/js/Components/Common/Banner.vue?vue&type=script&lang=js");
/* harmony import */ var _home_hussain_Code_upwork_enhance_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,_home_hussain_Code_upwork_enhance_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_Banner_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_Banner_vue_vue_type_template_id_e66c2896__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/js/Components/Common/Banner.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/Components/Common/Dropdown.vue":
/*!*****************************************************!*\
  !*** ./resources/js/Components/Common/Dropdown.vue ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Dropdown_vue_vue_type_template_id_06d07dda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Dropdown.vue?vue&type=template&id=06d07dda */ "./resources/js/Components/Common/Dropdown.vue?vue&type=template&id=06d07dda");
/* harmony import */ var _Dropdown_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Dropdown.vue?vue&type=script&lang=js */ "./resources/js/Components/Common/Dropdown.vue?vue&type=script&lang=js");
/* harmony import */ var _home_hussain_Code_upwork_enhance_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,_home_hussain_Code_upwork_enhance_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_Dropdown_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_Dropdown_vue_vue_type_template_id_06d07dda__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/js/Components/Common/Dropdown.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/Components/Common/InputError.vue":
/*!*******************************************************!*\
  !*** ./resources/js/Components/Common/InputError.vue ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _InputError_vue_vue_type_template_id_603cfb67__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./InputError.vue?vue&type=template&id=603cfb67 */ "./resources/js/Components/Common/InputError.vue?vue&type=template&id=603cfb67");
/* harmony import */ var _InputError_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./InputError.vue?vue&type=script&setup=true&lang=js */ "./resources/js/Components/Common/InputError.vue?vue&type=script&setup=true&lang=js");
/* harmony import */ var _home_hussain_Code_upwork_enhance_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,_home_hussain_Code_upwork_enhance_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_InputError_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_InputError_vue_vue_type_template_id_603cfb67__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/js/Components/Common/InputError.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/Layouts/AppLayout.vue":
/*!********************************************!*\
  !*** ./resources/js/Layouts/AppLayout.vue ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _AppLayout_vue_vue_type_template_id_5663af57__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AppLayout.vue?vue&type=template&id=5663af57 */ "./resources/js/Layouts/AppLayout.vue?vue&type=template&id=5663af57");
/* harmony import */ var _AppLayout_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AppLayout.vue?vue&type=script&setup=true&lang=js */ "./resources/js/Layouts/AppLayout.vue?vue&type=script&setup=true&lang=js");
/* harmony import */ var _home_hussain_Code_upwork_enhance_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,_home_hussain_Code_upwork_enhance_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_AppLayout_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_AppLayout_vue_vue_type_template_id_5663af57__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/js/Layouts/AppLayout.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/Layouts/Partials/Navbar.vue":
/*!**************************************************!*\
  !*** ./resources/js/Layouts/Partials/Navbar.vue ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Navbar_vue_vue_type_template_id_00d9d70e__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Navbar.vue?vue&type=template&id=00d9d70e */ "./resources/js/Layouts/Partials/Navbar.vue?vue&type=template&id=00d9d70e");
/* harmony import */ var _Navbar_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Navbar.vue?vue&type=script&setup=true&lang=js */ "./resources/js/Layouts/Partials/Navbar.vue?vue&type=script&setup=true&lang=js");
/* harmony import */ var _home_hussain_Code_upwork_enhance_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,_home_hussain_Code_upwork_enhance_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_Navbar_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_Navbar_vue_vue_type_template_id_00d9d70e__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/js/Layouts/Partials/Navbar.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/Layouts/SettingsLayout.vue":
/*!*************************************************!*\
  !*** ./resources/js/Layouts/SettingsLayout.vue ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _SettingsLayout_vue_vue_type_template_id_31b0a831__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SettingsLayout.vue?vue&type=template&id=31b0a831 */ "./resources/js/Layouts/SettingsLayout.vue?vue&type=template&id=31b0a831");
/* harmony import */ var _SettingsLayout_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SettingsLayout.vue?vue&type=script&setup=true&lang=js */ "./resources/js/Layouts/SettingsLayout.vue?vue&type=script&setup=true&lang=js");
/* harmony import */ var _home_hussain_Code_upwork_enhance_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,_home_hussain_Code_upwork_enhance_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_SettingsLayout_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_SettingsLayout_vue_vue_type_template_id_31b0a831__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/js/Layouts/SettingsLayout.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/Pages/Settings/Offices (copy)/Edit.vue":
/*!*************************************************************!*\
  !*** ./resources/js/Pages/Settings/Offices (copy)/Edit.vue ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Edit_vue_vue_type_template_id_54dfe8e1__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Edit.vue?vue&type=template&id=54dfe8e1 */ "./resources/js/Pages/Settings/Offices (copy)/Edit.vue?vue&type=template&id=54dfe8e1");
/* harmony import */ var _Edit_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Edit.vue?vue&type=script&setup=true&lang=js */ "./resources/js/Pages/Settings/Offices (copy)/Edit.vue?vue&type=script&setup=true&lang=js");
/* harmony import */ var _home_hussain_Code_upwork_enhance_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,_home_hussain_Code_upwork_enhance_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_Edit_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_Edit_vue_vue_type_template_id_54dfe8e1__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/js/Pages/Settings/Offices (copy)/Edit.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/Components/Common/Banner.vue?vue&type=script&lang=js":
/*!***************************************************************************!*\
  !*** ./resources/js/Components/Common/Banner.vue?vue&type=script&lang=js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Banner_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Banner_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Banner.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/Common/Banner.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/Components/Common/Dropdown.vue?vue&type=script&lang=js":
/*!*****************************************************************************!*\
  !*** ./resources/js/Components/Common/Dropdown.vue?vue&type=script&lang=js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Dropdown_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Dropdown_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Dropdown.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/Common/Dropdown.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/Components/Common/InputError.vue?vue&type=script&setup=true&lang=js":
/*!******************************************************************************************!*\
  !*** ./resources/js/Components/Common/InputError.vue?vue&type=script&setup=true&lang=js ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_InputError_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_InputError_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./InputError.vue?vue&type=script&setup=true&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/Common/InputError.vue?vue&type=script&setup=true&lang=js");
 

/***/ }),

/***/ "./resources/js/Layouts/AppLayout.vue?vue&type=script&setup=true&lang=js":
/*!*******************************************************************************!*\
  !*** ./resources/js/Layouts/AppLayout.vue?vue&type=script&setup=true&lang=js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_AppLayout_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_AppLayout_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./AppLayout.vue?vue&type=script&setup=true&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Layouts/AppLayout.vue?vue&type=script&setup=true&lang=js");
 

/***/ }),

/***/ "./resources/js/Layouts/Partials/Navbar.vue?vue&type=script&setup=true&lang=js":
/*!*************************************************************************************!*\
  !*** ./resources/js/Layouts/Partials/Navbar.vue?vue&type=script&setup=true&lang=js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Navbar_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Navbar_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Navbar.vue?vue&type=script&setup=true&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Layouts/Partials/Navbar.vue?vue&type=script&setup=true&lang=js");
 

/***/ }),

/***/ "./resources/js/Layouts/SettingsLayout.vue?vue&type=script&setup=true&lang=js":
/*!************************************************************************************!*\
  !*** ./resources/js/Layouts/SettingsLayout.vue?vue&type=script&setup=true&lang=js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_SettingsLayout_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_SettingsLayout_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./SettingsLayout.vue?vue&type=script&setup=true&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Layouts/SettingsLayout.vue?vue&type=script&setup=true&lang=js");
 

/***/ }),

/***/ "./resources/js/Pages/Settings/Offices (copy)/Edit.vue?vue&type=script&setup=true&lang=js":
/*!************************************************************************************************!*\
  !*** ./resources/js/Pages/Settings/Offices (copy)/Edit.vue?vue&type=script&setup=true&lang=js ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Edit_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Edit_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Edit.vue?vue&type=script&setup=true&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Settings/Offices (copy)/Edit.vue?vue&type=script&setup=true&lang=js");
 

/***/ }),

/***/ "./resources/js/Components/Common/Banner.vue?vue&type=template&id=e66c2896":
/*!*********************************************************************************!*\
  !*** ./resources/js/Components/Common/Banner.vue?vue&type=template&id=e66c2896 ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Banner_vue_vue_type_template_id_e66c2896__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Banner_vue_vue_type_template_id_e66c2896__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Banner.vue?vue&type=template&id=e66c2896 */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/Common/Banner.vue?vue&type=template&id=e66c2896");


/***/ }),

/***/ "./resources/js/Components/Common/Dropdown.vue?vue&type=template&id=06d07dda":
/*!***********************************************************************************!*\
  !*** ./resources/js/Components/Common/Dropdown.vue?vue&type=template&id=06d07dda ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Dropdown_vue_vue_type_template_id_06d07dda__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Dropdown_vue_vue_type_template_id_06d07dda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Dropdown.vue?vue&type=template&id=06d07dda */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/Common/Dropdown.vue?vue&type=template&id=06d07dda");


/***/ }),

/***/ "./resources/js/Components/Common/InputError.vue?vue&type=template&id=603cfb67":
/*!*************************************************************************************!*\
  !*** ./resources/js/Components/Common/InputError.vue?vue&type=template&id=603cfb67 ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_InputError_vue_vue_type_template_id_603cfb67__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_InputError_vue_vue_type_template_id_603cfb67__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./InputError.vue?vue&type=template&id=603cfb67 */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/Common/InputError.vue?vue&type=template&id=603cfb67");


/***/ }),

/***/ "./resources/js/Layouts/AppLayout.vue?vue&type=template&id=5663af57":
/*!**************************************************************************!*\
  !*** ./resources/js/Layouts/AppLayout.vue?vue&type=template&id=5663af57 ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_AppLayout_vue_vue_type_template_id_5663af57__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_AppLayout_vue_vue_type_template_id_5663af57__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./AppLayout.vue?vue&type=template&id=5663af57 */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Layouts/AppLayout.vue?vue&type=template&id=5663af57");


/***/ }),

/***/ "./resources/js/Layouts/Partials/Navbar.vue?vue&type=template&id=00d9d70e":
/*!********************************************************************************!*\
  !*** ./resources/js/Layouts/Partials/Navbar.vue?vue&type=template&id=00d9d70e ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Navbar_vue_vue_type_template_id_00d9d70e__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Navbar_vue_vue_type_template_id_00d9d70e__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Navbar.vue?vue&type=template&id=00d9d70e */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Layouts/Partials/Navbar.vue?vue&type=template&id=00d9d70e");


/***/ }),

/***/ "./resources/js/Layouts/SettingsLayout.vue?vue&type=template&id=31b0a831":
/*!*******************************************************************************!*\
  !*** ./resources/js/Layouts/SettingsLayout.vue?vue&type=template&id=31b0a831 ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_SettingsLayout_vue_vue_type_template_id_31b0a831__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_SettingsLayout_vue_vue_type_template_id_31b0a831__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./SettingsLayout.vue?vue&type=template&id=31b0a831 */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Layouts/SettingsLayout.vue?vue&type=template&id=31b0a831");


/***/ }),

/***/ "./resources/js/Pages/Settings/Offices (copy)/Edit.vue?vue&type=template&id=54dfe8e1":
/*!*******************************************************************************************!*\
  !*** ./resources/js/Pages/Settings/Offices (copy)/Edit.vue?vue&type=template&id=54dfe8e1 ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Edit_vue_vue_type_template_id_54dfe8e1__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Edit_vue_vue_type_template_id_54dfe8e1__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Edit.vue?vue&type=template&id=54dfe8e1 */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Settings/Offices (copy)/Edit.vue?vue&type=template&id=54dfe8e1");


/***/ }),

/***/ "./node_modules/vue-select/dist/vue-select.js":
/*!****************************************************!*\
  !*** ./node_modules/vue-select/dist/vue-select.js ***!
  \****************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

!function(e,t){ true?module.exports=t(__webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js")):0}("undefined"!=typeof self?self:this,(function(e){return(()=>{var t={646:e=>{e.exports=function(e){if(Array.isArray(e)){for(var t=0,o=new Array(e.length);t<e.length;t++)o[t]=e[t];return o}}},713:e=>{e.exports=function(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}},860:e=>{e.exports=function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}},206:e=>{e.exports=function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}},319:(e,t,o)=>{var n=o(646),i=o(860),r=o(206);e.exports=function(e){return n(e)||i(e)||r()}},8:e=>{function t(o){return"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?e.exports=t=function(e){return typeof e}:e.exports=t=function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},t(o)}e.exports=t},744:(e,t)=>{"use strict";t.Z=(e,t)=>{for(const[o,n]of t)e[o]=n;return e}},748:t=>{"use strict";t.exports=e}},o={};function n(e){var i=o[e];if(void 0!==i)return i.exports;var r=o[e]={exports:{}};return t[e](r,r.exports,n),r.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var o in t)n.o(t,o)&&!n.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var i={};return(()=>{"use strict";n.r(i),n.d(i,{VueSelect:()=>R,default:()=>K,mixins:()=>I});var e=n(748),t=["dir"],o=["id","aria-expanded","aria-owns"],r={ref:"selectedOptions",class:"vs__selected-options"},s=["disabled","title","aria-label","onClick"],l={ref:"actions",class:"vs__actions"},a=["disabled"],c={class:"vs__spinner"},u=["id"],p=["id","aria-selected","onMouseover","onClick"],d={key:0,class:"vs__no-options"},h=(0,e.createTextVNode)(" Sorry, no matching options. "),f=["id"];var m=n(319),y=n.n(m),g=n(8),b=n.n(g),v=n(713),O=n.n(v);const w={props:{autoscroll:{type:Boolean,default:!0}},watch:{typeAheadPointer:function(){this.autoscroll&&this.maybeAdjustScroll()},open:function(e){var t=this;this.autoscroll&&e&&this.$nextTick((function(){return t.maybeAdjustScroll()}))}},methods:{maybeAdjustScroll:function(){var e,t=(null===(e=this.$refs.dropdownMenu)||void 0===e?void 0:e.children[this.typeAheadPointer])||!1;if(t){var o=this.getDropdownViewport(),n=t.getBoundingClientRect(),i=n.top,r=n.bottom,s=n.height;if(i<o.top)return this.$refs.dropdownMenu.scrollTop=t.offsetTop;if(r>o.bottom)return this.$refs.dropdownMenu.scrollTop=t.offsetTop-(o.height-s)}},getDropdownViewport:function(){return this.$refs.dropdownMenu?this.$refs.dropdownMenu.getBoundingClientRect():{height:0,top:0,bottom:0}}}},S={data:function(){return{typeAheadPointer:-1}},watch:{filteredOptions:function(){for(var e=0;e<this.filteredOptions.length;e++)if(this.selectable(this.filteredOptions[e])){this.typeAheadPointer=e;break}},open:function(e){e&&this.typeAheadToLastSelected()},selectedValue:function(){this.open&&this.typeAheadToLastSelected()}},methods:{typeAheadUp:function(){for(var e=this.typeAheadPointer-1;e>=0;e--)if(this.selectable(this.filteredOptions[e])){this.typeAheadPointer=e;break}},typeAheadDown:function(){for(var e=this.typeAheadPointer+1;e<this.filteredOptions.length;e++)if(this.selectable(this.filteredOptions[e])){this.typeAheadPointer=e;break}},typeAheadSelect:function(){var e=this.filteredOptions[this.typeAheadPointer];e&&this.selectable(e)&&this.select(e)},typeAheadToLastSelected:function(){this.typeAheadPointer=0!==this.selectedValue.length?this.filteredOptions.indexOf(this.selectedValue[this.selectedValue.length-1]):-1}}},V={props:{loading:{type:Boolean,default:!1}},data:function(){return{mutableLoading:!1}},watch:{search:function(){this.$emit("search",this.search,this.toggleLoading)},loading:function(e){this.mutableLoading=e}},methods:{toggleLoading:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;return this.mutableLoading=null==e?!this.mutableLoading:e}}};var B={xmlns:"http://www.w3.org/2000/svg",width:"10",height:"10"},P=[(0,e.createElementVNode)("path",{d:"M6.895455 5l2.842897-2.842898c.348864-.348863.348864-.914488 0-1.263636L9.106534.261648c-.348864-.348864-.914489-.348864-1.263636 0L5 3.104545 2.157102.261648c-.348863-.348864-.914488-.348864-1.263636 0L.261648.893466c-.348864.348864-.348864.914489 0 1.263636L3.104545 5 .261648 7.842898c-.348864.348863-.348864.914488 0 1.263636l.631818.631818c.348864.348864.914773.348864 1.263636 0L5 6.895455l2.842898 2.842897c.348863.348864.914772.348864 1.263636 0l.631818-.631818c.348864-.348864.348864-.914489 0-1.263636L6.895455 5z"},null,-1)];var _=n(744);const k={},x=(0,_.Z)(k,[["render",function(t,o){return(0,e.openBlock)(),(0,e.createElementBlock)("svg",B,P)}]]);var C={xmlns:"http://www.w3.org/2000/svg",width:"14",height:"10"},D=[(0,e.createElementVNode)("path",{d:"M9.211364 7.59931l4.48338-4.867229c.407008-.441854.407008-1.158247 0-1.60046l-.73712-.80023c-.407008-.441854-1.066904-.441854-1.474243 0L7 5.198617 2.51662.33139c-.407008-.441853-1.066904-.441853-1.474243 0l-.737121.80023c-.407008.441854-.407008 1.158248 0 1.600461l4.48338 4.867228L7 10l2.211364-2.40069z"},null,-1)];const A={},L={Deselect:x,OpenIndicator:(0,_.Z)(A,[["render",function(t,o){return(0,e.openBlock)(),(0,e.createElementBlock)("svg",C,D)}]])},E={mounted:function(e,t){var o=t.instance;if(o.appendToBody){var n=o.$refs.toggle.getBoundingClientRect(),i=n.height,r=n.top,s=n.left,l=n.width,a=window.scrollX||window.pageXOffset,c=window.scrollY||window.pageYOffset;e.unbindPosition=o.calculatePosition(e,o,{width:l+"px",left:a+s+"px",top:c+r+i+"px"}),document.body.appendChild(e)}},unmounted:function(e,t){t.instance.appendToBody&&(e.unbindPosition&&"function"==typeof e.unbindPosition&&e.unbindPosition(),e.parentNode&&e.parentNode.removeChild(e))}};const $=function(e){var t={};return Object.keys(e).sort().forEach((function(o){t[o]=e[o]})),JSON.stringify(t)};var T=0;const j=function(){return++T};function F(e,t){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),o.push.apply(o,n)}return o}function M(e){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?F(Object(o),!0).forEach((function(t){O()(e,t,o[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):F(Object(o)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))}))}return e}const N={components:M({},L),directives:{appendToBody:E},mixins:[w,S,V],emits:["open","close","update:modelValue","search","search:compositionstart","search:compositionend","search:keydown","search:blur","search:focus","search:input","option:created","option:selecting","option:selected","option:deselecting","option:deselected"],props:{modelValue:{},components:{type:Object,default:function(){return{}}},options:{type:Array,default:function(){return[]}},disabled:{type:Boolean,default:!1},clearable:{type:Boolean,default:!0},deselectFromDropdown:{type:Boolean,default:!1},searchable:{type:Boolean,default:!0},multiple:{type:Boolean,default:!1},placeholder:{type:String,default:""},transition:{type:String,default:"vs__fade"},clearSearchOnSelect:{type:Boolean,default:!0},closeOnSelect:{type:Boolean,default:!0},label:{type:String,default:"label"},autocomplete:{type:String,default:"off"},reduce:{type:Function,default:function(e){return e}},selectable:{type:Function,default:function(e){return!0}},getOptionLabel:{type:Function,default:function(e){return"object"===b()(e)?e.hasOwnProperty(this.label)?e[this.label]:console.warn('[vue-select warn]: Label key "option.'.concat(this.label,'" does not')+" exist in options object ".concat(JSON.stringify(e),".\n")+"https://vue-select.org/api/props.html#getoptionlabel"):e}},getOptionKey:{type:Function,default:function(e){if("object"!==b()(e))return e;try{return e.hasOwnProperty("id")?e.id:$(e)}catch(t){return console.warn("[vue-select warn]: Could not stringify this option to generate unique key. Please provide'getOptionKey' prop to return a unique key for each option.\nhttps://vue-select.org/api/props.html#getoptionkey",e,t)}}},onTab:{type:Function,default:function(){this.selectOnTab&&!this.isComposing&&this.typeAheadSelect()}},taggable:{type:Boolean,default:!1},tabindex:{type:Number,default:null},pushTags:{type:Boolean,default:!1},filterable:{type:Boolean,default:!0},filterBy:{type:Function,default:function(e,t,o){return(t||"").toLocaleLowerCase().indexOf(o.toLocaleLowerCase())>-1}},filter:{type:Function,default:function(e,t){var o=this;return e.filter((function(e){var n=o.getOptionLabel(e);return"number"==typeof n&&(n=n.toString()),o.filterBy(e,n,t)}))}},createOption:{type:Function,default:function(e){return"object"===b()(this.optionList[0])?O()({},this.label,e):e}},resetOnOptionsChange:{default:!1,validator:function(e){return["function","boolean"].includes(b()(e))}},clearSearchOnBlur:{type:Function,default:function(e){var t=e.clearSearchOnSelect,o=e.multiple;return t&&!o}},noDrop:{type:Boolean,default:!1},inputId:{type:String},dir:{type:String,default:"auto"},selectOnTab:{type:Boolean,default:!1},selectOnKeyCodes:{type:Array,default:function(){return[13]}},searchInputQuerySelector:{type:String,default:"[type=search]"},mapKeydown:{type:Function,default:function(e,t){return e}},appendToBody:{type:Boolean,default:!1},calculatePosition:{type:Function,default:function(e,t,o){var n=o.width,i=o.top,r=o.left;e.style.top=i,e.style.left=r,e.style.width=n}},dropdownShouldOpen:{type:Function,default:function(e){var t=e.noDrop,o=e.open,n=e.mutableLoading;return!t&&(o&&!n)}},uid:{type:[String,Number],default:function(){return j()}}},data:function(){return{search:"",open:!1,isComposing:!1,pushedTags:[],_value:[],deselectButtons:[]}},computed:{isReducingValues:function(){return this.$props.reduce!==this.$options.props.reduce.default},isTrackingValues:function(){return void 0===this.modelValue||this.isReducingValues},selectedValue:function(){var e=this.modelValue;return this.isTrackingValues&&(e=this.$data._value),null!=e?[].concat(e):[]},optionList:function(){return this.options.concat(this.pushTags?this.pushedTags:[])},searchEl:function(){return this.$slots.search?this.$refs.selectedOptions.querySelector(this.searchInputQuerySelector):this.$refs.search},scope:function(){var e=this,t={search:this.search,loading:this.loading,searching:this.searching,filteredOptions:this.filteredOptions};return{search:{attributes:M({disabled:this.disabled,placeholder:this.searchPlaceholder,tabindex:this.tabindex,readonly:!this.searchable,id:this.inputId,"aria-autocomplete":"list","aria-labelledby":"vs".concat(this.uid,"__combobox"),"aria-controls":"vs".concat(this.uid,"__listbox"),ref:"search",type:"search",autocomplete:this.autocomplete,value:this.search},this.dropdownOpen&&this.filteredOptions[this.typeAheadPointer]?{"aria-activedescendant":"vs".concat(this.uid,"__option-").concat(this.typeAheadPointer)}:{}),events:{compositionstart:function(){return e.isComposing=!0},compositionend:function(){return e.isComposing=!1},keydown:this.onSearchKeyDown,blur:this.onSearchBlur,focus:this.onSearchFocus,input:function(t){return e.search=t.target.value}}},spinner:{loading:this.mutableLoading},noOptions:{search:this.search,loading:this.mutableLoading,searching:this.searching},openIndicator:{attributes:{ref:"openIndicator",role:"presentation",class:"vs__open-indicator"}},listHeader:t,listFooter:t,header:M({},t,{deselect:this.deselect}),footer:M({},t,{deselect:this.deselect})}},childComponents:function(){return M({},L,{},this.components)},stateClasses:function(){return{"vs--open":this.dropdownOpen,"vs--single":!this.multiple,"vs--multiple":this.multiple,"vs--searching":this.searching&&!this.noDrop,"vs--searchable":this.searchable&&!this.noDrop,"vs--unsearchable":!this.searchable,"vs--loading":this.mutableLoading,"vs--disabled":this.disabled}},searching:function(){return!!this.search},dropdownOpen:function(){return this.dropdownShouldOpen(this)},searchPlaceholder:function(){return this.isValueEmpty&&this.placeholder?this.placeholder:void 0},filteredOptions:function(){var e=[].concat(this.optionList);if(!this.filterable&&!this.taggable)return e;var t=this.search.length?this.filter(e,this.search,this):e;if(this.taggable&&this.search.length){var o=this.createOption(this.search);this.optionExists(o)||t.unshift(o)}return t},isValueEmpty:function(){return 0===this.selectedValue.length},showClearButton:function(){return!this.multiple&&this.clearable&&!this.open&&!this.isValueEmpty}},watch:{options:function(e,t){var o=this;!this.taggable&&("function"==typeof o.resetOnOptionsChange?o.resetOnOptionsChange(e,t,o.selectedValue):o.resetOnOptionsChange)&&this.clearSelection(),this.modelValue&&this.isTrackingValues&&this.setInternalValueFromOptions(this.modelValue)},modelValue:{immediate:!0,handler:function(e){this.isTrackingValues&&this.setInternalValueFromOptions(e)}},multiple:function(){this.clearSelection()},open:function(e){this.$emit(e?"open":"close")}},created:function(){this.mutableLoading=this.loading},methods:{setInternalValueFromOptions:function(e){var t=this;Array.isArray(e)?this.$data._value=e.map((function(e){return t.findOptionFromReducedValue(e)})):this.$data._value=this.findOptionFromReducedValue(e)},select:function(e){this.$emit("option:selecting",e),this.isOptionSelected(e)?this.deselectFromDropdown&&(this.clearable||this.multiple&&this.selectedValue.length>1)&&this.deselect(e):(this.taggable&&!this.optionExists(e)&&(this.$emit("option:created",e),this.pushTag(e)),this.multiple&&(e=this.selectedValue.concat(e)),this.updateValue(e),this.$emit("option:selected",e)),this.onAfterSelect(e)},deselect:function(e){var t=this;this.$emit("option:deselecting",e),this.updateValue(this.selectedValue.filter((function(o){return!t.optionComparator(o,e)}))),this.$emit("option:deselected",e)},clearSelection:function(){this.updateValue(this.multiple?[]:null)},onAfterSelect:function(e){this.closeOnSelect&&(this.open=!this.open,this.searchEl.blur()),this.clearSearchOnSelect&&(this.search="")},updateValue:function(e){var t=this;void 0===this.modelValue&&(this.$data._value=e),null!==e&&(e=Array.isArray(e)?e.map((function(e){return t.reduce(e)})):this.reduce(e)),this.$emit("update:modelValue",e)},toggleDropdown:function(e){var t=e.target!==this.searchEl;t&&e.preventDefault();var o=[].concat(y()(this.deselectButtons||[]),y()([this.$refs.clearButton]||0));void 0===this.searchEl||o.filter(Boolean).some((function(t){return t.contains(e.target)||t===e.target}))?e.preventDefault():this.open&&t?this.searchEl.blur():this.disabled||(this.open=!0,this.searchEl.focus())},isOptionSelected:function(e){var t=this;return this.selectedValue.some((function(o){return t.optionComparator(o,e)}))},isOptionDeselectable:function(e){return this.isOptionSelected(e)&&this.deselectFromDropdown},optionComparator:function(e,t){return this.getOptionKey(e)===this.getOptionKey(t)},findOptionFromReducedValue:function(e){var t=this,o=[].concat(y()(this.options),y()(this.pushedTags)).filter((function(o){return JSON.stringify(t.reduce(o))===JSON.stringify(e)}));return 1===o.length?o[0]:o.find((function(e){return t.optionComparator(e,t.$data._value)}))||e},closeSearchOptions:function(){this.open=!1,this.$emit("search:blur")},maybeDeleteValue:function(){if(!this.searchEl.value.length&&this.selectedValue&&this.selectedValue.length&&this.clearable){var e=null;this.multiple&&(e=y()(this.selectedValue.slice(0,this.selectedValue.length-1))),this.updateValue(e)}},optionExists:function(e){var t=this;return this.optionList.some((function(o){return t.optionComparator(o,e)}))},normalizeOptionForSlot:function(e){return"object"===b()(e)?e:O()({},this.label,e)},pushTag:function(e){this.pushedTags.push(e)},onEscape:function(){this.search.length?this.search="":this.searchEl.blur()},onSearchBlur:function(){if(!this.mousedown||this.searching){var e=this.clearSearchOnSelect,t=this.multiple;return this.clearSearchOnBlur({clearSearchOnSelect:e,multiple:t})&&(this.search=""),void this.closeSearchOptions()}this.mousedown=!1,0!==this.search.length||0!==this.options.length||this.closeSearchOptions()},onSearchFocus:function(){this.open=!0,this.$emit("search:focus")},onMousedown:function(){this.mousedown=!0},onMouseUp:function(){this.mousedown=!1},onSearchKeyDown:function(e){var t=this,o=function(e){return e.preventDefault(),!t.isComposing&&t.typeAheadSelect()},n={8:function(e){return t.maybeDeleteValue()},9:function(e){return t.onTab()},27:function(e){return t.onEscape()},38:function(e){return e.preventDefault(),t.typeAheadUp()},40:function(e){return e.preventDefault(),t.typeAheadDown()}};this.selectOnKeyCodes.forEach((function(e){return n[e]=o}));var i=this.mapKeydown(n,this);if("function"==typeof i[e.keyCode])return i[e.keyCode](e)}}},z=(0,_.Z)(N,[["render",function(n,i,m,y,g,b){var v=(0,e.resolveDirective)("append-to-body");return(0,e.openBlock)(),(0,e.createElementBlock)("div",{dir:m.dir,class:(0,e.normalizeClass)(["v-select",b.stateClasses])},[(0,e.renderSlot)(n.$slots,"header",(0,e.normalizeProps)((0,e.guardReactiveProps)(b.scope.header))),(0,e.createElementVNode)("div",{id:"vs".concat(m.uid,"__combobox"),ref:"toggle",class:"vs__dropdown-toggle",role:"combobox","aria-expanded":b.dropdownOpen.toString(),"aria-owns":"vs".concat(m.uid,"__listbox"),"aria-label":"Search for option",onMousedown:i[1]||(i[1]=function(e){return b.toggleDropdown(e)})},[(0,e.createElementVNode)("div",r,[((0,e.openBlock)(!0),(0,e.createElementBlock)(e.Fragment,null,(0,e.renderList)(b.selectedValue,(function(t,o){return(0,e.renderSlot)(n.$slots,"selected-option-container",{option:b.normalizeOptionForSlot(t),deselect:b.deselect,multiple:m.multiple,disabled:m.disabled},(function(){return[((0,e.openBlock)(),(0,e.createElementBlock)("span",{key:m.getOptionKey(t),class:"vs__selected"},[(0,e.renderSlot)(n.$slots,"selected-option",(0,e.normalizeProps)((0,e.guardReactiveProps)(b.normalizeOptionForSlot(t))),(function(){return[(0,e.createTextVNode)((0,e.toDisplayString)(m.getOptionLabel(t)),1)]})),m.multiple?((0,e.openBlock)(),(0,e.createElementBlock)("button",{key:0,ref:function(e){return g.deselectButtons[o]=e},disabled:m.disabled,type:"button",class:"vs__deselect",title:"Deselect ".concat(m.getOptionLabel(t)),"aria-label":"Deselect ".concat(m.getOptionLabel(t)),onClick:function(e){return b.deselect(t)}},[((0,e.openBlock)(),(0,e.createBlock)((0,e.resolveDynamicComponent)(b.childComponents.Deselect)))],8,s)):(0,e.createCommentVNode)("",!0)]))]}))})),256)),(0,e.renderSlot)(n.$slots,"search",(0,e.normalizeProps)((0,e.guardReactiveProps)(b.scope.search)),(function(){return[(0,e.createElementVNode)("input",(0,e.mergeProps)({class:"vs__search"},b.scope.search.attributes,(0,e.toHandlers)(b.scope.search.events)),null,16)]}))],512),(0,e.createElementVNode)("div",l,[(0,e.withDirectives)((0,e.createElementVNode)("button",{ref:"clearButton",disabled:m.disabled,type:"button",class:"vs__clear",title:"Clear Selected","aria-label":"Clear Selected",onClick:i[0]||(i[0]=function(){return b.clearSelection&&b.clearSelection.apply(b,arguments)})},[((0,e.openBlock)(),(0,e.createBlock)((0,e.resolveDynamicComponent)(b.childComponents.Deselect)))],8,a),[[e.vShow,b.showClearButton]]),(0,e.renderSlot)(n.$slots,"open-indicator",(0,e.normalizeProps)((0,e.guardReactiveProps)(b.scope.openIndicator)),(function(){return[m.noDrop?(0,e.createCommentVNode)("",!0):((0,e.openBlock)(),(0,e.createBlock)((0,e.resolveDynamicComponent)(b.childComponents.OpenIndicator),(0,e.normalizeProps)((0,e.mergeProps)({key:0},b.scope.openIndicator.attributes)),null,16))]})),(0,e.renderSlot)(n.$slots,"spinner",(0,e.normalizeProps)((0,e.guardReactiveProps)(b.scope.spinner)),(function(){return[(0,e.withDirectives)((0,e.createElementVNode)("div",c,"Loading...",512),[[e.vShow,n.mutableLoading]])]}))],512)],40,o),(0,e.createVNode)(e.Transition,{name:m.transition},{default:(0,e.withCtx)((function(){return[b.dropdownOpen?(0,e.withDirectives)(((0,e.openBlock)(),(0,e.createElementBlock)("ul",{id:"vs".concat(m.uid,"__listbox"),ref:"dropdownMenu",key:"vs".concat(m.uid,"__listbox"),class:"vs__dropdown-menu",role:"listbox",tabindex:"-1",onMousedown:i[2]||(i[2]=(0,e.withModifiers)((function(){return b.onMousedown&&b.onMousedown.apply(b,arguments)}),["prevent"])),onMouseup:i[3]||(i[3]=function(){return b.onMouseUp&&b.onMouseUp.apply(b,arguments)})},[(0,e.renderSlot)(n.$slots,"list-header",(0,e.normalizeProps)((0,e.guardReactiveProps)(b.scope.listHeader))),((0,e.openBlock)(!0),(0,e.createElementBlock)(e.Fragment,null,(0,e.renderList)(b.filteredOptions,(function(t,o){return(0,e.openBlock)(),(0,e.createElementBlock)("li",{id:"vs".concat(m.uid,"__option-").concat(o),key:m.getOptionKey(t),role:"option",class:(0,e.normalizeClass)(["vs__dropdown-option",{"vs__dropdown-option--deselect":b.isOptionDeselectable(t)&&o===n.typeAheadPointer,"vs__dropdown-option--selected":b.isOptionSelected(t),"vs__dropdown-option--highlight":o===n.typeAheadPointer,"vs__dropdown-option--disabled":!m.selectable(t)}]),"aria-selected":o===n.typeAheadPointer||null,onMouseover:function(e){return m.selectable(t)?n.typeAheadPointer=o:null},onClick:(0,e.withModifiers)((function(e){return m.selectable(t)?b.select(t):null}),["prevent","stop"])},[(0,e.renderSlot)(n.$slots,"option",(0,e.normalizeProps)((0,e.guardReactiveProps)(b.normalizeOptionForSlot(t))),(function(){return[(0,e.createTextVNode)((0,e.toDisplayString)(m.getOptionLabel(t)),1)]}))],42,p)})),128)),0===b.filteredOptions.length?((0,e.openBlock)(),(0,e.createElementBlock)("li",d,[(0,e.renderSlot)(n.$slots,"no-options",(0,e.normalizeProps)((0,e.guardReactiveProps)(b.scope.noOptions)),(function(){return[h]}))])):(0,e.createCommentVNode)("",!0),(0,e.renderSlot)(n.$slots,"list-footer",(0,e.normalizeProps)((0,e.guardReactiveProps)(b.scope.listFooter)))],40,u)),[[v]]):((0,e.openBlock)(),(0,e.createElementBlock)("ul",{key:1,id:"vs".concat(m.uid,"__listbox"),role:"listbox",style:{display:"none",visibility:"hidden"}},null,8,f))]})),_:3},8,["name"]),(0,e.renderSlot)(n.$slots,"footer",(0,e.normalizeProps)((0,e.guardReactiveProps)(b.scope.footer)))],10,t)}]]),R=z,I={ajax:V,pointer:S,pointerScroll:w},K=z})(),i})()}));
//# sourceMappingURL=vue-select.js.map

/***/ })

}]);