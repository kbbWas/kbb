// 物流swiper
var mySwiper = new Swiper('.g_log_swiper_container', {
	direction: 'horizontal',
	loop: true,
	speed: 700,
	autoplay: {
		delay: 3000
	},
	// 如果需要前进后退按钮
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	}
})
// 商城tab
$('.g_nav_tab li').on('click', function() {
	$(this).addClass('active').siblings().removeClass('active');
	$('.g_shop_list ul').eq($(this).index() - 1).addClass('g_show').siblings().removeClass('g_show');
})

// 资讯tab
$('.g_new_tab span').on('click', function() {
	$(this).addClass('active').siblings().removeClass('active');
	$('.g_new_center ul').eq($(this).index()).addClass('g_show').siblings().removeClass('g_show');
})


// 物流弹框
$('#g_click_model').on('click',function(){
	setTimeout(function(){
		$('body').addClass('body_css');
		$('.g_bomb_mask').show().siblings('.g_log_bomb_box').show();
	},200)
})

$('.g_close,.g_bomb_mask').on('click',function(){
	$('body').removeClass('body_css');
	setTimeout(function(){
		$('.g_bomb_mask').hide().siblings('.g_log_bomb_box').hide();
	})
})
//
// 购物车
//
var flag=true;
$('#clickCart').on('click', function() {
	if(flag==true){
		$('.g_shopping_cart').animate({
			'right': '0'
		},600);
		flag=false;
	}else if(flag==false){
		$('.g_shopping_cart').animate({
			'right': '-300px'
		},600);
		flag=true;
	}	
})