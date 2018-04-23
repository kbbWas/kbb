// var kbb = 'http://192.168.1.104:8080/';

//
var _colorId = $.getUrlParam('colorId');
var _oreId = $.getUrlParam('oreId');
var _areaId = decodeURI($.getUrlParam('areaName'));
//自营
var _orderid = $.getUrlParam('orderid');
//获取手机号
var _tel = sessionStorage.getItem("phone");

//
window.onload = function () {

	//判断登陆
	seesionLoad();

	//页面加载时调用一次
	findAll_func(1, 15);

	//点击选货
	clickVehicle();

	//侧边购物车滚动条
	$('#g_cart_swiper').height($(window).height() - 170);
	// $('#g_cart_swiper').height($(window).height() - 130);

	//设置滚动条
	$('#g_cart_swiper').niceScroll('#g_cart_slide', {
		cursorcolor: "#999",//#CC0071 光标颜色
		cursoropacitymax: 1, //改变不透明度非常光标处于活动状态（scrollabar“可见”状态），范围从1到0
		cursorwidth: "5px", //像素光标的宽度
		cursorborder: "0", // 游标边框css定义
		cursorborderradius: "10px",//以像素为光标边界半径
		autohidemode: false,//是否隐藏滚动条
		nativeparentscrolling: false, // 检测内容底部便于让父级滚动
		background: "#e6e6e6",//轨道的背景颜色
		scrollspeed: 40, // 滚动速度
		bouncescroll: false // 启用滚动跳跃的内容移动
	});

	if (_tel != '' && _tel != null && _tel != undefined) {
		//
		shopVehicleFunc(_tel);

	}

};


//获取全部的数据
var count = 0;

//获取全部的数据
function findAll_func(page, size) {
	$.ajax({
		type: "get",
		url: kbb + "kbb-webs/webStore/findAll",
		data: {
			pageNo: page,
			pageSize: size
		},
		async: true,
		success: function (data) {
			// console.log(data);
			if (data.status == 200) {
				//全部nav函数
				findAllFunc(data.data);
				//判断是否搜索
				if (_colorId != '' && _colorId != null) {
					count++;
					if (count == 1) {
						if (_oreId != null && _oreId != '') {
							searchFunc(1, 15, _colorId, _oreId);
						} else {
							searchFunc(1, 15, _colorId, '', _areaId);
						}
					}

					//列表函数
					findListadd(data.data, page, findAll_func);

					//首页现货商城筛选
				} else if (_orderid != '' && _orderid != null) {
					count++;
					if (count == 1) {
						indexShopping(_orderid);
					}

					//列表函数
					findListadd(data.data, page, findAll_func);
				} else {
					//列表函数
					findListadd(data.data, page, findAll_func);

					_colorId = '';
					_oreId = '';
				}
				//点击函数
				speciesClick();
			} else {
				alert(data.msg);
			}
		}
	});
}

