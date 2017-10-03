window.onload = function() {
    var div = document.getElementsByTagName('div')
    var input = document.getElementsByTagName('input')
    var bS1 = bS2 = true
    var tmp = []

    function getArry(str) {
        tmp.length = 0
        str = str.split(",")
        for (var i in str) tmp.push(str[i])
        return tmp
      }

    //删除/添加第一项
    input[0].onclick = function() {
        tmp = getArry(div[0].innerHTML)
        bS1 ?
        //删除第一项 , 用 shift() 方法
        (tmp.shift(), this.value = this.value.replace("删除", "添加"), bS1 = false) :
        //添加第一项 ， 用unshift() 方法
        (tmp.unshift("January(1)"), this.value = this.value.replace("添加", "删除"), bS1 = true)
        //输出
        div[0].innerHTML = tmp.join()
      }

    //删除/添加最后一项
    input[1].onclick = function() {
        tmp = getArry(div[0].innerHTML)
        bS2 ?
        (tmp.pop(), this.value = this.value.replace("删除", "添加"), bS2 = false) :
        (tmp.push("December(12)"), this.value = this.value.replace("添加", "删除"), bS2 = true)
        div[0].innerHTML = tmp.join()
    }

    //复制
    input[2].onclick = function() {
        tmp = getArry(div[1].innerHTML)
        div[1].innerHTML = tmp.concat(tmp).toString().replace(/\s/g, "")
    }
    //还原
    input[3].onclick = function() {
        tmp = getArry(div[1].innerHTML)
        tmp.length = 10
        div[1].innerHTML = tmp.join()
    }


    //第三个div的还原
    input[4].onclick = function() {
        tmp = ["red", "green","blue","white","yellow","black","brown"]
        div[2].innerHTML = tmp.join()
    }
    //删除前三项
    input[5].onclick = function() {
        tmp = getArry(div[2].innerHTML)
        tmp.splice(0, 3)
        div[2].innerHTML = tmp.join()
    }
    //删除第二至三项
    input[6].onclick = function() {
        tmp = getArry(div[2].innerHTML)
        tmp.splice(1,2)
        div[2].innerHTML = tmp.join()
    }

    //在第二项后插入(orange, purple)
    input[7].onclick = function() {
        tmp = getArry(div[2].innerHTML)
        tmp.splice(2,0, "orange","purple")
        div[2].innerHTML = tmp.join()
    }

    //替换第二项和第三项
    input[8].onclick = function() {
        tmp = getArry(div[2].innerHTML)
        tmp.splice(1,2,"orange", "purple")
        div[2].innerHTML = tmp.join()
    }
}
