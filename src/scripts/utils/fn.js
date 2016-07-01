var Util = {
  setFocus: function (e) {
//	console.log(e);
    $(e).addClass('active').siblings().removeClass('active');
  }
};

module.exports = Util;
