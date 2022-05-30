$(function(){
    // 点击切换
    $('#link_reg').click(()=>{
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#link_login').click(()=>{
        $('.login-box').show()
        $('.reg-box').hide()
    })

    // 引入form模块
    const form = layui.form
    // 自定义检测规则
    form.verify({
        pwd:[/^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'],
        repwd:(value)=>{
            const pwd = $('#form_reg [name=password]').val()
            if(pwd !== value) return '两次密码不一样'
        }
    })
    // 设置baseurl
    const layer = layui.layer
    // 注册功能
    $('#form_reg').on('submit',(e)=>{
        e.preventDefault()
        $.ajax({
            type:'POST',
            url: '/api/reguser',
            data:{
                username:$('#form_reg [name=username]').val(),
                password:$('#form_reg [name=password]').val(),
            },
            success:(res)=>{
                if(res.status !== 0) return layer.msg("注册失败")
                layer.msg('注册成功！')
                // 模拟点击跳转登录
                $('#link_login').click()
            }
        })
    })

    // 登录功能
    $('#form_login').on('submit',function (e){
        e.preventDefault()
        $.ajax({
            type:'POST',
            url: '/api/login',
            data:$(this).serialize(),
            success:(res)=>{
                if(res.status !== 0) return layer.msg('登陆失败')
                layer.msg('登录成功')
                // 登陆成功后，把token令牌存放在本地
                localStorage.setItem('token',res.token)
                location.href = '/index.html'
            }
        })
    })
})