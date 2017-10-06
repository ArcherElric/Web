window.onload = function () {
  var tips = document.getElementById("tips")
  var label = document.getElementById("label")
  label.onmouseover = function () {
    tips.style.display = "block"
  }
  label.onmouseout = function () {
    tips.style.display = "none"
  }
}
