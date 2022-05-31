$(function(){
    const form = layui.form
    // 自定义规则
    form.verify({
        nickname:(val)=>{
            if(val.length > 6) return '昵称长度必须在 1 ~ 6 个字符之间！'
        }
    })

    // 初始化用户信息
    const initUserInfo = ()=>{
        $.ajax({
            type:'GET',
            url:"/my/userinfo",
            success:(res)=>{
                if(res.status !== 0) return layer.msg("获取用户信息失败！")
                console.log(res.data);
                form.val("formUserInfo", res.data);
            }
        })
    }

    // 重置表单数据
    // $('#btnReset').click((e)=>{
    //     e.preventDefault()
    // // 调用初始化用户信息函数
    //     initUserInfo()
    //     console.log('进行重置');
    // })
    // 更新用户信息
    $('.layui-form').on('submit',(e)=>{
        e.preventDefault()
        $.ajax({
            type:'POST',
            url:'/my/userinfo',
            data:$('.layui-form').serialize(),
            success:(res)=>{
                if(res.status !== 0) return layer.msg("更新用户信息失败！")
                layer.msg('更新用户信息成功！')
                // 调用父页面渲染函数
                window.parent.getUserInfo()
            }
        })
    })

    // 调用初始化用户信息函数
    initUserInfo()
})