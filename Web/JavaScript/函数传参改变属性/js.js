window.onload = function () {
  var div1 = document.getElementById('div1')
  var btn = document.getElementsByTagName('button')
  var input = document.getElementsByTagName("input")

  btn[0].onclick = function () {
    changStyle(div1, input[0].value, input[1].value)
  }
  btn[1].onclick = function () {
    div1.removeAttribute("style")
  }
}
var changStyle = function (elem, name, value) {
  elem.style[name] = value
}
