var loop = function(fn) {
    var rAF = window.webkitRequestAnimationFrame || window.requestAnimationFrame || window.mozRequestAnimationFrame;
    rAF(fn);
}

var Constants = {
    SCREEN_HEIGHT: window.screen.height,
    SCREEN_WIDTH: window.screen.width
}

var root = document.getElementById("root");
var canvas = document.createElement("canvas");
canvas.height = Constants.SCREEN_HEIGHT;
canvas.width = Constants.SCREEN_WIDTH;
var ctx = canvas.getContext("2d");
root.appendChild(canvas);

document.addEventListener("resize", function() {
    Constants = {
        SCREEN_HEIGHT: window.screen.height,
        SCREEN_WIDTH: window.screen.width
    }
});


function Invasion(invaderCount, invaderSize, invaderColor, gridSize, gridColor) {
    this.grid = new Grid(gridSize, gridColor);
    this.grid.generateBlocks();
    this.invaders = [];
    this.invaderSize = invaderSize;
    this.invaderCount = invaderCount;
    this.invaderColor = invaderColor;
    this.createInvaders();
}

Invasion.prototype.clear = function() {
    ctx.clearRect(0, 0, Constants.SCREEN_WIDTH, Constants.SCREEN_HEIGHT);
}

Invasion.prototype.createInvaders =  function() {
    for(var i = 0; i < this.invaderCount; i++) {
        var coords = this.grid.getRandomBlock();
        var invader = new Invader(coords, this.invaderSize, this.invaderColor);
        this.invaders.push(invader);
    }    
}

Invasion.prototype.createInvader = function() {
    var coords = this.grid.getRandomBlock();
    //place invader so that the bottom corner of the invader is on the top-left corner of a block
    var invader = new Invader({x: coords.x, y: Constants.SCREEN_HEIGHT}, this.invaderSize, this.invaderColor);
    this.invaders.push(invader);
}

Invasion.prototype.drawGrid = function() {
    var gridDrawable = this.grid.draw();
    gridDrawable.apply(ctx);
}

Invasion.prototype.drawInvaders = function() {
    for(var i = 0; i < this.invaders.length; i++) {
        var invaderDrawable = this.invaders[i].draw();
        invaderDrawable.apply(ctx);
    }
}

Invasion.prototype.updateInvaders = function() {
    for(var i = 0; i < this.invaders.length; i++) {
        if(this.invaders[i].isOffScreen) {
            this.invaders.splice(i, 1);
            this.createInvader();        
        }
        else {
            this.invaders[i].update();
        }
    }  
}

Invasion.prototype.draw = function() {
    this.clear();
    this.drawGrid();
    this.updateInvaders();
    this.drawInvaders();
    loop(function() {
        this.draw();
    }.bind(this));
}

window.Invasion = Invasion;