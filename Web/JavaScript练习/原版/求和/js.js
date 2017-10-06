window.onload = function () {
  var aInput = document.getElementsByTagName("input")
  var aSpan = document.getElementById('span')
  var i = 0

  for (var i = 0; i < aInput.length - 1; i++) {
    aInput[i].onkeyup = function () {
      this.value = this.value.replace(/[^\d]/, "")
    }
  }
  aInput[2].onclick = function () {
    (aInput[0].value == "" || aInput[1] == "") ?
    alert("请输入数字") :
    aSpan.innerHTML = parseInt(aInput[0].value) + parseInt(aInput[1].value)
  }
}
