"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      inputtext: "",
      Image: "",
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
      common_vendor.index.uploadFile({
        url: "http://127.0.0.1:8080/app/upload/readpic",
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
            url: `/pages/AITextshowRead/AITextshowRead?imgurl=${this.ImageUrl}&text=${this.inputtext}`
          });
        },
        fail: (err) => {
          common_vendor.index.__f__("log", "at pages/Textshow/Textshow.vue:62", "文件上传失败:", err);
        }
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
    f: $data.inputtext,
    g: common_vendor.o(($event) => $data.inputtext = $event.detail.value),
    h: common_vendor.o(($event) => $options.getfile()),
    i: common_vendor.p({
      title: "取词说明",
      type: "line"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/Textshow/Textshow.js.map
