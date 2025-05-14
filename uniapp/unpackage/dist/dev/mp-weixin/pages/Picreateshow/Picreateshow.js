"use strict";
const common_vendor = require("../../common/vendor.js");
const Store_store = require("../../Store/store.js");
const counter = Store_store.userstore();
const _sfc_main = {
  data() {
    return {
      isupload: true,
      imglist: []
    };
  },
  methods: {},
  onLoad() {
    common_vendor.index.request({
      method: "POST",
      url: "http://127.0.0.1:8080/app/pic",
      data: {
        data: {
          input1: counter.input1,
          input2: counter.input2,
          style: counter.style,
          size: counter.size,
          num: counter.num + 1
        },
        message: "发送数据",
        code: 201
      },
      header: {
        "content-type": "application/json"
      },
      success: (res) => {
        common_vendor.index.__f__("log", "at pages/Picreateshow/Picreateshow.vue:46", res);
        this.isupload = false;
        this.imglist = res.data;
        common_vendor.index.__f__("log", "at pages/Picreateshow/Picreateshow.vue:49", this.imglist[0]);
      },
      fail: (res) => {
      },
      timeout: 18e4
    });
  }
};
if (!Array) {
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  (_easycom_uni_section2 + _easycom_uni_load_more2)();
}
const _easycom_uni_section = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-section/uni-section.js";
const _easycom_uni_load_more = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-load-more/uni-load-more.js";
if (!Math) {
  (_easycom_uni_section + _easycom_uni_load_more)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      title: "生成图片",
      type: "line"
    }),
    b: $data.isupload,
    c: common_vendor.p({
      iconType: "circle",
      status: "loading"
    }),
    d: common_vendor.f($data.imglist, (item, index, i0) => {
      return {
        a: item
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/Picreateshow/Picreateshow.js.map
