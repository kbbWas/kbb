$(document).ready(function ($) {
	//判断登陆
	seesionLoad();

	$('#g_tel').val(_tel);

	$('#g_oneSubmit').click(function () {
		shipperAttesation();
	})

});

//认证
function shipperAttesation() {
	$('#enterpriseForm input').change(function () {
		if($(this).val().length>0){
			$(this).removeClass('g_border');
		}
	})

	if ($('#g_name').val() == '') {
		$('#g_name').focus().addClass('g_border').parent().siblings().children('input').removeClass('g_border');
		return false;
	} else if ($('#g_address').val() == '') {
		$('#g_address').focus().addClass('g_border').parent().siblings().children('input').removeClass('g_border');
		return false;
	} else if ($('#g_dizhi').val() == '') {
		$('#g_dizhi').focus().addClass('g_border').parent().siblings().children('input').removeClass('g_border');
		return false;
	} else if ($('#g_Telephone').val() == '') {
		$('#g_Telephone').focus().addClass('g_border').parent().siblings().children('input').removeClass('g_border');
		return false;
	} else if ($('#get_mamse').val() == '') {
		$('#get_mamse').focus().addClass('g_border').parent().siblings().children('input').removeClass('g_border');
		return false;
	} else if ($('#g_file_license').val() == '') {
		$('#g_file_license').focus().addClass('g_border').parent().siblings().children('input').removeClass('g_border');
		return false
	} else if ($('#warrant').val() == '') {
		$('#warrant').focus().addClass('g_border').parent().siblings().children('input').removeClass('g_border');
		return false
	} else {
		$.ajax({
			url: kbb + "kbb-webs/personalCenter/shipperAttesation",
			type: 'POST',
			data: $("#enterpriseForm").serialize(),
			async: false,
			cache: false,
			contentType: false,
			processData: false,
			success: function (data) {
				console.log(data);
				if(data.status==200){
					window.location='../html/qiye_authentication_two.html';
				}
			},
			error: function (data) {
				alert('网络错误');
			}
		});
	}

}