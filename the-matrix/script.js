const params = {
  size: 10,
  bgColor: "rgba(0, 0, 0, 0.05)",
  textColor: "#0F0",
  interval: 70,
  minHeight: 50,
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

function randomFromRanges() {
  let total = 0;
  for (const [ a, b ] of arguments) {
    // adding the ranges' size
    total += b - a + 1;
  }
  
  let randIntInclusive = Math.floor(Math.random() * total);
  
  for (const [ a, b ] of arguments) {
    if (randIntInclusive < b - a + 1) {
      return a + randIntInclusive;
    } else {
      randIntInclusive -= b - a + 1;
    }
  }
}

const randUnicodeChar = (ranges) => (
  String.fromCharCode(
    //Math.floor(Math.random() * (max - min + 1)) + min
    randomFromRanges(...ranges)
  )
);

function render({ chars, size, bgColor, textColor, minHeight }) {
  context.fillStyle = bgColor;
  context.fillRect(0, 0, width, height);
  context.fillStyle = textColor;
  columns.map((value, index) => {
    // value -> y-coordinate
    context.fillText(randUnicodeChar(chars), index * size, value);
    columns[index] =
      value >= height ||
        value > minHeight + 10000 * Math.random()
          ? 0
          : value + size;
  });
}

setInterval(render, params.interval, params);
