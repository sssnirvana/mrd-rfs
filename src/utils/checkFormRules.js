const rules = {
	// 判是否为空
    isEmpty: (val, message)=> {
        if(val === '' || val == null) return message
    },
	// 判断数组是否为空
    arrayLength: (arr, message)=> {
        if(!arr || !arr.length) return message
    },
	//判断两个数据是否相等
	isEqual: (val, valAgain, message)=> {
		if(!val || !valAgain || val != valAgain) return message
	},
	//判断是否为手机号
	isMobile: (val, message)=> {
		const reg = /^[1][0-9][0-9]{9}$/
		if(!reg.test(val)) return message
	},
	//密码是否合法 8-20位 字母+ 数字
	legitimatePassword: (val, message)=> {
		const reg = new RegExp('^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$', 'g')
		if(!reg.test(val)) return message
	},
	// 判断是否在对应区间
	intervalValue: (val, min, max, message) => {
		if(min - val > 0 || val - max > 0) return message;
	},
	//是否合法数字/小数
	legalMumbers: (val, message) =>{
		const newVal = val.substring(val.length-1, val.length)
		if(val.split(".").length-1 > 1 || newVal == '.') return message;
	},
	//是否为几位小数
	decimalNumbers: (val, rules, message) =>{
		let index = val.indexOf('.')
		if(index != -1){
			const newVal = val.substring(index+1, val.length)
			if(newVal.length > rules) return message;
		}
	},
	// 判是否大于0
	greaterThanZero: (val, message) => {
		if(val < 0) return message;
	},
}

export default rules