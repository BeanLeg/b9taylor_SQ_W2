// ============================================================
// Side Quest Week 1: Exit 8
// ============================================================

let creepyman;
let posterX = 25;
let posterY = 225;

/**
 * Preloads assets before the sketch starts.
 */
function preload() {
  creepyman = loadImage("assets/images/creepyman.png");
}

/**
 * Sets up the canvas and draws the initial static scene.
 */
function setup() {
  // Create a canvas for the static image.
  createCanvas(600, 800);
  // Set the background to an underground tiled passage style.
  drawBackWall();
  drawCeiling();
  drawFloor();
  drawWalls();
  drawPosters(posterX, posterY);
  drawSign(300, 100);
  imageMode(CENTER);
  image(creepyman, width / 2, 450, 1200, 1200);
}

/**
 * The main draw loop (empty for static image).
 */
function draw() {}

/**
 * Draws an eye at the mouse click position when clicked.
 */
function mouseClicked() {
  drawEye();
}

/**
 * Draws the central exit sign with posts, arrow, text, and the large '8'.
 * @param {number} x - The x-coordinate of the sign center.
 * @param {number} y - The y-coordinate of the sign center.
 */
function drawSign(x, y) {
  rectMode(CENTER);

  // Hanging posts (drawn first to appear behind the sign)
  push();
  fill(200); // 200 colored (light gray)
  stroke(150); // Slightly darker outline for depth
  strokeWeight(2);
  // Left post: x - 150, centered higher up to act as a hanger
  rect(x - 150, y - 125, 15, 200);
  // Right post: x + 150
  rect(x + 150, y - 125, 15, 200);
  pop();

  // Main Sign Box
  fill(255, 255, 0);
  strokeWeight(5);
  stroke(200);
  rect(x, y, 400, 100);
  strokeWeight(1);

  // Big bold arrow pointing up (Left side)
  push();
  fill(0);
  noStroke();
  let ax = x - 70; // X center of the arrow
  let ay = y; // Y center of the arrow
  beginShape();
  vertex(ax, ay - 33); // Top tip
  vertex(ax - 25, ay + 5); // Left wing
  vertex(ax - 15, ay + 5); // Inner left lip
  vertex(ax - 5, ay + -13); // Inner left corner
  vertex(ax - 5, ay + 35); // Bottom left
  vertex(ax + 5, ay + 35); // Bottom right
  vertex(ax + 5, ay + -13); // Inner right corner
  vertex(ax + 15, ay + 5); // Inner right lip
  vertex(ax + 25, ay + 5); // Right wing
  endShape(CLOSE);
  pop();

  // Text (Center)
  textAlign(CENTER);
  stroke(0);
  fill(0);
  textSize(30);
  text("出口", x, y);
  textSize(20);
  text("Exit", x - 10, y + 25);

  // Large 8 (Right side)
  push();
  textAlign(CENTER, CENTER);
  fill(0);
  stroke(0);
  strokeWeight(3); // Makes the 8 extra bold
  textSize(90);
  text("8", x + 70, y + 5);
  pop();
}

/**
 * Draws an underground tiled wall background.
 */
function drawBackWall() {
  background(220); // Dark, industrial color for the main tunnel.

  // Draw wall tiles (square grid).
  stroke(60, 60, 60);
  strokeWeight(1);
  noFill();
  let tileSize = 10;
  for (let x = 0; x < width; x += tileSize) {
    for (let y = 0; y < height; y += tileSize) {
      rect(x, y, tileSize, tileSize);
    }
  }
}

/**
 * Draws an eye anomaly at the mouse click position.
 */
function drawEye() {
  let anomalyX = mouseX;
  let anomalyY = mouseY;
  let anomalyD = 40;

  fill(255); // White of the eye
  strokeWeight(1);
  stroke(255, 0, 0);
  ellipse(anomalyX, anomalyY, anomalyD * 1.5, anomalyD);

  noStroke();
  fill(0); // Pupil
  ellipse(anomalyX, anomalyY, anomalyD, anomalyD);

  fill(255); // Reflection
  ellipse(
    anomalyX - anomalyD * 0.15,
    anomalyY - anomalyD * 0.15,
    anomalyD * 0.2,
    anomalyD * 0.2,
  );
}

/**
 * Draws the ceiling as an upside-down trapezoid for perspective.
 */
function drawCeiling() {
  push();
  // Light grey color for the ceiling
  fill(180);
  stroke(150); // Slightly darker border for the edges
  strokeWeight(2);

  // Define the coordinates for the upside-down trapezoid
  // quad(x1, y1, x2, y2, x3, y3, x4, y4);
  let topLeftX = 0;
  let topLeftY = 0;

  let topRightX = width;
  let topRightY = 0;

  // Adjust these to change the depth/perspective of the ceiling
  let ceilingDepthY = 325;
  let bottomRightX = width * 0.6;
  let bottomLeftX = width * 0.4;

  quad(
    topLeftX,
    topLeftY, // Top-left corner
    topRightX,
    topRightY, // Top-right corner
    bottomRightX,
    ceilingDepthY, // Bottom-right corner (narrower, lower down)
    bottomLeftX,
    ceilingDepthY, // Bottom-left corner (narrower, lower down)
  );
  pop();
}

