<template>
	<view class="signa">
		<template v-if="showImage">
			<view class="placeholder-img">本人确认以上交易，同意将其计入本卡账户，持卡人签名：</view>
			<view class="showImage">
				<image :src="showImage" class="showImage"/>
			</view>
		</template>
		<template v-else>
		<canvas
			ref="canvas"
			class="canvas"
			disable-scroll="true"
			:style="{width, height}"
			id="canvas"
			type="2d"
			canvas-id="designature"
			@touchstart="starts"
			@touchmove="moves"
			@touchend="end"></canvas>
		<view class="qz" v-show="!drawing">签字区</view>
		<view class="placeholder" v-show="!drawing">提示：建议使用正楷签字，确保字迹清晰</view>
		<view v-show="showToast || showLoading" class="shade"></view>
		<view v-show="showToast" class="rotate-toast">{{ toastMessage }}</view>
		<view v-show="showLoading" class="rotate-toast">签名校验中<div class="dot">...</div></view>

		<!-- #ifdef MP-WEIXIN -->
		<!-- 小程序端，需要用这个获取离屏canvas -->
		<canvas id="offscrollCanvas" type="2d" style="position:fixed;top:-9999px;"></canvas>
		<!-- #endif -->
		</template>
	</view>
</template>

<script>
	import { getOffscreenCanvas, setImageBackground } from "@/utils/canvas"
	import {ossConfig} from '@/api/common'
	export default {
		props: {
			isPortrait: {
				type: Boolean,
				default: false
			},
			brokerId: {
				type: String,
				default: ''
			},
			showImage:{
				type: String,
				default: ''
			}
		},
		data() {
			return {
				showToast: false,
				showLoading: false,
				isLock: false,
				toastMessage: null,
				resultUrl: '',
				dom: null,
				line: [],
				width: '100%',
				height: '100%',
				radius: 0,
				drawing: false
			}
		},
		mounted() {
			this.initCanvas()
		},
		methods: {
			initCanvas() {
				const query = uni.createSelectorQuery().in(this)
				query.select('#canvas').fields({ node: true, size: true }).exec(res => {
					const result = res[0]
					let { node, width, height } = result

					// #ifdef MP-WEIXIN
					const dpr = uni.getSystemInfoSync().pixelRatio

					// 竖屏情况下，需要设置反值
					if (this.isPortrait) {
						node.width = height * dpr
						node.height = width * dpr
					} else {
						node.width = width * dpr
						node.height = height * dpr
					}

					if (!this.dom) {
						this.canvas = node
						this.dom = node.getContext('2d')
					}

					this.dom.scale(dpr, dpr)
					// #endif

					// #ifdef H5
					// 通过$refs获取canvas DOM对象，并获取context
					if (!this.dom) {
						this.canvas = this.$refs.canvas.$refs.canvas
						this.dom = this.canvas.getContext('2d')
					}
					// #endif

					this.canvasWidth = width
					this.canvasHeight = height
					// this.dom.fillStyle="#ffffff";
					// this.dom.fillRect(0,0,1000,1000);
				})
			},
			end(e) {},
			distance(a, b) {
				let x = b.x - a.x;
				let y = b.y - a.y;
				return Math.sqrt(x * x + y * y);
			},
			starts(e) {
				const point = this.convertXY(e.touches[0].x, e.touches[0].y)

				this.line.push({
					points: [{
						time: new Date().getTime(),
						x: point.x,
						y: point.y,
						dis: 0
					}]
				})
				let currentPoint = {
					x: point.x,
					y: point.y
				}
				this.currentPoint = currentPoint
				this.drawer(this.line[this.line.length - 1])
				// 开始绘制
				this.drawing = true
			},
			moves(e) {
				let point = this.convertXY(e.touches[0].x, e.touches[0].y)
				this.lastPoint = this.currentPoint,
				this.currentPoint = point
				this.line[this.line.length - 1].points.push({
					time: new Date().getTime(),
					x: point.x,
					y: point.y,
					dis: this.distance(this.currentPoint, this.lastPoint)
				})
				this.drawer(this.line[this.line.length - 1])
			},
			drawer(item) {
				let x1, x2, y1, y2, cx, cy, t = 0.5,
					x, y;
				// var time = 0;
				if (item.points.length > 2) {
					let lines = item.points[item.points.length - 3];
					let line = item.points[item.points.length - 2];
					let end = item.points[item.points.length - 1];
					x = line.x;
					y = line.y;
					x1 = lines.x;
					y1 = lines.y;
					x2 = end.x;
					y2 = end.y;
					// var dis = 0;
					// time = (line.time - lines.time) + (end.time - line.time)
					// dis = line.dis + lines.dis + end.dis;
					var dom = this.dom;
					// var or = Math.min(time / dis * this.linePressure + this.lineMin, this.lineMax);
					cx = (x - (Math.pow(1 - t, 2) * x1) - Math.pow(t, 2) * x2) / (2 * t * (1 - t))
					cy = (y - (Math.pow(1 - t, 2) * y1) - Math.pow(t, 2) * y2) / (2 * t * (1 - t))
					dom.lineCap = 'round'
					dom.beginPath()
					dom.strokeStyle = 'black'
					dom.lineWidth = 5
					dom.moveTo(x1, y1)
					dom.quadraticCurveTo(cx, cy, x2, y2)
					dom.stroke()
				}

			},
			clear() {
				this.dom.clearRect(0, 0, 1000, 1000)
				this.drawing = false
			},

	
			rotateToast(msg){
				this.showToast = true;
				this.toastMessage = msg;
				setTimeout(() => {
					this.showToast = false;
				}, 2000)
			},
			base64src(base64data, fun){
				const base64 = base64data; //base64格式图片
				const time = new Date().getTime();
				// todo 调用H5的时候需要原生提供方法获取本地图片
				const imgPath = wx.env.USER_DATA_PATH + "/poster" + time + "share" + ".png";
				//如果图片字符串不含要清空的前缀,可以不执行下行代码.
				const imageData = base64.replace(/^data:image\/\w+;base64,/, "");

				const file = wx.getFileSystemManager();
				file.writeFileSync(imgPath, imageData, "base64");
				fun(imgPath);
			},
			async save() {// 发起签名签约
				if(!this.drawing){
					this.$toast("请先签名");
					return;
				}
				if(this.isLock) return;
				this.isLock = true;
				this.showLoading = true;
				const base64 = this.canvas.toDataURL();
				// 根据原来的透明图，绘制带有白底的图片
				const hasBgBase64 = await this.drawHasBackgroundImage(base64);
	

				// todo(H5) 调用H5的时候将图片base64给到后台，后台上传后给结果


				// #ifdef MP-WEIXIN
				this.base64src(hasBgBase64,(datas)=>{
					ossConfig({}).then(res=>{
						if(res.resultCode == '1'){
							const ossConfig = res.result
							const formData = new Object()
							const _this = this
							var key = ossConfig.keyPrefix + Math.floor(Math.random()*1000);
							formData.key = key
							formData.policy = ossConfig.policy
							formData.OSSAccessKeyId = ossConfig.OSSAccessKeyId
							formData.signature = ossConfig.signature
							formData.callback = ossConfig.callback
							wx.uploadFile({
									url: ossConfig.host,
									filePath:datas,
									name: 'file',
									formData,
									success: (res) => {
										res.data = JSON.parse(res.data)
										if(res.data.resultCode == 1){
											this.$emit('signComplate',res.data);
											// todo 上传成功执行后续操作
											this.isLock = false;
											this.showLoading = false;
										}
										this.isLock = false;
											this.showLoading = false;
									},
								fail: (erro)=>{
									this.$log.info(`图片上传失败：${erro}`,)
									_this.$toast('图片上传失败')
									this.isLock = false;
									this.showLoading = false;
								}
							},_this);
						}else{
							this.$toast(res.errorDesc)
							this.isLock = false;
							this.showLoading = false;
						}
					})
	
				})	
				// #endif		
			},
			getOffscreenCanvas() {
				// #ifdef H5
				const result = getOffscreenCanvas()
				// #endif
				// #ifdef MP-WEIXIN
				const result = new Promise(resolve => {
					const query = uni.createSelectorQuery().in(this)
					query.select('#offscrollCanvas').fields({ node: true, size: true }).exec(res => {
						resolve(res[0].node)
					})
				})
				// #endif

				return result
			},
			drawHasBackgroundImage(base64) {
				return new Promise(async resolve => {
					const canvas = await this.getOffscreenCanvas()

					// 创建一个新的Image对象，用于绘制白底图片
					// #ifdef H5
					const img = new Image()
					// #endif

					// #ifdef MP-WEIXIN
					const img = canvas.createImage()
					// #endif
					img.src = base64
					img.onload = async () => {
						const hasBgBase64 = await setImageBackground(img, canvas)
						resolve(hasBgBase64)
					}
				})
			},
			// 转换横屏坐标
			convertXY(oldX, oldY) {
				const newXY = {
					x: oldX,
					y: oldY
				}
				// 判断当前屏幕是竖屏时，才需要转换坐标

				// 重坑！！！
				// IOS微信小程序中，在canvas旋转之后会自动转换坐标
				// 不需要手动转换
				// #ifdef MP-WEIXIN
				const needConvert = wx.getSystemInfoSync().platform !== 'ios'
				// #endif
				// #ifdef H5
				const needConvert = true
				// #endif

				if (needConvert && this.isPortrait) {
					newXY.x = oldY
					newXY.y = this.canvasWidth - oldX
				}

				return newXY
			}
		}
	}
