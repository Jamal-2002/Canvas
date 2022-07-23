/** @type{HTMLCanvasElement} */

//import {Pane} from 'tweakpane';

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight












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


random_set = randomset(colors_set);


















// Objects
class Root {
  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.dx = Math.random() * 4 - 2;
    this.dy = Math.random() * 4 - 2;
    this.maxSize = Math.random() * 3 + 3;
    this.color = 'green';
    this.size = Math.random() * 0.1 + 0.5;
    this.vs = Math.random() * 0.2 + 0.05 ;
    this.angle = Math.random() * 6.2;
    this.va = Math.random() * 0.6 - 0.3 ;
    this.color = randomColor(random_set);
  }
  update(angle) {
    this.angle += this.va;


    this.x += this.dx + Math.sin(this.angle);
    this.y += this.dy + Math.cos(this.angle);
    this.size += this.vs;
    if (this.size < this.maxSize)
    { c.beginPath()
      c.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      /*c.globalCompositeOperation = 'destination-over';*/
      c.shadowColor = 'black';
      c.shadowBlur = 20;
      c.fillStyle = this.color;
      c.fill();
      c.strokeStyle = 'white'
      c.stroke();
      c.closePath();
      requestAnimationFrame(this.update.bind(this));
    }
  }
}

let drawing = false;

window.addEventListener('mousemove', function(event)
{
if(drawing)
  {
    for (let i = 0; i < 10; i++)
      {  const root = new Root(event.x,event.y);
        root.update();
      }
  }
});


window.addEventListener('mousedown',function()
{
  drawing = true;
});

window.addEventListener('mouseup',function()
{
  drawing = false;
});


window.addEventListener('dblclick',function()
{
  for(i = 0; i < 5;i++) 
    {c.clearRect(0,0,canvas.width,canvas.height);}
  random_set = randomset(colors_set);
});


window.addEventListener('click',function()
{
  drawing = true;


  for (let i = 0; i < 100; i++)
      {  const root = new Root(event.x,event.y);
       root.update();
      }

  drawing = false;    
});

