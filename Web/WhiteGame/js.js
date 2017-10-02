var clock = null
var state = 0
var speed = 4

//初始化init
function init() {
    for (var i = 0; i < 4; i++) {
      createrow()
    }

    //添加onclick事件
    $("main").onclick = function(ev) {
        judge(ev)
    }
    //定时器 每30毫秒调用一次move()
    clock = window.setInterval("move()", 30)
}

//判断用户是否点击到了黑块
function judge(ev) {
    //-1表示没有踩到黑块,即踩到了白块
    if (ev.target.className.indexOf("black") == -1) {
        fail()
        $("main").onclick = function(ev) {};//覆盖onclick事件
    }else {
        //踩到黑块
        ev.target.className = "cell"
        // ev.target.parentNode.pass = 1
        score()
    }
}

//游戏结束
function fail() {
    clearInterval(clock)
    confirm("你的最终得分为 " + parseInt($("score").innerHTML))
}

//创建div，参数className是其类名
function creatediv(className) {
    var div = document.createElement("div")
    div.className = className
    return div
}

//创建一个<div class="row">并且有四个子节点<div class="cell">
function createrow() {
    var con = $("con")
    //创建div calssName = row
    var row = creatediv("row")
    //定义div cell的类名，其中一个为cell black
    var arr = createcell()

    //添加row为con的子节点
    con.appendChild(row)

    for (var i = 0; i < 4; i++) {
        //添加row的子节点cell
        row.appendChild(creatediv(arr[i]))
    }

    if (con.firstChild == null) {
        con.appendChild(row)
    } else {
        con.insertBefore(row, con.firstChild)
    }
}

//根据id来get DOM元素
function $(id) {
    return document.getElementById(id)
}

//创建一个类名的数组，其中一个为cell black
function createcell() {
    var temp = ['cell', 'cell', 'cell', 'cell',]
    var i = Math.floor(Math.random()*4) //随机生成黑块的位置
    temp[i] = "cell black"
    return temp
}


//使黑块向下移动
function move() {
    var con = $("con")
    var top = parseInt(window.getComputedStyle(con, null)["top"])

    if (speed + top > 0) {
        top = 0
    }else {
        top += speed
    }
    con.style.top = top + "px"

    if (top == 0) {
        createrow()
        con.style.top = "-100px"
        delrow()
    }else if (top == (-100 + speed)) {
        var rows = con.childNodes
        if ((rows.length == 5) && (rows[rows.length-1].pass !== 1)) {
            fail()
        }
    }
}

//加速函数
function speedup() {
    speed += 2
    if (speed == 20) {
        alert("God like!")
    }
}

//删除div#con的子节点中最后那个<div class = "row">
function delrow() {
    var con = $("con")
    if (con.childNodes.length == 6) {
        con.removeChild(con.lastChild)
    }
}

//记分
function score() {
    var newscore = parseInt($("score").innerHTML) + 1
    $("score").innerHTML = newscore
    if (newscore % 10 == 0) {
        speedup()
    }
}

//重置按钮
$("start").onclick = function() {
    clock = window.clearInterval(clock)
    $("score").innerHTML = "0"
    init()
}
