// Ajax每次发送请求时，先调用这个函数
$.ajaxPrefilter((options)=>{
    // console.log(options.url);
    options.url = 'http://www.liulongbin.top:3007' + options.url
    // 为/my/相关接口注入token
    if(options.url.includes("/my/")){
        options.headers = {
            Authorization:localStorage.getItem('token')
        }
    }
    options.complete = (res) =>{
        // console.log(res);
        if(
            res.responseJSON.status === 1 && 
            res.responseJSON.message === '身份认证失败！'
        ){
            // 1.强制清空token
            localStorage.removeItem('token')
            // 2.跳转登陆页面
            location.href = '/login.html'
        }
    }
})