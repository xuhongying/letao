require(['jquery','bootstrapValidator','common'],function($){
  $(function () { 
    //表单校验的功能
    //1. 用户名不能为空
    //2. 用户密码不能为空
    //3. 用户密码的长度是6-12位
  
    //如何使用表单校验插件：
    //1. 引包
    //2. 调用bootstrapValidator
    $('form').bootstrapValidator({
      // 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      //使用bootstrap 组建中的Glyphicons 字体图标
      valid: 'glyphicon glyphicon-ok', //正确时√
      invalid: 'glyphicon glyphicon-remove',//错误时×
      validating: 'glyphicon glyphicon-refresh'//更新时
    },
  
      //设置校验规则
      fields:{
         //校验用户名，对应表单的name属性
    
        username:{
          validators:{
            //用户名不能为空
            notEmpty:{
              message:'用户名不能为空'
            },
            stringLength:{
              min:3,
              max:9,
              message:'用户名在3到9位之间'
            },
            callback:{
              message:'用户名不存在'
                
            }
            
  
          }
        },
        //密码校验规则
        password:{
          validators:{
            //密码不能为空
            notEmpty:{
              message:'密码不能为空'
            },
            stringLength:{
              min:6,
              max:12,
              message:'密码必须在6到12位之间'
            },
            callback:{
              message:'密码错误'
                
            }
            
  
          }
        }
      }
    });
    //注册表单成功事件，当表单注册成功时触发，阻止浏览器的自动跳转，用ajax提交数据跳转页面
    $('form').on('success.form.bv',function (e) { 
        //阻止页面跳转
        e.preventDefault();
        $.ajax({
          type:'post',
          url:'/employee/employeeLogin',
          data:$('form').serialize(),
          success:function (info) { 
            if(info.success){
              location.href = 'index.html'
            }
            if(info.error===1000){
               //手动调用方法，updateStatus让username校验失败即可
            //第一个参数：改变哪个字段
            //第二个参数：改成什么状态  VALID:通过  INVALID:不通过
            //第三个参数：选择提示的信息
               //获取表单校验实例//使用表单校验实例可以调用一些常用的方法。
              $("form").data('bootstrapValidator').updateStatus('username','INVALID','callback');
            }
            if(info.error === 1001){
              $("form").data('bootstrapValidator').updateStatus('password','INVALID','callback');
            }
           }
        });
         //重置功能，重置样式  
         //当点击重置按钮时，重置表单的样式和内容
         $('[type="reset"]').on('click',function () {
          //获取表单校验实例//使用表单校验实例可以调用一些常用的方法。
          $("form").data('bootstrapValidator').resetForm(true);
  
           })
     
  
     });
  
   })
})