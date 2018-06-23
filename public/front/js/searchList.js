

$(function(){

//获取到的地址栏中的值
   var key = getSearch().key;
//放到搜索框中
    $('.lt_search input').val(key);

    var page = 1;//当前页
    var pageSize =4;//每页的条数

  //配置下拉刷新与上拉加载的
  //上拉加载与下拉刷新的异同点：
  //相同点：都需要发送ajax请求
  //不同点：1. 下拉刷新：page=1 使用html方法把以前的内容覆盖   结束下拉刷新
  //       2.  上拉加载 page++ 使用append方法追加内容 

  mui.init({
    pullRefresh : {
      container:".mui-scroll-wrapper",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
     //下拉刷新
      down : {
        height:50,//可选,默认50.触发下拉刷新拖动距离, 可不写
        auto: true,//可选,默认false.首次加载自动下拉刷新一次  要写的
        contentdown : "下拉可以刷新",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容 可不写
        contentover : "释放立即刷新",//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容 可不写 
        contentrefresh : "正在刷新...",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容 可不写
        callback :function(){
          ////下拉刷新，只需要加载第一页
          page = 1;
          //info是render发送ajax得到的info参数
          render(function (info) { 
            //模板与数据结合显示数据
            $('.lt_product').html( template("tpl",info))
            //结束下拉刷新
            console.log(mui('.mui-scroll-wrapper').pullRefresh());//结束刷新的方法在他的原型链上
            mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
                  //重置上拉加载，保证上拉加载可以继续使用
            mui('.mui-scroll-wrapper').pullRefresh().refresh(true);
           })
        } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
      },
      //上拉加载
      up:{

        callback :function(){
          ////下拉刷新，只需要加载第一页
          page++;
          //info是render发送ajax得到的info参数
          render(function (info) { 
            //模板与数据结合显示数据
            $('.lt_product').append( template("tpl",info));
            console.log(mui('.mui-scroll-wrapper').pullRefresh());//结束刷新的方法在他的原型链上
            //如果没有内容了就结束上拉加载
            if(info.data.length >0 ){
              mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh(false); //还有数据
            }else{
              mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh(true); //没有数据
            }
            //和写
            //mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh(info.data.length==0);
          

           })
          }
      }
    }
  });


  //render();

  //点击搜索按钮，渲染
  //1. 给按钮注册点击事件
  //2. 获取到文本框的值
  //3. 重新渲染
$('.lt_search button').on('click',function () { 
  key = $('.lt_search input').val();
   //当点击搜索按钮的时候，需要把排序的样式重置
    //把所有的li的now的类全部清掉
    //把所有的li下的span的箭头全部向下
    $('.lt_sort li').removeClass('now');
    $('.lt_sort li span').removeClas('fa-angle-up').addClass('fa-angle-down');
    //调用一次下拉刷新的功能
    mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();
 })

// //点击排序的按钮（价格或者是库存），重新发送ajax请求
//   //如果点了价格进行排序，需要多传一个参数，price: 1或者是2
//   //如果点了库存进行排序，需要多传一个参数，num: 1或者是2

//   //如果当前的li没有now这个类，让当前的li有now这个类，并且让其他的li没有now这个类,让所有的span的箭头都初始向下
//   //如果当前li有now这个类，修改当前li下的span的箭头的类

//  //给价格或库存的两个li注册点击事件
 $('.lt_sort li[data-type]').on('tap',function () { //mui禁止使用click，用tap代替click事件

  if(!$(this).hasClass('now')){//不包含now的类
    $(this).addClass('now').siblings().removeClass('now');
    //让所有的span的箭头都初始向下
    $(".lt_sort li span").addClass('fa-angle-down').removeClass('fa-angle-up')
  }else{
    $(this).find('span').toggleClass('fa-angle-up').toggleClass('fa-angle-down')

  }
      //调用一次下拉刷新的功能
      mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();
  })


    function render(callback) { //传一个callback函数  
      //考虑到下拉刷新，与上拉加载的不同的，所以将响应成功后显示模板写在函数里，让下拉和上拉在自己的函数内各自显示模板

     var obj= {
        proName:key,
        page:page,
        pageSize:pageSize
      }
      //判断是否需要添加price或者是num参数
     var  $select = $('.lt_sort li.now');
     if($select.length >0){//需要排序
      var type = $select.data('type');//是price或num
      var value = $select.find('span').hasClass('fa-angle-down')?2:1;//接口文档里写了，1是升序，2是降序
      obj[type]=value;//将price或num的值添加到obj中
     }

      $.ajax({
        type:'get',
        url:'/product/queryProduct',
        data:obj,
        success:function (info) { 
          //模板与数据相结合
          setTimeout(function () { 
            console.log(info);
            callback(info);//响应成功是调用callback函数;
           // $('.lt_product').html( template("tpl",info))
           },1000)//数据太少了为方便观察延迟1s才显示数据
       
         }
      })
     }
    


    //



})