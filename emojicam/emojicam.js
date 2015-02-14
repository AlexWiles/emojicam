function setupEmojis() {
  emojiMap = loadEmojis();
  emojiInts = emojiPoints();
}

function drawEmojis(imageData, pixelSize, originX, originY){
  imageData.loadPixels();
  var i;
  for (var y=0; y<imageData.height; y+=pixelSize) {
    for (var x=0; x<imageData.width; x+=pixelSize) {
      i = (y * width + x)*4;
      emoji = closestEmoji(imageData.pixels[i], imageData.pixels[i+1], imageData.pixels[i+2]);
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
