window.onload = function () {
    var btn = document.getElementById("button")
    var ime = document.getElementById('ime')
    var close = document.getElementById('close')
    var style = ime.style
    btn.onclick = function () {
      style.display = style.display == "block"? "none" : "block"
    }
    close.onclick = function() {
      style.display = "none"
    }
}
