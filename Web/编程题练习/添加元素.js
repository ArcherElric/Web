//末尾添加，并返回新函数
function append(arr, item) {
    var a = arr.concat(item)
    return a
}

//在头部添加
function prepend(arr, item) {
    return [item].concat(arr)
}