</script>

<style scoped lang="scss">
	.rotate-toast {
		height: 80rpx;
		line-height: 80rpx;
		border-radius: 12rpx;
		font-size: 24rpx;
		color: #fff;
		background: rgba(0,0,0,.6);
		text-align: center;
		padding: 0 40rpx;
		position: fixed;
		left: 50%;
		top: 50%;
		transform:translate(-50%, -50%) rotate(0deg);
		z-index: 999;
	}
	.signa {
		position: relative;
		background-color: #fbfbfb;
		width: 100%;
		height: 452rpx;
		border: 4rpx dashed #B2CEFF;
		margin-top: 48rpx;
		border-radius: 8rpx;
		text-align: center;

		.canvas {
			background-color: #fff;
		}
		.qz {
			position: absolute;
			top: 50%;
			left: 0;
			width: 100%;
			transform: translateY(-50%);
			text-align: center;
			color: #B6D1FF;
			font-size: 96rpx;
			pointer-events: none;
		}
		.placeholder {
			position: absolute;
			bottom: 8rpx;
			left: 0;
			width: 100%;
			transform: translateY(-50%);
			text-align: center;
			color: #B6D1FF;
			font-size: 28rpx;
			pointer-events: none;
		}
		.placeholder-img{
			top:48rpx;
			position: absolute;
			left: 0;
			width: 100%;
			padding: 0 24rpx;
			transform: translateY(-50%);
			text-align: left;
			color: #B6D1FF;
			font-size: 28rpx;
			pointer-events: none;
		}
		.showImage{
			text-align: center;
			margin: 0 auto;
			margin-top: 80rpx;
			width: 100%;
			height: 250rpx;
		}

	}
	.shade {
		width: 100%;
		height: 100%;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 10;
	}
	.dot {
		display: inline-block; 
		height: 1em;
		line-height: 1;
		text-align: left;
		vertical-align: -.25em;
		overflow: hidden;
	}
	.dot::before {
		display: block;
		content: '...\A..\A.';
		white-space: pre-wrap;
		animation: dot 3s infinite step-start both;
	}
	@keyframes dot {
		33% { transform: translateY(-2em); }
		66% { transform: translateY(-1em); }
	}
</style>
