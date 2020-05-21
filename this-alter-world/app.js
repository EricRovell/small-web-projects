class Noise {
  // http://mrl.nyu.edu/~perlin/noise/
  constructor(octaves = 1) {
    this.p = new Uint8Array(512);
    this.octaves = octaves;

    this.init();
  }

  init() {
    for (let i = 0; i < 512; ++i) {
      this.p[i] = Math.random() * 256;
    }
  }

  lerp(t, a, b) {
    return a + t * (b - a);
  }

  grad2d(i, x, y) {
    const v = (i & 1) === 0 ? x : y;
		return (i & 2) === 0 ? -v : v;
  }

  noise2d(x2d, y2d) {
    const X = Math.floor(x2d) & 255;
    const Y = Math.floor(y2d) & 255;
    const x = x2d - Math.floor(x2d);
    const y = y2d - Math.floor(y2d);
    const fx = (3 - 2 * x) * x ** 2;
    const fy = (3 - 2 * y) * y ** 2;
    const p0 = this.p[X] + Y;
    const p1 = this.p[X + 1] + Y;

    return this.lerp(
      fy,
      this.lerp(
        fx,
        this.grad2d(this.p[p0], x, y),
        this.grad2d(this.p[p1], x - 1, y)
      ),
      this.lerp(
        fx,
        this.grad2d(this.p[p0 + 1], x, y - 1),
        this.grad2d(this.p[p1 + 1], x - 1, y - 1)
      )
    );
  }

  noise(x, y) {
    let [ e, k, s ] = [ 1, 1, 0 ];
    for (let i = 0; i < this.octaves; ++i) {
      e *= 0.5;
      s += e * (1 + this.noise2d(k * x, k * y)) / 2;
      k *= 2;
    }
    return s;
  }
}

export default class App {
  constructor({ context }) {
    this.context = context;
    this.width = context.canvas.width;
    this.height = context.canvas.height;

    this.perlin = new Noise(3);
    this.zoom = 10 / Math.sqrt(this.width ** 2 + this.height ** 2);

    this.init();
  }

  requestAnimationFrame () {
    return new Promise(resolve => requestAnimationFrame(resolve));
  }

  init() {
    this.context.fillStyle = "#000";
    this.context.fillRect(0, 0, this.width, this.height);
    this.context.lineWidth = 1;
    this.context.globalAlpha = 0.05;
  }

  async render() {
    for (let px = 0; px < this.width; px++) {
      for (let py = 0; py < this.height / 6; py++) {
        let [ x, y ] = [ px, Math.random() * this.height ];
        this.context.beginPath();
        this.context.moveTo(x, y);
        const n = this.perlin.noise(x * this.zoom, y * this.zoom);
        this.context.strokeStyle = `hsl(${-210 + n * 600} 100% ${900 * n ** 3}%)`;
        for (let m = 0; m < 600 && y >= 0 && y <= this.height; m++) {
          const n = this.perlin.noise(x * this.zoom, y * this.zoom);
          x += Math.cos(n * 14);
          y += Math.sin(n * 14);
          this.context.lineTo(x, y);
        }
        this.context.stroke();
      }
      await this.requestAnimationFrame();
    }
  }

}