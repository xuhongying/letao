

$(function () { 
  //页面一开始就调一次下拉刷新

  mui.init({
    pullRefresh : {
      container:".mui-scroll-wrapper",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
      down : {
        
        auto: true,//可选,默认false.首次加载自动下拉刷新一次
        callback :function () { 
          //1. 发送ajax请求，获取商品的数据
          $.ajax({
            type:'get',
            url:'/cart/queryCart',
            success:function (info) { 
             
              //因为数据比较少所以模拟1s后获取到数据
              setTimeout(function () { 
               // console.log(info);
                //如果用户没有登录，跳转到登录页，需要回跳
                if(info.error){
                  location.href='login.html?back='+location.href;
                }
                //说明用户已经登录了  注意：info返回的是一个数组
              
                $('#OA_task_2').html(template('tpl',{rows:info}));
                //结束下拉刷新
                //console.log(mui('.mui-scroll-wrapper').pullRefresh());
                mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
               
               },1000)
             }
          })
         } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
      }
    }
  });

//删除商品
 //删除功能
  // 1. 注册事件的注意点： 委托事件  注册tap
  // 2. 获取到id，弹出确认框，发送ajax请求，删除购物车的信息
  // 3. 成功的时候，重新下拉刷新一次即可

  $("#OA_task_2").on("tap", ".btn_delete", function () {

    var id = $(this).data("id");
    //console.log(id)
    mui.confirm("你确定要删除这件商品吗？", "温馨提示", ["是", "否"], function (e) {
      if (e.index === 0) {

        $.ajax({
          type: 'get',
          url: '/cart/deleteCart',
     
          data: {
            //注意点：文档需要传递一个数组
            id: [id]
          },
          success: function (info) {
            if (info.success) {
              //重新下拉
              mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();
        
            }
          }
        });
      }
    })

  });
//计算总金额   给复选框注册委托事件   注册change事件
  $("#OA_task_2").on("change", ".ck", function () {
    //console.log($('.ck'))
    var total = 0;
    //所有选中的checkbox
    $('.ck:checked').each(function (i,e) {  
      //console.log($('.ck:checked'))
     total += $(this).data('price') * $(this).data('num');
    })
     //显示出来
     $('.lt_total span').text(total.toFixed(2));


  })


  //修改功能

  $("#OA_task_2").on("tap", ".btn_edit", function () {
    //将需要的数据都存到btn_edit的自定义属性上

    //获取所有的自定义属性
    var data = this.dataset;//this是DOM对象，用Dom的方法一次性可以获取所有的比用jq的方法一个一个获取更简单
    
    //回显数据
    var html = template('tpl2', data)//数据与模板相结合
    //需要把html字符串中所有的\n给干掉
    html = html.replace(/\n/g, '');
    //弹出确认框
    mui.confirm(html, '编辑商品', ['确定', '取消'], function (e) {
      //确认框的内容是一个很复杂的，结果所以直接写html
        if(e.index == 0){
          var id = data.id;
          var size = $('.proSize span.now').text();
          var num = $('.mui-numbox-input').val();
          console.log(num)
          $.ajax({
          type:'post',
          url:'/cart/updateCart',
          data:{
            id:id,
            size:size,
            num:num
          },
          success:function (info) { 
          console.log(info);
          if(info.success){
            //重新下拉刷新一次
            mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();
   
          }
           }
        })
        }
    })
    //让span可以选择
      //让尺码可以选择
      $('.proSize span').on('click',function () { 
        $(this).addClass('now').siblings().removeClass('now');
       })

    //让数组控件可以加减
    mui('.mui-numbox').numbox();



  })

})