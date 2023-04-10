//MD5
import md5 from 'md5'
//对象排序
function sortObj(obj) {
    var arr = []
    for (let i in obj) {
        if(obj[i] !==null && obj[i] !== '' && obj[i] !== 'undefined'&& obj[i] !== undefined){
            arr.push([i, obj[i]])
        }
    }
    arr.sort()
    let len = arr.length,objNew = {}
    for (let i = 0; i < len; i++) {
        objNew[arr[i][0]] = arr[i][1]
    }
    return objNew
}
//转URL参数
function parseParam(obj, encode) {
    function toQueryPair(key, value) {
        if (typeof value == 'undefined') {
            return key
        }
        if (encode) {
            if(value !== null && value !== '' && value !== 'undefined' && value !== undefined){
                return key + '=' + encodeURIComponent(String(value));
            }
        } else {
            if(value !== null && value !== '' && value !== 'undefined' && value !== undefined){
                return key + '=' + String(value);
            }
        }
    }
    var ret = []
    for (var key in obj) {
        key = encode ? encodeURIComponent(key) : key;
        var values = obj[key]
        if (values && values.constructor == Array) {
            //数组
            // var queryValues = []
            // for (var i = 0, len = values.length, value; i < len; i++) {
            //     value = values[i];
            //     queryValues.push(toQueryPair(key, value))
            // }
            ret.push(toQueryPair(key, JSON.stringify(values)))
            // ret = ret.concat(queryValues)
            console.log(ret)
        } else { //字符串
            if (values && Object.prototype.toString.call(values) === '[object Object]') {
                ret.push(toQueryPair(key, JSON.stringify(values)))
            }else{
                ret.push(toQueryPair(key, values))
            }
            
        }
    }
    return ret.join('&')
}
export default  (params) => {
    if (params.sign) {
        delete params.sign
    }
    //验签
	 console.log(sortObj(params))
    let key = '599C8B65841EE325'
    let singparams = `${parseParam(sortObj(params))}&${key}`
    console.log("singparams=====",singparams)
    let MD5 = md5(singparams).toUpperCase()
    params.sign = MD5
    console.log(params.sign)
    return params

}
