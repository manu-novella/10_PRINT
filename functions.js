function generate_gridlike_pattern(cell_width, cell_height) {
    /*
        Generates the shapes in white on a black background.
    */

    background(0)
    stroke(255)

    for(x = 0; x <= width; x += cell_width) {
        for(y = 0; y <= height; y += cell_height) {   
          if (random() > 0.5) {
            line(x, y, x + cell_width, y + cell_height)
          } else {
            line(x + cell_width, y, x, y + cell_height)
          }
        }
    }
}


function generate_central_circle(circle_width, circle_height, circle_diameter) {
    /*
        Generates a circle in white on a black background
    */

    background(0)
    stroke(255)

    circle(circle_width, circle_height, circle_diameter)
}


function get_shape_pixels() {
    /*
        Extracts the pixels whose elements have all a color value above 0 from the pixels array.
        Returns a one-dimensional array of booleans of size width*height indicating whether each pixel
        belongs to a shape.
    */
    
    loadPixels()

    //generate pixel array
    let shape_pixels = new Array(pixels.length / 4)

    for(let idx = 0; idx < pixels.length; idx += 4) {
        if(pixels[idx] == 255 && pixels[idx + 1] == 255 && pixels[idx + 2] == 255) { //red, green, blue
            shape_pixels[idx / 4] = true    //pixel belongs in shape
        } else {
            shape_pixels[idx / 4] = false   //pixel doesn't belong in shape
        }    
    }

    return shape_pixels
}


function generate_not_shapes(shape_pixels, bg_color) {
    /*
        Draws the pixels, in black, that don't belong to the shapes or patterns, potentially after setting a specific background.
        
        CAUTION: apparently, if something is drawn (a shape, the background...) between a call to loadPixels
        and updatePixels, it won't be drawn, even if the pixels in the pixel array are not manipulated. So
        draw either before or after, but not in between.
    */

    loadPixels()
    
    for(idx = 0; idx < shape_pixels.length; idx++) {
        if (!shape_pixels[idx]) {   //toggle "!" in "!shape_pixels[idx]" for opposite results
            pixels[idx * 4] = red(bg_color)
            pixels[idx * 4 + 1] = green(bg_color)
            pixels[idx * 4 + 2] = blue(bg_color)
            pixels[idx * 4 + 3] = alpha(bg_color)
        }
    }

    updatePixels()
}