//global

function $(id) {
    return document.getElementById(id)
}

function addLoadEvent(func) {
    var oldonload = window.onload
    if (typeof window.onload != "function") {
        window.onload = func
    }else {
        window.onload = function() {
            oldonload()
            func()
        }
    }
}

function insertAfter(newElement, targetElement) {
    var parent = targetElement.parentNode
    if (parent.lastChild == targetElement) {
        parent.appendChild(newElement)
    }else {
        parent.insertBefore(newElement, targetElement.nextSibling)
    }
}

function addClass(element, value) {
    if (!element.className) {
        element.className = value
    }else {
        newClassName = element.className
        newClassName += " "
        newClassName += value
        element.className = newClassName
    }
}

function moveElement(elementID, final_x, final_y, interval) {
    var elem = $(elementID)
    if (elem.movement) {
        clearTimeout(elem.movement)
    }
    if (!elem.style.left) {
        elem.style.left = "0px"
    }
    if (!elem.style.top) {
        elem.style.top = "0px"
    }
    var xpos = parseInt(elem.style.left)
    var ypos = parseInt(elem.style.top)
    if (xpos == final_x && ypos == final_y) {
        return true
    }
    if (xpos < final_x) {
        var dist = Math.ceil((final_x - xpos) / 10)
        xpos = xpos + dist
    }
    if (xpos > final_x) {
        var dist = Math.ceil((xpos - final_x) / 10)
        xpos = xpos - dist
    }
    if (ypos < final_y) {
        var dist = Math.ceil((final_y - ypos) / 10)
        ypos = ypos + dist
    }
    if (ypos > final_y) {
        var dist = Math.ceil((ypos - final_y) / 10)
        ypos = ypos - dist
    }
    elem.style.left = xpos + "px"
    elem.style.top = ypos + "px"
    var repeat = "moveElement('"+elementID+"', "+final_x+", "+final_y+", "+interval+")"
    elem.movement = setTimeout(repeat, interval)
}

// nav

function highlightPage (href) {
    var headers = document.getElementsByTagName("header")
    if (headers.length == 0) return false
    var navs = headers[0].getElementsByTagName("nav")
    if (navs.length == 0) return false
    var links = navs[0].getElementsByTagName("a")
    if (links.length == 0) return false
    for (var i = 0; i < links.length; i++) {
        var linkurl = links[i].href
        if (window.location.href.indexOf(linkurl) != -1) {
            links[i].className = "here"
            var linktext = links[i].lastChild.nodeValue.toLowerCase()
            document.body.id = linktext
        }
    }
}

//slideshow

function prepareSlideshow() {
    if (!$("intro")) return false;
    var intro = $("intro")
    var slideshow = document.createElement("div")
    slideshow.id = "slideshow"
    var preview = document.createElement("img")
    preview.id = "preview"
    preview.src = "images/slideshow.gif"
    preview.alt = "a glimpse of what awaits you"
    slideshow.appendChild(preview)
    insertAfter(slideshow, intro)

    var frame = document.createElement("img")
    frame.src = "images/frame.gif"
    frame.alt = ""
    frame.id = "frame"
    slideshow.appendChild(frame)

    var links = document.getElementsByTagName("a")
    for (var i = 0; i < links.length; i++) {
        links[i].onmouseover = function() {
            var destination = this.href
            if (destination.indexOf("index.html") != -1) {
                moveElement("preview", 0, 0, 5)
            }
            if (destination.indexOf("about.html") != -1) {
                moveElement("preview", -150, 0, 5)
            }
            if (destination.indexOf("photos.html") != -1) {
                moveElement("preview", -300, 0, 5)
            }
            if (destination.indexOf("live.html") != -1) {
                moveElement("preview", -450, 0, 5)
            }
            if (destination.indexOf("contact.html") != -1) {
                moveElement("preview", -600, 0, 5)
            }
        }
    }
}

//about

function showSection(id) {
    var sections = document.getElementsByTagName("section")
    for (var i = 0; i < sections.length; i++) {
        if (sections[i].id != id) {
            sections[i].style.display = "none"
        }else {
            sections[i].style.display = "block"
        }
    }
}

