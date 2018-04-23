window.onload = function () {

	//导航侧边栏
	nav_sidebarFunc();

	//热门资讯
	new_information(5);

	//新闻资讯
	new_information(3);

	//运输信息
	yunshu_func();

	//现货商城
	kbb_shop(1);
};


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

//
function nav_sidebarFunc() {
	$.ajax({
		type: "get",
		url: kbb + "kbb-webs//promptGoods/findOre",
		data: {},
		async: false,
		success: function(data) {
			// console.log(data)
			if(data.status == 200) {
				let new_parent = document.getElementById('left_navigation');
				let new_ul = document.createElement('ul');
				new_parent.appendChild(new_ul);
				for(let i = 0; i < data.data.length; i++) {
					let kbb_nav_func = new nav_sideFunc(data.data[i], new_ul);
				}
				//点击事件
				nav_clickFunc();
			} else {
				alert(data.msg)
			}
		}
	});
}

//nav点击事件
function nav_clickFunc() {
	$('#left_navigation .first_dan li').on('click', function() {
		if($(this).attr('colorid')!=undefined){
			window.location = 'shangcheng/spot_mall.html?colorId=' + $(this).attr('colorid')+'&areaName='+encodeURI(encodeURI($(this).children('a').html()));
		}else{
			window.location = 'shangcheng/spot_mall.html?colorId=' + $(this).attr('navid').split(',')[1] + '&oreId=' + $(this).attr('navid').split(',')[0]+'&areaName=""';
		}

	})
}

//创建对象
function nav_sideFunc(data, parent) {
	this.nav_a = document.createElement('a');
	this.nav_a.className = 'black_jin';
	this.nav_a.innerHTML = data.colorName;

	//侧边品名
	this.nav_title = document.createElement('ul');
	this.nav_title.className = 'title_litte';
	//banner上
	this.nav_sideUl = document.createElement('ul');

	//品名
	for(let i = 0; i < data.oreClassifyPOs.length; i++) {
		this.nav_titleA = document.createElement('a');
		this.nav_titleA.setAttribute('href', 'javascript:;');
		this.nav_titleA.innerHTML = data.oreClassifyPOs[i].oreClassifyName;

		this.nav_titleLi = document.createElement('li');
		this.nav_titleLi.setAttribute('navid', data.oreClassifyPOs[i].oreClassifyId + ',' + data.colorId);
		this.nav_titleLi.appendChild(this.nav_titleA);

		this.nav_title.appendChild(this.nav_titleLi);
	}

	this.nav_sideSpan = document.createElement('span');
	this.nav_sideSpan.innerHTML = '品名';


	for(let i = 0; i < data.oreClassifyPOs.length; i++) {
		this.nav_sideA = document.createElement('a');
		this.nav_sideA.setAttribute('href', 'javascript:;');
		this.nav_sideA.innerHTML = data.oreClassifyPOs[i].oreClassifyName;

		this.nav_titleLi = document.createElement('li');
		this.nav_titleLi.setAttribute('navid', data.oreClassifyPOs[i].oreClassifyId + ',' + data.colorId);
		this.nav_titleLi.appendChild(this.nav_sideA);

		this.nav_sideUl.appendChild(this.nav_titleLi);
	}

	this.nav_sideL = document.createElement('div');
	this.nav_sideL.className = 'bannerleft_dlWrap';
	this.nav_sideL.appendChild(this.nav_sideSpan);
	this.nav_sideL.appendChild(this.nav_sideUl);

	//banner上
	this.nav_cityUl = document.createElement('ul');

	this.nav_cityC = document.createElement('span');
	this.nav_cityC.innerHTML = '产地';

	for(let i = 0; i < data.areaClassifyPOs.length; i++) {
		this.nav_cityA = document.createElement('a');
		this.nav_cityA.setAttribute('href', 'javascript:;');
		this.nav_cityA.innerHTML = data.areaClassifyPOs[i].areaClassifyName;

		this.nav_titleLi = document.createElement('li');
		this.nav_titleLi.setAttribute('colorid',data.colorId);
		this.nav_titleLi.appendChild(this.nav_cityA);

		this.nav_cityUl.appendChild(this.nav_titleLi);
	}

	this.nav_cityL = document.createElement('div');
	this.nav_cityL.className = 'bannerleft_dlWrap';
	this.nav_cityL.appendChild(this.nav_cityC);
	this.nav_cityL.appendChild(this.nav_cityUl);

	this.nav_section = document.createElement('div');
	this.nav_section.className = 'banner-left-sectionContent';
	this.nav_section.appendChild(this.nav_sideL);
	this.nav_section.appendChild(this.nav_cityL);

	this.nav_li = document.createElement('li');
	this.nav_li.className = 'first_dan';
	this.nav_li.appendChild(this.nav_a);
	this.nav_li.appendChild(this.nav_title);
	this.nav_li.appendChild(this.nav_section);

	parent.appendChild(this.nav_li);

}

