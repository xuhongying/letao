
$(function () {
  //动态生成一级分类
  $.ajax({
    type: 'get',
    url: '/category/queryTopCategory',
    success: function (info) {
      console.log(info);
      $('.lt_category_l ul').html(template('firstTpl', info));

 //获取到一级分类之后，渲染了第一个一级分类对应的二级分类
      renderSecond(info.rows[0].id)
    }
  })

  //点击一级分类显示对应的二级分类
  $('.lt_category_l').on('click','li',function () { 
    $(this).addClass('now').siblings().removeClass('now');
    //2. 渲染了指定的二级分类
    var id= $(this).data('id');
    renderSecond(id);
    
    // 让右边的滚动容器滚到0，0的位置

    mui('.lt_category_r .mui-scroll-wrapper').scroll().scrollTo(0,0,1000);//1000毫秒滚动到顶
   })

  //渲染二级分类
  function renderSecond(id) { //id 为一级分类的id，知道渲染哪一个一级分类对应的二级分类
    $.ajax({
      type:'get',
      url:'/category/querySecondCategory',
      data:{
        id:id
      },
      success:function (info) { 
        console.log(info);
        $('.lt_category_r ul').html(template('secondTpl', info));
       }
    })
   }

})