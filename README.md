# emojicam [emojibooth.biz](http://emojibooth.biz/)
render image data with emojis

built with [p5.js](http://p5js.org/)

----

##syntax
#####``` drawEmojis(imageData, pixelSize, originX, originY)```
##parameters
`imageData` image or video <br />
`pixelSize` emoji dimension <br />
`originX, originY` where on the canvas to start drawing emojis

using .jpg emojis to calculate average color
![](http://i.imgur.com/omBUGSb.png)

.png's have a transparent background so the average color calculation is different.
![](http://i.imgur.com/pFMyUkk.jpg)

use ```python -m SimpleHTTPServer``` to run locally.
