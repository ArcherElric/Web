
//字符串工具
var stringTools = {

    //检查是否为string
    isString : function (str) {
        if (typeof srt == "string" || str.constructor == String) {
            return true
        }else {
            return false
        }
    },
    
    //截取目标字串
    getString : function (str, search) {
        var start = str.indexOf(search)
        var result = str.substr(start, search.length)
        return result
    },

    //删除字符串左边空白字符
    leftTrim : function (str) {
        return str.replace(/^\s*/g,"")
    },

    //字符串反转
    revStr : function (str) {
        var tmpStr = ""
        for (var i = str.length - 1 ; i >= 0; i -- ) {
            tmpStr += str.charAt(i)
        }
        return tmpStr
    },
}