//运输信息
function yunshu_func() {
	$.ajax({
		type: "get",
		url: kbb + "kbb-webs/carriageOrder/findNewCarriageOrder",
		data: {},
		async: false,
		success: function (data) {
			// console.log(data)
			if (data.status == 200) {
				wuliu_func(data.data);
			} else {
				alert(data.msg);
			}
		}

	});
}

//运输信息
function wuliu_func(data) {
	var data_num = parseInt(data.length);
	var num_1 = parseInt(data_num / 7);
	var num_2 = parseInt(data_num % 7);
	var num = null;
	if (num_2 > 0) {
		num = num_1 + 1;
	} else {
		num = num_1;
	}

	let index=6;
	let wl='';
	let wlx='';
	for(let i=0;i<data.length;i++){
		wlx+='<li><div class="g_lost_top clear"><span class="g_qi">'+data[i].startCity+'</span><i class="g_to"></i><span class="g_zhong">'+data[i].aimCity+'</span></div><div class="g_lost_center clear"><span class="g_padding">'+data[i].productName+'</span><span>总吨数：<b>'+data[i].totalTons+'</b>吨</span></div><div><span>指导运费：￥'+data[i].carriage+'/吨</span></div></li>';
	}
	for(let i=0;i<num;i++){
		wl+='<div class="swiper-slide"><ul class="g_log_list clear">'+wlx+'</ul></div>';
	}

	//
	$('#g_index_wuliu').html(wl);

}


// 物流swiper
var mySwiper = new Swiper('.g_log_swiper_container', {
	direction: 'horizontal',
	loop: true,
	speed: 1000,
	autoplay: {
		delay: 3000
	},
	// 如果需要前进后退按钮
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
	observer: true, //修改swiper自己或子元素时，自动初始化swiper
	observeParents: true, //修改swiper的父元素时，自动初始化swiper
	onSlideChangeEnd: function (swiper) {
		swiper.update(); //swiper更新
	},
	on: {
		slideChange: function(){
			if(this.isBeginning){
				this.navigation.$prevEl.css('display','none');
			}else{
				this.navigation.$prevEl.css('display','block');
			}

			if(this.isEnd){
				this.navigation.$nextEl.css('display','none');
			}else{
				this.navigation.$nextEl.css('display','block');
			}
		},
	},
});

// 商城tab
$('.g_nav_tab li').on('click', function () {
	$(this).addClass('active').siblings().removeClass('active');
	$('#g_shop_ul li').remove();

	if($(this).index()>3){
		kbb_shop($(this).index()+1)
	}else{
		kbb_shop($(this).index());
	}
});

//自营商城
function kbb_shop(num) {
	$.ajax({
		type: "get",
		url: kbb + "kbb-webs/promptGoods/findOreClassifyByColor",
		data: {
			colorId: num
		},
		async: false,
		success: function (data) {
			// console.log(data);
			if (data.status == 200) {
				kbb_shop_func(data.data);
			} else {
				alert(data.msg)
			}
		}

	});
}


//自营商城
function kbb_shop_func(data) {
	let shop = '';
	for (let i = 0; i < data.length; i++) {
		shop += '<li><a href="shangcheng/spot_mall.html?orderid=' + data[i].oreId + '"><table><td>' + data[i].oreClassify.oreClassifyName + '</td><td>' + data[i].areaClassify.areaClassifyName + '</td><td class="zhi_biao">' + data[i].description + '</td><td>' + data[i].mintons + '吨</td><td>' + data[i].priceMold + '</td><td>' + data[i].priceMold + '</td></table></a></li>'
	}

	$('#g_shop_ul').html(shop);
}


//新闻资讯接口
function new_information(num) {
	$.ajax({
		type: "get",
		url: kbb + "kbb-webs/journalism/HotJournalism",
		data: {
			number: num
		},
		async: false,
		success: function (data) {
			// console.log(data);
			if (data.status == 200) {
				//新闻列表
				new_func(data.data,num);
			} else {
				alert(data.msg)
			}
		}

	});
}

