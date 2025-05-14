"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/Start/Start.js";
  "./pages/AIspeak/AIspeak.js";
  "./pages/AIReadPage/AIReadPage.js";
  "./pages/AIReadShow/AIReadShow.js";
  "./pages/AITextshowRead/AITextshowRead.js";
  "./pages/Textshow/Textshow.js";
  "./pages/Picreateshow/Picreateshow.js";
  "./pages/PicCreate/PicCreate.js";
}
const _sfc_main = {
  onLaunch: function() {
    common_vendor.index.__f__("log", "at App.vue:6", "App Launch");
  },
  onShow: function() {
    common_vendor.index.__f__("log", "at App.vue:9", "App Show");
  },
  onHide: function() {
    common_vendor.index.__f__("log", "at App.vue:12", "App Hide");
  }
};
function createApp() {
  const app = common_vendor.createSSRApp(_sfc_main);
  app.use(common_vendor.createPinia());
  return {
    app,
    Pinia: common_vendor.Pinia
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
//# sourceMappingURL=../.sourcemap/mp-weixin/app.js.map
