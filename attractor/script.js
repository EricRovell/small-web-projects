import App from "./app.js";

const context = document.getElementById("canvas").getContext("2d");
context.canvas.width = window.innerWidth;
context.canvas.height = window.innerHeight;

const app = new App({
  context
});

app.render();

context.canvas.addEventListener("click", () => {
  app.reset()
});
