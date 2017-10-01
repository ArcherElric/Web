window.onload = function () {
  var btn = document.getElementById('button')
  var input = document.getElementById('input')
  var strong = document.getElementsByTagName('strong')[0]
  input.onkeyup = function() {
    this.value = this.value.replace(/[^(\d)|(,)]/, "")
  }

  btn.onclick = function() {
    var sum = 0
    var input = document.getElementById("input").value.split(",")

    for (var i in input) {
      sum += parseInt(input[i])
    }
    strong.innerHTML = sum
  }
}
