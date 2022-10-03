let drawCount = 0;
let thrs = [];
let tCount = 0;
let probs = [];
const dS = 20;

function sideDraw(fillC, num, x, y, dot, size) {

  const ccf = size*2;
  const cs = 2*ccf;

  fill(fillC);
  rect(x-ccf, y-ccf, cs, cs);

  fill(0);
  if (num == 1) {
    draw1(x, y, dot);
  } else if (num == 2) {
    draw2(x, y, dot, size);
  } else if (num == 3) {
    draw3(x, y, dot, size);
  } else if (num == 4) {
    draw4(x, y, dot, size);
  } else if (num == 5) {
    draw5(x, y, dot, size);
  } else if (num == 6) {
    draw6(x, y, dot, size);
  }
}

function draw1(x, y, dot) {
  ellipse(x, y, dot, dot);
}

function draw2(x, y, dot, size) {
  ellipse(x-size, y-size, dot, dot);
  ellipse(x+size, y+size, dot, dot);
}

function draw3(x, y, dot, size) {
  ellipse(x, y, dot, dot);

  ellipse(x-size, y-size, dot, dot);
  ellipse(x+size, y+size, dot, dot);
}

function draw4(x, y, dot, size) {
  ellipse(x-size, y-size, dot, dot);
  ellipse(x+size, y+size, dot, dot);

  ellipse(x+size, y-size, dot, dot);
  ellipse(x-size, y+size, dot, dot);
}

function draw5(x, y, dot, size) {
  ellipse(x, y, dot, dot);

  ellipse(x-size, y-size, dot, dot);
  ellipse(x+size, y+size, dot, dot);

  ellipse(x+size, y-size, dot, dot);
  ellipse(x-size, y+size, dot, dot);
}

function draw6(x, y, dot, size) {

  ellipse(x-size, y-size, dot, dot);
  ellipse(x+size, y+size, dot, dot);

  ellipse(x+size, y-size, dot, dot);
  ellipse(x-size, y+size, dot, dot);
  
  ellipse(x+size, y, dot, dot);
  ellipse(x-size, y, dot, dot);
}

function finishT(num) {
  tCount++;
  thrs[num-1]++;
  
  for (let i = 0; i < probs.length; i++) {
    probs[i] = thrs[i]/tCount;
  }
}

function rstDc() {
  drawCount = 15;
  loop();
}

function mousePressed() {
  rstDc();
}

function mouseReleased() {
  rstDc();
}


function setup() {
  // put setup code here
  createCanvas(windowWidth, windowHeight);
  rstDc();

  tCount = 0;
  thrs = Array(6).fill(0);
  probs = Array(6).fill(0);

  for (let i = 0; i < 1000; i++) {
    finishT(getRandT());
  }
}

function drawProbs() {

  const m = 10;
  const w = windowWidth-m;
  const h = windowHeight/2;
  const sw = w/6;
  const sh = h*3;
  const srlw = sw - m*2;


  for (let i=0; i<probs.length; i++) {
    let cso = m+sw*i;
    let csh = sh*probs[i];

    let cscw = srlw/2;

    fill(128);
    rect(cso,0,srlw,csh);

    sideDraw(128, i+1, cso+cscw, cscw, dS/3, cscw/2);
  }
}

function getRandT() {
  return 1 + Math.floor(Math.random()*6);
}


function draw() {
  // put drawing code here
  background(0,0,255);

  drawProbs();


  if (drawCount > 0) {
    drawCount--;
    return;
  }
  
  const cw = windowWidth/2;
  const ch = windowHeight/2;
  const d = dS;
  const s = 50;

  let num = getRandT();

  sideDraw(255, num, cw, ch, d, s);

  noLoop();
  finishT(num);
}
