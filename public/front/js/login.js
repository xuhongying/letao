$(function () { 
  //点击登录按钮，1.表单校验 2.发送ajax请求
 $('.btn_login').on('click',function () { 
   var username = $("[name = 'username']").val();
   var password = $("[name = 'password']").val();
   //表单校验
   if(!username){//username为空
    mui.toast('请输入用户名');
    return;
   }
   if(!password){
    mui.toast('请输入密码');
    return;
   }
   //2.发送ajax请求
   $.ajax({
     type:'post',
     url:'/user/login',
     data:{
       username:username,
       password:password
     },
     success:function (info) { 
       console.log(info)
           //跳转到？？？？？？？
          //如果是直接访问的登录页面，跳转到会员中心
          //如果是购物车页面或者商品详情页面跳转到登录页的，成功之后，需要回跳
          //判断是否有back参数，如果有，跳转到back对应的页面即可，如果没有back，默认跳到user.html（会员中心）
          //location.search 获取的的是整个地址栏的参数及？以后的数据，是一个字符串
         // 如整个地址栏是http://localhost:3000/mobile/login.html?back=http://localhost:3000/mobile/product.html?productId=1# 
         
         //location.search 获取到的是 ?back=http://localhost:3000/mobile/product.html?productId=1#

       if(info.success){
        console.log(location.search);
         if(location.search.indexOf( "back") > -1){//包含back,要跳转到back后面=号后面的网址
          //要获取到back后面的网址

          location.href = location.search.replace('?back=','');
         }else{//不包含跳到会员中心
       
            location.href = 'user.html';
         }
       };
       //如果错误，提示错误信息
       if(info.error){
        mui.toast(info.message);
       }
      }
   })

  })
 })