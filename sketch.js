// Predefine some variables:
let m1Slider, m2Slider, wavelengthSlider, inangleSlider;
let po_selector;
var moving_in_x=800;
var moving_in_y=310;
var moving_refl_x = 800;
var moving_refr_x = 800;
var moving_refl_y_1 = 189;
var moving_refl_y_2 = 309;
var moving_refr_y_1 = 309;
var moving_refr_y_2 = 189;
var origin_m1 = 0;
var origin_m2 = 0;
var points = new Array(90);
var points_f2_1 = new Array(180);
var points_f2_2 = new Array(180);
var points_f3_1 = new Array(180);
var points_f3_2 = new Array(180);

// Preload the two images for use:
function preload(){
  img = loadImage('protractor.jpg');
  torch = loadImage('torch-1.png');
}

function mySelectEvent() {
  po_selector = sel.value();
}

function sliderChange(){
  m1Input.value(m1Slider.value());
  m2Input.value(m2Slider.value());
  // wavelengthInput.value(wavelengthSlider.value());
  inangleInput.value(inangleSlider.value());
}

function updateValue(){
  m1Slider.value(m1Input.value());
  m2Slider.value(m2Input.value());
  // wavelengthSlider.value(wavelengthInput.value());
  inangleSlider.value(inangleInput.value());
}

function drawArrow(base, vec, myColor) {
  push();
  stroke(myColor);
  strokeWeight(2);
  fill(myColor);
  translate(base.x, base.y);
  line(0, 0, vec.x, vec.y);
  rotate(vec.heading());
  let arrowSize = 4;
  translate(vec.mag() - arrowSize, 0);
  triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
  pop();
}

function drawIncidence(base, vec, myColor) {
  push();
  stroke(myColor);
  strokeWeight(3);
  fill(myColor);
  translate(base.x, base.y);
  line(0, 0, vec.x, vec.y);
  rotate(vec.heading());
  let arrowSize = 4;
  translate(0, 0);
  triangle(arrowSize, arrowSize / 2, arrowSize, -arrowSize / 2, 0, 0);
  pop();
}

function drawRe(base, vec, myColor) {
  push();
  stroke(myColor);
  strokeWeight(3);
  fill(myColor);
  translate(base.x, base.y);
  line(0, 0, vec.x, vec.y);
  rotate(vec.heading());
  let arrowSize = 4;
  translate(vec.mag() - arrowSize, 0);
  triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
  pop();
}

function draw_torch(image){
  translate(width / 2, height / 2);
  rotate(PI / 180 * 45);
  image(torch, 0, 0, 150, 150);
}

function angle_graph(inangle,m1,m2){
  seed = 100 * random();
  // var points;
  for (i = 0; i <= 90; i++) {
    if(inangle <= 90){
      if (sin(PI/180*i)*m2/m1 <= 1){
        points[i] = new GPoint(i, asin(sin(PI/180*i)*m1/m2)*180/PI);
      }
      else{
        points[i] = new GPoint(i,90);
      }
    }
    else{
      if (sin(PI/180*i)*m1/m2 <= 1){
        points[i] = new GPoint(i, asin(sin(PI/180*i)*m2/m1)*180/PI);
      }
      else{
        points[i] = new GPoint(i,90);
      }
    }
  }
  plot = new GPlot(this);
  plot.setPos(20, 400);
  plot.setOuterDim(340, 300);

  // Add the points
  plot.setPoints(points);

  // Set the plot title and the axis labels
  plot.setBgColor("#f9f7f6");
  plot.setBoxBgColor("255");
  plot.setBoxLineColor("#f9f7f6");
  plot.setPointSize(3);
  plot.setTitleText("Incidence vs Refracted angle");
  plot.getYAxis().setAxisLabelText("Refracted angle (degree)");
  plot.getXAxis().setAxisLabelText("Incidence angle (degree)");
  
  plot.defaultDraw();
}