//新闻资讯
function new_func(data, num) {
	//热门资讯
	if (num == 5) {
		let news='';
		for (let i = 0; i < data.length; i++) {
			news+='<p><a href="wuli/information_details.html?journalismId='+data[i].journalismId+'">'+data[i].banner+'</a></p>'
		}
		$("#article_number").html(news);
	//	行业资讯
	} else {
		let news='';
		for (let i = 0; i < data.length; i++) {
			news+='<li><dl class="clear"><dt><img src="'+kbb + data[i].headImage+'" alt=""></dt><dd><h5><a href="wuli/information_details.html?journalismId='+data[i].journalismId+'">'+data[i].banner+'</a></h5><p>'+data[i].content.replace('</p><p>', '').replace('<br/>', '').replace('&nbsp; &nbsp; &nbsp; &nbsp;', '')+'</p><span>'+data[i].putTime+'</span></dd></dl></li>'
		}

		$('#g_new_center').html('<ul class="g_show">'+news+'</ul>');
	}
};

// 新闻资讯 swiper
var goodsSwiper = new Swiper('.g_news_banner', {
	direction: 'horizontal',
	loop: true,
	speed: 1000,
	autoplay: {
		delay: 3000
	},
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	}
});

//价格指数
var thismoves_id = null;
$.ajax({
	type: "get",
	url: kbb + "kbb-webs/orePriceTrend/findOrePriceTrendByPC",
	data: {},
	async: false,
	success: function (data) {
		// console.log(data);
		if (data.status == 200) {
			var price_index = "";
			var price_color = '';
			for (var i = 0; i < data.data.length; i++) {
				var price = Number(data.data[i].priceChange.split('%')[0]);
				if (price < 0) {
					price_color = '<span class="g_green">' + data.data[i].presentPrice + '</span><span class="g_green">' + data.data[i].priceChange + '</span>'
				} else {
					price_color = '<span class="g_red">' + data.data[i].presentPrice + '</span><span class="g_red">' + data.data[i].priceChange + '</span>'
				}
				price_index += '<li index=' + data.data[i].oreClassifyId + '><span>' + data.data[i].oreClassifyName + '</span>' + price_color + '</li>'
			}

			$(".g_price_list").append(price_index);

			//初始化图表
			$('.g_price_list li').eq(0).addClass('active').siblings().removeClass('active');
			xixi(data.data[0].oreClassifyId, 7, 'g_canvas');
			thismoves_id = data.data[0].oreClassifyId;
			$('.g_moneyH').html(data.data[0].oreClassifyName);
		}
	}
});

// 价格指数swiper
var priceSwiper = new Swiper('.g_swiper_container', {
	direction: 'vertical',
	slidesPerView: 'auto',
	mousewheel: true,
	scrollbar: {
		el: '.swiper-scrollbar',
	},
});
priceSwiper.scrollbar.$dragEl.css('background', '#cecece');
var days = null;
//周id

var mint_time = []; //x轴
var jojo_kok = []; //y轴
//点击当前的数据显示当前的折现图
$(document).on('click', '.g_price_list li', function () {
	$(this).addClass('active').siblings().removeClass('active');
	$('.g_moneyH').html($(this).children('span').eq(0).html());
	thismoves_id = $(this).attr('index');
	//价格指数的id值
	//xixi(thismoves_id, 7);
	if (days == null) {
		xixi(thismoves_id, 7, 'g_canvas');
	} else {
		xixi(thismoves_id, days, 'g_canvas');
	}

});

function xixi(oreClassifyId, days, zheId) { //ID  天    周
	mint_time = [];
	jojo_kok = [];
	$.ajax({
		type: "get",
		url: kbb + "kbb-webs/orePriceTrend/findOreTrendByPC",
		data: {
			oreClassifyId: oreClassifyId,
			day: days
		},
		async: false,
		success: function (result) {
			if (result.status == 200) {
				for (var i = 0; i < result.data.length; i++) {
					//console.log(result.data);
					jojo_kok.push(result.data[i].price);
					mint_time.push(result.data[i].putTime);
				}
				opoption(mint_time, jojo_kok, zheId);
			}
		}
	});

}

