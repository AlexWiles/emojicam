var capture;

function setup() {
  setupEmojis();
  createCanvas(700, 500);
  capture = createCapture(VIDEO);
  capture.size(700, 500);
  capture.hide();
}

function draw() {
  background(255);
  drawEmojis(capture, 8, 0, 0);
}
