$(document).ready(function ($) {
	//判断登陆
	seesionLoad();

	if (_tel != '' && _tel != null) {
		logisticsFunc(1, _tel, '', $('.m_order_list').eq(0));
	} else {
		window.location = '../html/sign_in.html';
	}

});