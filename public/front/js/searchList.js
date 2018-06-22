

$(function(){


  //封装一个函数用来存放地址栏中的参数
  function getSearch() {
    //?key=耐克&name=hcc&des=很帅   假设这时地址栏中的值， 是一个字符串， 将它变成对象的形式，方便日后使用的的属性
    //1.获取到地址栏中的值
    var search = location.search;//得到的是对中文转码后的地址信息

    //2.将转码后的地址信息，转回中文地址信息

    search = decodeURI(search); //得到的是一个字符串，将它转换成对象
    //3.去掉？号

    search = search.slice(1);//从下标为1的开始截取到最后

    //4.转换成数组
    var arr = search.split('&');
    //转换成对象
    var obj = {};
    arr.forEach(function (e, i) {  //e表示数组中的每一项，又是一个字符串'key=耐克' 'name=hcc',再将每个字符串切割成数组
      var k = e.split('=')[0];  //e.split('=')得到的还是一个数组
      var v = e.split('=')[1];
      obj[k] = v;
    });
    return obj; //将地址栏中的参数都放到了一个第一对象中
  }

    //将获取到的地址栏中的值放到搜索框中，发送ajax，渲染数据

   var key = getSearch().key;

    $('.lt_search input').val(key);

    var page = 1;
    var pageSize =10;
  render();

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
    render();
 })

//点击排序的按钮（价格或者是库存），重新发送ajax请求
  //如果点了价格进行排序，需要多传一个参数，price: 1或者是2
  //如果点了库存进行排序，需要多传一个参数，num: 1或者是2

  //如果当前的li没有now这个类，让当前的li有now这个类，并且让其他的li没有now这个类,让所有的span的箭头都初始向下
  //如果当前li有now这个类，修改当前li下的span的箭头的类

 //给价格或库存的两个li注册点击事件
 $('.lt_sort li[data-type]').on('click',function () { 

  if(!$(this).hasClass('now')){//不包含now的类
    $(this).addClass('now').siblings().removeClass('now');
    //让所有的span的箭头都初始向下
    $(".lt_sort li span").addClass('fa-angle-down').removeClass('fa-angle-up')
  }else{
    $(this).find('span').toggleClass('fa-angle-up').toggleClass('fa-angle-down')

  }
    render();
  })







    function render() { 

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
          console.log(info);
          $('.lt_product').html( template("tpl",info))
         }
      })
     }
    


    //



})