window.onload = function (ev) {
};


$(document).keyup(function(event){
	if(event.keyCode ==13){
		$('#g_load_btn').click();
	}
});

/*点击获取验证码*/
$('#g_obtain').off('click');
$('#g_obtain').on('click', function () {
	let phone = $('#g_iph_number').val();
	if (/^1(3|5|7|8)\d{9}$/.test(phone) && phone != '') {
		kbbLoadCode(phone);
	} else {
		$('#sign_load label').eq(0).find('p').html('手机号错误');
	}
});

//	点击登陆
$('#g_load_btn').on('click', function () {
	let phone = $('#g_iph_number').val();
	let code = $('#g_vf_code').val();

	if (phone == '' || /^1(3|5|7|8)\d{9}$/.test(phone) == false) {
		$('#sign_load label').eq(0).find('p').html('手机号错误');
		return false;
	} else if (code == '') {
		$('#sign_load label').eq(0).find('p').html('');
		$('#sign_load label').eq(1).find('p').html('验证码错误');
		return false;
	} else {
		kbbLoad();
	}
});

//点击获取验证码
function kbbLoadCode(tel) {
	$.ajax({
		url: kbb + 'kbb-webs/login/getLoginVerificationCode',
		type: 'get',
		dataType: 'json',
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
		async: false,
		data: {
			telphone: tel
		},
		success: function (data) {
			// console.log(data);
			if (data.status == 200) {
				var g_obtain = document.getElementById('g_obtain');
				loadyam(g_obtain);
			} else {
				alert(data.msg);
			}
		}
	})
}

// 调取登陆接口
function kbbLoad() {
	$.ajax({
		url: kbb + 'kbb-webs/login/login',
		type: 'POST',
		dataType: 'json',
		data: $("#sign_load").serialize(),
		success: function (data) {
			// console.log(data);
			if (data.status == 200) {
				//存储手机号
				sessionStorage.setItem("phone", data.data.telephone);
				// 储存 是否认证
				//认证  是否
				sessionStorage.setItem("status", data.data.shipperStatus);
				
				history.back(-1);
			} else {
				alert(data.msg);
			}
		}
	})
}