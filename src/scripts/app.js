// 引入spa类库
require('./lib/spa.min.js');
require('./lib/swiper-3.3.1.min.js');
//require('./lib/iscroll-probe.js');
// 引入views
require('./views/index.js');
require('./views/my.js');
require('./views/guide.js');
require('./views/home.js');
require('./views/friends.js');
require('./views/login.js');

SPA.config({
  indexView: 'guide'
});
