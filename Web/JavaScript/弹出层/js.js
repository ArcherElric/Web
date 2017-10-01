window.onload = function () {
  var win = document.getElementById('win')
  var btn = document.getElementById('button')
  var lay = document.getElementById('overlay')
  var close = document.getElementById('close')
  btn.onclick = function() {
    lay.style.display = "block"
    win.style.display = "block"

  }
  close.onclick = function() {
    lay.style.display = "none"
    win.style.display = "none"
  }
}
