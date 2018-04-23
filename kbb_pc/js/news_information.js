// 行业资讯

window.onload = function() {
	//下面15条
	new_information(15);
	//上面3条
	new_information(3);

	//详情页面的列表页面
	page_right(5);
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
		success: function(data) {
			//console.log(data)
			if(data.status == 200) {
				if(num == 3) {
					let hang_title = "";
					let hunxi_e = "";
					let gao_mieng_news = "";

					for(let i = 0; i < data.data.length; i++) {
						var contend_con = data.data[i].content.replace('&nbsp; &nbsp; &nbsp; ', '').replace('<br>', ''); ///清除空格
						//轮播图循环  
						hunxi_e += '<div class="swiper-slide"><img src=' + kbb + data.data[i].headImage + ' alt=""><p>' + data.data[i].banner + '</p></div>'
						//头部3条数据    轮播页
						gao_mieng_news += '<div class="g_news_article clear"><h5><a journalismId=' + data.data[i].journalismId + ' href="javascript:;">' + data.data[i].banner + '</a></h5><p>' + contend_con + '</p><div class="pull-left"><span>2018年03月06日</span><span>行业资讯</span></div></div>'
					}
					//轮播图不循环的外层
					hang_title = '<div class="g_news_top_l pull-left"><div class="swiper-container g_news_banner"><div class="swiper-wrapper">' + hunxi_e + '</div><div class="swiper-button-prev"></div><div class="swiper-button-next"></div></div></div>';

					$('#touv_hes').append(hang_title);
					$('#touv_hes').append('<div class="g_new_top_r pull-left">' + gao_mieng_news + '</div>');
				} else {
					let new_list = '';
					let new_listx = '';
					for(let i = 0; i < data.data.length; i++) {
						var contend_con = data.data[i].content.replace('&nbsp; &nbsp; &nbsp; ', '').replace('<br>', ''); ///清除空格
						if(i < 3) {
							new_list += '<div class="g_new_industry"><dl class="clear"><dt><img src=' + kbb + data.data[i].headImage + '></dt><dd><h5><a id="oictios_io" journalismId=' + data.data[i].journalismId + ' href="javascript:;">' + data.data[i].banner + '</a></h5><p>' + contend_con + '</p><span>' + data.data[i].putTime + '</span></dd></dl></div>';
						} else {
							new_listx += '<li><h3><a id="fire_ting" journalismId=' + data.data[i].journalismId + ' href="javascript:;">' + data.data[i].banner + '</a></h3><p>' + contend_con + '</p><p>' + data.data[i].putTime + '</p></li>'
						}
					}
					$('.g_industry_list').eq(0).append(new_list); //行业资讯 带图片
					$('.g_industry_list').eq(1).append('<ul>' + new_listx + '</ul>'); //行业资讯的15条
				}

			} else {
				alert(data.msg)
			}
		}

	});
}
//点击最上面的调到详情新闻
$(document).on('click', '.g_news_article h5 a', function() {
	var journalismId = $(this).attr('journalismId');
	window.location.href = "information_details.html?journalismId=" + journalismId;
});
//行业资讯调到详情新闻
$(document).on('click', '#oictios_io', function() {
	var journalismId = $(this).attr('journalismId');
	window.location.href = "information_details.html?journalismId=" + journalismId;
});
//下面的15天调到详情新闻
$(document).on('click', '#fire_ting', function() {
	var journalismId = $(this).attr('journalismId');
	window.location.href = "information_details.html?journalismId=" + journalismId;
});

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
	},
	observer: true, //修改swiper自己或子元素时，自动初始化swiper
	observeParents: true, //修改swiper的父元素时，自动初始化swiper
	onSlideChangeEnd: function(swiper) {
		swiper.update(); //swiper更新
	}
})

//详情右面的详情列表
function page_right(lengt) {
	$.ajax({
		type: "get",
		url: kbb + "kbb-webs/journalism/HotJournalism",
		data: {
			number: lengt
		},
		async: false,
		success: function(data) {
			//console.log(data)
			if(data.status == 200) {
				if(lengt == 5) {
					let page_left_right = '';
					for(let i = 0; i < data.data.length; i++) {
						//console.log(data.data[i].banner)
						var contend_con = data.data[i].content.replace('&nbsp; &nbsp; &nbsp; ', '').replace('<br>', ''); ///清除空格
						page_left_right+='<dl class="clear"><dt><img src='+kbb+data.data[i].headImage+' alt=""></dt><dd><h5><a id="youce_joj" journalismId=' + data.data[i].journalismId + ' href="javascript:;">'+data.data[i].banner+'</a></h5><p>'+contend_con+'</p><span>'+data.data[i].putTime+'</span></dd></dl>'
					}
					$('#xiang_qingde').append(page_left_right);
				} else {
					alert(data.msg)
				}
			}
		}
	})
}
//右侧新闻列表
$(document).on('click', '#youce_joj', function() {
	var journalismId = $(this).attr('journalismId');
	new_detail(journalismId);
})

//新闻详情页面
//获取信息
new_detail($.getUrlParam('journalismId'));
function new_detail(num) {
	$.ajax({
		type: "get",
		url: kbb + "kbb-webs/journalism/getJournalism",
		data: {
			journalismId: num
		},
		async: false,
		success: function(data) {
			//console.log(data)
			if(data.status == 200) {
				$('#head_title').html(data.data.banner+'-矿宝宝官网');

				let page_id = '';
				page_id += '<h3>' + data.data.banner + '</h3><div class="g_details_time"><span>【行业动态】</span><span>' + data.data.source + '</span><span>发布时间：' + data.data.putTime + '</span></div><div class="g_details_introduce"><p>' + data.data.content + '</p></div>';
				$('#big_news').html(page_id);
			} else {
				alert(data.msg)
			}
		}

	});
}