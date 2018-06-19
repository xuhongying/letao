

$(function () {

  var page = 1;
  var pageSize = 8;

  render();

  function render() {
    //发送ajax请求与分页
    $.ajax({
      type: 'get',
      url: '/user/queryUser',
      data: {
        page: page,
        pageSize: pageSize

      },
      success: function (info) {
        console.log(info);
        var html = template('tpl', info);
        $('tbody').html(html);
        //成功获取响应时，分页
        $("#pagintor").bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: page,
          totalPages: Math.ceil(info.total / info.size),
          size: 'small',
          onPageClicked: function (a, b, c, p) {
            page = p;
            render();
          }

        });
      }
    })
  }

////启用禁用功能
  //1. 需要给表格中所有的按钮，注册点击事件（委托事件）
$('tbody').on('click','.btn',function () { 
  //1.点击按钮时显示模态框
  $('#userModal').modal('show');
var id = $(this).parent().data('id');
var isDelete = $(this).hasClass('btn-danger')?0:1;
//点击确定按钮
$('.btn_confirm').off().on('click',function () { 
  $.ajax({
  type:'post',
  url:'/user/updateUser',
  data:{
    id:id,
    isDelete:isDelete
  },
  success:function (info) { 
    if(info.success){
      $('#userModal').modal('hide');
      render();
    }
   }
  })
 })
 })
})