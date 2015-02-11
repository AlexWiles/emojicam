var WIDTH = 900;
var HEIGHT = 600;
var PIXEL_SIZE = 8;
var FILE_TYPE = 'png'

// the pngs look better when enlarged a bit
var PNG_BUMP = (FILE_TYPE=='png' ? PIXEL_SIZE/5 : 0);
var capture;


function setup() {
  canvas = createCanvas(WIDTH, HEIGHT);
  canvas.position(0, 0);
  capture = createCapture(VIDEO);
  capture.size(WIDTH, HEIGHT);
  capture.hide();

  emojiMap = loadEmojis();
  emojiInts = emojiPoints();
}

function draw() {
  background(255);

  // uncomment to show video feed behind emojis
  //image(capture, 0, 0, WIDTH, HEIGHT);

  capture.loadPixels();
  for (var y=0; y<height; y+=PIXEL_SIZE) {
    for (var x=0; x<width; x+=PIXEL_SIZE) {
      var i = (y * width + x)*4;
      emoji = closestEmoji(capture.pixels[i], capture.pixels[i+1], capture.pixels[i+2]);
      image(emoji, WIDTH-x, y, PIXEL_SIZE+PNG_BUMP, PIXEL_SIZE+PNG_BUMP);
    }
  }
}

function loadEmojis(){
  var colorMap = {};
  for (var i=0; i<emojiColors.length; i++){
    fileNumber = pad(i+1 , 4);
    img = loadImage("emojis-" + FILE_TYPE +"/" + fileNumber + "." + FILE_TYPE);
    colorMap[emojiColors[i]] = img
  }
  return colorMap;
}

function emojiPoints(){
  var pointArray = [];
  var c, r, g, b;
  for (var i=0; i<emojiColors.length; i++){
    c = emojiColors[i];
    r = parseInt("0x"+c.substr(1,2));
    g = parseInt("0x"+c.substr(3,2));
    b = parseInt("0x"+c.substr(3,2));
    pointArray.push([r, g, b, c]);
  }
  return pointArray;
}

var closestEmoji = function(r, g, b) {
  var distance = 99999999;
  var c, d, p;
  for (var i=0; i<emojiInts.length; i++){
    p = emojiInts[i];
    d = Math.sqrt( Math.pow((r-p[0]), 2) + Math.pow((g-p[1]), 2) + Math.pow((b-p[2]), 2) );
    if (d < distance){
      distance = d;
      c = p[3];
    }
  }
  return emojiMap[c];
}

function pad(num, size){ return ('000' + num).substr(-size); }
function hexString(r,g,b){ return "#"+ r.toString() + g.toString() + b.toString(); }
