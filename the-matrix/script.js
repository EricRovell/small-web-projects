const params = {
  size: 10,
  bgColor: "rgba(0, 0, 0, 0.05)",
  textColor: "#0F0",
  interval: 33,
  minHeight: 50,
  chars: "0123456789ABCDEF".split("")
};

const context = document.getElementById("canvas").getContext("2d");
const width = (context.canvas.width = window.screen.width);
const height = (context.canvas.height = window.screen.height);

const columns = new Array(Math.floor(width / params.size) + 1).fill(0);
const randomItem = items => items[ Math.floor(Math.random() * items.length) ];

function render({ chars, size, bgColor, textColor, minHeight }) {
  context.fillStyle = bgColor;
  context.fillRect(0, 0, width, height);
  context.fillStyle = textColor;
  columns.map((value, index) => {
    // value -> y-coordinate
    context.fillText(randomItem(chars), index * size, value);
    columns[index] =
      value >= height ||
        value > minHeight + 10000 * Math.random()
          ? 0
          : value + size;
  });
}

setInterval(render, params.interval, params);
