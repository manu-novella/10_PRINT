function generate_shapes() {
    /*
        Generates the shapes in white on a black background
     */

    let cell_width = width / 50 //this should be a param
    let cell_height = height / 50 //this should be a param

    background(0, 0, 0)

    for(x = 0; x <= width; x += cell_width) {
        for(y = 0; y <= height; y += cell_height) {
          //stroke(0, 0, 139);
          stroke(255, 255, 255)
    
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
    
    //generate pixel array
    loadPixels()
    let shape_pixels = new Array(pixels.length / 4)

    for(let idx = 0; idx < pixels.length; idx += 4) {
        if(pixels[idx] > 0
            && pixels[idx + 1] > 0
            && pixels[idx + 2] > 0) {
                shape_pixels[idx / 4] = true
        } else {
            shape_pixels[idx / 4] = false
        }    
    }

    return shape_pixels
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