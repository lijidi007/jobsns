var tplIndex = require('../templates/index.string');

// 引用公共方法
var util = require('../utils/fn.js');
SPA.defineView('index', {
	//加载html
	html: tplIndex,

	plugins: ['delegated'],
	init: {},
	// 载入插件列表
	// delegated 实现tab事件的绑定
	modules: [{
		name: 'content', // 子视图的名字，用作后边引用的句柄
		views: ['home', 'my', 'friends'], // 定义子视图的列表数组
		defaultTag: 'home', // 定义默认视图
		container: '.l-container' // 子视图的容器
	}],
	bindActions: {
		'switch.tabs': function(e,data) {
			util.setFocus(e.el); // 设置当前 tab 高亮
			//    		console.log(e.el);
			this.modules.content.launch(data.tag);
			//    		 console.log(data.tag);
		},
		'exit': function(e,data) {
			util.setFocus(e.el); //退出
			// 关闭视图
			this.hide();
		}
	},
});














