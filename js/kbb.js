$(function() {
	/*banner 轮播*/
	var swiper = new Swiper('.lunbo_nac ', {
		spaceBetween: 0,
		centeredSlides: true,
		autoplay: {
			delay: 2500,
			disableOnInteraction: false,
		},
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
	});
	/**/
	/*移上去APP二维码显示*/
	/*//*/
	$('.dian_app').on('mouseover', function() {
		$('.show_app').show();
	})
	$('.dian_app').on('mouseleave', function() {
		$('.show_app').hide();
	})
	//
	//移上去公众号二维码显示*/
	//
	$('.dian_what').on('mouseover', function() {
		$('.show_what').show();
	})
	$('.dian_what').on('mouseleave', function() {
		$('.show_what').hide();
	})
	
	//
	/*点击nav下分类 第一行*/
	//
//	点击全部隐藏地名
//	$('.first_nav dd').on('click', function(){
//		$('.taggel_nav dd').hide();
//	})
	$('.first_nav dd').on('click', function(){
		$(this).addClass('post_back').siblings().removeClass('post_back').parent().siblings('.taggel_nav').children().removeClass();
		$('.bootm_nav dd').removeClass();
	})
	//
	//	第二行
	//
	$('.first_sjang dd').on('click', function(){
		$('.taggel_nav').eq($(this).index()-1).addClass('xianshi_shoyu').siblings().removeClass('xianshi_shoyu');
	})
	//
	//第三行
	//
	$('.bootm_nav dd').on('click', function(){
//		$(this).addClass('post_back').siblings().removeClass('post_back').parent().parent().siblings('.bootm_nav').find('dd').removeClass('post_back');
		$(this).addClass('post_back').siblings().removeClass('post_back').parents('.bootm_nav').siblings('.bootm_nav').find('dd').removeClass('post_back');
	})
	//
	///现货商城  显示对于的搜索
	//
	$('.jian_tou_xiahua').on('click', function() {
		if($('.xiayi_kuai').css('display') == "none") {
			$('.xiayi_kuai').slideDown();
		} else {
			$('.xiayi_kuai').slideUp();
		}
	})



})