export default class App {

  constructor({ context, width, height, baseHueOffset, sizeRange, alpha }) {
    this.context = context;
    this.width = width || window.innerWidth;
    this.height = height || window.innerHeight;
    this.sizeRange = sizeRange || [ 5, 25 ];
    this.baseHueOffset = baseHueOffset || Math.random() * 360;
    this.hueOffsetRange = [ 0, 50 ]
    this.rotateRange = [ -0.5, 0.1 ] // offset value and scale factor
    this.alpha = alpha || 0.7;
  }

  render() {
    this.context.fillStyle = "white";
    this.context.fillRect(0, 0, this.width, this.height);
    this.renderRects();
  }

  resize() {
    this.context.canvas.width = (this.width = window.innerWidth);
    this.context.canvas.height = (this.height = window.innerHeight);
  }

  get getRandomSize() {
    return Math.random() * this.sizeRange[0] + this.sizeRange[1]
  }

  get randomHueOffset() {
    return Math.random() * this.hueOffsetRange[0] + this.hueOffsetRange[1];
  }

  renderRects() {
    const size = this.getRandomSize;
    const hueMode = Math.floor(Math.random() * 4);

    for (let x = 0; x < this.width + size; x += size) {
      for (let y = 0; y < this.height + size; y += size) {
        this.renderRect(x, y, size, hueMode);
      }
    }
  }

  renderRect(x, y, size, hueMode) {
    const context = this.context;
    context.save();
    context.translate(x, y);
    context.rotate((Math.random() + this.rotateRange[0]) * this.rotateRange[1]);
    
    const p = () => ({
      0: (x + y) / 8,
      1: y / 6,
      2: x / 6,
      3: (x - y) / 8
    })[hueMode];

    let hue = p() + this.randomHueOffset + this.baseHueOffset;
    let lightness = Math.random() * 20 + 40;

    context.fillStyle = `hsl(${hue} 80% ${lightness}% / ${this.alpha})`;

    let widthMutation = Math.random() + 1;
    let heightMutation = Math.random() * 3 + 1;
    let width = size * widthMutation;
    let height = size * heightMutation;

    context.beginPath();
    context.rect(-width / 2, -height / 2, width, height);
    context.fill();
    context.restore();
  }

}