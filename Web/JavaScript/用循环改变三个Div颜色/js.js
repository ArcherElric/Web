window.onload = function () {
  // var divs = document.getElementsByTagName("div")
  var divs = document.getElementById("outer").getElementsByTagName("div")
  var btn = document.getElementById("button")
  // var btn = document.getElementsByTagName("button")
  btn.onclick = function () {
    for (var i = 0; i < divs.length; i++) {
      divs[i].style.background = "red"
    }
  }
}