//全部数据函数
function findAllFunc(_data) {
	//矿种
	let species_x = '';
	for (let i = 0; i < _data.colorlist.length; i++) {
		species_x += '<dd colorId=' + _data.colorlist[i].colorId + '><a href="javascript:;">' + _data.colorlist[i].colorName + '</a></dd>';
	}

	let species = '<div class="first_nav"><span>矿种</span><dl class="first_sjang"><dd class="post_back inde_hide"><a href="javascript:;">全部</a></dd>' + species_x + '</dl></div>';

	//品名
	let product_one = '';
	let product_two = '';
	let product_three = '';
	let product_four = '';
	let product_five = '';
	let product = '';
	for (let i = 0; i < _data.oreClassifylist.length; i++) {
		switch (_data.oreClassifylist[i].color.colorId) {
			case 1:
				product_one += '<dd oreClassifyId=' + _data.oreClassifylist[i].oreClassifyId + ' colorId=' + _data.oreClassifylist[i].color.colorId + '><a href="javascript:;">' + _data.oreClassifylist[i].oreClassifyName + '</a></dd>';
				break;
			case 2:
				product_two += '<dd oreClassifyId=' + _data.oreClassifylist[i].oreClassifyId + ' colorId=' + _data.oreClassifylist[i].color.colorId + '><a href="javascript:;">' + _data.oreClassifylist[i].oreClassifyName + '</a></dd>';
				break;
			case 3:
				product_three += '<dd oreClassifyId=' + _data.oreClassifylist[i].oreClassifyId + ' colorId=' + _data.oreClassifylist[i].color.colorId + '><a href="javascript:;">' + _data.oreClassifylist[i].oreClassifyName + '</a></dd>';
				break;
			case 5:
				product_four += '<dd oreClassifyId=' + _data.oreClassifylist[i].oreClassifyId + ' colorId=' + _data.oreClassifylist[i].color.colorId + '><a href="javascript:;">' + _data.oreClassifylist[i].oreClassifyName + '</a></dd>';
				break;
			default:
				product_five += '<dd oreClassifyId=' + _data.oreClassifylist[i].oreClassifyId + ' colorId=' + _data.oreClassifylist[i].color.colorId + '><a href="javascript:;">' + _data.oreClassifylist[i].oreClassifyName + '</a></dd>';
		}
	}
	product = '<div class="productName clear"><span>品名</span><dl>' + product_one + '</dl><dl>' + product_two + '</dl><dl>' + product_three + '</dl><dl>' + product_four + '</dl><dl>' + product_five + '</dl></div>';


	//产地
	let city_x = '';
	for (let i = 0; i < _data.areaClassifylist.length; i++) {
		city_x += '<dd><a href="javascript:;">' + _data.areaClassifylist[i].areaClassifyName + '</a></dd>'
	}
	let city = '<div class="xiay_codkj bootm_nav clear"><span>产地</span><dl class="first_sjang"><dd class="post_back inde_hide"><a href="javascript:;">全部</a></dd>' + city_x + '</dl><div class="jian_tou_xiahua"><b>更多</b><i class="iconfont icon-jiantouarrowheads3"></i></div></div>';

	$('#g_nav').html(species + product + city);

}

//导航点击事件
let colorId = '';
let oreId = '';
let areaName = '';
$('.first_nav dd').off('click');
$('.productName dd').off('click');
$('.bootm_nav dd').off('click');
$('.jian_tou_xiahua').on('click');

function speciesClick() {
	//矿种
	$('.first_nav dd').on('click', function () {
		$(this).addClass('post_back').siblings().removeClass('post_back').parents('.first_nav').siblings('.productName ').find('dd').removeClass('post_back');
		if ($(this).index() == 0) {
			$('.productName').removeClass('g_show');
			//点击全部调用全部接口
			colorId = '';
			oreId = '';
			areaName = '';

			findAll_func(1, 15);

		} else {
			colorId = $(this).attr('colorid');
			oreId = '';
			$('.productName').addClass('g_show').find('dl').eq($(this).index() - 1).addClass('g_show').siblings('dl').removeClass('g_show');
			//条件查询colorId
			searchFunc(1, 15, colorId, oreId, areaName, 1);
		}
	});
	//	品名
	$('.productName dd').on('click', function () {
		$(this).addClass('post_back').siblings().removeClass('post_back').parent().siblings('dl').find('dd').removeClass('post_back');
		colorId = $(this).attr('colorId');
		oreId = $(this).attr('oreclassifyid');
		searchFunc(1, 15, colorId, oreId, areaName, 1);

	});
	//	产地
	$('.bootm_nav dd').on('click', function () {
		$(this).addClass('post_back').siblings().removeClass('post_back');
		//
		if ($(this).index() == 0) {
			areaName = '';
			searchFunc(1, 15, colorId, oreId, areaName);
		} else {
			areaName = $(this).children('a').html();
			searchFunc(1, 15, colorId, oreId, areaName);
		}

	});

	//	点击更多
	$('.jian_tou_xiahua').on('click', function () {
		$('.first_sjang').toggleClass('gHeight');
		$(this).toggleClass('active');
	})
}

