/*
Directions

  -arrow keys to move
  
  -space to toggle cameral lock
  
  -shift and ctrl to switch celestial bodies
  
  -A and D to zoom in and out

*/
{
  {
    var leftKeyDown = false;
    var upKeyDown = false;
    var rightKeyDown = false;
    var downKeyDown = false;
    var shiftKeyDown = false;
    var cntrlKeyDown = false;
    var spaceKeyDown = false;
    var WKeyDown = false;
    var SKeyDown = false;
    var mouseisdown = false;
  } //defines the key booleans

  {
    var gravity = 0.0; //on the y axis, not interplanetary (: (should be zero)
    var intergravity = 0.1;
    var wallFriction = 0;
    var wallRestitution = 1;
    var scrollx = -300;
    var scrolly = -300;
    var scalez = 1;
    var borderx = 1500;
    var bordery = 1500;
    var freescroll = true;
    var scrollcount = 0;
    var stars = [];
    var stars2 = [];
    var initwidth = 0;
    var initheight = 0;
    var canSetup = true;
    var lineNumber = 50;
  } //other variables
} //variables
function windowResized() {
  resizeCanvas(windowWidth/1.5, windowHeight-10);
}
function setup() {
    createCanvas(windowWidth/1.5, windowHeight-10);
    initwidth = windowWidth/1.5;
    initheight = windowHeight;
    



  for (var s = 0; s < borderx*bordery/7500; s++) {
  stars.push([random(width/2-borderx-1000, borderx+2000),random(height/2-borderx-2000, bordery-(height-borderx)+2000)])
  stars2.push([random(width/2-borderx-1000, borderx+2000),random(height/2-borderx-2000, bordery-(height-borderx)+2000)])
  }
  
scrollx = -300;
scrolly = -300;
}



{
  keyPressed = function () {
    if (keyCode === 37) {
      leftKeyDown = true;
    }

    if (keyCode === 38) {
      upKeyDown = true;
    }

    if (keyCode === 39) {
      rightKeyDown = true;
    }

    if (keyCode === 40) {
      downKeyDown = true;
    }
    
    if (keyCode === 87) {
      WKeyDown = true;
    }

    if (keyCode === 83) {
      SKeyDown = true;
    }

    if (keyCode === 16) {
      shiftKeyDown = true;
      if (scrollcount < elipsesToDraw.length-1) {
        scrollcount++;
      }
      else {
       scrollcount = 0; 
      }
    }

    if (keyCode === 17) {
      cntrlKeyDown = true;
      if (scrollcount > 0) {
        scrollcount--;
      }
      else {
       scrollcount = elipsesToDraw.length-1; 
      }
    }

    if (keyCode === 32) {
      spaceKeyDown = true;
      if (freescroll) {
        freescroll = false;
      } else {
        freescroll = true;
      }
    }
  };

  keyReleased = function () {
    if (keyCode === 37) {
      leftKeyDown = false;
    }

    if (keyCode === 38) {
      upKeyDown = false;
    }

    if (keyCode === 39) {
      rightKeyDown = false;
    }
    if (keyCode === 40) {
      downKeyDown = false;
    }
    if (keyCode === 16) {
      shiftKeyDown = false;
    }

    if (keyCode === 17) {
      cntrlKeyDown = false;
    }

    if (keyCode === 32) {
      spaceKeyDown = false;
    }
    
    if (keyCode === 87) {
      WKeyDown = false;
    }

    if (keyCode === 83) {
      SKeyDown = false;
    }
  };
  mousedown = function() {
    mouseisdown = true;
  };
  mouseuo = function() {
    mouseisdown = false;
  };
} //tracks the keys and mouse

{
  var elipse = function (x, y, xvel, yvel, rad, mass, color) {
    this.x = x;

    this.y = y;

    this.xvel = xvel;

    this.yvel = yvel;

    this.rad = rad;

    this.mass = mass;

    this.color = color;
    
    this.positionsX = [];
    
    this.positionsY = [];
  };
} //defines balls

{
  var elipses = [];
  var elipsesToDraw = [];
} //defines the array

{
  elipse.prototype.draw = function () {
    fill(this.color[0], this.color[1], this.color[2]);
    stroke(this.color[0]-50, this.color[1]-50, this.color[2]-50);
    strokeWeight(this.rad/scalez)
    line((this.x+scrollx)/scalez+width/2, (this.y+scrolly)/scalez+height/2, (this.positionsX[0]+scrollx)/scalez+width/2, (this.positionsY[0]+scrolly)/scalez+height/2);
    
    for (var b = 1; b<lineNumber; b++) {
    
    strokeWeight((this.rad-(b*(this.rad/lineNumber)))/scalez);
    
    line((this.positionsX[b]+scrollx)/scalez+width/2, (this.positionsY[b]+scrolly)/scalez+height/2, (this.positionsX[b-1]+scrollx)/scalez+width/2, (this.positionsY[b-1]+scrolly)/scalez+height/2);
    
  }
  
    noStroke();
    fill(this.color);
    ellipse((this.x + scrollx)/scalez+width/2, (this.y + scrolly)/scalez+height/2, this.rad/scalez, this.rad/scalez);
    this.positionsX[0] = this.x;
    this.positionsY[0] = this.y;
    for (b = lineNumber; b>0; b--) {
      this.positionsX[b] = this.positionsX[b-1];
      this.positionsY[b] = this.positionsY[b-1];
    }
    elipses.push(this);
  };
} //defines the draw function for the balls

