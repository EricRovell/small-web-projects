const params = {
  size: 10,
  bgColor: "rgba(0, 0, 0, 0.05)",
  textColor: "#0F0",
  interval: 70,
  charsHeight: [ 50, 10000 ],
  chars: [
    [ 48, 57 ],     // digits
    [ 65, 90 ],     // capital letters
    [ 8704, 8959 ]  // math symbols
  ]
};

// settings up screen and context
const context = document.getElementById("canvas").getContext("2d");
const width = (context.canvas.width = window.screen.width);
const height = (context.canvas.height = window.screen.height);

// screen's width is broken up to columns according to the size
const columns = new Array(Math.floor(width / params.size) + 1).fill(0);

function randomUnicodeChar() {
  // calc the merged range magnitude
  const total = Array.from(arguments)
    .reduce((acc, [ min, max ]) => acc + max - min + 1, 0);
  // generate random int in [ 0, total ]
  let randIntInclusive = Math.floor(Math.random() * total);
  // find the range this random int is located
  for (const [ min, max ] of arguments) {
    if (randIntInclusive < max - min + 1) {
      return String.fromCharCode(min + randIntInclusive)
    }
    randIntInclusive -= max - min + 1;
  }
}

function render({ chars, size, bgColor, textColor, charsHeight }) {
  context.fillStyle = bgColor;
  context.fillRect(0, 0, width, height);
  context.fillStyle = textColor;
  columns.forEach((value, index) => {
    // (x, y) as (index * size, value)
    context.fillText(randomUnicodeChar(...chars), index * size, value);
    columns[index] = (value >= height || value > charsHeight[0] + charsHeight[1] * Math.random())
      ? 0
      : value + size;
  });
}

setInterval(render, params.interval, params);
