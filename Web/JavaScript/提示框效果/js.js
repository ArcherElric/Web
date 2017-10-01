window.onload = function () {
  var lis = document.getElementsByTagName('li')
  var a = document.getElementsByTagName("a")
  var img = document.getElementsByTagName("img")

  for (var i = 0; i < lis.length; i++) {
    a[i].index = img[i].index = i
    
    a[i].onmouseover = function () {
      lis[this.index].className = "zindex"
      img[this.index].style.display = "block"
    }
    a[i].onmouseout = function () {
      lis[this.index].className = ""
      img[this.index].style.display = "none"
    }
    img[i].onmouseover = function () {
      lis[this.index].className = "zindex"
      this.style.display = "block"
    }
    img[i].onmouseout = function () {
      lis[this.index].className = ""
      this.style.display = "none"
    }
  }
}
