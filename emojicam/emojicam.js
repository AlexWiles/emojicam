function setupEmojis() {
  emojiMap = loadEmojis();
  emojiInts = emojiPoints();
}

function drawEmojis(imageData, pixelSize, originX, originY){
  var i;
  imageData.loadPixels();
  for (var y=0; y<=imageData.height-pixelSize; y+=pixelSize) {
    for (var x=0; x<=imageData.width-pixelSize; x+=pixelSize) {
      emoji = closestEmoji(x, y, pixelSize, imageData);
      image(emoji, originX + x, originY + y, pixelSize, pixelSize);
    }
  }
}

function loadEmojis(){
  var colorMap = {};
  for (var i=0; i<emojiColors.length; i++){
    fileNumber = pad(i+1 , 4);
    img = loadImage("emojicam/emojis-png/"+fileNumber+".png");
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
    b = parseInt("0x"+c.substr(5,2));
    pointArray.push([r, g, b, c]);
  }
  return pointArray;
}

function averageColor(x, y, pixelSize, imageData) {
  var half_width = Math.floor(pixelSize/2)
  i = ((y+half_width)*imageData.width+(x+half_width))*4;
  return [imageData.pixels[i], imageData.pixels[i+1], imageData.pixels[i+2]];
}

var closestEmoji = function(x, y, pixelSize, imageData) {
  color = averageColor(x,y, pixelSize, imageData);
  var distance = 99999999;
  var c, d, p;
  for (var i=0; i<emojiInts.length; i++){
    p = emojiInts[i];
    d = Math.sqrt( Math.pow((color[0]-p[0]), 2) + Math.pow((color[1]-p[1]), 2) + Math.pow((color[2]-p[2]), 2) );
    if (d < distance){
      distance = d;
      c = p[3];
    }
  }
  return emojiMap[c];
}

function pad(num, size){ return ('000' + num).substr(-size); }
function hexString(r,g,b){ return "#"+ r.toString() + g.toString() + b.toString(); }
