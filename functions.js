function generate_shapes() {
    /*
        Generates the shapes in white on a black background.
     */

    let cell_width = width / 50 //this should be a param
    let cell_height = height / 50 //this should be a param

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


function generate_not_shapes(shape_pixels) {
    /*
        Draws the pixels that don't belong to the shapes, potentially after setting a specific background.
        
        CAUTION: apparently, if something is drawn (a shape, the background...) between a call to loadPixels
        and updatePixels, it won't be drawn, even if the pixels in the pixel array are not manipulated. So
        draw either before or after, but not in between.
    */

    loadPixels()
    
    for(idx = 0; idx < shape_pixels.length; idx++) {
        if (!shape_pixels[idx]) {   //toggle "!" in "!shape_pixels[idx]" for opposite results
            pixels[idx * 4] = 0
            pixels[idx * 4 + 1] = 0
            pixels[idx * 4 + 2] = 0
            pixels[idx * 4 + 3] = 255
        }
    }

    updatePixels()
}


function get_back_img_pixels(shape_pixels, image) {
    /*
        First, maps the marked pixels on the canvas to the corresponding ones in the background image.
        Then, extracts the color values of such pixels in the background image.
        Returns an array containing such color values.
    */

    image.loadPixels()

    let back_img_pixels_idxs = new Array()
    for(let idx = 0; idx < shape_pixels.length; idx++) {
        if(shape_pixels[idx]) {
            mapped_idx = Math.round(map(idx, 0, shape_pixels.length, 0, image.pixels.length / 4))
            back_img_pixels_idxs.push(mapped_idx)
        }
    }

    let back_img_pixels = new Array()
    for(let idx = 0; idx < back_img_pixels_idxs.length; idx++) {
        r = image.pixels[back_img_pixels_idxs[idx] * 4]
        g = image.pixels[back_img_pixels_idxs[idx] * 4 + 1]
        b = image.pixels[back_img_pixels_idxs[idx] * 4 + 2]
        a = 255
        c = color(r, g, b, a)
        back_img_pixels.push(c)
    }

    return back_img_pixels
}


function set_back_img_pixels(shape_pixels, back_img_pixels) {
    /*
        Iterates through the canvas pixels and replaces the color values of each marked with the color values
        of the first element in the back_img_pixels array. Then, pops such element.
        Then, updates the pixels array.
     */

    loadPixels()
    print(shape_pixels.length)
    print(pixels.length)

    for(let idx = 0; idx < shape_pixels.length; idx++) {
        if(shape_pixels[idx]) {
            c = back_img_pixels.shift()
            pixels[idx * 4] = red(c)
            pixels[idx * 4 + 1] = green(c)
            pixels[idx * 4 + 2] = blue(c)
            pixels[idx * 4 + 3] = 255
        }
    }

    updatePixels()
}