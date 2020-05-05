/*jslint browser:true, es6 */

let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

let x1,y1,x2,y2,x3,y3;
let im = false,im2 = true,pass = true;
let img1,img2,img3;
let sling1 = [];
let sling2 = [];
let slingVelocity = [];
let add,temp=1800,counter=1,hit=0;

canvas.style.backgroundImage = "url(background.png)";

alert("Welcome to Kill Vegetarian Dinosaur.\nHere are some rules:\nStart the game with dragging the apple backwards so that it is shooted towards dinosaur.\nYou need to hit the dinosaur atyleast 5 times to kill it.\nIf the apple touches the ground, The game will alert you a message.\nYou should not be clicking at a point while the game is running.Try to drag instead.\n\nThat's it. Enjoy the game!!");

function drawFruit(x1, y1){
    img1 = new Image();
    img1.src = "apple.png";
    img1.onload = function(){
        ctx.drawImage(img1, x1, y1, 70, 70);
    };
}

function drawDinosaur1(x2, y2){
    img2 = new Image();
    img2.src = "dinosaur1.png";
    img2.onload = function(){
        ctx.drawImage(img2, x2, y2, 600, 500);
    };
}

function drawDinosaur2(x3, y3){
    img3 = new Image();
    img3.src = "dinosaur2.png";
    img3.onload = function(){
        ctx.drawImage(img3, x3, y3, 600, 500);
    };
}
    
canvas.onmousemove = function(){
    x = event.offsetX-25;
    y = event.offsetY-25;
    if(im && (x>=0 && x<=300) && (y>=100 && y<=650)){
        setTimeout(function(){ctx.clearRect(0, 0, 400, 700);drawFruit(x, y);}, 0);
    }
}

canvas.onmousedown = function(){
    im = true;
    
    x = event.offsetX-25;
    y = event.offsetY-25;
    sling1 = [];
    sling1.push(x);
    sling1.push(y);
    
    if(im && (x>=0 && x<=300) && (y>=100 && y<=650)){
        ctx.clearRect(x-15, y-15, 100, 100);drawFruit(x, y);
    }
}

canvas.onmouseup = function(){
    im = false;
    
    x = event.offsetX-25;
    y = event.offsetY-25;
    sling2 = [];
    sling2.push(x);
    sling2.push(y);
    
    add = 0;
    
    slingVelocity = [];
    slingVelocity.push(250 - sling2[0]);
    slingVelocity.push(sling2[1] - 400);
    
    let id = setInterval(frame, 10);
    
    function frame(){
        if(sling2[0]>=temp-30 && sling2[1]>=275){
            clearInterval(id);
            drawFruit(250, 400);
            hit+=1;
            if(hit >= 5){
                alert("You killed the dinosaur. Hit \"Ok\" to play again!");
                location.reload();
            }
            return 0;
        }
        if(sling2[0]>1850){
            clearInterval(id);
            drawFruit(250, 400);
            return 0;
        }
        if(sling2[1]>=650){
            clearInterval(id);
            alert("Don't make the apple touch the ground!");
            ctx.clearRect(0,0,1800,900);
            drawFruit(250, 400);
            return 0;
        }
        if(sling1[0]==sling2[0] && sling1[1]==sling2[1]){
            clearInterval(id);
            alert("Try to drag instead of clicking!");
            ctx.clearRect(0,0,1800,900);
            drawFruit(250, 400);
        }
        else{
            ctx.clearRect(sling2[0]-15,sling2[1]-15,100,100);
            drawFruit(sling2[0],sling2[1]);
            sling2[0]+=slingVelocity[0]/30+add;
            sling2[1]-=slingVelocity[1]/30-add;
            add+=0.05;
        }
    }
}

let id2 = setInterval(frame2, 75);

function frame2(){
    ctx.clearRect(temp-20, 200, 1800, 600);
    if(pass == true){
        drawDinosaur1(temp,275);
        counter = counter+1;
        if(counter==5){
            pass = false;
            counter = 1;
        }
    }
    else{
        drawDinosaur2(temp,275);
        counter++;
        if(counter==5){
            pass = true;
            counter = 1;
        }
    }
    temp=temp-10;
    if(temp<=250){
        clearInterval(id2);
        alert("Dinosaur ate the Apple. Try again from starting!");
        location.reload();
    }
}

let id3 = setInterval(frame3, 10);

function frame3(){
    ctx.beginPath();
    ctx.clearRect(1200,100,250,30);
    if(hit == 0)
        ctx.fillStyle = "#036300";
        ctx.fillRect(1200,100,250,30);
        ctx.stroke();
    if(hit == 1){
        ctx.fillStyle = "#036300";
        ctx.fillRect(1200,100,200,30);
        ctx.stroke();
    }
    if(hit == 2){
        ctx.fillStyle = "#857900";
        ctx.fillRect(1200,100,150,30);
        ctx.stroke();
    }
    if(hit == 3){
        ctx.fillStyle = "#857900";
        ctx.fillRect(1200,100,100,30);
        ctx.stroke();
    }
    if(hit == 4){
        ctx.fillStyle = "#e50000";
        ctx.fillRect(1200,100,50,30);
        ctx.stroke();
    }
    ctx.font = "20px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("Dinosaur's health bar",1225,150);
}

drawFruit(250, 400);