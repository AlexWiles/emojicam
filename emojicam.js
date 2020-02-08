 let cam;

 function preload(){
 }

 function setup() {
   // shaders require WEBGL mode to work
   createCanvas(710, 400);
   noStroke();
   cam = createCapture(VIDEO);
   cam.size(710, 400);
   cam.hide();
 }

 function draw() {
  background(255);
  image(cam, 0, 0, 320, 240);
 }