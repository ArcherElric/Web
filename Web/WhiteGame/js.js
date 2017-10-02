var clock = null
var speed = 4
var score = 0

function $(id) {
    return document.getElementById(id)
}

function creatediv(className) {
    var div = document.createElement("div")
    div.className = className
    return div
}

function createcell() {
    var temp = ["cell", "cell", "cell", "cell"]
    var i = Math.floor(Math.random()*4)
    temp[i] = "cell black"
    return temp
}

function createrow() {
    var con = $("con")
    var row = creatediv("row")
    var arr = createcell()

    con.appendChild(row)

    for (var i = 0; i < 4; i++) {
        row.appendChild(creatediv(arr[i]))
    }

    if (con.firstChild == null) {
        con.appendChild(row)
    } else {
        con.insertBefore(row, con.firstChild)
    }
}

function judge(ev) {
    if (ev.target.className.indexOf("black") == -1) {
        fail()
        $("main").onclick = function(ev) {}
    }else {
        ev.target.className = "cell"
        ev.target.parentNode.pass = 1
        score += 1
        $("score").innerHTML = score
        speedup()
    }
}

function speedup() {
    if (score >= 10 && score % 10 ==0) {
        speed += 1
    }
}

function delrow() {
    var con = $("con")
    if (con.childNodes.length == 6) {
        con.removeChild(con.lastChild)
    }
}

function init() {
    speed = 4
    createrow()
    $("main").onclick = function (ev) {
        judge(ev)
    }

    clock = window.setInterval("move()", 30)
}

function move() {
    var con = $("con")
    var top = parseInt(window.getComputedStyle(con, null)["top"])

    if (top < 0) {
        top += speed
    }
    if (top + speed >= 0) {
        createrow()
        top = -100
    }

    con.style.top = top + "px"

    var rows = con.childNodes
    if (rows.length > 4) {
        if (rows.length == 6) {
            con.removeChild(con.lastChild)
        }
        if (rows[4].pass !== 1 && top == -100 + speed) {
            fail()
        } else {
            pass
        }
    }
}

function fail() {
    clearInterval(clock)
    confirm("你的最终得分为 " + parseInt($("score").innerHTML))
    while (con.hasChildNodes()) {
        con.removeChild(con.firstChild)
    }
    score = 0
    $("score").innerHTML = score
}

$("start").onclick = function () {
    init()
}
