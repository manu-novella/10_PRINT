# 10 PRINT CHR$(205.5+RND(1)) GOTO 10



This is an old program originally written in BASIC in the early days of computers.

Two techniques are used here: first, since p5.js doesn't offer a way to retrieve the pixels used by each drawing, such pixels are retrieved reading the values of the pixels array, "cheating"; second, a layered approach is used to place new layers on top of previous ones in an additive fashion.



## Functions

- **generate_gridlike_pattern**: draws the characteristic grid-like pattern of the famous program, white on a black background.
- **generate_central_circle**: draws a central circle, white on a black background.
- **get_shape_pixels**: retrieves which pixels where affected upon drawing a shape, returning the white pixels and leaving the black ones.
- **generate_not_shapes**: draws again the pixels that where not affected upon drawing a shape, as if drawing the background. Technically, this function paints in the specified color the pixels not set to true in the array passed as an argument. This behavior can be easily toggled.



Two interesting functions to use pixels of a preloaded image were developed in the early stages of this project, accessible in the commit history. They were removed during an optimization of the general algorithm. These two functions, respectively, retrieved the pixels of a preloaded image corresponding to the indicated pixels of the canvas (in case of different canvas an image dimensions) and then drew them on the canvas.