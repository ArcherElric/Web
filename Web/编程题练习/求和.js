function sum(arr) {
    var s = 0
    for (var i = 0; i < arr.length; i++) {
        s += arr[i]
    }
    return s
}

function sum1(arr) {
    return arr.reduce(function(prev, curr, index, arr) {
        return prev + curr
    })
}

function sum2(arr) {
    return eval(arr.join("+"))
}