function prepareInternalnav() {
    var articles = document.getElementsByTagName("article")
    if (articles.length == 0) return false
    var navs = articles[0].getElementsByTagName("nav")
    if (navs.length == 0) return false
    var links = navs[0].getElementsByTagName("a")
    for (var i = 0; i < links.length; i++) {
        var sectionId = links[i].href.split("#")[1]
        $(sectionId).style.display = "none"
        links[i].destination = sectionId
        links[i].onclick = function() {
            showSection(this.destination)
            return false
        }
    }
}

//photos

function preparePlaceholder() {
    var placeholder = document.createElement("img")
    placeholder.src = "images/placeholder.gif"
    placeholder.id = "placeholder"
    placeholder.alt = "my images gallery"
    var description = document.createElement("p")
    description.id = "description"
    var desctext = document.createTextNode("Choose an image")
    description.appendChild(desctext)
    if (!$("imagegallery")) return false
    var gallery = $("imagegallery")
    insertAfter(description, gallery)
    insertAfter(placeholder, description)
}

function showPic(whichpic) {
    var source = whichpic.href
    if (!$("placeholder")) return false
    var placeholder = $("placeholder")
    placeholder.src = source
    var text = whichpic.title ? whichpic.title : ""
    if (!$("description")) return false
    var description = $("description")
    if (description.firstChild.nodeType == 3) {
        description.firstChild.nodeValue = text
    }
    return false
}

function prepareGallery() {
    if (!$("imagegallery")) return false
    var gallery = $("imagegallery")
    var links = gallery.getElementsByTagName("a")
    for (var i = 0; i < links.length; i++) {
        links[i].onclick = function() {
            return showPic(this)
        }
    }
}

//live

function stripeTables() {
    var tables = document.getElementsByTagName("table")
    for (var i = 0; i < tables.length; i++) {
        var odd = false
        var rows = tables[i].getElementsByTagName("tr")
        for (var i = 0; i < rows.length; i++) {
            if (odd == true) {
                addClass(rows[i], "odd")
                odd = false
            }else {
                odd = true
            }
        }
    }
}

function highlightRows() {
    var rows = document.getElementsByTagName("tr")
    for (var i = 0; i < rows.length; i++) {
        rows[i].oldClassName = rows[i].className
        rows[i].onmouseover = function() {
            addClass(this,"highlight")
        }
        rows[i].onmouseout = function() {
            this.className = this.oldClassName
        }
    }
}

function displayAbbreviations() {
    var abbreviations = document.getElementsByTagName("abbr")
    if (abbreviations.length < 1) return false
    var defs = new Array()
    for (var i = 0; i < abbreviations.length; i++) {
        var current_abbr = abbreviations[i]
        if (current_abbr.childNodes.length < 1) continue
        var definition = current_abbr.title
        var key = current_abbr.lastChild.nodeValue
        defs[key] = definition
    }
    var dlist = document.createElement("dl")
    for (key in defs) {
        var definition = defs[key]
        var dtitle = document.createElement("dt")
        var dtitle_text = document.createTextNode(key)
        dtitle.appendChild(dtitle_text)
        var ddesc = document.createElement("dd")
        var ddesc_text = document.createTextNode(definition)
        ddesc.appendChild(ddesc_text)
        dlist.appendChild(dtitle)
        dlist.appendChild(ddesc)
    }
    if (dlist.childNodes.length < 1) return false
    var header = document.createElement("h3")
    var header_text = document.createTextNode("Abbreviations")
    header.appendChild(header_text)
    var articles = document.getElementsByTagName("article")
    if (articles.length == 0 ) return false
    var container = articles[0]
    container.appendChild(header)
    container.appendChild(dlist)
}

//contact

function focusLabels() {
    var labels = document.getElementsByTagName("label")
    for (var i = 0; i < labels.length; i++) {
        if (!labels[i].for) continue
        labels[i].onclick = function() {
            var id = this.for
            if (!$(id)) return false
            var element = $(id)
            element.focus()
        }
    }
}

