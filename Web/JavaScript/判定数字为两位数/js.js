window.onload = function () {
  var input = document.getElementsByTagName('input')

  input[0].onkeyup = function () {
    this.value = this.value.replace(/[^\d]/, "")
  }
  input[1].onclick = function () {
    (input[0].value == "") ?
    alert("请输入数字") :
    alert(/^\d{2}$/.test(parseInt(input[0].value)) ?
    "right 是两位数" :
    "这是" + input[0].value.length + "位数")
  }
}
