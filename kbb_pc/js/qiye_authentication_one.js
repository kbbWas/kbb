$(document).ready(function ($) {
	//判断登陆
	seesionLoad();


	$('#g_oneSubmit').click(function () {
		shipperAttesation();
	})

});

//验证
function shipperAttesation() {
	$.ajax({
		type: "get",
		url: kbb + "kbb-webs/personalCenter/shipperAttesation",
		data:$('#enterpriseForm').serialize(),
		async: true,
		success: function (data) {
			console.log(data);
			if (data.status == 200) {

			} else {
				alert(data.msg);
			}
		}
	});

}