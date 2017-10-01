window.onload = function () {
  var box = document.getElementById('box')
  var imgs = box.getElementsByTagName('img')
  var div = document.getElementById('div')

  for (var i = 1; i < imgs.length; i++) {
    imgs[i].onmouseover = function () {
      var img = new Image()
      img.src = imgs[0].src = this.src.replace(/small/,"big")
      div.style.display = "block"
      img.complete ? div.style.display = "none" : (imgs[0].onload = function () {
        div.style.display = "none"
      })
    }
  }
}
