let mouse = new Vector(0, 0);

addEventListener("mousemove", event => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

addEventListener("mousedown", event => {
  attractors.forEach(a => {
    if (a.pos.distance(mouse) <= a.r) {
      a.keypress = true;
    }
  });

  balls.forEach(b => {
    if (b.pos.distance(mouse) <= b.r) {
      b.keypress = true;
    }
  });
});

addEventListener("mouseup", event => {
  attractors.forEach(a => {
    a.keypress = false;
  });

  balls.forEach(b => {
    b.keypress = false;
  });
});

addEventListener("keypress", event => {
  if (event.key === "s" && processOnGoing) {
    processOnGoing = false;
  } else if (event.key === "s") {
    processOnGoing = true;
  }

  if (event.key === "a" && attraction) {
    attraction = false;
  } else if (event.key === "a") {
    attraction = true;
  }

  if (event.key === "c" && onMouseColoring) {
    onMouseColoring = false;
  } else if (event.key === "c") {
    onMouseColoring = true;
  }

  if (event.key === "d" && tracingMode) {
    backToCurrentPos();
    tracingMode = false;
  } else if (event.key === "d" && !display) {
    saveCurrentPos();
    tracingMode = true;
  }

  if (event.key === "r" && solarSystemMode) {
    solarSystemMode = false;
    reset();
  } else if (event.key === "r") {
    solarSystemMode = true;
    reset();
  }

  if (event.key === "g" && display) {
    display = false;
  } else if (event.key === "g" && !tracingMode) {
    display = true;
  }
});

addEventListener("keydown", event => {
  if (event.key === "m") {
    attractors.forEach(e => {
      e.massChange(true);
    });
  }
  if (event.key === "l") {
    attractors.forEach(e => {
      e.massChange(false);
    });
  }
});
