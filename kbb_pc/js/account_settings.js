$(document).ready(function ($) {
	//判断登陆
	seesionLoad();


	$("#srcFile").change(function () {
		uploadHead();
	})

});


function uploadHead() {
	$.ajax({
		url: kbb + 'kbb-webs/token/upload/picture',
		type: 'POST',
		data: new FormData($("#uploadHead")[0]),
		async: false,
		cache: false,
		contentType: false,
		processData: false,
		success: function (data) {
			$("#uploadHead img").attr("src", data.data);
		},
		error: function (data) {
			alert(data);
		}
	});
}