import Log from"../constants/log.js";let request=function(r,e){let{token:t="",url:o,method:a="POST",data:s,reTry:d,header:u={"Content-Type":"application/json"}}=r;try{uni.request({url:uni.eidBaseUrl+o,method:a,data:s,header:u,success(r){console.log("request success:",r),200===r.statusCode&&r.data?0==r.data.ErrorCode||0==r.data.code?e({ErrorCode:0,ErrorMsg:r.data.ErrorMsg,Data:r.data.Data||r.data.data,reTry:d}):e({ErrorCode:r.data.ErrorCode,ErrorMsg:r.data.ErrorMsg,Data:r.data.Data||r.data.data}):e({ErrorCode:-101,ErrorMsg:"请求错误，请稍后重试"})},fail(a){console.log("request error:",a),d&&d.tryCount&&d.tryCount>0?(d.tryCount--,uni.eidBaseUrl=uni.eidBackUpUrl,setTimeout(()=>{request(r,e)},d.retryDelay||0)):e({ErrorCode:-107,ErrorMsg:"request请求异常，请稍后重试"}),uni.reportLogToEid({token:t,event:Log.requestFail,errCode:"-1",errMsg:"requestFail 调用失败",data:{url:`${uni.eidBaseUrl}`+o,err:a}})}})}catch(r){console.log("request error:",r),e({ErrorCode:-109,ErrorMsg:"request方法异常，请稍后重试"}),uni.reportLogToEid({token:t,event:Log.requestCatch,errCode:"-1",errMsg:"requestFail 调用失败",data:{url:`${uni.eidBaseUrl}`+o,err:r}})}};export const $http=request;