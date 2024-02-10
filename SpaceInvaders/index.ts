const grid = document.querySelector(".grid") as HTMLElement | null;
const results = document.querySelector(".results") as HTMLHeadingElement | null;
const width = 15;
const aliensRemoved: number[] = [];
let currentShooterIndex: number = 202;
let invadersId: number;
let isGoingRight: boolean = true;
let direction: number = 1;
let points: number = 0;

for (let i = 0; i < width * width; i++) {
  const square = document.createElement("div");
  if (grid) grid.appendChild(square);
}

const squares: HTMLDivElement[] = Array.from(
  document.querySelectorAll(".grid div")
);

const alienInvaders: number[] = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 30, 31,
  32, 33, 34, 35, 36, 37, 38, 39,
];

const draw = (): void => {
  for (let i = 0; i < alienInvaders.length; i++) {
    if (squares[alienInvaders[i]]) {
      if (!aliensRemoved.includes(i)) {
        squares[alienInvaders[i]].classList.add("invader");
      }
    }
  }
};

squares[currentShooterIndex].classList.add("shooter");

const remove = (): void => {
  for (let i = 0; i < alienInvaders.length; i++) {
    if (squares[alienInvaders[i]]) {
      squares[alienInvaders[i]].classList.remove("invader");
    }
  }
};

const moveShooter = (e: KeyboardEvent): void => {
  squares[currentShooterIndex].classList.remove("shooter");
  switch (e.key) {
    case "ArrowLeft":
      if (currentShooterIndex % width !== 0) currentShooterIndex -= 1;
      break;
    case "ArrowRight":
      if (currentShooterIndex % width < width - 1) currentShooterIndex += 1;
      break;
  }
  squares[currentShooterIndex].classList.add("shooter");
};

document.addEventListener("keydown", moveShooter);

const moveInvaders = (): void => {
  const leftEdge: boolean = alienInvaders[0] % width === 0;
  const rightEdge: boolean =
    alienInvaders[alienInvaders.length - 1] % width === width - 1;
  remove();
  if (rightEdge && isGoingRight) {
    for (let i = 0; i < alienInvaders.length; i++) {
      alienInvaders[i] += width + 1;
      direction = -1;
      isGoingRight = false;
    }
  }

  if (leftEdge && !isGoingRight) {
    for (let i = 0; i < alienInvaders.length; i++) {
      alienInvaders[i] += width - 1;
      direction = 1;
      isGoingRight = true;
    }
  }

  for (let i = 0; i < alienInvaders.length; i++) {
    alienInvaders[i] += direction;
  }

  draw();

  if (squares[currentShooterIndex].classList.contains("invader")) {
    results!.innerText = "Game Over";
    clearInterval(invadersId);
  }

  if (alienInvaders.length === aliensRemoved.length) {
    results!.innerText = "You Win";
    clearInterval(invadersId);
  }
};

invadersId = setInterval(moveInvaders, 500);

function shoot(event: KeyboardEvent): void {
  let laserId: number;
  let currentLaserIndex: number = currentShooterIndex;

  function moveLaser(): void {
    squares[currentLaserIndex].classList.remove("laser");
    currentLaserIndex -= width;
    squares[currentLaserIndex].classList.add("laser");
    if (currentLaserIndex < width) {
      clearInterval(laserId);
      setTimeout(
        () => squares[currentLaserIndex].classList.remove("laser"),
        100
      );
    }
    if (squares[currentLaserIndex].classList.contains("invader")) {
      squares[currentLaserIndex].classList.remove("laser");
      squares[currentLaserIndex].classList.remove("invader");
      squares[currentLaserIndex].classList.add("boom");

      setTimeout(
        () => squares[currentLaserIndex].classList.remove("boom"),
        250
      );
      clearInterval(laserId);

      const alienRemoved: number = alienInvaders.indexOf(currentLaserIndex);
      aliensRemoved.push(alienRemoved);
      points++;
      results!.innerText = `Score: ${aliensRemoved.length}`;
    }
  }

  if (event.key === " ") {
    laserId = setInterval(moveLaser, 100);
  }
}

document.addEventListener("keydown", (e) => {
  if (e.key === " ") shoot(e);
});
