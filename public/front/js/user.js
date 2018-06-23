
$(function () { 
  //查询个人信息,
  //页面以加载时发送ajax请求判断用户有没有登录，如果没有登录跳转到登录页，如果登陆了动态渲染模板，用户名手机号
$.ajax({
  type:'get',
  url:'/user/queryUserMessage',
  success:function(info){
    console.log(info);
    if(info.error){//没有登录跳转到登录页
      location.href = 'login.html';
    }
    //坑，返回的值不带success
      $('.userinfo').html(template('tpl',info));

  }
})
//点击退出按钮，发ajax请求退出,到登录页面
$('.btn_logout').on('click',function () { 
  $.ajax({
    type:'get',
    url:'/user/logout',
    success:function (info) { 
      console.log(info);
        location.href = 'login.html';
     }
  })
 })


 })