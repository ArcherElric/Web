var EventUtil = {
    addHandler : function(oElement, sEvent, fnHandler) {
        oElement.addEventListener ?
        oElement.addEventListener(sEvent, fnHandler, false) :
        oElement.attachEvent("on" + sEvent, fnHandler)
    },
    removeHandler : function(oElement, sEvent, fnHandler) {
        oElement.removeEventListener ?
        oElement.removeEventListener(sEvent, fnHandler, false) :
        oElement.detachEvent("on" + sEvent, fnHandler)
    },
    addLoadHandler : function(fnHandler) {
        this.addHandler(window, "load", fnHandler)
    },
}

EventUtil.addLoadHandler(function() {
    var btn = document.getElementsByTagName('input')

    EventUtil.addHandler(btn[1], "click", function() {
        EventUtil.addHandler(btn[0], "click", fnHandler)
        btn[0].value = "我可以点击了"
    })

    EventUtil.addHandler(btn[2], "click", function() {
        EventUtil.removeHandler(btn[0], "click", fnHandler)
        btn[0].value = "毫无用处按钮"
    })

    function fnHandler() {
        alert("事件绑定成功!")
    }
})
