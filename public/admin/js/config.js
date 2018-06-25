//整个项目的通用的配置
require.config({
  baseUrl:'/admin/',//绝对路径  
  //给每一个模块配一个别名
  paths:{
      "artTemplate": "lib/artTemplate/template-web",//模板引擎
      "bootstrap": "lib/bootstrap/js/bootstrap",//bootstrap 框架
      "bootstrapPaginator": "lib/bootstrap-paginator/bootstrap-paginator",//分页
      "bootstrapValidator": "lib/bootstrap-validator/js/bootstrapValidator",//表单校验
      "echarts": "lib/echarts/echarts.min",//主页的两个图应用的
      "jquery": "lib/jquery/jquery",
      "jqueryFileupload": "lib/jquery-fileupload/jquery.fileupload",//图片上传
      "nprogress": "lib/nprogress/nprogress",//进度条
      "common": 'js/common',
      "jquery-ui/ui/widget": "lib/jquery-fileupload/jquery.ui.widget"//图片上传依赖的ui
  },
  //加载非amd规范的模块，需要垫
  shim:{
    'bootstrap':{
      deps:['jquery']
    },
    'bootstrapPaginator':{
      deps:['bootstrap']
    },
    'bootstrapValidator':{
      deps:['bootstrap']
    }
  }

});