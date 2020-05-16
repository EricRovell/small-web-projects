/*
  Inspired by work of Johan Karlsson
  https://twitter.com/DonKarlssonSan
*/

import App from "./app.js";

// settings up screen and context
const context = document.getElementById("canvas").getContext("2d");
let width = (context.canvas.width = window.innerWidth);
let height = (context.canvas.height = window.innerHeight);

const app = new App({
  context,
  colors: [
    [ "#9EBC9E", "#FFCFD2", "#FFAFC5", "#553E4E", "#E0479E" ],
    [ "#001514", "#C2D076", "#FFE1EA", "#FFA0FD", "#E952DE" ]
  ],
  width,
  height
});

app.render();

// setup
window.addEventListener("resize", () => {
  app.resize();
  app.render();
});

context.canvas.addEventListener("click", () => app.render());