function reflection_graph(inangle,m1,m2,polarization){
  seed = 100 * random();
  for (i = 0; i <= 180; i++) {
    var points_y1;
    var points_y2;
    if(i<=90){
      points_y1 = Math.abs((m1*cos(PI/180*i)-m2*sqrt(1-(m1*sin(PI/180*i)/m2)^2))/(m1*cos(PI/180*i)+m2*sqrt(1-(m1*sin(PI/180*i)/m2)^2)))*Math.abs((m1*cos(PI/180*i)-m2*sqrt(1-(m1*sin(PI/180*i)/m2)^2))/(m1*cos(PI/180*i)+m2*sqrt(1-(m1*sin(PI/180*i)/m2)^2)));
      points_y2 = Math.abs((-m2*cos(PI/180*i)+m1*sqrt(1-(m1*sin(PI/180*i)/m2)^2))/(m2*cos(PI/180*i)+m1*sqrt(1-(m1*sin(PI/180*i)/m2)^2)))*Math.abs((-m2*cos(PI/180*i)+m1*sqrt(1-(m1*sin(PI/180*i)/m2)^2))/(m2*cos(PI/180*i)+m1*sqrt(1-(m1*sin(PI/180*i)/m2)^2)));
    }
    else{
      points_y1 = Math.abs((m2*cos(PI/180*(180-i))-m1*sqrt(1-(m2*sin(PI/180*(180-i))/m1)^2))/(m1*cos(PI/180*(180-i))+m1*sqrt(1-(m2*sin(PI/180*(180-i))/m1)^2)))*Math.abs((m2*cos(PI/180*(180-i))-m1*sqrt(1-(m2*sin(PI/180*(180-i))/m1)^2))/(m1*cos(PI/180*(180-i))+m1*sqrt(1-(m2*sin(PI/180*(180-i))/m1)^2)));
      points_y2 = Math.abs((-m1*cos(PI/180*(180-i))+m2*sqrt(1-(m2*sin(PI/180*(180-i))/m1)^2))/(m2*cos(PI/180*(180-i))+m2*sqrt(1-(m2*sin(PI/180*(180-i))/m1)^2)))*Math.abs((-m1*cos(PI/180*(180-i))+m2*sqrt(1-(m2*sin(PI/180*(180-i))/m1)^2))/(m2*cos(PI/180*(180-i))+m2*sqrt(1-(m2*sin(PI/180*(180-i))/m1)^2)));
    }
    points_f2_1[i] = new GPoint(i, points_y1*100);
    points_f2_2[i] = new GPoint(i, points_y2*100);
  }
  
  plot1 = new GPlot(this);
  plot1.setPos(330, 400);
  plot1.setOuterDim(350, 300);
  plot1.setAxesOffset(8);
  plot1.setTicksLength(8);
  plot2 = new GPlot(this);
  plot2.setPos(plot1.getPos());
  plot2.setMar(plot1.getMar());
  plot2.setDim(plot1.getDim());
  plot2.setAxesOffset(8);
  plot2.setTicksLength(8);

  // Add the points
  plot1.setPoints(points_f2_1);
  plot2.setPoints(points_f2_2);
  
  if (polarization == "s-polarization"){
    f2Input.value(points_f2_1[inangle].y);
  }
  else {
    f2Input.value(points_f2_2[inangle].y);
  }
  plot1.setXLim(0,180);
  plot2.setXLim(0,180);
  plot1.setYLim(0,100);
  plot2.setYLim(0,100);

  if (polarization == "s-polarization"){
    plot1.setBgColor("#f9f7f6");
    plot1.setBoxBgColor("255");
    plot1.setBoxLineColor("#f9f7f6");
    plot1.setPointColor("green");
    plot1.setPointSize(3);
    plot1.setTitleText("Power reflection coefficient");
    plot1.getXAxis().setAxisLabelText("Incidence angle (degree)");
    plot1.getYAxis().setAxisLabelText("Percentage");
    plot1.defaultDraw();
  }
  else{
    plot2.setBgColor("#f9f7f6");
    plot2.setBoxBgColor("255");
    plot2.setBoxLineColor("#f9f7f6");
    plot2.setPointSize(3);
    plot2.setTitleText("Power reflection coefficient");
    plot2.getXAxis().setAxisLabelText("Incidence angle (degree)");
    plot2.getYAxis().setAxisLabelText("Percentage");
    plot2.setPointColor("green");
    plot2.setPointSize(3);
    plot2.defaultDraw();
  }
}

