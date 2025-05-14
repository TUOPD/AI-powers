"use strict";
const common_vendor = require("../common/vendor.js");
const userstore = common_vendor.defineStore("store", {
  state: () => {
    return {
      input1: null,
      input2: null,
      style: null,
      num: null,
      size: null
    };
  },
  // 也可以这样定义
  // state: () => ({ count: 0 })
  actions: {
    increment() {
      this.count++;
    }
  }
});
exports.userstore = userstore;
//# sourceMappingURL=../../.sourcemap/mp-weixin/Store/store.js.map
