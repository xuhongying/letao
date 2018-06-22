
$(function () {
  // 渲染功能
  //1. 获取到localStorage中的数据, key的名字 lt_history，将缓存存在lt_history中,因为要多次使用所以用 分装成函数
  //(最开始时没有数据先使用假的数据，在console控制台输localStorage.setItem('lt_history','[1,2,3]'),
  //就会将这些数据存储起来，在获取这些数据，动态渲染出来)

  // 获取localStorage中的数据
  function getHistory() {
    var result = localStorage.getItem('lt_history') || '[]';//获取到的数据是json字符串，要转换成js数据,如果没有数据就是空数组的字符串
    result = JSON.parse(result); //将json字符串转换成js对象
    return result;
  }

  //渲染
  function render() {
    // 获取localStorage中的数据
    var history = getHistory();//是个数组要转成对象
    //2. 准备模板，结合数据进行渲染
    $('.lt_history').html(template('tpl', { rows: history }))

  }

  render();

  //点击清空按钮，清空所有缓存数据
  $('.lt_history').on('click', '.btn_empty', function () {
    //提示的确认框
    mui.confirm('你确定要清除所有的历史记录吗？', '温馨提示', ['是', '否'], function (e) {
      console.log(e);//通过e.index可以知道你点击的是，是（index：0）还是否（index:1）
      if (e.index == 0) {
        //清空所有缓存数据
        localStorage.removeItem('lt_history');

        //重新渲染
        render();
      }
    })


  })


  //3. 删除数据
  //3.1 给删除的x注册点击事件（委托）
  //3.2 获取到当前x上的下标
  //3.3 获取到历史记录的数组
  //3.4 删除数组对应下标的某一项
  //3.5 数组的值已经发生改变，重新存回localStorage
  //3.6 重新渲染
  //点击删除按钮，删除对应的缓存数据
  $('.lt_history').on('click', '.btn_delete', function () {
    var index = $(this).data('index');
    //点击删除时弹出的确认框
    mui.confirm('你确定要删除这条历史记录吗？', '温馨提示', ['否', '是'], function (e) {
      console.log(e);//通过e.index可以知道你点击的是，是（index：1）还是否（index:0）
      if (e.index == 1) {

        var history = getHistory();// 获取到历史记录的数组
        history.splice(index, 1);
        //history 是一个数组，要转换成json字符串
        localStorage.setItem('lt_history', JSON.stringify(history));
        render();
      }
    })

    });

    //4. 增加功能
    //4.1 给搜索按钮注册点击事件
    //4.2 获取到输入的value
    //4.3 获取到历史记录的数组
    //4.4 把value存到数组的最前面
    //要求1：如果数组中已经有这个历史记录，把这个历史记录删除，把新输入的放到最前面
    //要求2：数组最多存10条记录，如果超过了，会把最早的搜索记录删掉,即数组的最后一个

    //4.5 把数组重新存回localStorage
    //4.6 重新渲染
    //4.7 跳转到搜索信息对应的商品列表页
    $('.lt_search button').on('click', function () {

      var txt = $('.lt_search input').val();

      $('.lt_search input').val('');
      //如果没有输内容，提示输入内容
      if (txt == '') {
        mui.toast('请输入搜索内容');
        return;
      }
      var history = getHistory();// 获取到历史记录的数组
      var index = history.indexOf(txt); //获取txt在数组中的下标

      if (index > -1) { //history中包含输入的数据
        history.splice(index, 1);
      }
      if (history.length >= 10) {
        history.pop();
      }
      history.unshift(txt);

      // 数组的值已经发生改变，重新存回localStorage
      localStorage.setItem('lt_history', JSON.stringify(history));
      render();


          //页面需要跳转
    location.href = "searchList.html?key="+txt;
    })
  
})