function transmission_graph(inangle,m1,m2,polarization){
  seed = 100 * random();
  for (i = 0; i <= 180; i++) {
    var points_y1;
    var points_y2;
    if(i<=90){
      points_y1 = 1-Math.abs((m1*cos(PI/180*i)-m2*sqrt(1-(m1*sin(PI/180*i)/m2)^2))/(m1*cos(PI/180*i)+m2*sqrt(1-(m1*sin(PI/180*i)/m2)^2)))*Math.abs((m1*cos(PI/180*i)-m2*sqrt(1-(m1*sin(PI/180*i)/m2)^2))/(m1*cos(PI/180*i)+m2*sqrt(1-(m1*sin(PI/180*i)/m2)^2)));
      points_y2 = 1-Math.abs((-m2*cos(PI/180*i)+m1*sqrt(1-(m1*sin(PI/180*i)/m2)^2))/(m2*cos(PI/180*i)+m1*sqrt(1-(m1*sin(PI/180*i)/m2)^2)))*Math.abs((-m2*cos(PI/180*i)+m1*sqrt(1-(m1*sin(PI/180*i)/m2)^2))/(m2*cos(PI/180*i)+m1*sqrt(1-(m1*sin(PI/180*i)/m2)^2)));
    }
    else{
      points_y1 = 1-Math.abs((m2*cos(PI/180*(180-i))-m1*sqrt(1-(m2*sin(PI/180*(180-i))/m1)^2))/(m1*cos(PI/180*(180-i))+m1*sqrt(1-(m2*sin(PI/180*(180-i))/m1)^2)))*Math.abs((m2*cos(PI/180*(180-i))-m1*sqrt(1-(m2*sin(PI/180*(180-i))/m1)^2))/(m1*cos(PI/180*(180-i))+m1*sqrt(1-(m2*sin(PI/180*(180-i))/m1)^2)));
      points_y2 = 1-Math.abs((-m1*cos(PI/180*(180-i))+m2*sqrt(1-(m2*sin(PI/180*(180-i))/m1)^2))/(m2*cos(PI/180*(180-i))+m2*sqrt(1-(m2*sin(PI/180*(180-i))/m1)^2)))*Math.abs((-m1*cos(PI/180*(180-i))+m2*sqrt(1-(m2*sin(PI/180*(180-i))/m1)^2))/(m2*cos(PI/180*(180-i))+m2*sqrt(1-(m2*sin(PI/180*(180-i))/m1)^2)));
    }
    points_f3_1[i] = new GPoint(i, points_y1*100);
    points_f3_2[i] = new GPoint(i, points_y2*100);
  }
  
  plot1 = new GPlot(this);
  plot1.setPos(640, 400);
  plot1.setOuterDim(350, 300);
  plot1.setAxesOffset(8);
  plot1.setTicksLength(8);
  plot2 = new GPlot(this);
  plot2.setPos(plot1.getPos());
  plot2.setMar(plot1.getMar());
  plot2.setDim(plot1.getDim());
  plot2.setAxesOffset(8);
  plot2.setTicksLength(8);

  // Add the points
  plot1.setPoints(points_f3_1);
  plot2.setPoints(points_f3_2);
  
  if (polarization == "s-lpolarization"){
    f3Input.value(points_f3_1[inangle].y);
  }
  else{
    f3Input.value(points_f3_2[inangle].y);
  }
  plot1.setXLim(0,180);
  plot2.setXLim(0,180);
  plot1.setYLim(0,100);
  plot2.setYLim(0,100);

  if (polarization == "s-polarization"){
    plot1.setBgColor("#f9f7f6");
    plot1.setBoxBgColor("255");
    plot1.setBoxLineColor("#f9f7f6");
    plot1.setPointColor("green");
    plot1.setPointSize(3);
    plot1.setTitleText("Power transmission coefficient");
    plot1.getXAxis().setAxisLabelText("Incidence angle (degree)");
    plot1.getYAxis().setAxisLabelText("Percentage");
    plot1.defaultDraw();
  }
  else{
    plot2.setBgColor("#f9f7f6");
    plot2.setBoxBgColor("255");
    plot2.setBoxLineColor("#f9f7f6");
    plot2.setPointSize(3);
    plot2.setTitleText("Power transmission coefficient");
    plot2.getXAxis().setAxisLabelText("Incidence angle (degree)");
    plot2.getYAxis().setAxisLabelText("Percentage");
    plot2.setPointColor("green");
    plot2.setPointSize(3);
    plot2.defaultDraw();
  }
}

