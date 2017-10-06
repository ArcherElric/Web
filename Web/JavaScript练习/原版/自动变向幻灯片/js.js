window.onload = function() {
  var box = document.getElementById('box')
  var ul = document.getElementsByTagName('ul')
  var img = ul[0].getElementsByTagName('li')
  var num = ul[1].getElementsByTagName('li')
  var timer = play = null
  var i = index = 0
  var order = true



  //切换按钮
  for ( i = 0; i < num.length; i++) {
      num[i].index = i
      num[i].onmouseover = function() {
          show(this.index)
    }
  }
  //鼠标划过关闭定时器
  box.onmouseover = function() {
      clearInterval(play)
  }
  //鼠标离开开启自动播放
  box.onmouseout = function() {
      autoPlay()
  }

  //自动播放
  function autoPlay() {
      play = setInterval(function() {
          //判断播放顺序
          order ? index++ : index--;
          //正序
          index >= img.length && (index = img.length - 2, order = false)
          //倒序
          index <= 0 && (index = 0, order = true)
          //调用函数
          show(index)
    }, 2000)
  }
  autoPlay()

  //图片切换，淡入淡出效果
  function show(a) {
      // console.log(a);
      index = a
      var alpha = 0
      for (var i = 0; i < num.length; i++) {
          num[i].className = ""
      }
      num[index].className = "current"
      img[index].className = "current"
      clearInterval(timer)

      for (i = 0; i < img.length; i++) {
          // console.log(img[i].style.opacity);
          img[i].style.opacity = 0
          img[i].style.filter = "opacity=0"
        }
      timer = setInterval(function () {
          alpha += 2
          alpha > 100 && (alpha = 100)
          img[index].style.opacity = alpha / 100
          img[index].style.filter = "opacity = " + alpha
          alpha == 100 && clearInterval(timer)
    }, 20)
  }
}
