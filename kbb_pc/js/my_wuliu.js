$(document).ready(function ($) {
	//判断登陆
	seesionLoad();

	if (_tel != '' && _tel != null) {
		logisticsFunc(1, _tel, '', $('.m_order_list').eq(0));
	} else {
		window.location = '../html/sign_in.html';
	}

});


//物流接口
function logisticsFunc(pageNo, tel, status, parent) {
	$.ajax({
		type: "get",
		url: kbb + "kbb-webs/carriageOrder/MyCarriageOrder",
		data: {
			pageNo: pageNo,
			telephone: tel,
			carriageStatus: status
		},
		async: true,
		success: function (data) {
			console.log(data);
			if (data.status == 200) {
				logisticsList(data.data, parent, pageNo, tel, status);
			} else {
				alert(data.msg);
			}
		}
	});
}

//物流列表
function logisticsList(data, parent, pageNo, tel, _status) {
	let list = '';
	let status = '';
	for (let i = 0; i < data.list.length; i++) {
		if (data.list[i].carriageOrder.carriageStatus == 0) {
			status = '<div class="m_list_top active clear"><span class="pull-left">' + data.list[i].carriageOrder.putTime + '</span><span class="pull-left">物流编号：' + data.list[i].carriageOrder.carriageId + '</span><strong class="pull-right g_my_wl_blue">运输中</strong></div>';
		} else {
			status = '<div class="m_list_top clear"><span class="pull-left">' + data.list[i].carriageOrder.putTime + '</span><span class="pull-left">物流编号：' + data.list[i].carriageOrder.carriageId + '</span><strong class="pull-right">已运完</strong></div>';
		}


		list +='<div class="m_tab_list">'+status + '<div class="m_list_center"><table><tr><td class="m_order_one g_wl_one"><b>哈密' + data.list[i].carriageOrder.startCity + '</b><span>' + data.list[i].carriageOrder.startAddress + '</span><b>' + data.list[i].carriageOrder.aimCity + '</b><span>' + data.list[i].carriageOrder.aimAddress + '</span></td><td>' + data.list[i].carriageOrder.productName + '</td><td>￥' + data.list[i].carriageOrder.carriage + '/吨</td><td>' + data.list[i].carriageOrder.totalTons + '吨</td><td>' + data.list[i].unGoAccount + '吨</td><td>' + data.list[i].onLoadAccount + '吨</td><td>' + data.list[i].finishAccount + '吨</td></tr></table></div><div class="m_list_foot clear"><label class="pull-right"><button carriageId='+data.list[i].carriageOrder.carriageId+'>物流详情</button></label></div></div></div>';
	}

	parent.html(list);

	if (pageNo == 1) {
		var data_num = parseInt(data.page.lastPageNo);
		var first_num = parseInt(data.page.pageStart);
		$("#get_nav_container").createPage({
			startPage: first_num,
			pageCount: data_num,
			current: 1,
			backFn: function (p) {

				var result = $.inArray(p + '');
				if (result >= 0) {
					// alert(result);
				} else {
					logisticsFunc(p + '', tel, _status, parent);
					$('html,body').animate({scrollTop: 0}, 500);
				}
			}
		});
	}
}

//我的物流
$(".g_wl_tab li").click(function () {
	$(this).addClass('active').siblings().removeClass('active');
	$('.g_wl_list_i').eq($(this).index()).addClass('g_show').siblings().removeClass('g_show');

	switch ($(this).index()) {
		case 0:
			logisticsFunc(1, _tel, '', $('.m_order_list').eq(0));
			break;
		default:
			logisticsFunc(1, _tel, 0, $('.m_order_list').eq(1));
	}

});
//物流详情
$(".g_wl_order").on('click', 'button', function () {
	window.location = 'my_wuliu_detail.html?carriageid='+$(this).attr('carriageid');
});


