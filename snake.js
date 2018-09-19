function Snake(x, y, scl, t, px, py) {
  this.pos = createVector(x, y);
  this.type = t;
  this.size = scl;
  //if (t != 1) {
  this.parentpos = createVector(px, py);
  this.movementDir = 0; // 0; up, 1: down, 2: left, 3: right
  //}

  this.showBody = function() {

    fill(150, 100, 150);
    rect(this.pos.x, this.pos.y, this.size, this.size);

  }

  // draw a rounded rectangle for the head
  this.showHead = function() {
    fill(0, 255, 0);
    var headRadius = 30;
    switch (this.movementDir) {
      case 0: // moving up
        rect(this.pos.x, this.pos.y, this.size, this.size, headRadius,
          headRadius, 0, 0);
        break;
      case 1: // moving down
        rect(this.pos.x, this.pos.y, this.size, this.size, 0, 0, headRadius,
          headRadius);
        break;
      case 2: // movking left
        rect(this.pos.x, this.pos.y, this.size, this.size, headRadius, 0, 0,
          headRadius);
        break;
      case 3: // moving right
        rect(this.pos.x, this.pos.y, this.size, this.size, 0, headRadius,
          headRadius, 0);
        break;
      default:
    }
  }

  // draw a triangle for the tail based off the parent's movement direction
  this.showTail = function(parentmdir) {
    fill(200, 100, 200);
    rect(this.pos.x, this.pos.y, this.size, this.size);
    //fill(0, 255, 0);
    // switch (parentmdir) {
    //   case 0: // moving up
    //     triangle(this.pos.x, this.pos.y,
    //       this.pos.x + tileSize, this.pos.y,
    //       this.pos.x + tileSize * 0.5, this.pos.y + tileSize);
    //     break;
    //   case 1: // moving down
    //     triangle(this.pos.x + tileSize * 0.5, this.pos.y,
    //       this.pos.x + tileSize, this.pos.y + tileSize,
    //       this.pos.x, this.pos.y + tileSize);
    //     break;
    //   case 2: // movking left
    //     triangle(this.pos.x, this.pos.y,
    //       this.pos.x + tileSize, this.pos.y + tileSize * 0.5,
    //       this.pos.x, this.pos.y + tileSize);
    //     break;
    //   case 3: // moving right
    //     triangle(this.pos.x, this.pos.y + tileSize * 0.5,
    //       this.pos.x + tileSize, this.pos.y,
    //       this.pos.x + tileSize, this.pos.y + tileSize);
    //     break;
    //   default:
    // }
  }

  this.moveHead = function(dir, mdir) {
    this.pos.x += dir.x;
    this.pos.y += dir.y;

    this.movementDir = mdir;
  }

  this.moveBody = function(dir, mdir, parent) {
    this.movementDir = mdir;

    this.pos.x = this.parentpos.x;
    this.pos.y = this.parentpos.y;

    this.parentpos.x = parent.pos.x;
    this.parentpos.y = parent.pos.y;
  }
}
