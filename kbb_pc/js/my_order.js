$(function() {

	//判断登陆
	seesionLoad();
	//初始化的时候
	order_list(1, '');
})

//全部订单
function order_list(pageNo, status) {
	$.ajax({
		type: "get",
		url: kbb + "kbb-webs/orderIntention/findOrderIntentionListByStatus",
		data: {
			pageNo: pageNo,
			status: status
		},
		async: false,
		success: function(data) {
			if(data.status == 200) {
				$('.m_order_list').empty();
				var my_order_all = '';
				var tiaojian_order = '';
				var kuavbao_wuliu = '';
				var hetongjia = '';
				for(let i = 0; i < data.data.list.length; i++) {
					//订单的状态
					switch(data.data.list[i].status) {
						case 0:
							tiaojian_order = '<td class="g_orange">待签约</td>';
							break;
						case 1:
							tiaojian_order = '<td class="g_orange">待联系</td>';
							break;
						case 2:
							tiaojian_order = '<td class="g_orange">待结款</td>';
							break;
						case 3:
							tiaojian_order = '<td class="g_orange">运输中</td>';
							break;
						case 4:
							tiaojian_order = '<td>已完成</td>';
						default:
					}

					//是否为矿宝宝运输
					if(data.data.list[i].carriageOrderId != null) {
						kuavbao_wuliu = '<div class="m_list_top active">';
					} else {
						kuavbao_wuliu = '<div class="m_list_top">';
					}

					//合同价
					if(data.data.list[i].quotedPrice == null) {
						hetongjia = '';
					} else {
						hetongjia = '<p style="margin-left:60px;" class="pull-left"><span>合同价：</span><b class="g_red">￥' + data.data.list[i].quotedPrice + '</b></p>';
					}
					my_order_all += '<div class="m_tab_list">' + kuavbao_wuliu + '<span>' + data.data.list[i].orderIntentionTime + '</span><span>订单号：' + data.data.list[i].orderIntentionNumber + '</span></div><div class="m_list_center"><table><tr><td class="g_lineHeight">' + data.data.list[i].list[0].oreClassifyName + '</td><td>' + data.data.list[i].list[0].areaClassifyName + '</td><td class="m_order_three g_text_left">' + data.data.list[i].list[0].description + '</td>' + tiaojian_order + '<td>' + data.data.list[i].list[0].tons + '</td><td>¥' + data.data.list[i].list[0].carriage + '/吨</td><td>' + data.data.list[i].telephone + '</td></tr></table></div><div class="m_list_foot clear"><p class="pull-left"><span>订单报价：</span><b class="g_red">￥' + data.data.list[i].list[0].carriage + '</b></p>' + hetongjia + '<label class="pull-right"><button class="active" id="g_tack_btn">填写提货函</button><button orderIntentionId='+data.data.list[i].orderIntentionId+' id="loader_loade">订单详情</button></label></div></div>'
				}

				$('.m_order_list').append(my_order_all);

				//分页数据
				if(pageNo == 1) {
					var data_num = parseInt(data.data.page.lastPageNo); //总共页数
					var first_num = parseInt(data.data.page.pageStart); //第一页
					$("#get_nav_container").createPage({
						startPage: first_num,
						pageCount: data_num,
						current: 1,
						backFn: function(p) {
							var result = $.inArray(p + '');
							if(result >= 0) {
								// alert(result);
							} else {
								order_list(p + '');

							}
						}
					});
				}

			} else {
				alert(data.msg)
			}
		}

	});
}

//全部订单
$(document).on('click', '.m_order_tab li', function() {
	$(this).addClass('active').siblings().removeClass('active');
	$('.m_order_list').eq($(this).index()).addClass('g_show').siblings().removeClass('g_show');

	//现货商城订单状态判断
	switch($(this).index()) {
		case 0:
			order_list(1, '', );
			break;
		case 1:
			order_list(1, 3);
			break;
		case 2:
			order_list(1, 0);
			break;
		case 3:
			order_list(1, 1);
			break;
		case 4:
			order_list(1, 5);
		default:
	}
});
//提货函点击跳出
$(document).on('click', '#g_tack_btn', function() {
	setTimeout(function() {
		$('.g_bomb_mask').show().siblings('#g_take_goods').show();
	}, 300)
})
//点击跳转携带id 
$(document).on('click', '#loader_loade', function() {
	window.location = 'order_details.html?orderIntentionId='+$(this).attr('orderIntentionId');
});