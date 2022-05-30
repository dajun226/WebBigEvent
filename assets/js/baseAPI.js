// Ajax每次发送请求时，先调用这个函数
$.ajaxPrefilter((options)=>{
    console.log(options.url);
    options.url = 'http://www.liulongbin.top:3007' + options.url
})