import App from "./app.js";

// settings up screen and context
const context = document.getElementById("canvas").getContext("2d");
let width = (context.canvas.width = window.innerWidth);
let height = (context.canvas.height = window.innerHeight);

const app = new App({
  context,
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
