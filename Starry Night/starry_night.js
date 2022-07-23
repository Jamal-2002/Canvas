const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2 };



c1 = ['#072227','#35858B','#4FBDBA','#AEFEFF'];
c2 = ['#F3C5C5','#C1A3A3','#886F6F','#694E4E'];
c3 = ['#876445','#CA965C','#EEC373','#F4DFBA'];
c4 = ['#222831','#393E46','#00ADB5','#EEEEEE'];
c5 = ['#F9ED69','#F08A5D','#B83B5E','#6A2C70'];
c6 = ['#08D9D6','#252A34','#FF2E63','#FF2E63'];
c7 = ['#F9ED69','#F08A5D','#B83B5E','#6A2C70'];
c7 = ['#2B2E4A','#E84545','#FF2E63','#EAEAEA'];
c8 = ['#F9F7F7','#DBE2EF','#3F72AF','#112D4E'];
c9 = ['#FFB6B9','#FAE3D9','#BBDED6','#61C0BF'];
c10 =['#F67280','#C06C84','#6C5B7B','#355C7D'];
c11 =['#212121','#323232','#0D7377','#14FFEC'];
c12 =['#1FAB89','#62D2A2','#9DF3C4','#1E2022'];
c13 =['#000000','#52057B','#892CDC','#BC6FF1'];
c14 =['#393232','#4D4545','#8D6262','#ED8D8D'];
c15 =['#000000','#5800FF','#E900FF','#FFC600'];
c16 =['#F90716','#FF5403','#FFCA03','#FFF323'];
c17 =['#3B0000','#FF0000','#FF95C5','#FFF6CD'];
c18 =['#0CECDD','#FFF338','#FF67E7','#C400FF'];
c19 =['#F7FD04','#F9B208','#F98404','#FC5404'];
c20 =['#CF0000','#890596','#1CC5DC','#F5F7B2'];
  
  
colors_set = [c1,c2,c3,c4,c5,c6,c7,c8,c9,c10,c11,c12,c13,c14,c15,c16,c17,c18,c19,c20];
  
  
function randomset(set) {
    return set[Math.floor(Math.random() * set.length)];
  }
  
function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)];
  }  

let mouseDown = false;
addEventListener('mousedown', () => {
  mouseDown = true;
});

addEventListener('mouseup', () => {
  mouseDown = false;
});

addEventListener('resize', () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  init();
});

addEventListener("dblclick",function(event)
{
    init();
})

// Objects
class Star {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.shadowColor = this.color;
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
  }

  update() {
    this.draw();
  }}


// Implementation
let particles;
function init() {
  particles = [];
  color_set = randomset(colors_set);
  for (let i = 0; i < 2000; i++) {
    const canvasWidth = canvas.width + 1000;
    const canvasHeight = canvas.height + 2000;

    const x = Math.random() * canvasWidth - canvasWidth / 2;
    const y = Math.random() * canvasHeight - canvasHeight / 2;
    const radius = 2 * Math.random();
    const color = randomColor(color_set);
    particles.push(new Star(x, y, radius, color));
  }
}

// Animation Loop
let radians = 0;
let alpha = 1;
function animate() {
  requestAnimationFrame(animate);
  c.fillStyle = `rgba(0, 0, 0, ${alpha})`;
  c.fillRect(0, 0, canvas.width, canvas.height);

  c.save();
  c.translate(canvas.width / 2, canvas.height / 2);
  c.rotate(radians);
  particles.forEach(particle => {
    particle.update();
  });
  c.restore();

  radians += 0.003;

  if (mouseDown && alpha >= 0.03) {
    alpha -= 0.015;
  } else if (!mouseDown && alpha < 1) {
    alpha += 0.01;
  }
}

init();
animate();