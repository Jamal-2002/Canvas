const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
  x: undefined,
  y: undefined,
  //radius: (canvas.height/80) * (canvas.width/80)
  radius: 150

}

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

function randomizer(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

// Event Listeners
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX
  mouse.y = event.clientY
})

addEventListener('mouseout', (event) => {
    mouse.x = undefined;
    mouse.y = undefined;
  })


addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight

  init()
})

function getDistance(object1,object2)
  {
    const dx = object2.x - object1.x;
    const dy =  object2.y- object1.y;
    return Math.sqrt(dx*dx+dy*dy);
  }


let backgroundcolor = 'white';
let strokecolor = 'black';
function inversecolor()
{
  if (backgroundcolor === 'white') backgroundcolor = 'black';
  else backgroundcolor = 'white';


  if (strokecolor === 'white') strokecolor = 'black';
  else strokecolor = 'white';
}


// Objects
class Point
{
  constructor(x,y)

  {
    this.x = x;
    this.y = y;
  }
  getDistance(v)
  {
    const dx = this.x - v.x;
    const dy =  this.y- v.y;
    return Math.sqrt(dx**2+dy**2)
  }
}

class Agent
{
  constructor(x,y)
  {
    this.pos = new Point(x,y);
    this.radius = (randomizer(2,3));
    this.velocity = new Point(randomizer(-1,1)+0.1,randomizer(-1,1)+0.1);
  }

  bounce(width,height)
  {
  if(this.pos.x < 0 || this.pos.x >= canvas.width) this.velocity.x *= -1;
  if(this.pos.y < 0 || this.pos.y >= canvas.height) this.velocity.y *= -1;
      
   if (getDistance(mouse,this.pos) < mouse.radius + this.radius){
      if (mouse.x < this.pos.x && this.pos.x < canvas.width - this.radius * 10)
      {
          this.pos.x += 3;
      }
      if (mouse.x > this.pos.x && this.pos.x > this.radius * 3)
      {
          this.pos.x -= 3;
      }
      if (mouse.y < this.pos.y && this.pos.y < canvas.height - this.radius * 3)
      {
          this.pos.y += 3;
      }
      if (mouse.y > this.pos.y && this.pos.y > this.radius * 3)
      {
          this.pos.y -= 3;
      }
      
    }  

this.pos.x += this.velocity.x;
this.pos.y += this.velocity.y;
this.draw()
  }


  draw()
  { 
    let each_rad = this.radius +randomizer(0,20);

    c.beginPath();
    c.lineWidth = 5;
    c.fillStyle = 'grey';
    c.arc(this.pos.x,this.pos.y,this.radius,0,Math.PI * 2);
    c.fill();

    


  }

}
// Implementation
let agents;
size = canvas.width*canvas.height;
function init() {
  agents = []
  for (let i = 0; i < size/3000; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    agents.push(new Agent(x,y))
  }
}

//random_set = randomset(colors_set);
//color = randomColor(random_set)


let alpha = 1;

// Animation Loop
function animate() {
  requestAnimationFrame(animate)
  c.fillStyle = backgroundcolor;
  c.fillRect(0, 0, canvas.width, canvas.height);

  
  c.globalAlpha = alpha;

  for (let i =0;i < agents.length;i++)
  {
    const agent1 = agents[i];
    for (let j = i + 1; j < agents.length; j++) 
    {
      const agent2 = agents[j];
  
      const dist = agent1.pos.getDistance(agent2.pos);
  
      if (dist > 100) continue;
  
      //c.lineWidth = 1 + ((dist-0)*(1-12))/(200-0);
      //math.mapRange(dist,0,200,12,1);
  
      c.beginPath();
      c.strokeStyle = strokecolor;
      c.lineWidth = 1;
      c.moveTo(agent1.pos.x,agent1.pos.y);
      c.lineTo(agent2.pos.x,agent2.pos.y);
      c.stroke();
  
      
    }
  
  
  }



  agents.forEach(agent => {
    agent.bounce()
   })


   if (mouseDown && alpha >= 0.05) {
    alpha -= 0.0055;
  } else if (!mouseDown && alpha < 1) {
    alpha += 0.01;
  }

   

}





let mouseDown = false;
addEventListener('mousedown', () => {
  mouseDown = true;
  inversecolor();
});

addEventListener('mouseup', () => {
  mouseDown = false;
  inversecolor();
});


















init();
animate();