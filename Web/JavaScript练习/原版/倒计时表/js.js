window.onload = function () {
  var countdown = document.getElementById('countdown')
  var input = countdown.getElementsByTagName("input")[0]
  var timer = null

  input.onclick = function () {
    this.className == "" ? (timer = setInterval(updateTime, 1000), updateTime()) : (clearInterval(timer))
    this.className = this.className == "" ? "cancel" : ""
  }

  function format(a) {
    return a.toString().replace(/^(\d)$/, "0$1")
  }

  function updateTime() {
    var span = countdown.getElementsByTagName('span')
    var remain = span[0].innerHTML.replace(/^0/, "") * 60 + parseInt(span[1].innerHTML.replace(/^0/, ""))
    if (remain <= 0) {
      clearInterval(timer)
      return
    }
    remain--
    span[0].innerHTML = format(parseInt(remain / 60))
    remain %= 60
    span[1].innerHTML = format(parseInt(remain))
  }
}
