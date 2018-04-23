$(function () {

	//
	//资讯点击下滑
	//
	$('.zuohou_de').mouseenter(function () {
		$('.zixun_down').show();
	});
	$('.zuohou_de').mouseleave(function () {
		$('.zixun_down').hide();
	});


	//矿宝宝物流     免费帮你找车
	$('#go_weitou').on('click', function () {
		//获取到手机号
		var shoji_jhoa = sessionStorage.getItem("phone", 7);
		if (shoji_jhoa == "" || shoji_jhoa == null || shoji_jhoa == undefined) {
			window.location.href = "../html/sign_in.html";
		} else {
			$('#tels_ojoj').val(shoji_jhoa);
			$.ajax({
				type: "POST",
				url: kbb + "kbb-webs/carriageLoading/saveCarriage",
				data: $("#frmUserInfo").serialize(),
				async: false,
				dataType: "json", //返回数据形式为json
				success: function (data) {
					if (data.status == 200) {
					}
				},
				error: function () {
					console.log('error')
				}
			});
		}
	});

	//
	//点击top置顶
	//
	$('.zhiding_j').on('click', function () {
		$('html,body').animate({scrollTop: 0}, 500);
	});


});