/**
 * Draws the floor as a trapezoid for perspective, contrasting the ceiling.
 */
function drawFloor() {
  push();
  // Slightly darker grey color for the floor to contrast with the ceiling
  fill(235);
  stroke(150);
  strokeWeight(2);

  // Define the bottom corners of the canvas
  let bottomLeftX = 0;
  let bottomLeftY = height;

  let bottomRightX = width;
  let bottomRightY = height;

  // Set the depth of the floor (how high up the screen it goes)
  // You can match the 300 from the ceiling, or adjust it based on your canvas height
  let floorDepthY = height - 320;

  // Match the perspective angles of the ceiling
  let topRightX = width * 0.6;
  let topLeftX = width * 0.4;

  // quad(x1, y1, x2, y2, x3, y3, x4, y4);
  quad(
    bottomLeftX,
    bottomLeftY, // Bottom-left corner
    bottomRightX,
    bottomRightY, // Bottom-right corner
    topRightX,
    floorDepthY, // Top-right corner (narrower, higher up)
    topLeftX,
    floorDepthY, // Top-left corner (narrower, higher up)
  );

  pop();
}

/**
 * Draws the left and right walls with perspective lines for 3D depth.
 */
function drawWalls() {
  push();
  fill(240); // White walls
  stroke(20); // Black for tile grout
  strokeWeight(1);

  // Perspective anchor points (matching your ceiling and floor)
  let backLeftX = width * 0.4;
  let backRightX = width * 0.6;
  let backTopY = 300;
  let backBottomY = height - 300;

  // 1. Draw the base trapezoids (quads) for both walls
  // Left Wall
  quad(0, 0, backLeftX, backTopY, backLeftX, backBottomY, 0, height);
  // Right Wall
  quad(width, 0, backRightX, backTopY, backRightX, backBottomY, width, height);

  // 2. Draw horizontal lines (Radiating from the vanishing point)
  let numRows = 12; // Lowered this to make the vertical gaps larger (taller tiles)

  for (let i = 0; i <= numRows; i++) {
    // Front edge Y coordinates (0 to height)
    let frontY = map(i, 0, numRows, 0, height);
    // Back edge Y coordinates (compressed to the back wall)
    let backY = map(i, 0, numRows, backTopY, backBottomY);

    // Left wall lines
    line(0, frontY, backLeftX, backY);
    // Right wall lines
    line(width, frontY, backRightX, backY);
  }

  // 3. Draw vertical lines (Compressing towards the back for 3D depth)
  let numCols = 12; // Increased this to shorten the horizontal gaps (narrower tiles)

  for (let i = 1; i < numCols; i++) {
    // t goes evenly from 0 (front) to 1 (back)
    let t = i / numCols;

    // We use a math curve to squish the lines together as t gets closer to 1
    let depthT = 1 - pow(1 - t, 2);

    // Left Wall vertical lines
    let leftX = map(depthT, 0, 1, 0, backLeftX);
    let leftTopY = map(depthT, 0, 1, 0, backTopY);
    let leftBottomY = map(depthT, 0, 1, height, backBottomY);
    line(leftX, leftTopY, leftX, leftBottomY);

    // Right Wall vertical lines
    let rightX = map(depthT, 0, 1, width, backRightX);
    let rightTopY = map(depthT, 0, 1, 0, backTopY);
    let rightBottomY = map(depthT, 0, 1, height, backBottomY);
    line(rightX, rightTopY, rightX, rightBottomY);
  }

  pop();
}

/**
 * Draws two posters on the left wall at the specified position.
 * @param {number} x - The x-coordinate for the first poster.
 * @param {number} y - The y-coordinate for the posters.
 */
function drawPosters(x, y) {
  push();
  noStroke();

  let posterWidth = 100;
  let posterHeight = 300;
  let gap = 20;

  // First poster on the left wall.
  fill(254, 83, 77);
  quad(
    x,
    y,
    x + posterWidth,
    y + 45,
    x + posterWidth,
    y + posterHeight - 40,
    x,
    y + posterHeight,
  );

  // Second poster to the right of the first.
  let secondX = x + posterWidth + gap;
  fill(20, 158, 200);
  quad(
    secondX,
    y + 50,
    secondX + posterWidth / 2,
    y + 90,
    secondX + posterWidth / 2,
    y + posterHeight - 75,
    secondX,
    y + posterHeight - 50,
  );

  pop();
}
