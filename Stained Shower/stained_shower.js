
var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

cwidth = canvas.width;
cheight = canvas.height;

const settings = {
    dimensions: [cwidth,cheight],
    animate:true
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





let mouseDown = false;
addEventListener('mousedown', () => {
  mouseDown = true;
});

addEventListener('mouseup', () => {
  mouseDown = false;
});


















class Vector
{
    constructor(x,y)
    {
        this.x  = x;
        this.y = y;
    }
}

class Rain
{
    constructor(x,y)
    {
        this.pos = new Vector(x,y);
        this.yorginal = this.pos.y;
        this.color  = randomColor(random_set);
        this.width = randomizer(0.5,1.5)
        this.dy = 20;

    }


    draw(context)

    {
    
        context.beginPath();
        context.lineWidth = this.width;
        context.strokeStyle = this.color;
        context.fillStyle = this.color;
        context.moveTo(this.pos.x,this.pos.y);
        context.lineTo(this.pos.x,this.pos.y+70);
        context.stroke();
    }


    fall()
    {
        this.pos.y += this.dy;
    }

    reset()
    {
        if (this.pos.y > cheight)
            {
                this.pos.y = this.yorginal;
            }
    }


}

addEventListener("click",function(event)
{
    random_set = randomset(colors_set);
    agents.forEach(agent => {  
        agent.color = randomColor(random_set);
     }
     );
}
)
agents = [];
function init()
{
csize = cwidth * cheight;
random_set = randomset(colors_set);

agents = []
num = 0.001 * csize;
for (let i = 0; i < 300; i++)

{
    agents.push(new Rain((randomizer(0,innerWidth)),(randomizer(-700,-10))))
}}

let alpha = 1;

function animate()
{

    requestAnimationFrame(animate);
    context.fillStyle = `rgba(0, 0, 0, ${alpha})`;
    context.fillRect(0, 0, canvas.width, canvas.height);   
    agents.forEach(agent => {  
       agent.draw(context);
       agent.fall();
       agent.reset();
    }
    );
    
    if (mouseDown && alpha >= 0.09) {
        alpha -= 0.015;
      } else if (!mouseDown && alpha < 1) {
        alpha += 0.01;
      }

}

init();
animate();