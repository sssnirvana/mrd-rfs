

/**
* @description - 获取中控导航信息高度
* @param {callback} [e]   回调方法
* @return void
**/
export function getStatusBarHeight(callback){
    document.addEventListener(`deviceready`, () => {
        navigator.mobileCenter.getStatusBarHeight(res => {
            // getStatusBarHeight返回的数值在IOS和安卓中各不相同
            // IOS返回的是逻辑像素，而安卓中是物理像素，需要除以设备像素比
            const height = device.platform === `iOS` ? res : res / devicePixelRatio;
            callback(height)
        });
    })
}

/**
* @description - 获取中控设备信息
* @param {callback} [e]   回调方法
* @return void
**/
export function getInfo(callback){
    document.addEventListener(`deviceready`, () => {
        navigator.appInfo.getInfo(
            result => {
            callback(result)
            },
            error => {
            console.log(`err==>`, error);
            }
        );
    });
}

/**
* @description - 调用活体
* @param {callback} [e]   回调方法
* @param {object} [e]   参数传递
* @return void
**/
export function faceVerify(callback,object){
    document.addEventListener(`deviceready`, () => {
        navigator.TencentFace.faceVerify(
            result => {
                callback(result)
            },
            error => {
                this.$toast(error,'error');
            },
            object
        );
    });	

}


/**
* @description - 调用意愿核身
* @param {callback} [e]   回调方法
* @param {object} [e]   参数传递
* @return void
**/
export function faceWillVerify(callback,object){
    document.addEventListener(`deviceready`, () => {
        navigator.TencentFace.faceWillVerify(
            result => {
                callback(result)
            },
            error => {
                this.$toast(error,'error');
            },
            object
        );
    });	

}

/**
* @description - 打开系统设置
* @param {back} [e]   回调方法
* @return void
**/
export function openSystemSettings(callback){
    document.addEventListener(`deviceready`, () => {
        navigator.jhbUtils.openSystemSettings(
            result => {
                callback(result)
            },
            error => {
            console.log(`err==>`, error);
            },
            1
        );
    });	

}
/**
* @description - 检查权限
* @param {callback} [e]   回调方法
* @param {object} [e]   参数传递
* @return void
**/

export function checkPermission(callback,num){
    document.addEventListener(`deviceready`, () => {
        navigator.jhbUtils.checkPermission(
            result => {
                callback(result)
            },
            error => {
                console.log(`err==>`, error);
            },
            num
        );
    });	
}



/**
* @description - 唤起扫码
* @param {callback} [e]   回调方法
* @param {object} [e]   参数传递
* @return void
**/

export function scan(callback){
    document.addEventListener(`deviceready`, () => {
        navigator.scanner.scan(
            result => {
                callback(result)
            },
            error => {
                console.log(`err==>`, error);
            },
        );
    });	
}
