window.onload = function () {
  var lis = document.getElementsByTagName('li')
  var content = document.getElementById('content')
  var uls = content.getElementsByTagName('ul')

  for (var i = 0; i < lis.length; i++) {
    lis[i].index = i
    lis[i].onmouseover = function () {
      for (var n = 0; n < lis.length; n++) {
        lis[n].className = ""
      }
      this.className = "current"
      for (var n = 0; n < uls.length; n++) {
        uls[n].style.display = "none"
      }
      uls[this.index].style.display = "block"
    }
  }
}
