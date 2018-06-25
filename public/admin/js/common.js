define(['jquery', 'nprogress', 'bootstrap'], function ($, NProgress) {
  //所有页面都有进度条效果

  //注册一个全局的ajaxStart事件，所有的ajax在开启的时候，会触发这个事件
  $(document).ajaxStart(function () {
    //开启进度条
    NProgress.start();
  });
  $(document).ajaxStop(function () {
    //关闭进度条
    NProgress.done();
  });

  //非登陆页面，判断当前用户是否是登录了，如果登录了，就继续，如果没登陆，需要跳转到登录页面。
  if (location.href.indexOf("login.html") == -1) {
    $.ajax({
      type: "get",
      url: "/employee/checkRootLogin",
      success: function (data) {
        if (data.error === 400) {
          //说明用户没有登录，跳转到登录页面
          location.href = "login.html";
        }
      }
    })
  }

  //二级分类显示隐藏功能
  //点击a标签，让a下面的div显示隐藏
  $('.child').prev().on('click', function () {
    $(this).next().slideToggle();
  });


  //侧边栏显示隐藏功能
  $('.icon_menu').on('click', function () {
    $('.lt_aside').toggleClass('now');
    $('.lt_main').toggleClass('now');
    $('.lt_topbar').toggleClass('now');

  });

  //点击退出，显示模态框
  $('.icon_logout').on('click', function () {
    //console.log(111)
    $('#logoutModal').modal('show');
  });

  //给确定按钮注册点击事件
  $('.btn_logout').on('click', function () {
    $.ajax({
      type: 'get',
      url: '/employee/employeeLogout',
      success: function (info) {
        if (info.success) {
          location.href = 'login.html';
        }
      }
    })
  });


})