//条件查询所有数据
//页数 个数 矿种 品名 产地
function searchFunc(page, size, colorId, oreId, areaName, num) {
	$.ajax({
		type: "get",
		url: kbb + "kbb-webs/webStore/findByCondition",
		data: {
			pageNo: page,
			pageSize: size,
			colorId: colorId,
			oreclassifyId: oreId,
			areaClassifyName: areaName
		},
		async: true,
		success: function (data) {
			// console.log(data);
			if (data.status == 200) {

				//产地添加
				if (num == 1) {
					let city_x = '';
					if (data.data.list.arelist.length < 16) {
						for (let i = 0; i < data.data.list.arelist.length; i++) {
							city_x += '<dd><a href="javascript:;">' + data.data.list.arelist[i].areaClassifyName + '</a></dd>'
						}
						let city = '<div class="xiay_codkj bootm_nav clear"><span>产地</span><dl class="first_sjang"><dd class="post_back inde_hide"><a href="javascript:;">全部</a></dd>' + city_x + '</dl></div></div>';

						$('.bootm_nav').html(city);
					} else {
						for (let i = 0; i < data.data.list.arelist.length; i++) {
							city_x += '<dd><a href="javascript:;">' + data.data.list.arelist[i].areaClassifyName + '</a></dd>'
						}
						let city = '<div class="xiay_codkj bootm_nav clear"><span>产地</span><dl class="first_sjang"><dd class="post_back inde_hide"><a href="javascript:;">全部</a></dd>' + city_x + '</dl><div class="jian_tou_xiahua"><b>更多</b><i class="iconfont icon-jiantouarrowheads3"></i></div></div>';

						$('.bootm_nav').html(city);
					}
				} else {

				}

				//	产地
				$('.bootm_nav dd').click(function () {
					$(this).addClass('post_back').siblings().removeClass('post_back');
					//
					if ($(this).index() == 0) {
						areaName = '';
						searchFunc(1, 15, colorId, oreId, areaName);
					} else {
						areaName = $(this).children('a').html();
						searchFunc(1, 15, colorId, oreId, areaName);
					}

				});

				//	点击更多
				$('.jian_tou_xiahua').click(function () {
					$('.first_sjang').toggleClass('gHeight');
					$(this).toggleClass('active');
				});

				//列表查询
				findListadd(data.data, page, searchFunc, colorId, oreId, areaName);
			} else {
				alert(data.msg);
			}
		}
	});
}

//列表添加
//func 是 全部的数据还是筛选数据函数
function findListadd(_data, page, func, colorId, areaId, oreId) {
	//列表
	let list_x = '';
	var _price = null;
	let list = '';
	for (let i = 0; i < _data.pageResult.list.length; i++) {
		if (isNaN(parseInt(_data.pageResult.list[i].price))) {
			_price = '<td>' + _data.pageResult.list[i].price + '</td>';

		} else {
			_price = '<td><span class="g_red">￥' + parseInt(_data.pageResult.list[i].price) + '/吨</td>';
		}
		list_x += '<li><table><td>' + _data.pageResult.list[i].oreClassify.oreClassifyName + '</td><td>' + _data.pageResult.list[i].areaClassify.areaClassifyName + '</td><td class="g_spot_three">' + _data.pageResult.list[i].description + '</td><td>' + _data.pageResult.list[i].mintons + '吨</td><td>' + _data.pageResult.list[i].inventory + '吨</td>' + _price + '<td>' + _data.pageResult.list[i].priceMold + '</td><td class="g_channel"></td><td><button class="start" type="button" oreId=' + _data.pageResult.list[i].oreId + '>选货</button></td></table></li>'
	}

	if (page == 1) {
		var data_num = parseInt(_data.pageResult.page.lastPageNo);
		var first_num = parseInt(_data.pageResult.page.pageStart);
		$("#get_nav_container").createPage({
			startPage: first_num,
			pageCount: data_num,
			current: 1,
			backFn: function (p) {

				var result = $.inArray(p + '');
				if (result >= 0) {
					// alert(result);
				} else {
					func(p + '', 15, colorId, areaId, oreId);
					$('.zhiding_j').click();
				}
			}
		});
	}

	if (_data.pageResult.list.length < 1) {
		list = '<div id="find_list' + page + '"><table  class="g_spot_list_title"><td>品名</td><td>产地</td><td class="g_list_three">指标</td><td>起购吨数</td><td>可供吨数</td><td>指导价格</td><td>价格类型</td><td>货源类型</td><td>操作</td></table><p class="no_list" ">抱歉，没有找到您搜索的相关信息</p></div>';
		//隐藏分页
		$('.pagination').hide();
	} else {
		$('.pagination').show();
		list = '<div id="find_list' + page + '"><table  class="g_spot_list_title"><td>品名</td><td>产地</td><td class="g_list_three">指标</td><td>起购吨数</td><td>可供吨数</td><td>指导价格</td><td>价格类型</td><td>货源类型</td><td>操作</td></table><ul>' + list_x + '</ul></div>';
	}


	$('#g_find_list').html(list);


}


