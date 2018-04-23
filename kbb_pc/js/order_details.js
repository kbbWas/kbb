$(function() {
	//截取id
	var orderIntentionId = $.getUrlParam('orderIntentionId');
	$.ajax({
		type: "get",
		url: kbb + "kbb-webs/orderIntention/findOrderIntentionById",
		data: {
			orderIntentionId: orderIntentionId
		},
		async: false,
		success: function(data) {
			if(data.status == 200) {
				var times_hers = '';
				//console.log(data.data.status)
				func(Number(data.data.status));
				times_hers = '<span>' + data.data.orderIntentionTime + '<span>' + data.data.orderIntentionNumber + '</span>'
				$('.g_detail_title').html(times_hers);
			}
		}

	});
})

//状态判断
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

//提货函事件
$('.g_fill_global label').on('click', function () {
	$(this).children('i').addClass('active').parent().siblings('label').children('i').removeClass('active');
})
$('.g_fill_global').eq(0).on('click', 'label', function () {
	if ($(this).index() == 1) { 
		$(this).children('input').val('1');
		$('.g_fill_list').eq(0).addClass('g_show').siblings('.g_fill_list').removeClass('g_show');
	} else {
		//委托矿宝宝
		$(this).parent().find('input').val('2');
		$('.g_fill_list').eq(1).addClass('g_show').siblings('.g_fill_list').removeClass('g_show');
	}
}).siblings('.g_fill_list').on('click', '.g_fill_global label', function () {
	//切换清空
	$('.g_tack_voucher,.test_kokps').val('');
	if ($(this).index() == 1) {
		$(this).children('input').val('1');
	} else {
		$(this).parent().find('input').val('2');
	}
});
