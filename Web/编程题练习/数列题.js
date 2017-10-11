//合并两数列，返回新数列
function concat(arr1, arr2) {
    return arr1.concat(arr2)
}

//在index处，插入item,返回新数列
function insert(arr, item, index) {
    var a = [].concat(arr)
    a.splice(index, 0 , item)
    return a
}

//记录item出现的次数
function count(arr, item) {
    var count = 0
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == item) {
            count += 1
        }
    }
    return count
}


//找出数组arr中重复出现的元素
function duplicates(arr) {
    var a = []
    arr.forEach(function (elem) {
        if (arr.indexOf(elem) != arr.lastIndexOf(elem) && a.indexOf(elem) == -1) {
            a.push(elem)
        }
    })
    return a
}

//数组的元素求平方后返回新数组
function square(arr) {
    return arr.map(function(x) {
        return x*x
    })
}

//查找目标元素出现的所有位置，返回一个位置数组
function findAllOccurrences(arr, target) {
    var a = []
    arr.forEach(function(val, index) {
        val !== target || a.push(index)
    })
    return a
}
