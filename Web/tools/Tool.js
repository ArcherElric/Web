
//创建一个使用原对象为原型的新对象
if (typeof object.beget !== "function") {
    object.create = function (o) {
        var F = function() {}
        F.prototype = o
        return new F()
    }
}

function inherit(p) {
    if (p == null) throw TypeError()
    if (Object.create) {
        return Object.create(p)
    }
    var t = typeof p
    if (t !== "object" && t !== "function") throw TypeError()
    function f() {}
    f.prototype = p
    return new f()
}

//特定场景下返回带补丁的extend()
var extend = (function() {
    //检查是否存在bug
    for (var p in { toString: null}) {
        return function extend(o) {
            for (var i = 0; i < arguments.length; i++) {
                var source = arguments[i]
                for (var prop in source) o[prop] = source[prop]
            }
            return o
        }
    }
    //如果代码执行到这里，说明for/in循环不会枚举测试对象的toString对象
    //因此返回另一个版本的extend()函数，这个函数显示测试Object.prototype中的不可枚举属性
    return function patched_extend(o) {
        for (var i = 0; i < arguments.length; i++) {
            var source = arguments[i]
            //复制所有的可枚举属性
            for (var prop in source) o[prop] = source[prop]
            //现在检查特殊属性
            for (var j = 0; j < prototypes.length; j++) {
                prop = prototypes[j]
                if (source.hasOwnProperty(prop)) o[prop] = source[prop]
            }
        }
        return o
    }
    var prototypes = ["toString", "valueOf", "constructor", "hasOwnProperty", "isPrototypeOf",
                        "propertyIsEnumberable", "toLocaleString",]
} ())

//用来枚举属性的对象工具函数
//将p中的可枚举属性复制至o中，并返回o
function merge(o, p) {
    for (prop in p) {
        if (o.hasOwnProperty[prop]) continue
        o[prop] = p[prop]
    }
    return o
}
//如果o中的属性在p中没有同名的属性，则从o中删除该属性，并返回o
function restrict(o, p) {
    for (prop in o) {
        if (! (prop in p)) delete o[prop]
    }
    return o
}
//如果o中的属性在p中存在同名属性，则中o中删除，并返回o
function subtract(o, p) {
    for (prop in p) {
        delete o[prop]
    }
    return o
}
//返回一个同时拥有o和p属性的对象，o和p同名属性使用p属性
function union(o, p) {
    return extend(extend({},o), p)
}
//返回一个o和p同时拥有的属性的新对象
function intersection(o, p) {
    return restrict(extend({}, o), p)
}
//返回一个数组，包含o中可枚举的自有属性的名字
function keys(o) {
    if (typeof o !== "object") throw TypeError()
    var result = []
    for (var prop in o) {
        if (o.hasOwnProperty(prop)) {
            result.push(prop)
        }
    }
    return result
}

//返回任意对象的类
function classof(o) {
    if (o === null) return "Null"
    if (o === undefined) return "Undefined"
    return Object.prototype.toString.call(o).slice(8, -1)
}

//扩展类型的功能
Function.prototype.method = function(name, func) {
    if (!this.prototype[name]) {
        this.prototype[name] = func
    }
    return this
}

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


//判断对象是否为数组
var isArray = Function.isArray || function(o) {
    return typeof o === "object" &&
    Object.prototype.toString.call(o) === '[object Array]'
}

var arrayTools = {

    //创建dim个元素值为init的一维数组
    dim : function(dimension, initial) {
        var a = [], i
        for ( i = 0; i < dimension; i++) {
            a[i] = initial
        }
        return a
    },
    //创建二维数组
    matrix : function(m, n, initial) {
        var a, i, j, mat = []
        for (i = 0; i < m; i++) {
            a = []
            for (j = 0; j < n; j++) {
                a[j] = initial
            }
            mat[i] = a
        }
        return mat
    },
}
