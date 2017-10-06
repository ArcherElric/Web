window.onload = function() {
  var input = document.getElementsByTagName("input")
  var button = document.getElementById('button')
  button.onclick = function () {
    myFn(input[0], input[1])
  }
}

var myFn = function (a, b) {
  alert(a.value)
  alert(b.value)
}
