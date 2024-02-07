const grid = document.querySelector(".grid") as HTMLElement | null;
const results = document.querySelector(".results") as HTMLHeadingElement | null;
const width = 15;
const aliensRemoved: number[] = [];

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

((): void => {
  for (let i = 0; i < alienInvaders.length; i++) {
    if (squares[alienInvaders[i]]) {
      squares[alienInvaders[i]].classList.add("invader");
    }
  }
})();
