let img

function preload() {
  img = loadImage('assets/sample_gradient.png')
}


function setup() {
  let canvas = createCanvas(600, 600);
  noSmooth() //disables antialiasing, so it is less expensive
  pixelDensity(1) //adjusts 1 logic pixel per physical pixel
  strokeWeight(4)

  generate_shapes()
  let shape_pixels = get_shape_pixels()
  image(img, 0, 0, width, height)
  generate_not_shapes(shape_pixels)

  /*
  let back_img_pixels = get_back_img_pixels(shape_pixels, img)
  set_back_img_pixels(shape_pixels, back_img_pixels)

  timestamp = Date.now().toString()
  //saveCanvas(canvas, "outputs/" + timestamp, "png")

  noLoop();*/
}


function draw() {

}