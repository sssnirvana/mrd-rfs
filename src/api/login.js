import request from '@/utils/request'

//手机号登录
export const loginByPwd = data => request.post('/v1/api/mcht/login', data)

//验证码登录 
export const loginByVerify = data => request.post('/v1/api/mcht/login/quickRegisterLogin', data)

//修改密码 
export const updatePassword = data => request.post('/v1/api/mcht/login/updatePassword', data)

//找回密码 
export const forgetPassword = data => request.post('/v1/api/mcht/login/forgetPassword', data)

//找回密码 
export const resetPassword = data => request.post('/v1/api/mcht/login/resetPassword', data)

// 发送验证码
export const sendSmsCode = data => request.post('/v1/api/mcht/authentication/sendSmsCode', data)


// 微信授权登录
export const wxRegisterLogin = data => request.post('/v1/api/mcht/login/wxRegisterLogin', data)
//---------------------------------------------------------------------------------------------

//微信授权登录
export const loginByCode = data => request.post('/v1/api/applet/login/loginByCode', data)

//微信一键注册
export const register = data => request.post('/v1/api/applet/login/register', data)