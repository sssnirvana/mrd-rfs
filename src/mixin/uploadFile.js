import {ossConfig} from '@/api/common'
export default {
	methods: {
		/**
		 * @param {String} filePath 图片路径
		 * @param {Object} callback 回调函数
		**/
		uploadFile(filePath,callback) {
			ossConfig({}).then(res=>{
				if(res.resultCode == '1'){
					const ossConfig = res.result
					const formData = new Object()
					const _this = this
					var key = ossConfig.keyPrefix + Math.floor(Math.random()*1000) + filePath.substr(-4);
					formData.key = key
					formData.policy = ossConfig.policy
					formData.OSSAccessKeyId = ossConfig.OSSAccessKeyId
					formData.signature = ossConfig.signature
					formData.callback = ossConfig.callback
					uni.showLoading({
						title: '图片上传中...'
					})
					uni.uploadFile({
					    url: ossConfig.host,
					    filePath,
					    name: 'file',
					    formData,
					    success: (res) => {
					        if(res.statusCode == 200){
								res.data = JSON.parse(res.data)
								if(res.data.resultCode == '1'){
									callback(res.data.result.fileUrl,res.data.result.fileName)
								}else{
									_this.$toast(res.data.errorDesc)
								}
							}else{
								_this.$toast(res.errorDesc|| "上传错误，请联系管理员")
							}
					    },
						fail: (erro)=>{
							_this.$toast('图片上传失败')
						}
					});
				}else{
					this.$toast(res.errorDesc)
				}
			})
		},
		//选择图片
		chooseImage(callback) {
			const _this = this
			uni.chooseImage({  
				count: 1,
				sizeType: ['original', 'compressed'],
				success: (res) => {
					let resSize = res.tempFiles[0].size;
					if(resSize > 5242880 ){
						uni.showToast({
							title: '图片大小不能超过5M',
							icon: 'none',
							duration: 2000,
							mask: true
						});
					}else {
						_this.uploadFile(res.tempFilePaths[0],callback)
					}
				}  
			})
		},
	}
}