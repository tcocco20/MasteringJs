var grid = document.querySelector(".grid");
var results = document.querySelector(".results");
var width = 15;
var aliensRemoved = [];
var currentShooterIndex = 202;
var invadersId;
var isGoingRight = true;
var direction = 1;
for (var i = 0; i < width * width; i++) {
    var square = document.createElement("div");
    square.id = i.toString();
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
};
invadersId = setInterval(moveInvaders, 500);
