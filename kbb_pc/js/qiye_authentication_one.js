$(document).ready(function ($) {
	//判断登陆
	seesionLoad();

	$('#g_tel').val(_tel);

	$('#g_oneSubmit').click(function () {
		shipperAttesation();
	})

});

//验证
function shipperAttesation() {
	$.ajax({
		url: kbb + "kbb-webs/personalCenter/shipperAttesation",
		type: 'POST',
		data:$("#enterpriseForm").serialize(),
		async: false,
		cache: false,
		contentType: false,
		processData: false,
		success: function (data) {
			console.log(data)
		},
		error: function (data) {
			alert(data);
		}
	});

}