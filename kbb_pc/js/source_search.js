$(function () {
	$('#g_goods_btn').on('click', function () {
//		if(_status != "" || _status != null){
			// if(){
			//
			// }
//		}
//		console.log(_status)
		$('#g_free_purchase button').eq(0).addClass('active').siblings().removeClass('active');
		setTimeout(function () {
			$('.g_bomb_mask').show().siblings('#g_free_purchase').show();
		})
	});


	//现货商城     banner旁边的找车助手
	$('#tijiao_btn').on('click', function () {
		//获取到手机号
		var shoji_jhoa = sessionStorage.getItem("phone", 7);
		if (shoji_jhoa == "" || shoji_jhoa == null || shoji_jhoa == undefined) {
			window.location.href = "../html/sign_in.html";
		} else {
			$('.tels_ojoj').val(shoji_jhoa);
			$.ajax({
				type: "POST",
				url: kbb + "kbb-webs/promptGoods/saveLookOrederPC",
				data: $("#free_push").serialize(),
				async: false,
				dataType: "json", //返回数据形式为json
				success: function (data) {
					if (data.status == 200) {
						//console.log($("#free_push").serialize())
					}
				},
				error: function () {
					console.log('error')
				}
			});
		}
	})

	//现货商城    底部找车助手
	$('#going_going').on('click', function () {
		//获取到手机号
		var shoji_jhoa = sessionStorage.getItem("phone", 7);
		if (shoji_jhoa == "" || shoji_jhoa == null || shoji_jhoa == undefined) {
			window.location.href = "../html/sign_in.html";
		} else {
			$('.tels_ojoj').val(shoji_jhoa);
			$.ajax({
				type: "POST",
				url: kbb + "kbb-webs/promptGoods/saveLookOrederPC",
				data: $("#free_push").serialize(),
				async: false,
				dataType: "json", //返回数据形式为json
				success: function (data) {
					if (data.status == 200) {
						//console.log($("#going_going").serialize())
					}
				},
				error: function () {
					console.log('error')
				}
			});
		}
	})

	//现货商城搜索
	//初始化调用一次
	list_pototype(1);

	function list_pototype(pageNo) {
		$.ajax({
			type: "POST",
			url: kbb + "kbb-webs/promptGoods/findOreBySearch",
			data: {
				pageNo: pageNo
			},
			async: false,
			dataType: "json", //返回数据形式为json
			success: function (data) {
				if (data.status == 200) {
					sour_serch(data.data, pageNo, list_pototype); //实参
				}
			},
			error: function () {
				console.log('error');
			}
		});
	}

	function sour_serch(data, pageNo, func) {  //pageNo  页数    func既定函数  框架
		//清空数据
		$('.class_dowm').empty();
		if (pageNo == 1) {
			var data_num = parseInt(data.page.lastPageNo); //总共页数
			var first_num = parseInt(data.page.pageStart); //第一页
			$("#get_nav_container").createPage({
				startPage: first_num,
				pageCount: data_num,
				current: 1,
				backFn: function (p) {
					var result = $.inArray(p + '');
					if (result >= 0) {
						// alert(result);
					} else {
						func(p + '');

					}
				}
			});
		}
		//全部数据
		var show_heades = "";
		for (var i = 0; i < data.list.length; i++) {
			//console.log(data.list[i])
			show_heades += '<li class="class_dowm"><table><td>' + data.list[i].oreClassifyName + '</td><td>' + data.list[i].areaClassifyName + '</td><td>' + data.list[i].inventory + '吨</td><td class="g_spot_three">' + data.list[i].description + '</td><td><span class="g_red">' + data.list[i].price + '</span></td><td class="g_lineHeight">' + data.list[i].oreSupplier + '</td><td>' + data.list[i].putTime + '</td><td class="g_channel"></td><td><button class="start" type="button">详情</button></td></table></li>'
		}
		$('#ul_back_dowm').append(show_heades);
//	//点击筛选
//	//解绑的事件	
		$('#show_mine_goung').off('click');
		$('#show_mine_goung').on('click', function () {
			$.ajax({
				type: "POST",
				url: kbb + "kbb-webs/promptGoods/findOreBySearch",
				data: $("#search_id").serialize(),
				async: false,
				dataType: "json", //返回数据形式为json
				success: function (data) {
					if (data.status == 200) {
						console.log(data);
						sour_serch(data.data, pageNo, list_pototype);
					}
				},
				error: function () {
					console.log('error');
				}
			});
		})
	}

	//
	$('.class_dowm .start').on('click', function () {
		var shoji_jhoa = sessionStorage.getItem("phone", 7);
		if (shoji_jhoa == "" || shoji_jhoa == null || shoji_jhoa == undefined) {
			window.location.href = "../html/sign_in.html";
		} else {
			window.location = '../shangcheng/purchase_intention.html';
		}
	});

	/* 货源搜索 */
	var goodsSwiper = new Swiper('.g_goods_banner', {
		direction: 'horizontal',
		loop: true,
		speed: 1000,
		autoplay: {
			delay: 3000
		},
		pagination: {
			el: '.swiper-pagination',
		},
	})
});