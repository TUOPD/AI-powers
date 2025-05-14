"use strict";
const common_vendor = require("../../common/vendor.js");
const Store_store = require("../../Store/store.js");
const counter = Store_store.userstore();
const _sfc_main = {
  data() {
    return {
      truetext: "",
      falsetext: "",
      stylelist1: ["默认", "动画", "油画"],
      stylelist2: ["水彩", "素描", "3D"],
      sizelist: ["1024*1024", "720*1280", "1280*720"],
      numlist: ["1张", "2张", "3张"],
      activestyle1: null,
      activestyle2: null,
      activesize: null,
      activenum: null,
      activestylesend: null,
      activesizesend: null,
      activenumsend: null
    };
  },
  methods: {
    selectstyle1(e) {
      this.activestyle2 = null;
      this.activestyle1 = e;
      if (this.stylelist1[this.activestyle1] === "默认") {
        this.activestylesend = "<auto>";
      } else if (this.stylelist1[this.activestyle1] === "动画") {
        this.activestylesend = "<anime>";
      } else if (this.stylelist1[this.activestyle1] === "油画") {
        this.activestylesend = "<oil painting>";
      }
    },
    selectstyle2(e) {
      this.activestyle1 = null;
      this.activestyle2 = e;
      if (this.stylelist1[this.activestyle1] === "水彩") {
        this.activestylesend = "<watercolor>";
      } else if (this.stylelist1[this.activestyle1] === "素描") {
        this.activestylesend = "<sketch>";
      } else if (this.stylelist1[this.activestyle1] === "3D") {
        this.activestylesend = "<3d cartoon>";
      }
    },
    selectsize(e) {
      this.activesize = e;
      this.activesizesend = this.sizelist[this.activesize];
    },
    selectnum(e) {
      this.activenum = e;
      this.activenumsend = this.activenum;
    },
    send() {
      counter.input1 = this.truetext;
      counter.input2 = this.falsetext;
      counter.style = this.activestylesend;
      counter.size = this.activesizesend;
      counter.num = this.activenum;
      common_vendor.index.__f__("log", "at pages/PicCreate/PicCreate.vue:113", counter.input1);
      common_vendor.index.navigateTo({
        url: "/pages/Picreateshow/Picreateshow"
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  _easycom_uni_section2();
}
const _easycom_uni_section = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-section/uni-section.js";
if (!Math) {
  _easycom_uni_section();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.truetext,
    b: common_vendor.o(($event) => $data.truetext = $event.detail.value),
    c: common_vendor.p({
      title: "输入正向提示词",
      type: "line"
    }),
    d: $data.falsetext,
    e: common_vendor.o(($event) => $data.falsetext = $event.detail.value),
    f: common_vendor.p({
      title: "输入逆向提示词",
      type: "line"
    }),
    g: common_vendor.f($data.stylelist1, (item, index, i0) => {
      return {
        a: common_vendor.t(item),
        b: index,
        c: common_vendor.o(($event) => $options.selectstyle1(index), index),
        d: $data.activestyle1 === index ? "skyblue" : "white",
        e: $data.activestyle1 === index ? "white" : "black"
      };
    }),
    h: common_vendor.f($data.stylelist2, (item, index, i0) => {
      return {
        a: common_vendor.t(item),
        b: index,
        c: common_vendor.o(($event) => $options.selectstyle2(index), index),
        d: $data.activestyle2 === index ? "skyblue" : "white",
        e: $data.activestyle2 === index ? "white" : "black"
      };
    }),
    i: common_vendor.p({
      title: "选择样式",
      type: "line"
    }),
    j: common_vendor.f($data.sizelist, (item, index, i0) => {
      return {
        a: common_vendor.t(item),
        b: $data.activesize === index ? "skyblue" : "white",
        c: $data.activesize === index ? "white" : "black",
        d: index,
        e: common_vendor.o(($event) => $options.selectsize(index), index)
      };
    }),
    k: common_vendor.p({
      title: "选择大小",
      type: "line"
    }),
    l: common_vendor.f($data.numlist, (item, index, i0) => {
      return {
        a: common_vendor.t(item),
        b: $data.activenum === index ? "skyblue" : "white",
        c: $data.activenum === index ? "white" : "black",
        d: index,
        e: common_vendor.o(($event) => $options.selectnum(index), index)
      };
    }),
    m: common_vendor.p({
      title: "选择数量",
      type: "line"
    }),
    n: common_vendor.o(($event) => $options.send())
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/PicCreate/PicCreate.js.map
