"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      inputtext: "",
      listtext: ["你好，有什么可以帮助你的"],
      isinput: false,
      streamdata: ""
    };
  },
  methods: {
    handleSend() {
      common_vendor.index.__f__("log", "at pages/AIspeak/AIspeak.vue:35", "98986");
      this.listtext.push(this.inputtext);
      var text = this.inputtext;
      this.inputtext = "";
      this.isinput = true;
      const that = this;
      const request = common_vendor.wx$1.request({
        method: "POST",
        url: "http://127.0.0.1:8080/app/speak",
        data: {
          data: text,
          message: "发送数据",
          code: 201
        },
        header: {
          "content-type": "application/json"
        },
        enableChunked: true,
        success: (res) => {
          common_vendor.index.__f__("log", "at pages/AIspeak/AIspeak.vue:74", res + "9999");
        },
        fail: (res) => {
          common_vendor.index.__f__("log", "at pages/AIspeak/AIspeak.vue:77", res);
        },
        complete: (res) => {
          that.isinput = false;
          that.streamdata = "";
        }
      });
      request.onChunkReceived(function(res) {
        const decoder = new TextDecoder("utf-8");
        const chunkString = decoder.decode(new Uint8Array(res.data));
        common_vendor.index.__f__("log", "at pages/AIspeak/AIspeak.vue:87", chunkString);
        if (that.streamdata === "") {
          that.streamdata += chunkString;
          that.listtext.push(that.streamdata);
        } else {
          that.listtext.pop();
          that.streamdata += chunkString;
          that.listtext.push(that.streamdata);
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.listtext, (item, index, i0) => {
      return common_vendor.e({
        a: index % 2 === 0
      }, index % 2 === 0 ? {
        b: common_assets._imports_0
      } : {
        c: common_assets._imports_1
      }, {
        d: common_vendor.t(item),
        e: index
      });
    }),
    b: $data.isinput,
    c: $data.inputtext,
    d: common_vendor.o(($event) => $data.inputtext = $event.detail.value),
    e: common_vendor.o(($event) => $options.handleSend())
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/AIspeak/AIspeak.js.map
