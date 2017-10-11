//从start开始，end结束
function count(start, end) {
    //立即输出一个数
    console.log(start++)
    var timer = setInterval(function() {
        if (start <= end) {
            console.log(start++)
        } else {
            clearInterval(timer)
        }
    })
    return {
        cancel : function() {
            clearInterval(timer)
        }
    }
}
