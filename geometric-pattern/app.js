export default class App {

  constructor({ context, colors = [], width, height }) {
    this.context = context;

    this.colors = [
      [ "#000", "#fff" ],
      [ "#ffb5a7", "#fcd5ce", "#f8edeb", "#f9dcc4", "#fec89a" ],
      [ "#03045e", "#0077b6", "#00b4d8", "#90e0ef", "#caf0f8" ],
      [ "#07beb8", "#3dccc7", "#68d8d6", "#9ceaef", "#c4fff9" ],
      [ "#ffaf87", "#ff8e72", "#ed6a5e", "#4ce0b3", "#377771" ],
      [ "#cebebe", "#ece2d0", "#d5b9b2", "#a26769", "#6d2e46" ],
      ...colors
    ];
  
    this.width = width || window.innerWidth;
    this.height = height || window.innerHeight;
    this.paletteIndex = 0;
  }

  render() {
    this.context.fillStyle = "black";
    this.context.fillRect(0, 0, this.width, this.height);
    this.paletteIndex = this.randInt(this.colors.length);
  
    this.renderSquares();
  }

  resize() {
    this.width = (this.context.canvas.width = window.innerWidth);
    this.height = (this.context.canvas.height = window.innerHeight);
  }

  randInt(int) {
    return Math.floor(Math.random() * int);
  }

  get twoRandomUniqueColors() {
    const palettes = this.colors[this.paletteIndex].length;

    const color1 = this.randInt(palettes);
    let color2 = this.randInt(palettes);
    while (color1 === color2) {
      color2 = this.randInt(palettes);
    }

    return [
      this.colors[this.paletteIndex][color1],
      this.colors[this.paletteIndex][color2]
    ];
  }

  renderSquares() {
    let size = Math.round(Math.random() * 40 + 20);
    for (let x = 0; x < this.width + size; x += size) {
      for (let y = 0; y < this.height + size; y += size) {
        this.renderSquare(x, y, size);
      }
    }
  
    let bigShapes = Math.round(Math.random() * 5) + 2;
    for (let i = 0; i < bigShapes; i++) {
      let x = Math.round(Math.random() * this.width / size) * size;
      let y = Math.round(Math.random() * this.height / size) * size;
      this.renderSquare(x, y, size * 2);
    }
  }

  renderSquare(x, y, size) {
    const context = this.context;
    let [ color1, color2 ] = this.twoRandomUniqueColors;
  
    context.save();
    context.beginPath();
      context.moveTo(x, y);
      context.lineTo(x, y + size);
      context.lineTo(x + size, y + size);
      context.lineTo(x + size, y);
    context.closePath();
    context.fillStyle = color1;
    context.fill();
    context.clip();
  
    context.translate(x + size / 2, y + size / 2);
    context.rotate(
      Math.floor(Math.random() * 4) * Math.PI / 2
    );
  
    context.beginPath()
    context.fillStyle = color2;
    this.renderRandomShape(size);
    this.renderSpots(size);
    context.restore();
  }

  renderSpots(size) {
    this.context.save();
    this.context.fillStyle = "rgb(0 0 0 / 0.07)";
  
    //let spots = 0.5 * size ** 2;
    for (let i = 0, spots = 0.5 * size ** 2; i < spots; i++) {
      let x = Math.random() * size - size / 2;
      let y = Math.random() * size - size / 2;
      this.context.fillRect(x, y, 1, 1);
    }
  
    this.context.restore();
  }

  renderRandomShape(size) {
    const context = this.context;
    const shape = Math.floor(Math.random() * 6);

    switch(shape) {
      case 0:
        context.arc(size / 2, size / 2, size, 0, Math.PI * 2);
        context.fill();
        break;
      case 1:
        context.moveTo(-size / 2, -size / 2);
        context.lineTo(-size / 2, size / 2);
        context.lineTo(size / 2, -size / 2);
        context.closePath();
        context.fill();
      case 2:
        context.fillRect(-size / 2, -size / 2, size / 2, size / 2);
        break;
      case 3:
        context.arc(size / 2, 0, size / 2, 0, Math.PI * 2);
        context.fill();
        break;
      case 4:
        context.moveTo(-size / 2, size / 2);
        context.lineTo(size / 2, size / 2);
        context.lineTo(0, -size / 2);
        context.closePath();
        context.fill();
        break;
      case 5:
        context.moveTo(-size / 2, size / 2);
        context.lineTo(size / 2, size / 2);
        context.lineTo(0, 0);
        context.closePath();
        context.fill();
        break;
    }
  }

}
