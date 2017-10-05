
//事件工具
var eventTools = {
    //页面加载完成后
    readyEvent : function(func) {
        if (func == null) {
            func = document
        }
        var oldonload = window.onload
        if (typeof window.onload != "function") {
            window.onload = func
        } else {
            window.onload = function() {
                oldonload()
                func()
            }
        }
    } ,
    //绑定事件
    addEvent : function(element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false)
        } else if (element.attachEvent) {
            element.attachEvent("on" + type, function () {
                handler.call(element)
            }) else {
                element["on" + type] = handler
            }
        }
    },
    //移除事件
    removeEvent : function(element, type, handler) {
        if (element.removeEventListener) {
            element.removeEventListener(type, handler, false)
        }else if (element.detachEvent) {
            element.detachEvent("on" + type, handler)
        }else {
            element["on" + type] = null
        }
    },
    //阻止事件
    stopPropagation : function(ev) {
        if (ev.stopPropagation) {
            ev.stopPropagation()
        } else {
            ev.cancelBubble = true
        }
    },
    //取消事件的默认行为
    preventDefault : function(ev) {
        if (ev.preventDefault) {
            ev.preventDefault()
        } else {
            ev.returnValue = false
        }
    },
    //获取事件
    getTarget : function(ev) {
        return ev.target || ev.srcElement
    },
    //获取event对象的引用，取到事件的所有信息，确保随时能使用event
    getEvent : function(e) {
        var ev = e || window.event
        if (!ev) {
            var c = this.getEvent.caller
            while (c) {
                ev = c.arguments[0]
                if (ev && Event == ev.constructor) {
                    break
                }
                c = c.caller
            }
        }
        return ev
    },
}

//创建一个使用原对象为原型的新对象
if (typeof object.beget !== "function") {
    object.create = function (o) {
        var F = function() {}
        F.prototype = o
        return new F()
    }
}
