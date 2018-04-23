$(document).ready(function ($) {

	if(_tel!=''&&_tel!=null){
		//判断登陆
		seesionLoad();
	}else{
		window.location='sign_in.html';
	}




	$("#srcFile").change(function () {
		uploadHead();
	})

});

//上传头像
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