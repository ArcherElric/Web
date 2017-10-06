window.onload = function() {
    var star = document.getElementById("star")
    var li = document.getElementsByTagName("li")
    var ul = document.getElementsByTagName("ul")[0]
    var p = document.getElementsByTagName("p")[0]
    var i = score = iStar = 0
    var aMsg = [
				"很不满意|差得太离谱，与卖家描述的严重不符，非常不满",
				"不满意|部分有破损，与卖家描述的不符，不满意",
				"一般|质量一般，没有卖家描述的那么好",
				"满意|质量不错，与卖家描述的基本一致，还是挺满意的",
				"非常满意|质量非常好，与卖家描述的完全一致，非常满意"
				]

    function fnPoint(iArg) {
        score = iArg || iStar
        for (var i = 0; i < li.length; i++) {
            li[i].className = i < score ? "on" : ""
        }
    }

    for (var i = 1; i < li.length + 1; i++) {
        li[i - 1].index = i
        li[i - 1].onmouseover = function() {
            fnPoint(this.index)
            p.style.display = "block"
            p.style.left = ul.offsetLeft + this.index * this.offsetWidth - 104 + "px"
            p.innerHTML = "<em><b>" + this.index + "</b>分" + aMsg[this.index - 1].match(/(.+)\|/)[1] + "</em>" + aMsg[this.index - 1].match(/\|(.+)/)[1]
        }
        li[i - 1].onmouseout = function() {
            fnPoint()
            p.style.display = "none"
        }
        li[i - 1].onclick = function() {
            iStar = this.index
            p.style.display = "none"
            span.innerHTML =  "<strong>" + (this.index) + " 分</strong> (" + aMsg[this.index - 1].match(/\|(.+)/)[1] + ")"
        }
    }


}
