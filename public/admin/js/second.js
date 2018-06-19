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


  // 点击添加按钮，显示模态框，并动态渲染
  //3.1 给所有的a注册点击事件
  //3.2 获取到a的文本内容，设置给按钮
 // 3.3 获取到点击的a的id，赋值给一个隐藏的文本框，点击添加的时候，需要把这个id传递到后台
  $('.btn_add').on('click', function () {
    $('#addModal').modal('show');
    //发送ajax请求，获取所有的一级分类的数据
    var page = 1;
    var pageSize = 100;
    $.ajax({
      type: 'get',
      url: '/category/queryTopCategoryPaging',
      data: {
        page: page,
        pageSize: pageSize
      },
      success: function (info) {
        $('.dropdown-menu').html(template('tpl2', info))
      }
    })


  })
 //让一级分类能够选择
$('.dropdown-menu').on('click', 'a',function () { 
  $('.dropdown_text').text($(this).text());
  var id = $(this).data('id');
  $('[name="categoryId"]').data('id',id);
 })



//  1. 点击上传图片
//  2. 图片已经上传到服务器了，并且能够返回图片上传后的地址
//  3. 把图片的地址显示到页面中

$("#fileupload").fileupload({
  dataType:'json',
   //e :事件对象
    //data: 上传后的结果
    done: function (e, data) {//图片上传后的回调函数
        //图片上传后的地址 data.result.picAddr
        console.log(data.result.picAddr);
        //修改img_box下的img的src
        $(".img_box img").attr("src", data.result.picAddr);
      // //给brandLogo赋值
      $('[name="brandLogo"]').val(data.result.picAddr);
     }
    })
})


//表单校验功能
 //进行表单校验
 $('form').bootstrapValidator({
    //excluded:指定不校验的类型，[]所有的类型都校验
    excluded: [],

  // 指定校验时的图标显示，默认是bootstrap风格
  feedbackIcons: {
    valid: 'glyphicon glyphicon-ok',
    invalid: 'glyphicon glyphicon-remove',
    validating: 'glyphicon glyphicon-refresh'
  },

  // 指定校验字段
  fields: {
    
    categocategoryId: {
      validators: {
        //不能为空
        notEmpty: {
          message: '请选中一级分类'
        }
      }
    },
  brandName: {
      validators: {
        //不能为空
        notEmpty: {
          message: '请输入二级分类的名称'
        }
      }
    },
    brandLogo: {
      validators: {
        //不能为空
        notEmpty: {
          message: '请上传品牌图片'
        }
      }
    }
  }
});


//注册表单校验成功事件
$("form").on('success.form.bv', function (e) {
  //表单注册成功阻止页面跳转
  e.preventDefault();
  //使用ajax提交逻辑
  $.ajax({
    type: 'post',
    url: '/category/addSecondCategor',
    data: $('form').serialize(),
    success: function (info) {
      if (info.success) {
        //关闭模态框
        $("#addModal").modal("hide");
        page = 1;
        render();
        //重置表单
        $('form').data('bootstrapValidator').restForm(true);
        $('.dropdown_text').text('请选择一级分类');
        $('.img_box img').attr('src',"images/none.png")
      }
    }
  })

});
