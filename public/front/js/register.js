$(function () {
  //1. 获取验证码
  //1.1 给按钮注册点击事件
  //1.2 获取到手机号
  //1.3 校验  手机号不能为空  必须格式正确
  //1.4 发送ajax请求，获取验证码
  //1.5 开启倒计时
  //点击获取验证码，表单校验，发送ajax请求

  $('.btn_vcode').on('click', function () {
    //表单校验
    var mobile = $('[name="mobile"]').val();
    if (mobile == '') {
      mui.toast('手机号不能为空');
      return;
    }
    if (!/^1\d{10}$/.test(mobile)) {
      mui.toast('手机号格式不正确');
      return;
    }
    //禁用按钮
    $(this).text('发送中。。。').prop('disabled', true).addClass('disabled');
    $.ajax({
      type: 'get',
      url: '/user/vCode',
      success: function (info) {
        console.log(info);
        //成功时设置定时器
        var count = 5;
        var timeId = setInterval(function () {
          count--;
          $('.btn_vcode').text(count + '秒后重新发送').prop('disabled', true).addClass('disabled');
          if (count < 0) {
            clearInterval(timeId);

            $('.btn_vcode').text('再次发送').prop('disabled', false).removeClass('disabled');
          }
        }, 1000)
      }
    })
  })
  //2. 注册功能
  //2.1 给注册按钮注册点击事件
  //2.2 表单校验
  //2.3 发送ajax请求
  //2.4 成功了跳转到登录页面
  $('.btn_register').on('click',function () { 
    var username = $('[name="username"]').val();//[name="username"]属性选择器，选出拥有该属性的元素
    var password = $('[name="password"]').val();
    var repass = $('#repass').val();
    var mobile = $('[name="mobile"]').val();
    var vCode = $('[name="vCode"]').val();

    if(!username){
      mui.toast('用户名不能为空');
      return;
    }
    if(!password){
      mui.toast('密码不能为空');
      return;
    }
    if(repass != password){
      mui.toast('确认密码与密码不一致');
      return;
    }
    if (mobile == '') {
      mui.toast('手机号不能为空');
      return;
    }
    if (!/^1\d{10}$/.test(mobile)) {
      mui.toast('手机号格式不正确');
      return;
    }
    if(!vCode){
      mui.toast('验证码不能为空');
      return;
    }
    if(!/^\d{6}$/.test(vCode)){
      mui.toast('验证码格式不正确');
      return;
    }
    $.ajax({
      type:'post',
      url:'/user/register',
      data:$('form').serialize(),
      success:function (info) { 
        console.log(info);
        if(info.success){
          mui.toast('恭喜你注册成功了，3秒后跳转到登录页');
          setTimeout(function () { 
            location.href = 'login.html';
           },3000)
        }
       }
    })
   })


})