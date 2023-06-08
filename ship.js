function Ship() {
  this.pos = createVector(width / 2, height / 2);
  this.r = 20;
  this.heading = 0;
  this.rotation = 0;
  this.velocity = createVector(0, 0);
  this.isBoosting = false;

  // update
  this.update = function () {
    if (this.isBoosting) {
      this.boost();
    }
    this.pos.add(this.velocity);
    this.velocity.mult(0.99);
  };

  // hits
  this.hits = function (asteroid) {
    var d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
    if (d < this.r + asteroid.r) {
      return true;
    } else {
      return false;
    }
  };

  // boost
  this.boost = function () {
    var force = p5.Vector.fromAngle(this.heading);
    force.mult(0.1);
    this.velocity.add(force);
  };

  // boosting
  this.boosting = function (boolean) {
    this.isBoosting = boolean;
  };

  // render
  this.render = function () {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.heading + PI / 2);
    fill(0);
    stroke(255);
    triangle(-this.r, this.r, this.r, this.r, 0, -this.r);
    pop();
  };

  // rotate ship
  this.setRotation = function (angle) {
    this.rotation = angle;
  };

  // turn ship
  this.turn = function () {
    this.heading += this.rotation;
  };

  // makes the ship re-appear on the other side of the screen
  this.edges = function () {
    if (this.pos.x > width + this.r) {
      this.pos.x = -this.r;
    } else if (this.pos.x < -this.r) {
      this.pos.x = width + this.r;
    }
    if (this.pos.y > height + this.r) {
      this.pos.y = -this.r;
    } else if (this.pos.y < -this.r) {
      this.pos.y = height + this.r;
    }
  };
}
