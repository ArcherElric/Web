window.onload = function () {
  var btn = document.getElementById('button')
  var i = 0

  btn.onclick = function () {
    btn.value = ++i
    alert(i)
  }
}
