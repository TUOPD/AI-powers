"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      streamdata: "",
      ImageUrl: "",
      text: ""
    };
  },
  onLoad(data) {
    this.ImageUrl = data.imgurl;
    common_vendor.index.__f__("log", "at pages/AITextshowRead/AITextshowRead.vue:26", data);
    common_vendor.index.__f__("log", "at pages/AITextshowRead/AITextshowRead.vue:27", 999 + this.ImageUrl);
    this.text = data.text;
    this.showfile();
  },
  methods: {
    showfile() {
      const that = this;
      that.streamdata = "";
      const request = common_vendor.wx$1.request({
        method: "POST",
        url: "http://127.0.0.1:8080/app/readpic",
        data: {
          data: that.ImageUrl + "?" + that.text,
          message: "发送数据",
          code: 201
        },
        header: {
          "content-type": "application/json"
        },
        enableChunked: true,
        //记得加上这一条开启流式传输
        success: (res) => {
          common_vendor.index.__f__("log", "at pages/AITextshowRead/AITextshowRead.vue:48", res + "9999");
        },
        fail: (res) => {
          common_vendor.index.__f__("log", "at pages/AITextshowRead/AITextshowRead.vue:51", res);
        },
        complete: (res) => {
        }
      });
      request.onChunkReceived(function(res) {
        const decoder = new TextDecoder("utf-8");
        const chunkString = decoder.decode(new Uint8Array(res.data));
        common_vendor.index.__f__("log", "at pages/AITextshowRead/AITextshowRead.vue:59", chunkString);
        that.streamdata += chunkString;
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
    a: $data.ImageUrl,
    b: common_vendor.p({
      title: "文字提取",
      type: "line"
    }),
    c: common_vendor.t($data.streamdata)
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/AITextshowRead/AITextshowRead.js.map
