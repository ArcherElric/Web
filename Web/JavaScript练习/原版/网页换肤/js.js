window.onload = function () {
  var link = document.getElementsByTagName("link")[0]
  var skin = document.getElementById("skin")
  var lis = skin.getElementsByTagName("li")

  for (var i = 0; i < lis.length; i++) {
    lis[i].onclick = function () {
      for (var p in lis) lis[p].className = ""
      this.className = "current"
      link["href"] = this.id + ".css"
    }
  }
}
