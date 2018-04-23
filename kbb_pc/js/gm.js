// 测试
var kbb = 'http://192.168.1.109:8080/';
// var kbb = 'http://123.207.94.132:8090/';

//获取window.href属性
$.getUrlParam = function (name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]);
	return null;
};
//$.getUrlParam('id')

//获取手机号
var _tel = sessionStorage.getItem("phone");

//判断登陆
seesionLoad();

$('.g_nav_tab li').off('click');
$('.g_new_tab span').off('click');
$('#g_click_model').off('click');
$('.g_close,.g_bomb_mask').off('click');
$('#clickCart').off('click');
$('.g_spot_list button').off('click');
$('.g_success_alert button').off('click');
$('.g_click_alert').off('click');


//获取手机验证码
function loadyam(obj) {
	var starnum = 59;
	var gotime = null;
	obj.innerHTML = starnum + "秒";

	function minstime() {
		starnum--;
		obj.innerHTML = starnum + "秒";

		if (starnum == 0) {
			clearInterval(gotime);
			obj.innerHTML = "重新获取验证码";
		}
	}

	gotime = setInterval(minstime, 1000);
}

//判断登陆
function seesionLoad() {
	var tel = sessionStorage.getItem("phone");

	if (tel != '' && tel != null) {
		$('.login_action p').html('Hi,' + tel);

		$('#g_userTel').html(tel);

		$('.left_hot div').eq(1).show().siblings('div').hide();

		$('.login_sigin').hide();
		$('.head_pictice').css({
			'margin-top': '35px'
		})

	} else {
		$('.login_action p').html('Hi，欢迎来到矿宝宝官网！');
		$('.left_hot div').eq(0).show().siblings('div').hide();
		$('.login_sigin').show();
		$('.head_pictice').css({
			'margin-top': '20px'
		})
	}

}
//退出登录
$('#signOut').on('click', function () {
	sessionStorage.clear();
	seesionLoad()
});


// 物流弹框
// $('#g_click_model,.g_settlement button').on('click', function() {
// 	$('.g_success_alert button,#g_selected_goods button').eq(0).addClass('active').siblings().removeClass('active');
// 	setTimeout(function() {
// 		$('body').addClass('body_css');
// 		$('.g_bomb_mask').show().siblings('#wuli_tanc').show();
// 	}, 300)
// })

// 点击关闭
$('.g_close,.g_bomb_mask').on('click', function () {
	setTimeout(function () {
		$('body').removeClass('body_css');
		$('.g_bomb_mask').hide().siblings('.g_log_bomb_box').hide();
		$('.g_lock_goods').hide().siblings('.g_log_bomb_box').hide();
	})
})


// 弹幕
$('#g_barrage').on('click', function () {
	$(this).animate({
		'left': '-230px'
	}, 300);
	setTimeout(function () {
		$('#g_search_barrage').animate({
			'left': '0'
		}, 600);
	}, 300)
})

$('#g_close').on('click', function () {
	$('#g_search_barrage').animate({
		'left': '-100%'
	}, 600);
	setTimeout(function () {
		$('#g_barrage').animate({
			'left': '0'
		}, 300);
	}, 600)
});


// 选货成功  
$('#g_goods_list button').on('click', function () {
	$('#g_selected_goods button').eq(0).addClass('active').siblings().removeClass('active');
	setTimeout(function () {
		$('body').addClass('body_css');
		$('.g_bomb_mask').show().siblings('#g_selected_goods').show();
	})
});

//$('#g_goods_btn').on('click', function () {
//	$('#g_free_purchase button').eq(0).addClass('active').siblings().removeClass('active');
//	setTimeout(function () {
//		$('body').addClass('body_css');
//		$('.g_bomb_mask').show().siblings('#g_free_purchase').show();
//	})
//});

// 



//订单详情
function func(num) {
	if (num == 1) {
		$('.g_state li').eq(0).addClass('active');
	} else if (num == 2) {
		$('.g_state li').eq(4).prevAll().addClass('active').find('button').hide();
	} else if (num == 3) {
		$('.g_state li').eq(5).addClass('active').prevAll().addClass('active').find('b').addClass('active').end().find('button').hide();
	} else {
		$('.g_state li').eq(6).addClass('active').siblings().addClass('active').find('b').addClass('active').end().find('button').hide();
		console.log($('.g_state li').eq(6))
	}
}


// 填写提货函显示
$(".g_write_btn").on('click', function () {
	setTimeout(function () {
		$('body').addClass('body_css');
		$('.g_bomb_mask').show().siblings('#g_take_goods').show();
	}, 300)
});


//提货函事件
$('.g_fill_global label').on('click', function () {
	$(this).children('i').addClass('active').parent().siblings('label').children('i').removeClass('active');
})
$('.g_fill_global').eq(0).on('click', 'label', function () {
	if ($(this).index() == 1) {
		$('.g_fill_list').eq(0).addClass('g_show').siblings('.g_fill_list').removeClass('g_show');
	} else {
		$('.g_fill_list').eq(1).addClass('g_show').siblings('.g_fill_list').removeClass('g_show');
	}
}).siblings('.g_fill_list').on('click', '.g_fill_global label', function () {
	if ($(this).index() == 1) {
		$('.g_in_batches').removeClass('g_show').siblings('.g_in_voucher').css({
			'padding-top': '40px'
		});
	} else {
		$('.g_in_batches').addClass('g_show').siblings('.g_in_voucher').css({
			'padding-top': '10px'
		});
	}
});


//我的订单
$(".m_order_tab li").on('click', function () {
	$(this).addClass('active').siblings().removeClass('active');
	$('.m_order_list').eq($(this).index()).addClass('g_show').siblings().removeClass('g_show')
});

$('#m_order_ls_inner .m_list_foot button').eq(1).on('click', function () {
	window.location = 'order_details.html';
});


//企业认证
$('.m_renzheng').eq($.getUrlParam('state')).show().siblings('.m_renzheng').hide();

$('#g_qiyeForm input[type="file"]').on('change', function () {
	$(this).parent().siblings('i').addClass('g_blue').html($(this).val().split('\\')[2]);
});




//求购意向
$("#g_intention_btn").click(function () {
	setTimeout(function () {
		$('body').addClass('body_css');
		$('.g_bomb_mask').show().siblings('#g_selected_goods').show();
	}, 300)
});

