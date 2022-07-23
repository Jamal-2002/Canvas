
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

mouse =
{
    x: undefined,
    y: undefined
}

addEventListener('mousemove', event => 
{
    mouse.x = event.clientX;
    mouse.y = event.clientY;

})

class Enkei
{
    constructor(x,y)
    {
        this.x = x;
        this.y = y;
        this.originalx = this.x;
        this.originaly = this.y;
        this.color  = randomColor(random_set);
        this.radius = randomizer(6,12);
        this.radians = Math.random() * Math.PI*2;
        this.centripetal = 0.01;
        this.distancefromcenter = 
        {
            x:randomizer(50,100),
            y:randomizer(50,100)
        };
        this.lastmouse = {x:this.x,y:this.y}


    }


    draw(context)

    {  
        context.beginPath();
        context.arc(this.x,this.y,this.radius,0,Math.PI * 2,false);
        //context.rect(this.x,this.y,10,10);
        context.fillStyle = this.color;
        context.fill();
    }


    circulate()

    {
        this.lastmouse += (mouse.x - this.lastmouse.x) * 0.05;
        this.lastmouse += (mouse.y - this.lastmouse.y) * 0.05;


        this.radians += this.centripetal;
        
        this.x = mouse.x + Math.cos(this.radians) *100 + this.distancefromcenter.x;

        this.y = mouse.y + Math.sin(this.radians) *100 + this.distancefromcenter.y;
    }



}

addEventListener("dblclick",function(event)
{
    context.clearRect(0, 0, cwidth, cheight);
}
)

addEventListener("click",function(event)
{
    init();
}
)


let circles;;
function init()
{

random_set = randomset(colors_set);

circles = []

for (let i = 1; i < 100; i++)

{
    circles.push(new Enkei(innerWidth/2,innerHeight/2))
}}
function animate()
{

    requestAnimationFrame(animate);
    context.fillStyle = 'rgba(255,255,255,0.05)';
    context.fillRect(0, 0, cwidth, cheight);   
    circles.forEach(circle => {  
       circle.draw(context);
       circle.circulate();
    }
    );
    
}

init();
animate();