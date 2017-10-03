window.onload = function () {
  var input = document.getElementsByTagName('input')
  var box = document.getElementById('box')

  input[0].onclick = function() {
      alert("width:" + css(box, "width") + "\nheight:" + css(box, "height") + "\nbackground-color:" + css(box, "backgroundColor"))
    }

  input[1].onclick = function() {
      css(box, {width: "330px", height: "100px", borderColor: "#0084ff", backgroundColor: "#eff8ff"})
      for (var i = 0; i < input.length; i++) {
          css(input[i], "backgroundColor", "#0084ff")
      }
    }

  input[2].onclick = function() {
      css(box, {width: "400px", height: "200px", borderColor: "#f60", backgroundColor: "#fef4eb"})
      for (var i = 0; i < input.length; i++) {
        css(input[i], "backgroundColor", "#f60")
      }
    }

  function css(obj, attr, value) {
      switch (arguments.length) {
        case 2:
            if (typeof arguments[1] == "object") {
                for (var i in attr) obj.style[i] = attr[i]
            } else {
              return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj, null)[attr]
            }
          break;
        case 3:
            obj.style[attr] = value
          break;
        default:
            alert("参数错误！")
      }
    }
}
