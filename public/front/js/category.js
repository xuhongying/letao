
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

  function renderSecond(id) { //id 为一级分类的id，知道渲染哪一个一级分类对应的二级分类
    $.ajax({
      type:'get',
      url:'/category/querySecondCategory',
      data:{
        id:id
      },
      success:function (info) { 
        console.log(info);

       }
    })
   }

})