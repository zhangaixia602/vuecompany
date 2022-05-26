<template>
	<HeaderPage />
	<div class='caseHeader'>
	</div>
	<div>
		<div class="wrapper">
			<h3 class="titbg">联系方式</h3>
			<div v-for="(menu, index) in menus" :key="index" class="caseItem clear">
				<img :src="require('../' + menu.src)" />
				<h2>
					{{ menu.title }}
				</h2>
				<p>{{ menu.text }}</p>
			</div>
		</div>
		<div class="message">
			<div class="wrapper">
				<h3 class="titbg">在线留言</h3>
				<form action="javascript:;" onsubmit="messageindex(this)">
					<input type="text" name="nickname" placeholder="姓名" class="message-input"
						style="border: 1px solid rgb(221, 221, 221);">
					<input type="text" name="email" placeholder="邮箱" class="message-input"
						style="border: 1px solid rgb(221, 221, 221);">
					<input type="text" name="contact" style="margin: 0px; border: 1px solid rgb(221, 221, 221);"
						placeholder="电话" class="message-input">
					<textarea name="content" placeholder="给我们的留言" class="message-input message-content"></textarea>
					<input type="submit" value="立即提交" class="message-btn">
				</form>
			</div>
		</div>
		<div>
			<div class="wrapper" style="margin-bottom:4rem;position: relative;height: 400px;">
				<div class="left-map" id="allmap"></div>
				<div class="right-map">
					<div class="left-content">
						<p>公司地址:</p>
						深圳市龙华新区清祥路1号宝能科技园7栋A座11楼
						<p>邮箱:</p>
						dyhzn@qq.com
						<p>邮编:</p>
						518000
						<p>微信:</p>
						shawnszs
					</div>
					<div class="left-content">
						<p>联系电话:</p>
						0755-8326-9919
						<p>QQ:</p>
						shawnszs
					</div>
				</div>
			</div>
		</div>

	</div>
	<FooterPage />

</template>

<script>
	import {
		defineComponent
	} from "vue";
	import HeaderPage from '@/components/HeaderPage'
	import FooterPage from '@/components/FooterPage'
	export default defineComponent({
		name: "ContactPage",
		components: {
			'HeaderPage': HeaderPage,
			'FooterPage': FooterPage,
		},
		data() {
			return {
				position_NKYYGS: {
					Name: '深圳市达英和自动化有限公司',
					address: '深圳市龙华新区清祥路1号宝能科技园7栋A座11楼',
					phoneNumber: '(028)84504011',
					bdLNG: 114.070831,
					bdLAT: 22.680181
				},
				menus: [{
						src: "assets/icon-1.png",
						title: "地址",
						text: "深圳市龙华新区清祥路1号宝能科技园7栋A座11楼",
					},
					{
						src: "assets/icon-2.png",
						title: "电话",
						text: "0755-8326-9919",
					},
					{
						src: "assets/icon-3.png",
						title: "邮箱",
						text: "abc@dyhzn.com",
					},
					{
						src: "assets/icon-4.png",
						title: "网址",
						text: "dyhzn.com",
					}
				],
			};
		},
		mounted() {
			this.baiduMap();
		},
		methods: {
			baiduMap() {
				var map = new BMap.Map('allmap'); // 创建地图实例
				map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
				map.addControl(new BMap.NavigationControl());
				map.addControl(new BMap.ScaleControl());
				map.addControl(new BMap.OverviewMapControl());
				map.addControl(new BMap.MapTypeControl());
				// map.setMapStyle({ style: 'midnight' }) //地图风格

				map.clearOverlays();
				//将数据遍历
				//自定义信息窗口内容
				var sContent =
					'<div style="width:300px;"><p style="font-size:16px;font-weight:bold;margin-top: 10px;color:#D07852">' +
					this.position_NKYYGS.Name +
					'</p><p style="font-size:13px;margin: 5px 0;">地址：' +
					this.position_NKYYGS.address +
					'</p><p style="font-size:13px;margin: 5px 0;">电话：' +
					this.position_NKYYGS.phoneNumber +
					'</p><p style="font-size:13px;margin: 5px 0;">坐标：' +
					this.position_NKYYGS.bdLNG +
					',' +
					this.position_NKYYGS.bdLAT;
				('</div>');
				var point = new BMap.Point(this.position_NKYYGS.bdLNG, this.position_NKYYGS.bdLAT); // 创建点坐标
				var marker = new BMap.Marker(point);
				map.addOverlay(marker);
				map.centerAndZoom(point, 18); // 初始化地图，设置中心点坐标和地图级别
				// //点击图标时候调用信息窗口
				var infoWindow = new BMap.InfoWindow(sContent);
				marker.addEventListener('click', function() {
					this.openInfoWindow(infoWindow);
				});
			}
		}

	});
</script>
<style scoped>
	.ant-carousel :deep(.slick-slide) {
		text-align: center;
		height: 100vh;
		line-height: 100vh;
		background: #364d79;
		overflow: hidden;
	}

	.caseHeader {
		width: 100%;
		height: 80vh;
		background: url(../assets/contact.png) no-repeat center center;
		background-size: 100%;
		padding: 7rem 6rem;
		color: #fffefe;
	}

	.img {
		width: 640px;
		/* aspect-ratio: auto 640 / 385; */
		height: 385px;
	}

	h3.titbg {
		padding: 1rem;
		margin: 0;
		font-size: 1.5rem;
		text-align: center;
		color: #444444;
	}

	h3.titbg span {
		font-size: 0.7rem;
		display: block;
		text-transform: uppercase;
		line-height: 2rem;
		color: #999999;
	}

	.caseItem {
		width: 285px;
		height: 220px;
		box-shadow: 0px 0px 10px #f0f0f0;
		text-align: center;
		display: inline-block;
		overflow: hidden;
		margin-right: 15px;
	}

	.caseItem div {
		width: 50%;
		height: 100%;
		padding: 1rem;
	}

	.caseItem img {
		margin-top: 40px;
		margin-bottom: 23px;
	}

	.caseItem h2 {
		font-size: 18px;
		margin-bottom: 15px;
	}

	.caseItem p {
		width: 230px;
		margin: 0 auto;
		font-size: 14px;
		color: #666666;
	}

	.message {
		background-color: #f6f6f6;
		text-align: center;
	}

	.message-input {
		width: 385px;
		height: 68px;
		background-color: white;
		border: 0;
		font-size: 16px;
		padding-left: 35px;
		outline: none;
		color: #8e8e8e;
		margin-right: 18px;
	}

	.message-content {
		height: 240px;
		width: 100%;
		margin-top: 25px;
		padding-top: 25px;
	}

	.message-btn {
		width: 220px;
		height: 55px;
		background-color: #e93429;
		color: white;
		text-align: center;
		line-height: 57px;
		border: 0;
		font-size: 16px;
		margin-top: 35px;
		margin-bottom: 80px;
		cursor: pointer;
		border-radius: 10px;
	}

	.left-map {
		width:50%;
		height: 400px;
		border: #ccc solid 1px;
		position: absolute;

	}

	.right-map {
		width:50%;
		height: 400px;
		border: #f3eaea solid 1px;
		background-color: #f6f6f6;
		position: absolute;
		right: 0;
		display: flex;
		flex-direction: row;
	}

	.left-content {
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		font-size: 16px;
		color: #000000;
		width: 385px;
		line-height: 35px;
		padding: 10px;

	}

	.left-content p {
		font-size: 14px;
		color: #999999;
	}
</style>
