window.onload = function () {
  var h2 = document.getElementById("h2")
  var ul = document.getElementById('ul')
  h2.onclick = function () {
    var style = ul.style
    style.display = style.display == "none" ? "block" : "none"
    h2.className = style.display == "none" ? "open" : ""
  }
}
