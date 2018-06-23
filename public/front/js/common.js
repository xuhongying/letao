//初始化区域滚动
mui('.mui-scroll-wrapper').scroll({
  indicators: false, //是否显示滚动条
});



//轮播图
//获得slider插件对象
var gallery = mui('.mui-slider');
gallery.slider({
  interval:5000//自动轮播周期，若为0则不自动播放，默认为0；
});



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