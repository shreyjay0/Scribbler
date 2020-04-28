var scribbler = document.getElementById('scribbler')
var env = scribbler.getContext('2d')
var line = 5

set_auto(scribbler)

userInput(scribbler)

var enableEraser = false
eraser.onclick = function () {
    enableEraser = true
    eraser.classList.add('active')
    pen.classList.remove('active')
}
pen.onclick = function () {
    enableEraser = false
    pen.classList.add('active')
    eraser.classList.remove('active')
}
clear.onclick = function () {
    env.clearRect(0, 0, scribbler.width, scribbler.height)
}

download.onclick = function () {
    var compositeOperation = env.globalCompositeOperation
    env.globalCompositeOperation = "destination-over"
    env.fillStyle = '#fff'
    env.fillRect(0, 0, scribbler.width, scribbler.height)
    var imageData = scribbler.toDataURL("image/png");
    env.putImageData(env.getImageData(0, 0, scribbler.width, scribbler.height), 0, 0)
    env.globalCompositeOperation = compositeOperation
    var a = document.createElement('a')
    document.body.appendChild(a)
    a.href = imageData
    a.download = "mypaint"
    a.target = '_blank'
    a.click()
}

black.onclick = function () {
    env.fillStyle = 'black'
    env.strokeStyle = 'black'
    black.classList.add('active')
    red.classList.remove('active')
    green.classList.remove('active')
    blue.classList.remove('active')
}
red.onclick = function () {
    env.fillStyle = 'red'
    env.strokeStyle = 'red'
    red.classList.add('active')
    green.classList.remove('active')
    blue.classList.remove('active')
    black.classList.remove('active')
}
green.onclick = function () {
    env.fillStyle = 'green'
    env.strokeStyle = 'green'
    green.classList.add('active')
    red.classList.remove('active')
    blue.classList.remove('active')
    black.classList.remove('active')
}
blue.onclick = function () {
    env.fillStyle = 'blue'
    env.strokeStyle = 'blue'
    blue.classList.add('active')
    green.classList.remove('active')
    red.classList.remove('active')
    black.classList.remove('active')
}

thin.onclick = function () {
    line = 5
    thin.classList.add('active')
    thick.classList.remove('active')
}
thick.onclick = function () {
    line = 10
    thick.classList.add('active')
    thin.classList.remove('active')
}

function drawLine(x1, y1, x2, y2) {
    env.beginPath();
    env.moveTo(x1, y1)
    env.line = line;
    env.lineTo(x2, y2)
    env.stroke();
    env.closePath();
}

function drawCircle(x, y, radius) {
    env.beginPath();
    env.arc(x, y, radius, 0, Math.PI * 2);
    env.fill();
}

function set_auto(scribbler) {
    scribblerSize()
    window.onresize = function () {
        scribblerSize()
    }

    function scribblerSize() {
        var pageWidth = document.documentElement.clientWidth
        var pageHeight = document.documentElement.clientHeight
        scribbler.width = pageWidth
        scribbler.height = pageHeight
    }
}

function userInput(scribbler) {

    var using = false;
    var lastPoint = {
        x: undefined,
        y: undefined
    }
    if (document.body.ontouchstart === undefined) {
        scribbler.onmousedown = function (a) {
            var x = a.clientX
            var y = a.clientY
            using = true
            if (enableEraser) {
                env.clearRect(x - 5, y - 5, 10, 10)
            } else {
                lastPoint = {
                    x: x,
                    y: y
                }
            }
        }
        scribbler.onmousemove = function (a) {
            var x = a.clientX
            var y = a.clientY
            if (!using) {
                return
            }
            if (enableEraser) {
                env.clearRect(x - 5, y - 5, 10, 10)
            } else {
                var newPoint = {
                    x: x,
                    y: y
                }
                drawCircle(x, y, line / 2)
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                lastPoint = newPoint
            }
        }
        scribbler.onmouseup = function () {
            using = false
        }
    } else {
        scribbler.ontouchstart = function (a) {
            var x = a.touches[0].clientX
            var y = a.touches[0].clientY
            using = true
            if (enableEraser) {
                env.clearRect(x - 5, y - 5, 10, 10)
            } else {
                lastPoint = {
                    x: x,
                    y: y
                }
            }
        }
        scribbler.ontouchmove = function (a) {
            var x = a.touches[0].clientX
            var y = a.touches[0].clientY
            if (!using) {
                return
            }
            if (enableEraser) {
                env.clearRect(x - 5, y - 5, 10, 10)
            } else {
                var newPoint = {
                    x: x,
                    y: y
                }
                drawCircle(x, y, line / 2)
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                lastPoint = newPoint
            }
        }
        scribbler.ontouchend = function () {
            using = false
        }
    }
}