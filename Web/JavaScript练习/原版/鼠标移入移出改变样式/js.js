window.onload = function () {
  var div = document.getElementById("div1")
  div.onmouseover = function (){
    div.className = "hover"
  }
  div.onmouseout = function() {
    div.className = ""
  }
}
