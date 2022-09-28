let img

function preload() {
  img = loadImage('assets/sample_gradient.png')
}


function setup() {
  let canvas = createCanvas(600, 600);
  noSmooth() //disables antialiasing, so it is less expensive
  pixelDensity(1) //adjusts 1 logic pixel per physical pixel, so it's potentially less expensive
  strokeWeight(4)

  generate_gridlike_pattern(width / 50, height / 50)
  let gridlike_pattern_pixels = get_shape_pixels()
  generate_central_circle(width / 2, height / 2, width / 1.09)
  let circle_pixels = get_shape_pixels()

  image(img, 0, 0, width, height)
  generate_not_shapes(gridlike_pattern_pixels, color(0, 0, 0, 255))
  generate_not_shapes(circle_pixels, color(0, 0, 0, 255))

  //timestamp = Date.now().toString()
  //saveCanvas(canvas, "outputs/" + timestamp, "png")

  noLoop()
}


function draw() {

}