{
  /*
var elipse1 = new elipse(random(100, 300), random(100, 300), random(1, -1), random(1, -1), 50, 1000);
elipsesToDraw.push(elipse1);

var elipse2 = new elipse(random(100, 300), random(100, 300), random(1, -1), random(1, -1), 10, 10);
elipsesToDraw.push(elipse2);

var elipse3 = new elipse(random(100, 300), random(100, 300), random(1, -1),random(1, -1), 10, 10);
elipsesToDraw.push(elipse3);

var elipse4 = new elipse(random(100, 300), random(100, 300), random(1, -1),random(1, -1), 
10, 10);
elipsesToDraw.push(elipse4);

var elipse5 = new elipse(random(100, 300), random(100, 300), random(1, -1), random(1, -1), 20, 100);
elipsesToDraw.push(elipse5);

var elipse6 = new elipse(random(100, 300), random(100, 300), random(1, -1), random(1, -1), random(10, 20), random(10, 100));
elipsesToDraw.push(elipse6);

var elipse7 = new elipse(random(100, 300), random(100, 300), random(1, -1), random(1, -1), random(10, 20), random(10, 100));
elipsesToDraw.push(elipse7);

*/

  var elipseOrbit3 = new elipse(200, 294, -0.7, 0, 4, 0.00001, [155, 155, 155]);
  elipsesToDraw.push(elipseOrbit3);

  var elipseOrbit = new elipse(200, 300, 0, 0.9, 12, 100, [100, 255, 150]);
  elipsesToDraw.push(elipseOrbit);

  var elipseOrbit2 = new elipse(314, 300, -0, -0.03, 50, 1000, [255, 255, 100]);
  elipsesToDraw.push(elipseOrbit2);

  var initx = elipseOrbit2.x;
  var inity = elipseOrbit2.y;

  var elipseOrbit4 = new elipse(550, 300, 0, -0.6, 12, 100, [255, 100, 100]);
  elipsesToDraw.push(elipseOrbit4);

  var elipseOrbit5 = new elipse(539, 297, -0.1965, 0.18, 4, 0.00001, [155,155,155]);
  elipsesToDraw.push(elipseOrbit5);

  var elipseOrbit6 = new elipse(800, 305, 0, -0.2, 5, 0, [155, 155, 155]);
  elipsesToDraw.push(elipseOrbit6);


  /*
var elipseOrbit6 = new elipse(314, 425, 0.5, -0.03, 25, 500);
elipsesToDraw.push(elipseOrbit6);
*/
  /*
var johnathan1 = new elipse(250, 300, 0, 2, 10, 10000,[255, 24, 30]);
  elipsesToDraw.push(johnathan1);
  
var johnathan2 = new elipse(350, 300, 0, -2, 10, 10000,[200, 255, 200]);
  elipsesToDraw.push(johnathan2);
*/
} //defines new balls




