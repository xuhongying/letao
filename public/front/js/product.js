

$(function () {
  //获取到地址栏中的商品id，发送ajax请求，渲染动态页面
  var productId = getSearch().productId;
  $.ajax({
    type: 'get',
    url: '/product/queryProductDetail',
    data: {
      id: productId
    },
    success: function (info) {
      console.log(info);
      //模板与数据结合
      $('.mui-scroll').html(template('tpl', info));

      //       //让轮播图可以动
      //获得slider插件对象
      mui('.mui-slider').slider({
        interval: 1000//自动轮播周期，若为0则不自动播放，默认为0；
      });
      //让尺码可以选择
      $('.proSize span').on('click', function () {
        $(this).addClass('now').siblings().removeClass('now');
      })

      //让数字键可以加减
      //文档中有
      mui(".mui-numbox").numbox()
    }
  })

  //加入购物车的功能
  //1. 给加入购物车按钮注册点击事件

  //2. 获取产品id，数量，尺码，校验尺码不可以为空
  //3.发送ajax请求


  $('.btn_cart').on('click', function () {

    var size = $('.proSize span.now').text();

    if (!size) {
      mui.toast('请选择尺码');
      return;
    }

    var num = $('.proNum input').val();


    $.ajax({
      type: 'post',
      url: '/cart/addCart',
      data: {
        productId: productId,
        num: num,
        size: size
      },
      success: function (info) {
        console.log(info);
        if (info.success) {
          mui.confirm('温馨提示', '添加成功', ['去购物车', '继续浏览'], function (e) {
            //console.log(e);
            if (e.index == 0) {
              location.href = 'cart.html'
            }
          });
        }
        if (info.error) {
          //说明没登录,跳转到登录页面, 把当前页的地址传递到了登录页面。
          location.href = 'login.html?back=' + location.href;
        }
      }
    })
  })




})