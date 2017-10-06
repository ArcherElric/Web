window.onload = function () {
  var lis = document.getElementsByTagName('li')
  for (var i = 0; i < lis.length; i++) {
    lis[i].onmouseover = function () {
      this.className = "current"
    }
    lis[i].onmouseout = function () {
      this.className = ""
    }
  }
}
