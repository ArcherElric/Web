window.onload = function () {
  var oCal = document.getElementById('calc')
  var aA = oCal.getElementsByTagName('a')
  var aInput = oCal.getElementsByTagName('input')[0]
  var oFormula = document.getElementById("formula")
  var s = false
  var i = 0

  for (var i = 0; i < aA.length; i++) {
    aA[i].onclick = function () {
      this.blur()
    }
    aA[i].onclick =function () {
      switch (this.innerHTML) {
        case "c":
          aInput.value = 0
          oFormula.value = ""
          break;
        case "%":
          count("%")
          break;
        case "÷":
          count("/")
          break;
        case "x":
          count("*")
          break;
        case "-":
          count("-")
          break;
        case "+":
          count("+")
          break;
        case "=":
          s || (oFormula.value += aInput.value)
          aInput.value = eval(oFormula.value.replace(/\%\/\*\-\+/, ""))
          aInput.value = aInput.value.substr(0,10).replace("NaN", 0)
          s = true
          break;
        case ".":
          if(aInput.value.search(/[\.\%\/\*\-\+]/ != -1))
          break;
        default:
          s && (aInput.value = 0, oFormula.value = "", s = false)
          aInput.value.length < 10 && (aInput.value = (aInput.value + this.innerHTML).replace(/^[0\%\/\*\-\+](\d)/,"$1"))
      }
    }
  }
  function count(a) {
    if(s){
      oFormula.value = aInput.value + a
      aInput.value = a
      s = false
    }else {
      /[\%\/\*\-\+]$/.test(aInput.value) || (oFormula.value += aInput.value);
			aInput.value = a;
			/[\%\/\*\-\+]$/.test(oFormula.value) || (oFormula.value += aInput.value);
			oFormula.value = oFormula.value.slice(-1) != a ? oFormula.value.replace(/.$/,a) : oFormula.value
    }
  }
}
