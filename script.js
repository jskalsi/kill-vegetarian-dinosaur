window.onload = function()
{
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    
    let globalAx=250, globalAy=400, globalDx=1800, globalDy=275;
    let start=false, move = false, mouseUp=false, displayD1 = true;
    let apple, dinosaur1, dinosaur2;
    let sling1 = [];
    let sling2 = [];
    let slingVelocity = [];
    let add, counter=1, hit=0;

    canvas.style.backgroundImage = "url(background.png)";

    function drawFruit(x, y){
        apple = new Image();
        apple.src = "apple.png";
        ctx.drawImage(apple, x, y, 70, 70);
    }

    function drawDinosaur1(x, y){
        dinosaur1 = new Image();
        dinosaur1.src = "dinosaur1.png";
        ctx.drawImage(dinosaur1, x, y, 600, 500);
    }

    function drawDinosaur2(x, y){
        dinosaur2 = new Image();
        dinosaur2.src = "dinosaur2.png";
        ctx.drawImage(dinosaur2, x, y, 600, 500);
    }

    function drawHealth(){
        ctx.beginPath();
        if(hit == 0)
            ctx.fillStyle = "#05a800";
            ctx.fillRect(1200,100,250,30);
        if(hit == 1){
            ctx.fillStyle = "#05a800";
            ctx.fillRect(1200,100,200,30);
        }
        if(hit == 2){
            ctx.fillStyle = "#c7b500";
            ctx.fillRect(1200,100,150,30);
        }
        if(hit == 3){
            ctx.fillStyle = "#c7b500";
            ctx.fillRect(1200,100,100,30);
        }
        if(hit == 4){
            ctx.fillStyle = "#e50000";
            ctx.fillRect(1200,100,50,30);
        }
        ctx.font = "20px Arial";
        ctx.fillStyle = "black";
        ctx.fillText("Dinosaur's health bar",1225,150);
    }

    //Initiates fruit movement according to mouse's coordinates after mouseDown
    canvas.onmousedown = function(){
        move = true;
        start = true;
        
        x = event.offsetX-25;
        y = event.offsetY-25;
        sling1 = [];
        sling1.push(x);
        sling1.push(y);

        if(move && (x>=0 && x<=300) && (y>=100 && y<=650)){
            globalAx=x;
            globalAy=y;
        }
    }

    //Logic after mouseUp
    canvas.onmouseup = function(){
        move=false;

        x = event.offsetX-25;
        y = event.offsetY-25;
        sling2 = [];
        sling2.push(x);
        sling2.push(y);

        add = 0;

        slingVelocity = [];
        slingVelocity.push(250 - sling2[0]);
        slingVelocity.push(sling2[1] - 400);

        mouseUp=true;
    }

    main();

    function main()
    {
        startGame();
    }

    function startGame()
    {
        updateGame();
        window.requestAnimationFrame(drawGame);
    }

    function updateGame()
    {
        //Moving fruit according to mouse's coordinates before mouseUp
        canvas.onmousemove = function(){
            x = event.offsetX-25;
            y = event.offsetY-25;
            if(move && (x>=0 && x<=600) && (y>=100 && y<=650)){
                globalAx=x;
                globalAy=y;
            }
        }

        //Moves fruit after mouseUp
        if(mouseUp){
           if(sling2[0]>=globalDx-25 && sling2[1]>=globalDy){
                mouseUp=false;
                globalAx=250;globalAy=400;
                hit+=1;
                if(hit >= 5){
                    alert("You killed the dinosaur. Hit \"Ok\" to play again!");
                    location.reload();
                }
            }
            else if(sling2[0]>1850 || sling2[0]<-80){
                mouseUp=false;
                alert("Don't shoot the apple out of the window!");
                globalAx=250;globalAy=400;
            }
            else if(sling2[1]>=650){
                mouseUp=false;
                alert("Don't make the apple touch the ground!");
                globalAx=250;globalAy=400;
            }
            else if(sling1[0]==sling2[0] && sling1[1]==sling2[1]){
                mouseUp=false;
                alert("Try to drag instead of clicking!");
                globalAx=250;globalAy=400;
            }
            else{
                globalAx=sling2[0];globalAy=sling2[1];
                sling2[0]+=slingVelocity[0]/30+add;
                sling2[1]-=slingVelocity[1]/30-add;
                add+=0.05;
            }
        }

        //Moving the Dinosaur
        if(start){
            if(displayD1 == true){
                counter = counter+1;
                if(counter==20){
                    displayD1 = false;
                    counter = 1;
                }
            }
            else{
                counter++;
                if(counter==20){
                    displayD1 = true;
                    counter = 1;
                }
            }
            globalDx=globalDx-2.5;
            if(globalDx<=250){
                alert("Dinosaur ate the Apple. Try again from starting!");
                location.reload();
            }
        }

        window.setTimeout(updateGame, 16.67);
    }

    function drawGame()
    {
        ctx.clearRect(0,0,canvas.width,canvas.height);

        //console.log(globalAx+'  '+globalAy);
        drawFruit(globalAx,globalAy);

        if(displayD1)
            drawDinosaur1(globalDx,globalDy);
        else
            drawDinosaur2(globalDx,globalDy);

        drawHealth();

        window.requestAnimationFrame(drawGame);
    }
}