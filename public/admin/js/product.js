$(function () {

  var page = 1;
  var pageSize = 2;
  var imgs = [];//用于存放上传的图片的结果
  //1.渲染整个表格,渲染静态页面 +分页
  render();
  function render() {
    $.ajax({
      type: 'get',
      url: '/product/queryProductDetailList',
      data: {
        page: page,
        pageSize: pageSize
      },
      success: function (info) {
        // console.log(info);
        $('tbody').html(template('tpl', info));
        // 分页
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: page,
          totalPages: Math.ceil(info.total / info.size),
          size: 'small',
      //更改页码的显示内容
          itemTexts: function (type, page, current) {
            //console.log(type,page,current)//type 显示的类型 page 显示的页数
            switch (type){
              case 'first':
                return '首页';
                case 'prev':
                return '上一页';
                case 'page':
                return page;
                case 'next':
                return '下一页';
                case 'last':
                return '尾页';
            }
          },
          useBootstrapTooltip:true, //显示提示码
          //设置提示码的内容
          tooltipTitles:function (type,page) { 
            switch (type){
              case 'first':
                return '首页';
                case 'prev':
                return '上一页';
                case 'page':
                return '跳到'+page+'页';
                case 'next':
                return '下一页';
                case 'last':
                return '尾页';
            }
           },
       
          bootstrapTooltipOptions:{
            placement: 'top', //设置位置提示页码的位置
          },
          onPageClicked: function (a, b, c, p) {
            page= p;//在function内部是=号，不是：记住记住
            render();
          }
        });

      }
    })
  }

  //点击添加按钮显示模态框
  $('.btn_add').on('click',function () { 
    $('#addModal').modal('show');
    //动态渲染二级分类
    $.ajax({
      type:'get',
      url:'/category/querySecondCategoryPaging',
      data:{
        page:1,
        pageSize:100
      },
      success:function (info) { 
        console.log(info);
        $('.dropdown-menu').html( template('tpl2',info));
       }
    })

   });


//给所有的动态生成的a注册点击事件,让二级标签能够显示
$('.dropdown-menu').on('click','a',function () { 
  //设置span的内容
  $('.dropdown_text').text( $(this).text() );
  var id = $(this).data('id');
  $('[name="brandId"]').val(id);
  //手动让brandId通过
  // $("form").data("bootstrapValidator").updateStatus("brandId", "VALID");
  //$("form").data("bootstrapValidator").updateStatus("brandId", "VALID");//必须等表单校验成功了才可以手动更改校验成功
 })



 //  1. 点击上传图片
  //  2. 图片已经上传到服务器了，并且能够返回图片上传后的地址
  //  3. 把图片的地址显示到页面中

 $("#fileupload").fileupload({
    dataType: 'json',
    //e :事件对象
    //data: 上传后的结果
    done: function (e, data) {//图片上传后的回调函数
      console.log(data.result);
//最多能上传3张
if (imgs.length >= 3) {
  return;
}
      //图片上传成功需要把图片显示出来
      //1. img_box中添加img
      //图片上传的结果已经存到数组中
      imgs.push(data.result);
      $('.img_box').append('<img src="'+ data.result.picAddr+'" width = "100" alt="">')
      
      if(imgs.length===3){
         //上传图片成功后手动将'tips改成校验成功
        $('form').data('bootstrapValidator').updateStatus('tips', 'VALID')
      }else{
        $('form').data('bootstrapValidator').updateStatus('tips', 'INVALID')
      }
    }
  }) 


//  //表单校验功能
// //进行表单校验
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

    brandId: {
      validators: {
        //不能为空
        notEmpty: {
          message: '请选择二级分类'
        }
      }
    },
    proName: {
      validators: {
        //不能为空
        notEmpty: {
          message: '请输入商品的名称'
        }
      }
    },
    oldPrice: {
      validators: {
        //不能为空
        notEmpty: {
          message: '请输入商品的原价'
        }
      }
    },
   price: {
      validators: {
        //不能为空
        notEmpty: {
          message: '请输入商品的现价'
        }
      }
    },
    proDesc: {
      validators: {
        //不能为空
        notEmpty: {
          message: '请输入商品的描述'
        }
      }
    },
    num: {
      validators: {
        //不能为空
        notEmpty: {
          message: '请输入商品的库存'
        },
        regexp:{
          //不能0开头，不能超过5位数 1-99999
          regexp:/^[1-9]\d{0,4}$/,
          message: '请输入正确的库存（1-99999）'
        }
      }
    },
    size:{
      validators: {
        //不能为空
        notEmpty: {
          message: '请输入商品的尺码'
        },
        regexp:{
          //尺码32-50
          regexp:/^\d{2}-\d{2}$/,
          message: '请输入正确的尺码（xx-xx）'
        }
      }
    },
    tips: {
      validators: {
        notEmpty: {
          message: '请上传三张图片'
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
    url: '/product/addProduct',
    data: ,
    success: function (info) {
      if (info.success) {
        //关闭模态框
        $("#addModal").modal("hide");
        page = 1;
        render();
        //重置表单
        $('form').data('bootstrapValidator').resetForm(true);
        //把按钮的文字重置
        $('.dropdown_text').text('请选择二级分类');
          //删除图片
        $('.img_box img').remove();
       //重置数组
       imgs = [];
      }
    }
  })

}); 

})