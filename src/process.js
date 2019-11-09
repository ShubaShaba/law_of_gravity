function animation() {
  if (!tracingMode) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  } else {
    attractors.forEach(a => {
      ctx.clearRect(
        a.pos.x - a.r - 1,
        a.pos.y - a.r - 1,
        a.r * 2 + 3,
        a.r * 2 + 3
      );
    });
  }

  attractors.forEach(attractor => {
    attractor.move();
    if (processOnGoing) {
      attractor.attracting();
    }
    attractor.draw();
    attractor.coloring();
  });

  balls.forEach(ball => {
    ball.move();
    ball.draw();
    ball.coloring();
  });

  requestAnimationFrame(animation);
}
requestAnimationFrame(animation);
