require(['jquery','artTemplate','bootstrapPaginator','bootstrapValidator',"common"],function ($,template) { 
  $(function () {
    var page = 1;
    var pageSize = 5;
    render();
    function render() {
      $.ajax({
        type: 'get',
        url: '/category/queryTopCategoryPaging',
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
  
    //进行表单校验
    $('form').bootstrapValidator({
      // 指定校验时的图标显示，默认是bootstrap风格
      feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
      },
  
      // 指定校验字段
      fields: {
        //校验用户名，对应name表单的name属性
        categoryName: {
          validators: {
            //不能为空
            notEmpty: {
              message: '请输入一级分类的名称'
            }
          }
        }
      }
    });
  
  
    // ////注册表单校验成功事件
    $("form").on('success.form.bv', function (e) {
      //表单注册成功阻止页面跳转
      e.preventDefault();
      //使用ajax提交逻辑
      $.ajax({
        type: 'post',
        url: '/category/addTopCategory',
        data: $('form').serialize(),
        success: function (info) {
          if (info.success) {
            //关闭模态框
            $("#addModal").modal("hide");
            page = 1;
            render();
            //重置表单
            $('form').data('bootstrapValidator').restForm();
          }
        }
      })
  
    });
  
  })
 })

