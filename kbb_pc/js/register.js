//
window.onload = function (ev) {
	// 注册
	verification_code();
};

// 注册
// 获取图形码
function verification_code() {
	// 跨域
	var xhr = new XMLHttpRequest();
	xhr.open("get", kbb + 'kbb-webs/login/createCode', true);
	xhr.responseType = "blob";
	xhr.withCredentials = true;
	xhr.send();
	xhr.onload = function () {
		if (this.status == 200) {
			var blob = this.response;
			// console.log(blob);
			var img = document.getElementById('g_two_img');
			img.onload = function (e) {
				window.URL.revokeObjectURL(img.src);
			};
			img.src = window.URL.createObjectURL(blob);

		} else {
			alert('错误');
		}
	}
}

// 点击换图形码
$('#g_change_one').on('click', function () {
	verification_code();
});

// 获取注册短信验证码
$('#g_obtain').on('click', function () {
	let phone = $('#g_iph_number').val();
	let img_code = $('#g_img_code').val();
	if (/^1(3|5|7|8)\d{9}$/.test(phone) && phone != '') {
		if (/^[A-Za-z0-9]+$/.test(img_code) && img_code != '' && img_code.length >= 4) {
			$.ajax({
				url: kbb + 'kbb-webs/login/getRegisterVerificationCode',
				type: 'get',
				dataType: 'json',
				xhrFields: {
					withCredentials: true
				},
				crossDomain: true,
				async: false,
				data: {telphone: $('#g_iph_number').val(), code: $('#g_img_code').val()},
				success: function (data) {
					// console.log(data);
					if (data.status == 200) {
						// 读取秒数
						var g_obtain = document.getElementById('g_obtain');
						loadyam(g_obtain);
					}else if(data.msg=='此用户已经注册，请直接登录'){
						window.location='sign_in.html';
					}else {
						$('#g_obtain').off("click", verification_code);
					}

				}
			})
		} else {
			$('.g_form_vf p').eq(1).css({
				'visibility': 'visible'
			}).siblings().css({
				'visibility': 'hidden'
			});
		}
	} else {
		$('.g_form_vf p').eq(0).css({
			'visibility': 'visible'
		}).siblings().css({
			'visibility': 'hidden'
		});
	}

})

// 点击注册
$('#registerSubmit').on('click', function () {
	$('.g_checkbox').find('b').remove();
	$(this).removeAttr('disabled');
	// 手机号
	let phone = $('#g_iph_number').val();
	// 图片码
	let img_code = $('#g_img_code').val();
	// 手机验证码
	let vf_code = $('#g_vf_code').val();
	//
	if (/^1(3|5|7|8)\d{9}$/.test(phone) && phone != '') {
		if (img_code != '' && /^[A-Za-z0-9]+$/.test(img_code) && img_code.length >= 4) {
			if (vf_code != '' && /^[0-9]+$/.test(vf_code)) {
				if ($('.g_checkbox input').is(':checked') == true) {
					$.ajax({
						url: kbb + 'kbb-webs/login/register',
						type: 'POST',
						dataType: 'json',
						data: $("#registerForm").serialize(), //表单序列化
						success: function (data) {
							// console.log(data);
							if (data.status == 200) {
								//存储手机号和验证码
								sessionStorage.setItem("phone", data.data.telephone);
								// 储存 是否认证
								//认证  是否
								sessionStorage.setItem("status", data.data.shipperStatus);

								window.location = '../index.html';

							} else {
								alert(data.msg);
							}
						}
					})
				} else {
					$('.g_checkbox').append('<b>请阅读该链接</b>');
				}
			} else {
				$('.g_form_vf p').eq(2).css({
					'visibility': 'visible'
				}).siblings().css({
					'visibility': 'hidden'
				});
			}
		} else {
			$('.g_form_vf p').eq(1).css({
				'visibility': 'visible'
			}).siblings().css({
				'visibility': 'hidden'
			});
		}
	} else {
		$('.g_form_vf p').eq(0).css({
			'visibility': 'visible'
		}).siblings().css({
			'visibility': 'hidden'
		});
	}
});

