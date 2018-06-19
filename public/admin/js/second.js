$(function () { 
  var page = 1;
  var pageSize = 5;
  render();
  function render() {
    $.ajax({
      type: 'get',
      url: '/category/querySecondCategoryPaging',
      data: {
        page: page,
        pageSize: pageSize
      },
      success: function (info) {
        console.log(info);
        $('tbody').html(template('tpl', info));
        // 开启分页

        $('#pagintor').bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: page,
          totalPages: Math.ceil(info.total / info.size),
          size: 'small',
          onPageClicked: function (a, b, c, p) {
            page = p;
            render();
          }
        })
      }
    })
  }


// 点击添加按钮，显示模态框
$('.btn_add').on('click', function () {
  $('#addModal').modal('show');
})


 })