//首页现货商城筛选
function indexShopping(oreId) {
	$.ajax({
		type: "get",
		url: kbb + "kbb-webs/webStore/findoreById",
		data: {
			oreId: oreId
		},
		//异步  跨域
		async: true,
		success: function (data) {
			// console.log(data);
			if (data.status == 200) {
				//添加列表
				indexListadd(data.data)
			} else {
				alert(data.msg);
			}
		}
	});
}

function indexListadd(data) {
	// console.log(data);
	//列表
	var _price = null;
	if (isNaN(parseInt(data.price))) {
		_price = '<td>' + data.price + '</td>';

	} else {
		_price = '<td><span class="g_red">￥' + parseInt(data.price) + '/吨</td>';
	}

	let list = '<div id="find_list"><table  class="g_spot_list_title"><td>品名</td><td>产地</td><td class="g_list_three">指标</td><td>起购吨数</td><td>可供吨数</td><td>指导价格</td><td>价格类型</td><td>货源类型</td><td>操作</td></table><ul><li><table><td>' + data.oreClassify.oreClassifyName + '</td><td>' + data.areaClassify.areaClassifyName + '</td><td class="g_spot_three">' + data.description + '</td><td>' + data.mintons + '吨</td><td>' + data.inventory + '吨</td>' + _price + '<td>' + data.priceMold + '</td><td class="g_channel"></td><td><button class="start" type="button" oreId=' + data.oreId + '>选货</button></td></table></li></ul></div>';

	$('#g_find_list').html(list);

}

//
// 购物车
//
var flag = true;
$('#clickCart').on('click', function () {
	if (flag == true) {
		$('.g_shopping_cart').animate({
			'right': '0'
		}, 300);
		flag = false;
		if (_tel == null || _tel == '') {
			$('.g_notList').html('<p>您还没有登录，快去 <a href="../html/sign_in.html" class="g_blue">登录</a>选货吧</p>');
		}else{
			shopVehicleFunc(_tel);
		}
	} else if (flag == false) {
		$('.g_shopping_cart').animate({
			'right': '-300px'
		}, 300);
		flag = true;
	}
});

$('#g_spot_list').on('click', function () {
	$('.g_shopping_cart').animate({
		'right': '-300px'
	}, 300);
	flag = true;
})


// 点击加入购物车
function clickVehicle() {
	var offset = $('#end').offset();
	$(window).resize(site);

	function site() {
		offset = $('#end').offset();
	}

	$('#g_spot_list').on('click', 'button', function (event) {
		if (_tel != '' && _tel != null && _tel != undefined) {
			var flyer = $('<img class="u-flyer" src="../img/chidren/gouwuche.png">');
			flyer.fly({
				start: {
					left: event.pageX,
					top: event.pageY
				},
				end: {
					left: offset.left,
					top: offset.top,
					width: 0,
					height: 0
				}

			});

			//添加商品
			addVehicleFunc($(this).attr('oreid'), '100', _tel);
		} else {
			window.location = '../html/sign_in.html';
		}

	})
}

