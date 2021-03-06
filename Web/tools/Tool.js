
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

//在JavaScript中定义类
function defineClass(constructor, methods, statics) {
    if (methods) extend(constructor.prototype, methods)
    if (statics) extend(constructor, statics)
    return constructor
}

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
            })
        } else {
                element["on" + type] = handler
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

//数组去重.这个不能去重null
function unique(array) {
    var n = []
    for (var i = 0; i < array.length; i++) {
        if (n.indexOf(array[i]) == -1) {
            n.push(array[i])
        }
    }
    return n
}
//改进版
function uniq() {
    var n = []
    var flag = true
    for (var i = 0; i < this.length; i++) {
        if (n.indexOf(this[i]) == -1) {
            if (this[i] != this[i]) {
                if (flag) {
                    a.push(this[i])
                    flag = false
                }
            } else {
                a.push(this[i])
            }
        }
    }
    return n
}
//将类数组对象（或对象）转换为真正的数组
function array(a, n) {
    return Array.prototype.slice.call(a, n || 0)
}

//这个函数的实参传递至右侧
function partialRight(f /*, ... */) {
    var args = arguments
    return function() {
        var a = array(arguments)
        a = a.concat(array(args, 1))
        return f.apply(this, a)
    }
}
//这个函数的实参传递至左侧
function partialLeft(f /*, ...*/) {
    var args = arguments
    return function() {
        var a = array(args, 1)
        a = a.concat(array(arguments))
        return f.apply(this, a)
    }
}
//这个函数的实参被用做模板
function partial(f /*, ...*/) {
    var args = arguments
    return function() {
        var a = array(args, 1)
        var i = 0, j = 0
        for (; i < a.length; i++) {
            if (a[i] === undefined) a[i] = arguments[j++]
        }
        a = a.concat(array(arguments, j))
        return f.apply(this, a)
    }
}


//提取URL的搜索字符串中的参数
function urlArgs() {
    var args = {}
    var query = location.search.substring(1)
    var pairs = query.split("&")
    for (var i = 0; i < pairs.length; i++) {
        var pos = pairs[i].indexOf("=")
        if (pos == -1) continue
        var name = paris[i].substring(0,pos)
        var value = paris[i].substring(pos+1)
        value = decodeURIComponent(value)
        args[name] = value
    }
    return args
}

//通过ID查找多个元素
function getElements(/*ids...*/) {
    var elements = {}
    for (var i = 0; i < arguments.length; i++) {
        var id = arguments[i]
        var elt = document.getElementById(id)
        if (elt == null) {
            throw new Error("No element with id: " + id)
        }
        element[id] = elt
    }
    return elements
}

//解决attachEvent()的this值是全局对象的问题,但是注册的不能删除
function attachEvent(target, type, handler) {
    if (target.addEventListener){
        target.addEventListener(type,handler,false)
    } else {
        target.attachEvent("on" + type, function(event) {
            return handler.call(target, event)
        })
    }
}


//在IE5和IE6中模拟XMLHttpRequest()构造函数
if (window.XMLHttpRequest === undefined) {
    window.XMLHttpRequest = function() {
        try {
            return new ActiveXObject("Msxml2.XMLHTTP.6.9")
        }
        catch(e1) {
            try {
                return new ActiveXObject("Msxml2.XMLHTTP.3.0")
            }
            catch(e2) {
                throw new Error("XMLHttpRequest is not supported")
            }
        }
    }
}

//数组或对象的深拷贝
function clone(obj) {
    var str, newobj = obj.constructor === Array ? [] : {}
    if (typeof obj !=== "object") {
        return
    } else if (window.JSON) {
        str = JSON.stringify(obj),//系列化对象
        newobj = JSON.stringify(str)//还原
    } else {
        for (var i in obj) {
            newobj[i] = typeof obj[i] === "object" ? cloneObj(obj[i]) :obj[i]
        }
    }
    return newobj
}
//两参数
function deepCopy(p, c) {
    var c = c || {}
    for (var i in p) {
        if (typeof p[i] === "object"){
            c[i] = (p[i].constructor === Array)? [] : {};
            deepCopy(p[i], c[i]);
        } else {
            c[i] = p[i];
        }
    }
    return c
}
