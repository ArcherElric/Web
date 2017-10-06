window.onload = function () {
  var divs = document.getElementById('outer').getElementsByTagName('div')
  for (var i = 0; i < divs.length; i++) {
    divs[i].onclick = function () {
      alert(this.innerHTML)
    }
  }
}
