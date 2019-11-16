let canvas = document.getElementById("my_canvas");
canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;
let ctx = canvas.getContext("2d");

function random(min, max) {
  return min + Math.random() * (max - min);
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(value, max));
}

function CalcForceOfGravity(m1, m2, distance) {
  return (PhysicsConst_G * m1 * m2) / Math.pow(distance, 2);
}

class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.plus = function(vector) {
      return new Vector(this.x + vector.x, this.y + vector.y);
    };
    this.minus = function(vector) {
      return new Vector(this.x - vector.x, this.y - vector.y);
    };
    this.multiply = function(scalar) {
      return new Vector(this.x * scalar, this.y * scalar);
    };
    this.divide = function(scalar) {
      return new Vector(this.x / scalar, this.y / scalar);
    };
    this.length = function() {
      return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    };
    this.normalize = function() {
      return this.divide(this.length());
    };
    this.distance = function(vector) {
      return this.minus(vector).length();
    };
  }
}

class Attractor {
  constructor(x, y) {
    this.pos =
      attractorCount > 1
        ? new Vector(
            x || random(0, canvas.width),
            y || random(0, canvas.height)
          )
        : new Vector(x || canvas.width / 2, y || canvas.height / 2);
    this.r = attractorRadius;
    this.velocity = new Vector(0, 0);
    this.mass = attractorMass;
    this.color = "white";
    this.oppacity = 0.35;
    this.massDelta = Math.pow(10, 5);
    this.keypress;

    this.move = function() {
      if (this.keypress && !tracingMode) {
        this.pos = mouse;
      }
      this.pos = new Vector(this.pos.x, this.pos.y);
    };

    this.coloring = function() {
      if (onMouseColoring) {
        if (mouse.distance(this.pos) < 200 && this.oppacity < 0.3) {
          this.oppacity += 0.02;
        } else if (this.oppacity > 0) {
          this.oppacity -= 0.02;
          this.oppacity = Math.max(0, this.oppacity);
        }
      } else {
        if (this.oppacity < 0.35) {
          this.oppacity += 0.01;
        }
      }
    };

    this.attracting = function() {
      if (!attraction) {
        for (let i = 0; i < balls.length; i++) {
          let ball = balls[i];
          let distance = ball.pos.distance(this.pos);
          if (distance - (ball.r + this.r) <= 0) {
            continue;
          }
          let force = CalcForceOfGravity(ball.mass, this.mass, distance);
          ball.velocity = ball.velocity.plus(
            this.pos
              .minus(ball.pos)
              .normalize()
              .multiply(force)
          );
        }
      }
    };

    this.massChange = function(direction) {
      if (direction) {
        this.mass += this.massDelta;
      } else if (!direction) {
        this.mass -= this.massDelta;
      }
    };

    this.draw = function() {
      ctx.beginPath();
      ctx.arc(this.pos.x, this.pos.y, this.r, 0, Math.PI * 2, true);
      ctx.save();
      ctx.globalAlpha = this.oppacity;
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.restore();
      ctx.strokeStyle = this.color;
      ctx.stroke();
      ctx.closePath();
    };
  }
}

class Ball {
  constructor(x, y, r) {
    this.pos = new Vector(x, y);
    this.r = r;
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.velocity = new Vector(1, 0);
    this.mass = ballMass;
    this.oppacity = 0.35;
    this.keypress;

    this.move = function() {
      if (!solarSystemMode) {
        this.pos.x = clamp(this.pos.x, this.r, canvas.width - this.r);
        this.pos.y = clamp(this.pos.y, this.r, canvas.height - this.r);
      }

      if (processOnGoing) {
        this.pos = this.pos.plus(this.velocity);
      } else if (this.keypress && !tracingMode) {
        this.pos = mouse;
      }

      this.pos = new Vector(this.pos.x, this.pos.y);
    };

    this.coloring = function() {
      if (onMouseColoring) {
        if (mouse.distance(this.pos) < 200 && this.oppacity < 0.6) {
          this.oppacity += 0.02;
        } else if (this.oppacity > 0) {
          this.oppacity -= 0.02;
          this.oppacity = Math.max(0, this.oppacity);
        }
      } else {
        if (this.oppacity < 0.35) {
          this.oppacity += 0.01;
        }
      }
    };

    this.draw = function() {
      ctx.beginPath();
      if (tracingMode) {
        ctx.arc(this.pos.x, this.pos.y, 1, 0, Math.PI * 2, true);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
      } else {
        ctx.arc(this.pos.x, this.pos.y, this.r, 0, Math.PI * 2, true);
        ctx.save();
        ctx.globalAlpha = this.oppacity;
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
        ctx.strokeStyle = this.color;
        ctx.stroke();
        ctx.closePath();
      }
    };

    this.dispaling = function() {
      if (display) {
        ctx.fillStyle = "white";
        ctx.font = "10px Monospace";
        ctx.fillText(
          `V : (${this.velocity.x}, ${this.velocity.x},)`,
          this.pos.x,
          this.pos.y
        );
        ctx.fillText(
          `Pos : (${this.pos.x}, ${this.pos.x},)`,
          this.pos.x,
          this.pos.y + 10
        );
      }
    };
  }
}
