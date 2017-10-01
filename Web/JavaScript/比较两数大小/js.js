window.onload = function () {
  var input = document.getElementsByTagName('input')
  var span = document.getElementById('span')

  for (var i = 0; i < input.length - 1; i++) {
    input[i].onkeyup = function () {
      this.value = this.value.replace(/[^\d]/, "")
    }
  }
  input[2].onclick = function () {
    (input[0].value == "" || input[1].value == "") ?
    alert("请输入数字") :
    (span.innerHTML = Math.max(input[0].value, input[1].value))
  }
}