function draw_torch(inangle,center){
  push();
   translate(center.x-160*sin(PI/180*inangle), center.y-160*cos(PI/180*inangle));
   rotate(PI/180*(90-inangle) + PI);
   imageMode(CENTER);
   image(torch, 0, 0, 40, 20);
  pop();
}

// Setup the environment:
function setup() {
  createCanvas(1000, 800);
  textSize(12);
  
  // Sliders:
  m1Slider = createSlider(1, 2.5, 1, 0.01);
  m1Slider.style('width', '200px');
  m1Slider.position(700, 350);
  m1Input = createInput(1);
  m1Input.position(880,330);
  m1Input.size(25);
  m1Slider.input(sliderChange);
  m1button = createButton('Change');
  m1button.position(m1Input.x + m1Input.width+10, m1Input.y);
  m1button.mousePressed(updateValue);
  
  // medium 2 slider:
  m2Slider = createSlider(1, 2.5, 1, 0.01);
  m2Slider.style('width', '200px');
  m2Slider.position(700, 430);
  m2Input = createInput(1);
  m2Input.position(880,410);
  m2Input.size(25);
  m2Slider.input(sliderChange);
  m2button = createButton('Change');
  m2button.position(m2Input.x + m2Input.width+10, m2Input.y);
  m2button.mousePressed(updateValue);
  
  // incidence angle slider:
  inangleSlider = createSlider(0, 180, 45, 1);
  inangleSlider.style('width', '200px');
  inangleSlider.position(700, 500);
  inangleInput = createInput(45);
  inangleInput.position(880,480);
  inangleInput.size(25);
  inangleSlider.input(sliderChange);
  iabutton = createButton('Change');
  iabutton.position(inangleInput.x + inangleInput.width+10, inangleInput.y);
  iabutton.mousePressed(updateValue);
  
  // Input boxes:
  f1Input = createInput(45);
  f1Input.position(220,1010);
  f1Input.size(25);
  f2Input = createInput();
  f2Input.position(500,1030);
  f2Input.size(32);
  f3Input = createInput();
  f3Input.position(820,1030);
  f3Input.size(32);

  
  // Selector:
  sel = createSelect();
  sel.position(70, 590);
  sel.option('s-polarization');
  sel.option('p-polarization');
  sel.changed(mySelectEvent);
}


