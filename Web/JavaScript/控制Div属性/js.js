window.onload = function () {
  var oBtn = document.getElementsByTagName("input")
  var oDiv = document.getElementById("div1")
  var oAtt = ["width","height","background","display","display",]
  var oVal = ["200px","200px","red","none","block",]

  for (var i = 0; i < oBtn.length; i++) {
    oBtn[i].index = i
    oBtn[i].onclick = function () {

      this.index == oBtn.length - 1 && (oDiv.style.cssText = "")
      changeStyle(oDiv,oAtt[this.index],oVal[this.index])
    }
  }
}

var changeStyle = function (elem, attr, value) {
  elem.style[attr] = value
}
