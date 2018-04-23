$(function () {
	var carriageId = $.getUrlParam('carriageid');
	//
	if (_tel != '' && _tel != null && carriageId != '' && carriageId != null) {
		logisticsFunc(_tel, carriageId)
	}

	wayBill(1, 1, carriageId, $('.g_wl_list_i').eq(0).children('.m_list_center'));

	//图片放大
	var viewer = new Viewer(document.getElementById('g_wl_list'), {
		url: 'data-original'
	});


	//物流接口
	function logisticsFunc(tel, carriageId) {
		$.ajax({
			type: "get",
			url: kbb + "kbb-webs/carriageOrder/MyCarriageOrder",
			data: {
				telephone: tel,
				carriageId: carriageId
			},
			async: true,
			success: function (data) {
				// console.log(data);
				if (data.status == 200) {
					logisticsList(data.data);
				} else {
					alert(data.msg);
				}
			}
		});
	}

	//物流列表
	function logisticsList(data) {
		let list = '';
		for (let i = 0; i < data.list.length; i++) {
			list += '<div class="m_list_center"><table><tr><td class="m_order_one g_wl_one"><b>哈密' + data.list[i].carriageOrder.startCity + '</b><span>' + data.list[i].carriageOrder.startAddress + '</span><b>' + data.list[i].carriageOrder.aimCity + '</b><span>' + data.list[i].carriageOrder.aimAddress + '</span></td><td>' + data.list[i].carriageOrder.productName + '</td><td>￥' + data.list[i].carriageOrder.carriage + '/吨</td><td>' + data.list[i].carriageOrder.totalTons + '吨</td><td>' + data.list[i].unGoAccount + '吨</td><td>' + data.list[i].onLoadAccount + '吨</td><td>' + data.list[i].finishAccount + '吨</td></tr></table></div>';
		}

		$('#orderList').html(list);

	}


	//物流详情
	$(".g_wl_tab li").click(function () {
		$(this).addClass('active').siblings().removeClass('active');
		$('.g_wl_list_i').eq($(this).index()).addClass('g_show').siblings().removeClass('g_show');

		switch ($(this).index()) {
			case 0:
				wayBill(1, 1, carriageId, $('.g_wl_list_i').eq($(this).index()).children('.m_list_center'));
				break;
			default:
				wayBill(1, 2, carriageId, $('.g_wl_list_i').eq($(this).index()).children('.m_list_center'));
		}
	});


	//运行中运输
	//carriageId 物流订单ID orderType 订单状态 1：运输中 2：已完成 pageNo 页码
	function wayBill(pageNo, type, carriageId, parent) {
		$.ajax({
			type: "get",
			url: kbb + "kbb-webs/carriageOrder/MyCarriageOrderById",
			data: {
				pageNo: pageNo,
				orderType: type,
				carriageId: carriageId
			},
			async: true,
			success: function (data) {
				// console.log(data);
				if (data.status == 200) {
					wayBillList(data.data, parent, pageNo, type, carriageId);
				} else {
					alert(data.msg);
				}
			}
		});

	}

	var arrData = [];
	var kbbList = '';
	function wayBillList(data, parent, pageNo, type, carriageId) {
		let list = '';
		if (type == 1) {
			for (let i = 0; i < data.list.length; i++) {
				list += '<div class="wayBillList"><div class="m_list_top clear active"><span>运单ID：' + data.list[i].grabSingleId + '</span></div><div class="m_list_center"><table><tr><td>' + data.list[i].driverName + '</td><td>' + data.list[i].plateNumber + '</td><td class="g_lineHeight">' + data.list[i].departTime.split(' ')[0] + '<br>' + data.list[i].departTime.split(' ')[1] + '</td><td>' + data.list[i].actualTonnage + '吨</td><td class="g_wl_zc"><img data-original="' + data.list[i].departImage + '" src="' + data.list[i].departImage + '" alt=""></td><td class="g_wl_wz"></td></tr></table></div></div>';

				for (let a = 0; a < data.list[i].list.length; a++) {
					arrData.push([data.list[i].list[a].longitude, data.list[i].list[a].latitude]);
				}

				kbbList = data.list[i].list;
			}

		} else {
			for (let i = 0; i < data.list.length; i++) {
				list += '<div class="wayBillList"><div class="m_list_top clear active"><span>运单ID：' + data.list[i].grabSingleId + '</span></div><div class="m_list_center"><table><tr><td>' + data.list[i].driverName + '</td><td>' + data.list[i].plateNumber + '</td><td class="g_lineHeight">' + data.list[i].departTime.split(' ')[0] + '<br>' + data.list[i].departTime.split(' ')[1] + '</td><td>' + data.list[i].actualTonnage + '吨</td><td class="g_wl_zc"><img data-original="' + data.list[i].departImage + '" src="' + data.list[i].departImage + '" alt=""></td><td class="g_lineHeight">' + data.list[i].unloadTime.split(' ')[0] + '<br>' + data.list[i].unloadTime.split(' ')[1] + '<td>' + data.list[i].payTonnage + '吨</td><td class="g_wl_zc"><img data-original="' + data.list[i].unloadImage + '" src="' + data.list[i].unloadImage + '" alt=""></td><td class="g_wl_wz"></td></tr></table></div></div>';

				for (let a = 0; a < data.list[i].list.length; a++) {
					arrData.push([data.list[i].list[a].longitude, data.list[i].list[a].latitude]);
				}

				kbbList = data.list[i].list;
			}
		}

		parent.html(list);

		if (pageNo == 1) {
			var data_num = parseInt(data.page.lastPageNo);
			$("#get_nav_container").createPage({
				pageCount: data_num,
				current: 1,
				backFn: function (p) {

					var result = $.inArray(p + '');
					if (result >= 0) {
						// alert(result);
					} else {
						wayBill(p + '', type, carriageId, parent);
						$('html,body').animate({scrollTop: 0}, 500);
					}
				}
			});


			//位置函数
			gpsFunc();
		}


		//实时位置显示
		$('.g_wl_wz').click(function () {
			setTimeout(function () {
				$('.g_bomb_mask').show().siblings('#my_wl_gps').show();
			})
		});
	}

	function gpsFunc() {
		//创建地图
		var map = new AMap.Map('container');

		// 引入简单标注
		AMapUI.loadUI(['overlay/SimpleMarker'], function (SimpleMarker) {
			//创建起始SimpleMarker实例
			var startMarker = new SimpleMarker({
				//前景文字
				iconLabel: {
					innerHTML: '<div>起</div>',
					style: {
						color: 'white' //设置文字颜色
					}
				},

				//图标主题
				iconTheme: 'fresh',

				//背景图标样式
				iconStyle: 'blue',

				//定位点
				showPositionPoint: {
					color: 'white', //点的颜色
					radius: 3 //点的半径。 因圆形使用了CSS3的border-radius属性，IE8及以下浏览器会呈现正方形
				},

				map: map,
			});
			//起始标注的位置
			// startMarker.setPosition([kbbList[kbbList.length-1].longitude, kbbList[kbbList.length-1].latitude]);
			startMarker.setPosition([kbbList[kbbList.length - 1].longitude, kbbList[kbbList.length - 1].latitude]);

			//创建结束SimpleMarker实例
			var startMarker = new SimpleMarker({
				//前景文字
				iconLabel: {
					innerHTML: '<div>现</div>',
					style: {
						color: 'white' //设置文字颜色
					}
				},

				//图标主题
				iconTheme: 'fresh',

				//背景图标样式
				iconStyle: 'blue',

				//定位点
				showPositionPoint: {
					color: 'white', //点的颜色
					radius: 3 //点的半径。 因圆形使用了CSS3的border-radius属性，IE8及以下浏览器会呈现正方形
				},
				map: map,
			});
			//结束标注的位置
			startMarker.setPosition([kbbList[0].longitude, kbbList[0].latitude]);
		});

		// 加载PathSimplifier，loadUI的路径参数为模块名中 'ui/' 之后的部分
		AMapUI.load(['ui/misc/PathSimplifier'], function (PathSimplifier) {

			if (!PathSimplifier.supportCanvas) {
				alert('当前环境不支持 Canvas！');
				return;
			}

			//启动页面
			initPage(PathSimplifier);
		});

		function initPage(PathSimplifier) {
			//创建组件实例
			var pathSimplifierIns = new PathSimplifier({
				zIndex: 100,
				map: map, //所属的地图实例
				getPath: function (pathData, pathIndex) {
					//返回轨迹数据中的节点坐标信息，[AMap.LngLat, AMap.LngLat...] 或者 [[lng|number,lat|number],...]
					return arrData;
				},
				getHoverTitle: function (pathData, pathIndex, pointIndex) {
					//						//返回鼠标悬停时显示的信息
					//						if(pointIndex >= 0) {
					//							//鼠标悬停在某个轨迹节点上
					//							return pathData.name + '，点:' + pointIndex + '/' + pathData.path.length;
					//						}
					//						//鼠标悬停在节点之间的连线上
					//						return pathData.name + '，点数量' + pathData.path.length;
					//console.log(pathData);
					return pathData.recordTime;
				},
				renderOptions: {
					//轨迹线的样式
					pathLineStyle: {
						strokeStyle: 'red',
						lineWidth: 6,
						dirArrowStyle: true
					}
				}
			});

			//构建轨迹
			pathSimplifierIns.setData(kbbList);

			//创建一个巡航器
			var navg0 = pathSimplifierIns.createPathNavigator(0, //关联第1条轨迹
				 {
					 loop: true, //循环播放
					 speed: 0
					 ,
					 pathNavigatorStyle: {
						 width: 20,
						 height: 40,
						 initRotateDegree: 0,
						 //使用图片
						 content: PathSimplifier.Render.Canvas.getImageContent('../img/load/car.png', onload, onerror),
						 strokeStyle: null,
						 fillStyle: null,
						 //经过路径的样式
						 pathLinePassedStyle: {
							 lineWidth: 6,
							 strokeStyle: 'gray',
							 dirArrowStyle: {
								 stepSpace: 15,
								 strokeStyle: 'white'
							 }
						 }
					 }
				 });

			navg0.start();
		}
	}
});
