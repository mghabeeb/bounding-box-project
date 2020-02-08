## Project description

The bounding data is in `data.json`.

The `bounding_box_data` located in each of the word_data array objects has the x,y coordinates for the box that surrounds a particular word.

The coordinates are the X,Y values for the upper-left point, upper-right point, lower-left point, and lower-right point, in that order.

The image that the bounding boxes overlay is called `imageExample.jpg`, and is of an English textbook page that I found on Google.

The width x height dimensions of the original image are 1017 x 1403.

## What I need

I need a component that does the following - 

1) Takes a json with information like the bounding box object explained above and an image such as the one in imageExample.jpg.
2) Will fit the image to the view it is encapuslated in.
3) Will scale the bounding boxes to the image that is attached.
4) When the image is zoomed, the bounding boxes will move with the image to stay in their correct spaces.
5) When the bounding box is touched, it returns the bounding box data (word, paragraph id, etc.) that created it