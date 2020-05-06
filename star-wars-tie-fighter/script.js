const params = {
  birthInterval: 400,
  lifeTime: 3000,
  scaleRange: [ 1, 4 ],
  angleRange: [ 45, 90 ],
  shooterChance: 0.6,
};

const [ width, height ] = [ window.innerWidth - 48, window.innerHeight - 48 ];

function createFighter() {
  const container = document.createElement("div");
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
  use.setAttribute("href", "#fighter");

  svg.appendChild(use);
  container.appendChild(svg);
  return container;
}

function randomShip({ lifeTime, scaleRange, angleRange, shooterChance }) {

  const fighter = createFighter();
  
  const size = Math.floor(Math.random() * scaleRange[1]) + scaleRange[0];
  const angle = `${Math.floor(Math.random() * angleRange[1]) - angleRange[0]}deg`;

  fighter.setAttribute(
    "class", `fighter ${
      (Math.random() > shooterChance)
        ? "shooter"
        : ""
    }`
  );

  Object.assign(fighter.style, {
    transform: `scale(${size}) rotate(${angle})`,
    opacity: 0.33 * size,
    top: `${Math.floor(Math.random() * (height - 48))}px`,
    left: `${Math.floor(Math.random() * (width - 48))}px`,
  });

  document.body.appendChild(fighter);

  // remove when outside of view
  setTimeout(() => fighter.parentNode.removeChild(fighter), lifeTime);
}

randomShip(params);
setInterval(randomShip, params.birthInterval, params);
