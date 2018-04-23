$(document).ready(function ($) {
	//判断登陆
	seesionLoad();

	changeipt('13522821831');

	//图片放大
	var viewer = new Viewer(document.getElementById('g_qiye_two'), {
		url: 'data-original'
	});

});

//填写认证信息
function changeipt(tel) {
	$.ajax({
		type: "get",
		url: kbb + "kbb-webs/personalCenter/findShipperAttesation",
		data: {
			telephone: tel,
		},
		async: true,
		success: function (data) {
			console.log(data);
			if (data.status == 200) {
				$('#qiyeName').text(data.data.oreShipperName);
				$('#qiyeAddress').text(data.data.registeredAddress);
				$('#qiyeManage').text(data.data.manageAddress);
				$('#qiyeTel').text(data.data.putTelephone);
				$('#peopleName').text(data.data.oreShipperLinkman);
				$('#peopleTel').text(data.data.oreShipperTelephone);
				$('#License').prop('src',data.data.businessLicense).prop('data-original',data.data.businessLicense);
				$('#Opening').prop('src',data.data.accountOpening).prop('data-original',data.data.accountOpening);
				$('#Authentication').prop('src',data.data.enterpriseAuthentication).prop('data-original',data.data.enterpriseAuthentication);
			} else {
				alert(data.msg);
			}
		}
	});


}


