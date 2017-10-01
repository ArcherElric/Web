window.onload = function () {
  var body = document.body
  var i = 0

  //setInterval 不断调用参数函数，毫秒
  setInterval(updateNum, 1000)
  function updateNum () {
    body.innerHTML = ++i
  }
}