//添加列表
function seeVehicle(data) {
	if (data == null) {
		$('.g_notList').addClass('g_show').html('<p class="g_blue" >购物车空空的，快去选货吧</p>').siblings('#g_shop_cart').removeClass('g_show');

		$('#g_length,#set_num').html('0');
		$('#set_money').html('总计：<b class="g_red">￥0</b>');
	} else {
		$('#g_shop_cart').addClass('g_show').siblings('.g_notList').removeClass('g_show');
		$('#g_length,#set_num').html(data.orelist.length);

		$('#set_money').html('总计：<b class="g_red">￥' + data.total + '</b>');


		let shop_x = '';
		let btn_e5 = '';
		for (let i = 0; i < data.lists.length; i++) {
			if (isNaN(parseInt(data.lists[i].price))) {
				_price = data.lists[i].price;
			} else {
				_price = '<b class="g_red">￥' + parseInt(data.lists[i].price) + '/吨</b>';
			}

			//判断按钮颜色
			if(data.lists[i].ore.mintons==data.lists[i].quantity){
				btn_e5='<button style="color: #e5e5e5" minT="' + data.lists[i].ore.mintons + '" class="reduce_btnT">-</button>'
			}else{
				btn_e5='<button minT="' + data.lists[i].ore.mintons + '" class="reduce_btnT">-</button>'
			}

			shop_x += '<div class="g_cart_list clear"><div class="g_cart_t clear"><h5 class="pull-left">' + data.lists[i].ore.oreClassify.oreClassifyName + '/' + data.lists[i].ore.areaClassify.areaClassifyName + '</h5><span class="pull-right">' + _price + '</span></div><div class="g_cart_c clear"><p class="pull-left">' + data.lists[i].ore.description + '</p><div class="pull-right">'+btn_e5+'<input class="g_changeT" readonly="readonly" type="text" value="' + data.lists[i].quantity + '"><button class="add_btnT" maxt="' + data.lists[i].ore.inventory + '">+</button></div></div><div class="g_cart_f clear"><span class="g_shop_icon pull-left">' + data.lists[i].ore.mintons + '吨起购，每40吨递增</span><button class="pull-right" type="button" orderid=' + data.lists[i].ore.oreId + '>删除</button></div></div>';

		}


		$('#g_cart_slide').html(shop_x);

		//重置 滚动条
		$('#g_cart_swiper').getNiceScroll().show();
		$('#g_cart_swiper').getNiceScroll().resize();


	}
	clickFunc();
}

//点击事件
function clickFunc(data) {
	//点击删除
	$('#g_cart_slide .g_cart_f').on('click', 'button', function () {
		$(this).parents('.g_cart_list').remove();
		deleteVehicle($(this).attr('orderid'), _tel)
	});

	//	点击锁货
	$('#lockGoods').on('click', function () {
		setTimeout(function () {
			$('body').addClass('body_css');
			$('.g_bomb_mask').show().siblings('#g_lockGoods').show();
		}, 300)
	});

	// 弹框立即锁货
	$('#g_lockGoods button').eq(0).click(function () {
		lockGoodsFunc(_tel);
	});

	//清空购物车
	$('#g_empty').click(function () {
		emptyVehicle(_tel);
	});


	//减小吨数
	$('.g_cart_c .reduce_btnT').click(function () {
		//获取ipt
		let ipt = $(this).siblings('.g_changeT');
		//获取内容
		let ipt_num = Number($(this).siblings('.g_changeT').val());
		//获取起购吨数
		let minT = Number($(this).attr('mint'));
		//获取可供吨数
		let maxT = Number($(this).siblings('.add_btnT').attr('maxt'));
		//获取产品id
		let skuId = $(this).parents('.g_cart_c').siblings('.g_cart_f').children('button').attr('orderid');

		tonnageBtn(1, ipt_num, ipt, minT, maxT, skuId, $(this));
	});


	//添加吨数按钮
	$('.g_cart_c .add_btnT').click(function () {
		//获取ipt
		let ipt = $(this).siblings('.g_changeT');
		//获取内容
		let ipt_num = Number($(this).siblings('.g_changeT').val());
		//获取起购吨数
		let minT = Number($(this).siblings('.reduce_btnT').attr('mint'));
		//获取可供吨数
		let maxT = Number($(this).attr('maxt'));
		//获取产品id
		let skuId = $(this).parents('.g_cart_c').siblings('.g_cart_f').children('button').attr('orderid');

		tonnageBtn(2, ipt_num, ipt, minT, maxT, skuId, $(this));
	});

}