function resetFields(whichform) {
    if (modernizr.input.placeholder) return;
    for (var i = 0; i < whichform.elements.length; i++) {
        var element = whichform.elements[i]
        if (element.type == "submint") continue
        var check = element.placeholder || element.getAttribute("placeholder")
        if (!check) continue
        element.onfocus = function() {
            var text = this.placeholder || this.getAttribute("placeholder")
            if (this.value == text) {
                this.className = ""
                this.value = ""
            }
        }
        element.onblur = function() {
            if (this.value == "") {
                this.className = "placeholder"
                this.value = this.placeholder || this.getAttribute("placeholder")
            }
        }
        element.onblur()
    }
}

function prepareForms() {
    for (var i = 0; i < document.forms.length; i++) {
        var thisform = document.forms[i]
        resetFields(thisform)
        thisform.onsubmit = function() {
            if (!validateForm(this)) return false
            var article = document.getElementsByTagName("article")[0]
            if (submitFormWithAjax(this, article)) return false
            return true
        }
    }
}

function validateForm(whichform) {
    for (var i = 0; i < whichform.elements.length; i++) {
        var element = whichform.elements[i]
        if (element.required == "required") {
            if (!isFilled(element)) {
                alert("Please fill in the " + element.name + " field.")
                return false
            }
        }
        if (element.type == "email") {
            if (!isEmail(element)) {
                alert("The " + element.name + " field must be a valid email address.")
                return false
            }
        }
    }
    return true
}

function isFilled(field) {
    return (field.value.length > 1 && field.value != field.placeholder)
}

function isEmail(field) {
    return (field.value.indexOf("@") != -1 && field.value.indexOf(".") != -1)
}

//Ajax

function getHTTPObject() {
    if (typeof XMLHttpRequest == "undefined")
        XMLHttpRequest = function() {
            try {
                return new ActiveXObject("Msxml2.XMLHTTP.6.0")
            } catch (e) {}
            try {
                return new ActiveXObject("Msxml2.XMLHTTP.3.0")
            } catch (e) {}
            try {
                return new ActiveXObject("Msxml2.XMLHTTP")
            } catch (e) {}
            return false
        }
    return new XMLHttpRequest()
}

function displayAjaxLoading(element) {
    while(element.hasChildNodes()) {
        element.removeChild(element.lastChild)
    }
    var content = document.createElement("img")
    content.src = "images/loading.gif"
    content.alt = "Loading..."
    element.appendChild(content)
}

function submitFormWithAjax(whichform, thetarget) {
    var request = getHTTPObject()
    if (!request) {
        return false
    }
    displayAjaxLoading(thetarget)

    var dataParts = []
    var element
    for (var i = 0; i < whichform.elements.length; i++) {
        element = whichform.elements[i]
        dataParts[i] = element.name + "=" + encodeURIComponent(element.value)
    }
    var data = dataParts.join("&")

    request.open("POST", whichform.getAttribute("action"), true)
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
    request.onreadystatechange = function() {
        if (request.readyState == 4) {
            if (request.status == 200 || request.status == 0) {
                var matches = request.responseText.match(/<article>([\s\S]+)<\/article>/)
                if (matches.length > 0) {
                    thetarget.innerHTML = matches[1]
                } else {
                    thetarget.innerHTML = "<p>Oops, there was an error. Sorry.</p>"
                }
            } else {
                thetarget.innerHTML = "<p>" + request.statusText + "</p>"
            }
        }
    }
    request.send(data)
    return true
}


addLoadEvent(highlightPage)
addLoadEvent(prepareSlideshow)
addLoadEvent(prepareInternalnav)
addLoadEvent(preparePlaceholder)
addLoadEvent(prepareGallery)
addLoadEvent(stripeTables)
addLoadEvent(highlightRows)
addLoadEvent(displayAbbreviations)
addLoadEvent(focusLabels)
addLoadEvent(prepareForms)