function draw() {
  // Assign values:
  const m1 = m1Slider.value();
  const m2 = m2Slider.value();
  const inangle = inangleSlider.value();
  const polarization = po_selector;
  
  // Calculate the necessary quantities:
  var refracted_angle_1 = asin(sin(PI/180*inangle)*m1/m2)*180/PI;
  var refracted_angle_2 = asin(sin(PI/180*(180-inangle))*m2/m1)*180/PI;
  var reflco;
  var refrco;
  if (polarization == "s-polarization"){
    if (inangle <= 90){
      reflco = Math.abs((m1*cos(PI/180*inangle)-m2*sqrt(1-(m1*sin(PI/180*inangle)/m2)^2))/(m1*cos(PI/180*inangle)+m2*sqrt(1-(m1*sin(PI/180*inangle)/m2)^2)))*Math.abs((m1*cos(PI/180*inangle)-m2*sqrt(1-(m1*sin(PI/180*inangle)/m2)^2))/(m1*cos(PI/180*inangle)+m2*sqrt(1-(m1*sin(PI/180*inangle)/m2)^2)));
      refrco = 1- reflco;
    }
    else{
      reflco = Math.abs((m2*cos(PI/180*(180-inangle))-m1*sqrt(1-(m2*sin(PI/180*(180-inangle))/m1)^2))/(m1*cos(PI/180*(180-inangle))+m1*sqrt(1-(m2*sin(PI/180*(180-inangle))/m1)^2)))*Math.abs((m2*cos(PI/180*(180-inangle))-m1*sqrt(1-(m2*sin(PI/180*(180-inangle))/m1)^2))/(m1*cos(PI/180*(180-inangle))+m1*sqrt(1-(m2*sin(PI/180*(180-inangle))/m1)^2)));
      refrco = 1- reflco;
    }      
  }
  else{
    if (inangle <= 90){
      reflco = Math.abs((-m2*cos(PI/180*inangle)+m1*sqrt(1-(m1*sin(PI/180*inangle)/m2)^2))/(m2*cos(PI/180*inangle)+m1*sqrt(1-(m1*sin(PI/180*inangle)/m2)^2)))*Math.abs((-m2*cos(PI/180*inangle)+m1*sqrt(1-(m1*sin(PI/180*inangle)/m2)^2))/(m2*cos(PI/180*inangle)+m1*sqrt(1-(m1*sin(PI/180*inangle)/m2)^2)));
      refrco = 1- reflco;
    }
    else{
      reflco = Math.abs((-m1*cos(PI/180*(180-inangle))+m2*sqrt(1-(m2*sin(PI/180*(180-inangle))/m1)^2))/(m2*cos(PI/180*(180-inangle))+m2*sqrt(1-(m2*sin(PI/180*(180-inangle))/m1)^2)))*Math.abs((-m1*cos(PI/180*(180-inangle))+m2*sqrt(1-(m2*sin(PI/180*(180-inangle))/m1)^2))/(m2*cos(PI/180*(180-inangle))+m2*sqrt(1-(m2*sin(PI/180*(180-inangle))/m1)^2)));
      refrco = 1- reflco;
    }    
  }
  
  // Draw the canvas for mediums:
  stroke(255);
  let c1 = color(204-40*(m1-1), 229-40*(m1-1), 255);
  fill(c1);
  let uppermedium = rect(60, 0, 600, 190);
  let c2 = color(204-40*(m2-1), 255, 204-40*(m2-1));
  fill(c2);
  let lowermedium = rect(60, 190, 600, 190);
  let center = createVector(360, 190);
  line(center.x, center.y+150, center.x, center.y-150);
  stroke(255);

  // Draw the pointer for protractor:
  image(img, 680, 240, img.width / 2.5, img.height / 2.5);
  let v0 = createVector(680+img.width/5, 240 + img.height/2.9);
  let v1;
  if (inangle <= 90){
    v1 = createVector(-100*cos(PI/180*inangle), -100*sin(PI/180*inangle));
  }
  else{
    v1 = createVector(100*cos(PI/180*(180-inangle)), -100*sin(PI/180*(180-inangle)));
  }
  drawArrow(v0, v1, 'red');
  
  // Texts for the controllers:
  let text_color = color(19,47,154);
  fill(text_color);
  text('Refraction index for medium 1', m1Slider.x, m1Input.y-310, 180, 30);
  text('Refraction index for medium 2', m2Slider.x, m2Input.y-310, 180, 30);
  text('Incidence angle', inangleSlider.x, inangleInput.y-310, 180, 30);
  
  text('Current refraction angle', 80, 700, 180, 30);
  text('Current power reflection coefficient', 410, 700, 300, 30);
  text('Current power transmission coefficient', 720, 700, 300, 30);
  
  // Draw the torch:
  draw_torch(inangle, center);
  
  // Draw the incidence light:
  let incidence_base = createVector(center.x, center.y);
  let incidence_vec;
  if (inangle == 0){
    incidence_vec = createVector(0, -120);
   }
  else if (inangle < 90){
    incidence_vec = createVector(-120*sin(PI/180*(inangle)), -120*cos(PI/180*(inangle)));
  }
  else if (inangle == 90){
    incidence_vec = createVector(-120, 0);
  }
  else if (inangle < 180){
    incidence_vec = createVector(-120*sin(PI/180*(180-inangle)), 120*cos(PI/180*(180-inangle)));
  }
  else{
    incidence_vec = createVector(0, 120);
  }
  drawIncidence(incidence_base, incidence_vec, 'orange');
  
  // Draw the reflected light:
  let reflected_base = createVector(center.x, center.y);
  let reflected_vec;
  if (inangle == 0){
    if(m1 == m2){
      reflected_vec = createVector(0, 0);
    }
    else{
      reflected_vec = createVector(0, -120);
    }
   }
  else if (inangle < 90){
    if (m1 != m2){
      reflected_vec = createVector(120*sin(PI/180*(inangle)), -120*cos(PI/180*(inangle)));
    }
    else{
      reflected_vec = createVector(0, 0);
    }
  }
  else if (inangle == 90){
    reflected_vec = createVector(0, 0);
  }
  else if (inangle < 180){
    if (m1 != m2){
      reflected_vec = createVector(120*sin(PI/180*(180-inangle)), 120*cos(PI/180*(180-inangle)));
    }
    else{
      reflected_vec = createVector(0, 0);
    }
  }
  else{
    if (m1 == m2){
      reflected_vec = createVector(0,0);
    }
    else{
      reflected_vec = createVector(0,120);
    }
  }
  drawRe(reflected_base, reflected_vec, 'orange');
  
  // Draw the refracted light:
  let refracted_base = createVector(center.x, center.y);
  let refracted_vec;
  if (inangle == 0){
    refracted_vec = createVector(0, 120);
  } 
  else if (inangle < 90){
    refracted_vec = createVector(120*sin(PI/180*(refracted_angle_1)), 120*cos(PI/180*(refracted_angle_1)));
  }
  else if (inangle == 90){
    refracted_vec = createVector(120, 0);
  }
  else if(inangle < 180){
    refracted_vec = createVector(120*sin(PI/180*(refracted_angle_2)), -120*cos(PI/180*(refracted_angle_2)));
  }
  else{
    refracted_vec = createVector(0, -120);
  }
  drawRe(refracted_base, refracted_vec, 'orange');

  // Define moving balls:
  ellipseMode(CENTER);
  moving_in_x = moving_in_x + Math.abs(incidence_vec.x)/50;
  moving_refl_x = moving_refl_x + Math.abs(reflected_vec.x)/50;
  moving_refr_x = moving_refr_x + Math.abs(refracted_vec.x)/50;
  
  let in_ball_col = color(200, 149, 147);
  let refl_ball_col = color(200, 149, 147);
  let refr_ball_col = color(200, 149, 147);
  
  // Draw incidence balls:
  fill(in_ball_col);
  if(moving_in_x > center.x)
  {
    moving_in_x = center.x + incidence_vec.x;
  }
  ellipse(moving_in_x, tan((90 - inangle)*PI/180)*(moving_in_x - center.x) + center.y, 15, 15);
  
  // Draw reflected and refracted balls:
  if(moving_refl_x > center.x + reflected_vec.x )
  {
    moving_refl_x = center.x;
  }
  if(inangle <= 90){
    if(moving_refr_x > center.x + refracted_vec.x ){
      moving_refr_x = center.x;
    }
    if(inangle != 90 && inangle != 0){
      fill(refl_ball_col);
      if (m1 != m2){
        if (Math.abs(inangle+refracted_angle_1-90)>= 1 || polarization != "p-polarization"){
          ellipse(moving_refl_x, -tan((90 - inangle)*PI/180)*(moving_refl_x - center.x) + center.y, 15, 15);
        }
      }
    }
    if(inangle != 0){
      fill(refr_ball_col);
      ellipse(moving_refr_x, tan((90 - refracted_angle_1)*PI/180)*(moving_refr_x - center.x) + center.y, 15, 15);
    }
  }
  else if (inangle < 180){
    if(moving_refr_x > center.x + refracted_vec.x ){
      moving_refr_x = center.x;
    }
    if (m1 != m2){
      if (Math.abs(90-inangle+refracted_angle_2) > 0.01 || polarization != "p-polarization"){
        fill(refl_ball_col);
        ellipse(moving_refl_x, -tan((90 - inangle)*PI/180)*(moving_refl_x - center.x) + center.y, 15, 15);
      }
    }
    fill(refr_ball_col);
    ellipse(moving_refr_x, -tan((90 - refracted_angle_2)*PI/180)*(moving_refr_x - center.x) + center.y, 15, 15);
  }
  
  // Deal with the case of 0 and 180 degree:
  if(inangle == 0){
    moving_in_y = moving_in_y + 2.4;
    moving_refr_y_1 = moving_refr_y_1 + 2.4;
    if(moving_in_y > center.y){
      moving_in_y = center.y + incidence_vec.y;
    }
    fill(in_ball_col);
    ellipse(center.x, moving_in_y, 15, 15);
  
    if(moving_refr_y_1 > center.y + 120){
      moving_refr_y_1 = center.y;
    }
    fill(refr_ball_col);
    ellipse(center.x, moving_refr_y_1, 15, 15);
    if (m1 != m2){
      moving_refl_y_1 = moving_refl_y_1 - 2.4;
        if(moving_refl_y_1 < center.y - 120){
          moving_refl_y_1 = center.y;
        }
      fill(refl_ball_col);
      ellipse(center.x, moving_refl_y_1, 15, 15);  
    }
  }
  
  if(inangle == 180){
    moving_in_y = moving_in_y - 2.4;
    moving_refr_y_2 = moving_refr_y_2 - 2.4;
    if(moving_in_y < center.y){
      moving_in_y = center.y + incidence_vec.y;
    }
    fill(in_ball_col);
    ellipse(center.x, moving_in_y, 15, 15);
    if(moving_refr_y_2 < center.y - 120){
      moving_refr_y_2 = center.y;
    }
    fill(refr_ball_col);
    ellipse(center.x, moving_refr_y_2, 15, 15);
    if (m1 != m2){
      moving_refl_y_2 = moving_refl_y_2 + 2.4;
      if(moving_refl_y_2 > center.y+120){
        moving_refl_y_2 = center.y;
      }
      fill(refl_ball_col);
      ellipse(center.x, moving_refl_y_2, 15, 15);  
    }
  }
  
  // Plot the three graphs:
  angle_graph(inangle,m1,m2);
  reflection_graph(inangle,m1,m2,polarization);
  transmission_graph(inangle,m1,m2,polarization);
  
  f1Input.value(int(refracted_angle_1));
}


