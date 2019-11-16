function setup() {
  for (let a = 0; a < attractorCount; a++) {
    attractors.push(new Attractor());
  }
  for (let i = 0; i < ballsCount; i++) {
    let r;
    if (differentBallsRadius) {
      r = ballRadius[Math.floor(Math.random() * ballRadius.length)];
    } else {
      r = constBallRadius;
    }
    let pos = new Vector(
      random(r, canvas.width - r),
      random(r, canvas.height - r)
    );
    if (i !== 0) {
      for (let j = 0; j < balls.length; j++) {
        if (pos.distance(balls[j].pos) < balls[j].r + r) {
          pos = new Vector(
            random(r, canvas.width - r),
            random(r, canvas.height - r)
          );

          j = -1;
        }
      }
      for (let e = 0; e < attractors.length; e++) {
        if (pos.distance(attractors[e].pos) < attractors[e].r + r) {
          pos = new Vector(
            random(r, canvas.width - r),
            random(r, canvas.height - r)
          );

          e = -1;
        }
      }
    }
    balls.push(new Ball(pos.x, pos.y, r));
  }
}

function setupSolarSystem(index) {
  let conf = savedConfigurations[index];

  let differenceX = 0;

  if (attractorCount <= 1) {
    differenceX = canvas.width / 2 - conf.attractors[0].x;
    differenceY = canvas.height / 2 - conf.attractors[0].y;
  }

  conf.attractors.forEach(a => {
    let attractor = new Attractor(a.x + differenceX, a.y + differenceY);
    attractor.r = a.r;
    attractors.push(attractor);
  });

  conf.balls.forEach(b => {
    let ball = new Ball(b.x + differenceX, b.y + differenceY, b.r);
    ball.velocity = b.v;
    balls.push(ball);
  });
}

function reset() {
  if (solarSystemMode) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    balls = [];
    attractors = [];
    setupSolarSystem(0);
  } else {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    balls = [];
    attractors = [];
    setup();
  }
}

function saveCurrentPos() {
  currentPos = [];
  balls.forEach(b => {
    currentPos.push([b.pos.x, b.pos.y, b.velocity]);
  });
}

function backToCurrentPos() {
  for (let i = 0; i < balls.length; i++) {
    let b = balls[i];
    b.pos.x = currentPos[i][0];
    b.pos.y = currentPos[i][1];
    b.velocity = currentPos[i][2];
  }
}

if (solarSystemMode) {
  setupSolarSystem(0);
} else {
  setup();
}
