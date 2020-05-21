import App from "./app.js";

const context = document.getElementById("canvas").getContext("2d");

let isMobile = window.matchMedia("only screen and (max-width: 760px)").matches;

const pixelRatio = (isMobile) ? window.devicePixelRatio : 1;

context.canvas.width = window.innerWidth * pixelRatio;
context.canvas.height = window.innerHeight * pixelRatio;

const app = new App({
  isMobile,
  context
});

app.render();

/* context.canvas.addEventListener("click", () => {
  app.reset()
}); */