//吨数加减   1 -||+ 2 ipt.val() ipt minlength maxlength 商品id 自己
function tonnageBtn(page, num, obj, minT, maxT, skuId, _this) {
	if (page == 1) {
		if (num < minT + 40) {
			obj.val(minT);
			_this.css('color', '#e5e5e5');
		} else {
			num -= 40;
			obj.val(num);
			addVehicleFunc(skuId,-40,_tel);
		}
	} else {
		if (num < maxT - 40) {
			num += 40;
			obj.val(num);
			addVehicleFunc(skuId,40,_tel);
		} else {
			obj.val(maxT);
			_this.css('color', '#e5e5e5');
		}
	}
}
//添加商品 修改商品数量
// skuId 商品id quantity 某件商品购物数量 telephone 用户电话
// addVehicleFunc(24,'1','13835197059');
function addVehicleFunc(skuId, quantity, tel) {
	$.ajax({
		type: "get",
		url: kbb + "kbb-webs/cart/addCart",
		data: {
			skuId: skuId,
			quantity: quantity,
			telephone: tel
		},
		//异步  跨域
		async: true,
		success: function (data) {
			// console.log(data);
			if (data.status == 200) {
				$('#g_length').html(parseInt(data.data.lists.length));

				// shopVehicleFunc(tel);
			} else {
				alert(data.msg);
			}
		}
	});
}

// 查看购物车
function shopVehicleFunc(tel) {
	$.ajax({
		type: "get",
		url: kbb + "kbb-webs/cart/findList",
		data: {
			telephone: tel
		},
		async: true,
		success: function (data) {
			// console.log(data);
			if (data.status == 200) {

				$('#g_cart_slide div').remove();
				//
				seeVehicle(data.data);
			} else {
				alert(data.msg);
			}
		}
	});
}
//删除购物车
function deleteVehicle(skuId, tel) {
	$.ajax({
		type: "get",
		url: kbb + "kbb-webs/cart/remove",
		data: {
			skuId: skuId,
			telephone: tel
		},
		async: true,
		success: function (data) {
			// console.log(data);
			if (data.status == 200) {
				shopVehicleFunc(tel);
			} else {
				alert(data.msg);
			}
		}
	});
}


//清空购物车
function emptyVehicle(tel) {
	$.ajax({
		type: "get",
		url: kbb + "kbb-webs/cart/clear",
		data: {
			telephone: tel
		},
		async: true,
		success: function (data) {
			// console.log(data);
			if (data.status == 200) {
				shopVehicleFunc(tel);
			} else {
				alert(data.msg);
			}
		}
	});
}

//立即锁货
function lockGoodsFunc(tel) {
	$.ajax({
		type: "get",
		url: kbb + "kbb-webs/webOrder/getOrder",
		data: {
			telephone: tel
		},
		async: true,
		success: function (data) {
			// console.log(data);
			if (data.status == 200) {
				location.reload();
			} else {
				alert(data.msg);
			}
		}
	});
}

//
//在线客服
//
$('.g_service').on('mouseover', function () {
	$('.chuxiona_ba').css({"transition": "0.5s", "right": "30px", 'background': '#0058a9'});
});
$('.g_service').on('mouseout', function () {
	$('.chuxiona_ba').css({'transition': '0.5s', 'right': '-50px', 'background': '#999999'});
});

//
//二维码显示  购物车
//
$('.g_code').on('mouseover', function () {
	$('.wei_ma').css({"transition": "0.5s", "right": "44px"});
});
$('.g_code').on('mouseout', function () {
	$('.wei_ma').css({'transition': '0.5s', 'right': '-86px'});
});

//
//建议反馈
//
$('.g_feedback').on('mouseover', function () {
	$('.fuanyu_are').css({"transition": "0.5s", "right": "30px", 'background': '#0058a9'});
});
$('.g_feedback').on('mouseout', function () {
	$('.fuanyu_are').css({'transition': '0.5s', 'right': '-50px', 'background': '#999999'});
});




