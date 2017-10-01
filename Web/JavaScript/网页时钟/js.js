window.onload = function () {
  var clock = document.getElementById('clock')
  var span = clock.getElementsByTagName('span')

  setInterval(getTimes, 1000)
  getTimes()
  function getTimes() {
    var odate = new Date()
    var adate = [odate.getHours(), odate.getMinutes(), odate.getSeconds()]
    for (var i in adate) span[i].innerHTML = format(adate[i])
  }
  function format(a) {
    return a.toString().replace(/^(\d)$/,"0$1")
  }
}
