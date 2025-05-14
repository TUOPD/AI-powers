"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      Image: "",
      streamdata: "",
      ImageUrl: ""
    };
  },
  methods: {
    select(e) {
      this.Image = e.tempFilePaths[0];
    },
    getfile() {
      this.uploadfile();
    },
    uploadfile() {
      this.streamdata = "";
      common_vendor.index.uploadFile({
        url: "http://127.0.0.1:8080/app/upload",
        // 后端提供的上传接口
        filePath: this.Image,
        name: "file",
        header: {
          "Content-Type": "multipart/form-data"
          // 设置请求头
        },
        success: (res) => {
          this.ImageUrl = JSON.parse(res.data).url;
          common_vendor.index.navigateTo({
            url: `/pages/AIReadShow/AIReadShow?imgurl=${this.ImageUrl}`
          });
        },
        fail: (err) => {
          common_vendor.index.__f__("log", "at pages/AIReadPage/AIReadPage.vue:60", "文件上传失败:", err);
        }
      });
    },
    showfile() {
      const that = this;
      const request = common_vendor.wx$1.request({
        method: "POST",
        url: "http://127.0.0.1:8080/app/read",
        data: {
          data: that.ImageUrl,
          message: "发送数据",
          code: 201
        },
        header: {
          "content-type": "application/json"
        },
        enableChunked: true,
        //记得加上这一条开启流式传输
        success: (res) => {
          common_vendor.index.__f__("log", "at pages/AIReadPage/AIReadPage.vue:79", res + "9999");
        },
        fail: (res) => {
          common_vendor.index.__f__("log", "at pages/AIReadPage/AIReadPage.vue:82", res);
        },
        complete: (res) => {
        }
      });
      request.onChunkReceived(function(res) {
        const decoder = new TextDecoder("utf-8");
        const chunkString = decoder.decode(new Uint8Array(res.data));
        common_vendor.index.__f__("log", "at pages/AIReadPage/AIReadPage.vue:91", chunkString);
        that.streamdata += chunkString;
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_file_picker2 = common_vendor.resolveComponent("uni-file-picker");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  (_easycom_uni_file_picker2 + _easycom_uni_section2)();
}
const _easycom_uni_file_picker = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-file-picker/uni-file-picker.js";
const _easycom_uni_section = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_file_picker + _easycom_uni_section)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o($options.select),
    b: common_vendor.p({
      limit: "1"
    }),
    c: common_vendor.p({
      title: "选择一张图片",
      type: "line"
    }),
    d: common_vendor.p({
      title: "点击拍照",
      type: "line"
    }),
    e: common_assets._imports_0$1,
    f: common_vendor.o(($event) => $options.getfile())
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/AIReadPage/AIReadPage.js.map
