var get = {
  byId : function(id) {
    return document.getElementById(id)
  },
  byClass : function(sClass, oParent) {
    var aClass = []
    var reClass = new RegExp("(^|)" + sClass + "( |$)")
    var aElem = this.byTagName("*", oParent)
    for (var i = 0; i < aElem.length; i++) {
      reClass.test(aElem[i].className) && aClass.push(aElem[i])
    }
    return aClass
  },
  byTagName: function(elem, obj) {
    return (obj || document).getElementsByTagName(elem)
  },
}

window.onload = function() {
  var oNav = get.byId("nav")
  var lis = get.byTagName("li", oNav)
  var asubnav = get.byClass("subnav", oNav)
  var osubnav = oEm = timer = null
  var i = 0

  for (i = 0; i < lis.length; i++) {
    lis[i].onmouseover = function() {
      //隐藏所有子菜单
      for ( i = 0; i < asubnav.length; i++) {
        asubnav[i].style.display = "none"
      }
      //获取该项下的子菜单
      osubnav = get.byClass("subnav",this)[0]
      //获取该项下的指示箭头
      oEm = get.byTagName("em", this)[0]
      //显示该项下的子菜单
      osubnav.style.display = "block"
      //判断显示区域
      nav.offsetWidth - this.offsetLeft > osubnav.offsetWidth ?
      //如果在显示范围居左显示
      osubnav.style.left = this.offsetLeft + "px" :
      //超出显示范围居右显示
      osubnav.style.right = 0
      //计算指示箭头显示位置
      oEm.style.left = this.offsetLeft - osubnav.offsetLeft + 50 + "px"
      clearTimeout(timer)
      //阻止事件冒泡
      osubnav.onmouseover = function(event) {
        (event || window.event).cancelBubble = true
        clearTimeout(timer)
      }
    }
    lis[i].onmouseout = function() {
      timer = setTimeout( function() {
        osubnav.style.display = "none"
      }, 300)
    }
  }
}