// k线图
function opoption(time, koko, big_small) { //x轴和y轴的参数    为小图的参数
	option = {
		grid: {
			x: 60,
			y: 30,
			x2: 30,
			y2: 30
		},
		tooltip: {
			trigger: 'axis',
			formatter: "{b}<br/> {c}",
			backgroundColor: 'rgba(21, 151, 218, 0.5)',
			textStyle: {
				color: '#ffffff',
				fontSize: 12
			},
		},
		toolbox: {
			show: false,
			feature: {
				saveAsImage: {}
			}
		},
		xAxis: {
			type: 'category',
			boundaryGap: false,
			data: time, //x 轴的数据
			axisLabel: {
				show: true
			},
			splitLine: {
				show: true
			},
			axisLine: {
				show: true,
				lineStyle: {
					color: '#ccc'
				}
			}
		},
		yAxis: {
			type: 'value',
			axisLabel: {
				show: true
			},
			axisPointer: {
				snap: true
			},
			axisLine: {
				show: true,
				lineStyle: {
					color: '#ccc'
				}
			},
			nameTextStyle: {
				color: '#000',
			},
			min: function(value) {
				return value.min - (value.max - value.min) * 0.5;  //最小值
			},
			max: function(value) {
				return value.max + (value.max - value.min) * 0.5;   //最大值
			}

		},
		series: [{
			type: 'line',
			smooth: true,
			data: koko //y轴的数据

		}]
	};
	var myChart = echarts.init(document.getElementById(big_small)); //big_small 为参数     显示的为初始化小图     
	myChart.setOption(option);
}

//周线 和月线    小的折现图
$('#da_De span:eq(0)').on('click', function () {
	//console.log(11)
	$(this).addClass('active').siblings().removeClass();
	xixi(thismoves_id, 7, 'g_canvas');
	days = 7;
});

$('#da_De span:eq(1)').on('click', function () {
	$(this).addClass('active').siblings().removeClass();
	//console.log(thismoves_id);
	console.log(thismoves_id)
	xixi(thismoves_id, 30, 'g_canvas');
	days = 30;
});

//周线 和月线    大的折现图
$('#xiao_Dd span:eq(0)').on('click', function () {
	//console.log(11)
	$(this).addClass('active').siblings().removeClass();
	xixi(thismoves_id, 7, 'j_canvas');
});

$('#xiao_Dd span:eq(1)').on('click', function () {
	$(this).addClass('active').siblings().removeClass();
	//console.log(thismoves_id);
	xixi(thismoves_id, 30, 'j_canvas');
});

//	点击折现图放大
$('.tupain_shji').on('click', function () {
	setTimeout(function () {
		$('body').addClass('body_css');
		$('.g_bomb_mask').show().siblings('.zheixna_ti').show();
	}, 300);

	if (days == 30) {
		$('.liomom_ll span').eq(1).addClass('active').siblings().removeClass('active');
	} else {
		$('.liomom_ll span').eq(0).addClass('active').siblings().removeClass('active');
	}
	if (mint_time.length > 0) {
		opoption(mint_time, jojo_kok, 'j_canvas'); //点击放大之后调取一次接口
	} else {
		xixi($('.g_price_list li').eq(0).attr('index'), 7, 'j_canvas');
	}

});

//委托帮你找车 效果
$('#g_click_model').on('click', function () {
	if (_tel == "" || _tel == null || _tel == undefined) {
		window.location.href = "html/sign_in.html";
	} else {
		setTimeout(function () {
			$('body').addClass('body_css');
			$('.g_bomb_mask').show().siblings('#wuli_tanc').show();
		}, 300)
	}
});
//委托帮你找车 
$('#free_button').on('click', function () {
	//获取到手机号
	var shoji_jhoa = sessionStorage.getItem("phone", 7);
	if (shoji_jhoa == "" || shoji_jhoa == null || shoji_jhoa == undefined) {
		window.location.href = "html/sign_in.html";
	} else {
		$('.tels_ojoj').val(shoji_jhoa);
		$.ajax({
			type: "POST",
			url: kbb + "kbb-webs/carriageLoading/saveCarriage",
			data: $("#frmUserInfo").serialize(),
			async: false,
			dataType: "json", //返回数据形式为json
			success: function (data) {
				if (data.status == 200) {
					//console.log($("#frmUserInfo").serialize())
				}
			},
			error: function () {
				console.log('error')
			}
		});
	}
});

/**/
/*移上去APP二维码显示*/
/*//*/
$('.dian_app').on('mouseover', function () {
	$('.show_app').show();
});
$('.dian_app').on('mouseleave', function () {
	$('.show_app').hide();
});

//移上去公众号二维码显示*/
//
$('.dian_what').on('mouseover', function () {
	$('.show_what').show();
});
$('.dian_what').on('mouseleave', function () {
	$('.show_what').hide();
});
//
//最上面个人中心点击下滑
//
$('.huiyuan_zhoangixn').mouseover(function () {
	$('.sjpi_koa').show();
});
$('.sjpi_koa').mouseout(function () {
	$(this).hide();
});
