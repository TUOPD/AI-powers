import { defineStore } from 'pinia';

export const userstore = defineStore('store', {
	state: () => {
		return { 
			input1: null ,
			input2: null,
			style:null,
			num: null,
			size:null
		};
	},
	// 也可以这样定义
	// state: () => ({ count: 0 })
	actions: {
		increment() {
			this.count++;
		},
	},
});