function draw() {
  {
    if (canSetup) {
  for (var n = 0; n < elipsesToDraw.length; n++){
    for (var m = 0; m < lineNumber; m++){
      elipsesToDraw[n].positionsX.push(elipsesToDraw[n].x)
      elipsesToDraw[n].positionsY.push(elipsesToDraw[n].y)
  }
  }
    canSetup = false;
  }
    if (mouseisdown) {
      gravity = 1;

    }
  background(0);
  noFill();
  stroke(255);
  strokeWeight(1)
  for (s = 0; s < stars.length; s++) {
  
    ellipse((5*stars2[s][1]+scrollx-width/2)/(5*scalez)+width/2, (5*stars2[s][0]+scrolly-height/2)/(5*scalez)+height/2, 1, 1);

    
  ellipse((2*stars[s][1]+scrollx-width/2)/(2*scalez)+width/2, (2*stars[s][0]+scrolly-height/2)/(2*scalez)+height/2, 1, 1);
  }//draws the stars
    
  }//backgroundstuff
  
  {
  rect(
    (initx- borderx/2 + scrollx)/scalez+width/2,
    (inity - bordery/2 + scrolly)/scalez+height/2,
    borderx/scalez,
    bordery/scalez
  );
  const debug1 = initheight;
  const debug2 = initwidth;

  //stroke(255);
  //text("width: " + width, 10, 10);
  //text("height: " + height, 10, 25);
  //text("initheight: " + debug1, 10, 40);
  //text("initwidth: " + debug2, 10, 55);
  


  }//draws the border
 

  for (var i = 0; i < elipsesToDraw.length; i++) {
    elipsesToDraw[i].draw();
  } //draws the balls

   {

     if (scalez > 0.2 && WKeyDown) {
     
       scalez-= 0.01;
     
     }
     if (scalez < 5 && SKeyDown) {
     
       scalez+= 0.01;
     
     }
     
  if (freescroll) {
    if (upKeyDown) {
      scrolly += 1;
    }
    if (downKeyDown) {
      scrolly -= 1;
    }
    if (leftKeyDown) {
      scrollx += 1;
    }
    if (rightKeyDown) {
      scrollx -= 1;
    }
  } else {
  scrollx = (-elipses[scrollcount].x);
  scrolly = (-elipses[scrollcount].y);
  } 
  
    }//movement
  
  for (i = 0; i < elipses.length; i++) {
    {
      if (
        elipses[i].y + elipses[i].rad / 2 >=
        inity + bordery / 2
      ) {
        elipses[i].yvel = -abs(0.9 * elipses[i].yvel) - 0.1;
        elipses[i].xvel = elipses[i].xvel * 0.9;
        elipses[i].y -= 0.1;
      }

      if (elipses[i].y - elipses[i].rad / 2 <= inity - bordery / 2 ) {
        elipses[i].yvel = abs(0.9 * elipses[i].yvel) + 0.1;
        elipses[i].xvel = elipses[i].xvel * 0.9;
        elipses[i].y += 0.1;
      }

      if (elipses[i].x + elipses[i].rad / 2 >= initx + borderx / 2) {
        elipses[i].xvel = -abs(0.9 * elipses[i].xvel);
        elipses[i].yvel = elipses[i].yvel * 0.9;
        elipses[i].x -= 0.1;
      }

      if (elipses[i].x - elipses[i].rad / 2 <= initx - borderx / 2) {
        elipses[i].xvel = abs(0.9 * elipses[i].xvel);
        elipses[i].yvel = elipses[i].yvel * 0.9;
        elipses[i].x += 0.1;
      }
    } //collisions with wall

    for (var k = 0; k < elipses.length; k++) {
      if (k !== i) {
        var dx = elipses[i].x - elipses[k].x;
        var dy = elipses[i].y - elipses[k].y;

        stroke(255);
        //line(elipses[i].x+scrollx, elipses[i].y+scrolly, elipses[k].x+scrollx, elipses[k].y+scrolly);

        elipses[i].xvel -=
          ((dx / (abs(dx) + abs(dy))) * (intergravity * elipses[k].mass)) /
          (dy * dy + dx * dx);
        elipses[i].yvel -=
          ((dy / (abs(dx) + abs(dy))) * (intergravity * elipses[k].mass)) /
          (dy * dy + dx * dx);

        if (
          dx * dx + dy * dy <=
          (1 / 2) *
            (elipses[i].rad + elipses[k].rad) *
            ((1 / 2) * (elipses[i].rad + elipses[k].rad))
        ) {
          var od =
            sqrt(dx * dx + dy * dy) - elipses[i].rad / 2 - elipses[k].rad / 2;

          elipses[i].x -=
            ((od * elipses[k].mass) / (elipses[i].mass + elipses[k].mass)) *
            (dx / sqrt(dx * dx + dy * dy));
          elipses[i].y -=
            ((od * elipses[k].mass) / (elipses[i].mass + elipses[k].mass)) *
            (dy / sqrt(dx * dx + dy * dy));
          elipses[k].x +=
            ((od * elipses[i].mass) / (elipses[i].mass + elipses[k].mass)) *
            (dx / sqrt(dx * dx + dy * dy));
          elipses[k].y +=
            ((od * elipses[i].mass) / (elipses[i].mass + elipses[k].mass)) *
            (dy / sqrt(dx * dx + dy * dy));
          //elipses[k].xvel = 0;
          //elipses[i].xvel = 0;
          var nx = -dx / sqrt(dx * dx + dy * dy);
          var ny = -dy / sqrt(dx * dx + dy * dy);

          var tx = -ny;
          var ty = nx;

          var dptan1 = elipses[i].xvel * tx + elipses[i].yvel * ty;
          var dptan2 = elipses[k].xvel * tx + elipses[k].yvel * ty;

          var dpnorm1 = elipses[i].xvel * nx + elipses[i].yvel * ny;
          var dpnorm2 = elipses[k].xvel * nx + elipses[k].yvel * ny;

          var m1 =
            (dpnorm1 * (elipses[i].mass - elipses[k].mass) +
              2 * elipses[k].mass * dpnorm2) /
            (elipses[i].mass + elipses[k].mass);
          var m2 =
            (dpnorm2 * (elipses[k].mass - elipses[i].mass) +
              2 * elipses[i].mass * dpnorm1) /
            (elipses[k].mass + elipses[i].mass);

          elipses[i].xvel = tx * dptan1 + nx * m1;
          elipses[i].yvel = ty * dptan1 + ny * m1;
          elipses[k].xvel = tx * dptan2 + nx * m2;
          elipses[k].yvel = ty * dptan2 + ny * m2;
        }
      }
    } //scary (physics stuff)

    elipses[i].yvel += gravity; //applies gravity in the y direction
    
    {
      
    elipses[i].x = elipses[i].x + elipses[i].xvel;
    elipses[i].y = elipses[i].y + elipses[i].yvel;
      
    }//applies the velocity
    
  } //ball updates and stuff

  {
    elipses = [];
  } //resets the elipses array
}
