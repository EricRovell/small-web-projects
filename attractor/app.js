export default class App {
  constructor({ context, isMobile }) {
    this.context = context;
    this.width = context.canvas.width;
    this.height = context.canvas.height;
    this.isMobile = isMobile;

    this.whirlpoolsAmount = 5;
    this.particlesAmount = 1000;
    this.particleLifetime = 1000;

    this.whirlpools = [];
    this.particles = [];
    this.hueShift = App.randInt(360);

    this.init();
  }

  render() {
    this.move();
    requestAnimationFrame(() => this.render());
  }

  reset() {
    this.context.clearRect(0, 0, this.width, this.height);
    this.particles.length = 0;
    this.whirlpools.length = 0;
    this.init();
    this.render();
  }

  init() {
    this.context.lineWidth = (this.isMobile) ? 1 : 1.5;
    this.context.imageSmoothingEnabled = false;
    this.hueShift = App.randInt(360);

    // create whirlpools
    for (let k = 0; k < this.whirlpoolsAmount; ++k) {
      this.whirlpools.push(
        new Whirlpool(this.width, this.height)
      );
    }
    // create particles
    for (let k = 0; k < this.particlesAmount; ++k) {
      this.particles.push(
        new Particle(this.particleLifetime, this.width, this.height)
      );
    }
    // to avoid too many deaths / births in firts generations
    this.particles.forEach(particle => {
      particle.lifetime = App.randInt(this.particleLifetime);
    });
  }

  move() {
    for (let k = 0; k < this.particlesAmount; k++) {
      let particle = this.particles[k];
  
      if (particle.lifetime <= 0) {
        particle = new Particle(this.particleLifetime, this.width, this.height);
        this.particles[k] = particle;
      }
  
      let previousPosition = {
        x: particle.x,
        y: particle.y
      };
      
      this.whirlpools.forEach(whirlpool => {
        let deltaX = previousPosition.x - whirlpool.x;
        let deltaY = previousPosition.y - whirlpool.y;
        let distance = Math.hypot(deltaX, deltaY);
  
        if (distance < 0.001) distance = 0.001;
        let sin = deltaY / distance;
        let cos = deltaX / distance;
        
        let deltaR = distance - whirlpool.radius;
        let angularVelocity = whirlpool.exponentAngularVelocityMultCoef * Math.exp (- deltaR * deltaR / whirlpool.exponentAngularVelocityCoef) * whirlpool.direction;
        let radialVelocity = - deltaR * whirlpool.radialVelocityCoef;
        
        particle.x += radialVelocity * cos -  angularVelocity * distance * sin;
        particle.y += radialVelocity * sin +  angularVelocity * distance * cos;
        
      });

      particle.lifetime--;
  
      let speed = Math.hypot(previousPosition.x - particle.x, previousPosition.y - particle.y) ;
      let hue = Math.min(speed * 100, 300);
      hue = (hue + this.hueShift) % 360;

      this.context.beginPath();
      this.context.moveTo (previousPosition.x, previousPosition.y);
      this.context.lineTo (particle.x, particle.y);
      this.context.strokeStyle = `hsl(${hue},${particle.saturation},${particle.lightness})`;
      this.context.stroke();
    }
  }

  static randFloat(min, max) {
    // [min; max)
    if (max === undefined) {
      return Math.random() * min;
    } 
    return Math.random() * (max - min) + min;
  }


  static randInt (min, max) {
    // integer [min; max)
    if (max === undefined) {
      max = min; min = 0;
    }
    return Math.floor(Math.random() * (max - min) + min);
  }

}

class Whirlpool {
  constructor(width, height) {
    this.x = App.randFloat(width);
    this.y = App.randFloat(height);
    this.radialVelocityCoef = 0.001 * (App.randFloat(0.7, 1.3));       // coefficient for radial velocity
    this.radius = 150 + App.randFloat(-50, 50);          // radius where angular velocity is max
    this.exponentAngularVelocityCoef = 10000 * App.randFloat(0.8, 1.2);         // coefficient in exponent for angular velocity
    this.exponentAngularVelocityMultCoef = 0.01 * App.randFloat(0.8, 1.2);       // multiplying coefficient for angular velocity
    this.direction = (Math.random() > 0.5) ? 1 : -1; // directionection of rotation
  }
}

class Particle {
  constructor(particleLifetime, width, height) {
    this.x = App.randFloat(-100, width + 100);
    this.y = App.randFloat(-100, height + 100);
    this.saturation = `${App.randInt(50, 101)}%`;
    this.lightness = `${App.randInt(30, 80)}%`;
    this.lifetime = App.randFloat(particleLifetime * 0.8, particleLifetime * 1.2);
  }
}
