var grid = document.querySelector(".grid");
var results = document.querySelector(".results");
var width = 15;
var aliensRemoved = [];
var currentShooterIndex = 202;
var invadersId;
var isGoingRight = true;
var direction = 1;
var points = 0;
for (var i = 0; i < width * width; i++) {
    var square = document.createElement("div");
    if (grid)
        grid.appendChild(square);
}
var squares = Array.from(document.querySelectorAll(".grid div"));
var alienInvaders = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 30, 31,
    32, 33, 34, 35, 36, 37, 38, 39,
];
var draw = function () {
    for (var i = 0; i < alienInvaders.length; i++) {
        if (squares[alienInvaders[i]]) {
            if (!aliensRemoved.includes(i)) {
                squares[alienInvaders[i]].classList.add("invader");
            }
        }
    }
};
squares[currentShooterIndex].classList.add("shooter");
var remove = function () {
    for (var i = 0; i < alienInvaders.length; i++) {
        if (squares[alienInvaders[i]]) {
            squares[alienInvaders[i]].classList.remove("invader");
        }
    }
};
var moveShooter = function (e) {
    squares[currentShooterIndex].classList.remove("shooter");
    switch (e.key) {
        case "ArrowLeft":
            if (currentShooterIndex % width !== 0)
                currentShooterIndex -= 1;
            break;
        case "ArrowRight":
            if (currentShooterIndex % width < width - 1)
                currentShooterIndex += 1;
            break;
    }
    squares[currentShooterIndex].classList.add("shooter");
};
document.addEventListener("keydown", moveShooter);
var moveInvaders = function () {
    var leftEdge = alienInvaders[0] % width === 0;
    var rightEdge = alienInvaders[alienInvaders.length - 1] % width === width - 1;
    remove();
    if (rightEdge && isGoingRight) {
        for (var i = 0; i < alienInvaders.length; i++) {
            alienInvaders[i] += width + 1;
            direction = -1;
            isGoingRight = false;
        }
    }
    if (leftEdge && !isGoingRight) {
        for (var i = 0; i < alienInvaders.length; i++) {
            alienInvaders[i] += width - 1;
            direction = 1;
            isGoingRight = true;
        }
    }
    for (var i = 0; i < alienInvaders.length; i++) {
        alienInvaders[i] += direction;
    }
    draw();
    if (squares[currentShooterIndex].classList.contains("invader")) {
        results.innerText = "Game Over";
        clearInterval(invadersId);
    }
    if (alienInvaders.length === aliensRemoved.length) {
        results.innerText = "You Win";
        clearInterval(invadersId);
    }
};
invadersId = setInterval(moveInvaders, 500);
function shoot(event) {
    var laserId;
    var currentLaserIndex = currentShooterIndex;
    function moveLaser() {
        squares[currentLaserIndex].classList.remove("laser");
        currentLaserIndex -= width;
        squares[currentLaserIndex].classList.add("laser");
        if (currentLaserIndex < width) {
            clearInterval(laserId);
            setTimeout(function () { return squares[currentLaserIndex].classList.remove("laser"); }, 100);
        }
        if (squares[currentLaserIndex].classList.contains("invader")) {
            squares[currentLaserIndex].classList.remove("laser");
            squares[currentLaserIndex].classList.remove("invader");
            squares[currentLaserIndex].classList.add("boom");
            setTimeout(function () { return squares[currentLaserIndex].classList.remove("boom"); }, 250);
            clearInterval(laserId);
            var alienRemoved = alienInvaders.indexOf(currentLaserIndex);
            aliensRemoved.push(alienRemoved);
            points++;
            results.innerText = "Score: ".concat(aliensRemoved.length);
        }
    }
    if (event.key === " ") {
        laserId = setInterval(moveLaser, 100);
    }
}
document.addEventListener("keydown", function (e) {
    if (e.key === " ")
        shoot(e);
});
