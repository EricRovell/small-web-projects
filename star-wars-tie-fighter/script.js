const interval = 500; // ms

function randomShip() {

  /* const tf = document.createElement("div");
  const cp = document.createElement("div"); */

  const size = Math.floor(Math.random() * 3) + 1;
  const angle = `${Math.floor(Math.random() * 90) - 45}deg`;

  const [ width, height ] = [ window.innerWidth - 48, window.innerHeight - 48 ];

  const isShooter = (Math.random() > 0.7);

  const container = document.createElement("div");
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
  use.setAttribute("href", "#fighter");

  svg.appendChild(use);
  container.appendChild(svg);

  container.setAttribute("class", `fighter ${(isShooter) ? "shooter" : ""}`);
  container.style.transform = `scale(${size}) rotate(${angle})`;
  container.style.opacity = 0.33 * size;
  container.style.left = `${Math.floor(Math.random() * (width - 48))}px`;
  container.style.top = `${Math.floor(Math.random() * (height - 48))}px`;

  document.body.appendChild(container);

  // remove when outside of view
  setTimeout(() => container.parentNode.removeChild(container), 3000);
}

randomShip();
setInterval(randomShip, interval);
