$(function() {
    $('#link_reg').on('click', function() {
        $('.toregister').hide()
        $('.tologin').show()
    })

    $('#link_login').on('click', function() {
        $('.toregister').show()
        $('.tologin').hide()
    })

    var form = layui.form
    var layer = layui.layer
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repwd: function(value) {
            var pwd = $('.tologin [name=password]').val()
            if (value !== pwd) {
                return '两次密码不一致！'
            }
        }
    })

    $('#form_register').on('submit', function(e) {
        e.preventDefault();
        var data = {
            username: $('#form_register [name=username]').val(),
            password: $('#form_register [name=password]').val()
        }
        $.post('/api/reguser', data, function(res) {
            console.log(res);
            if (res.status !== 0) return layer.msg(res.message);
            layer.msg('注册成功！请登录')
            $('#link_login').click()
        })
    })

    $('#form_login').on('submit', function(e) {
        console.log('login')
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            type: 'post',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) return layer.msg('登录失败')
                layer.msg('登录成功')
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }
        })
    })
})