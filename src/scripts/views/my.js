var tplmy = require('../templates/my.string');

SPA.defineView('my',{
	html:tplmy,
	
	plugins: ['delegated'],
	bindActions: {
    	'goto.home': function () {
      // 视图切换
     	 SPA.open('home');
    	}
	}
});
	