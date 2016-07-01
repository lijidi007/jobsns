var tplhome = require('../templates/home.string');
var util = require('../utils/fn.js');
// 引用公共方法
SPA.defineView('home', {
	//加载html
	html: tplhome,
	
	plugins: ['delegated',{
		name : 'avalon',
		options : function(vm){
			
			vm.livelist = [];
		}
	}],
	
	init: {
		mySwiper: null,
		vm: null,
		livelistArray: [],
		formatData: function (arr) {
      	var tempArr = [];
      	for (var i = 0; i < Math.ceil(arr.length/2); i++) {
        	tempArr[i] = [];
       	 	tempArr[i].push(arr[2*i]);
        	tempArr[i].push(arr[2*i+1]);
      	}
      	return tempArr;
    }
	},
	bindActions: {
		'tap.home.slide': function(e, data) {
			this.baobeiSwiper.slideTo($(e.el).index());
		}
	},
	
	bindEvents: {
		'beforeShow':function(){
			var that = this;
			// 获得vm对象
      		that.vm = that.getVM();
//			console.log(this);
//			console.log(this.vm);
//			console.log(that.vm.$model.livelist);

			$.ajax({
				url:'/api/getLivelist.php',
//				url:'/job/mock/livelist.json',
				type:'get',
				data:{
					rtype:'origin'
				},
				success:function(rs){
//					console.log(that.livelistArray)
//					console.log(rs)
//					console.log(rs.data)
					that.livelistArray = rs.data;
					
					that.vm.livelist = that.formatData(rs.data);
				}
			})
		},
		
		'show': function() {
			var that = this;
			var mySwiper1 = new Swiper('#lunbo-swiper', {
				loop: true,
				autoplay: 2000,
				pagination: '.swiper-pagination'
			}); //轮播图 

			that.homeSwiper = new Swiper('#home-swiper', {
				loop: false

			});

			that.baobeiSwiper = new Swiper('#baobei-swiper', {
				loop: false,
				onSlideChangeStart: function(swiper) {
					var index = swiper.activeIndex;
					var $lis = $('#home-nav li');
					util.setFocus($lis.eq(index));
				}
			});
      // 下拉刷新，上拉加载更多
      var scrollSize = 30;
      var myScroll = this.widgets.homeHotScroll;
      myScroll.scrollBy(0, -scrollSize);
//    console.log(this.widgets.scrollBy)

      var head = $('.head img'),
          topImgHasClass = head.hasClass('up');
      var foot = $('.foot img'),
          bottomImgHasClass = head.hasClass('down');
      myScroll.on('scroll', function () {
          var y = this.y,
              maxY = this.maxScrollY - y;
          if (y >= 0) {
              !topImgHasClass && head.addClass('up');
              return '';
          }
          if (maxY >= 0) {
              !bottomImgHasClass && foot.addClass('down');
              return '';
          }
      });
      	

      myScroll.on('scrollEnd', function () {
          if (this.y >= -scrollSize && this.y < 0) {
              myScroll.scrollTo(0, -scrollSize);
              head.removeClass('up');
          } else if (this.y >= 0) {
              head.attr('src', '/course-footballSNS/images/ajax-loader.gif');
              // ajax下拉刷新数据

              $.ajax({
                url: '/api/getLivelist.php',
                data: {
                  rtype: 'refresh'
                },
                success: function (rs) {
                  var newArray = rs.data.concat(that.livelistArray);
                  that.vm.livelist = that.formatData(newArray);
                  that.livelistArray = newArray;

                  myScroll.scrollTo(0, -scrollSize);
                  head.removeClass('up');
                  head.attr('src', '/course-footballSNS/images/arrow.png');
                }
              })

              // setTimeout(function () {
              // }, 1000);
          }

          var maxY = this.maxScrollY - this.y;
          var self = this;
          if (maxY > -scrollSize && maxY < 0) {
              myScroll.scrollTo(0, self.maxScrollY + scrollSize);
              foot.removeClass('down')
          } else if (maxY >= 0) {
              foot.attr('src', '/course-footballSNS/images/ajax-loader.gif');
              // ajax上拉加载数据

              $.ajax({
                url: '/api/getLivelist.php',
                data: {
                  rtype: 'more'
                },
                success: function (rs) {
                  var newArray = that.livelistArray.concat(rs.data);
                  that.vm.livelist = that.formatData(newArray);
                  that.livelistArray = newArray;
                  myScroll.refresh();

                  myScroll.scrollTo(0, self.y + scrollSize);
                  foot.removeClass('down');
                  foot.attr('src', '/course-footballSNS/images/arrow.png');
                }
              });
          }
      })



		}
		
	}
});



















