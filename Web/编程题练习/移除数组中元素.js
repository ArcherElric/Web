function remove(arr, item) {
    var a = []
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] != item) {
            a.push(arr[i])
        }
    }
    return a
}

function removeWithoutCopy(arr, item) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == item) {
            arr.splice(i, 1)
            i--
        }
    }
    return arr
}

//第一个元素
function curtail(arr) {
    return arr.slice(1)
}
