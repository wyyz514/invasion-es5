var invaderDrawPath = [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,0]];

function Invader(pos, size, color) {

    this.x = pos.x;
    this.y = pos.y;
    this.size = size;
    this.isOffScreen = false;
    this.color = color;
    this.generatePoints();
}

//generates the points we will be tracing through
Invader.prototype.generatePoints = function() {
    this.points = [];
    var point1 = {x: this.x, y: this.y};
    var point2 = {x: this.x + this.size / 2, y: this.y - this.size / 2};
    var point3 = {x: this.x + this.size, y: this.y};
    var point4 = {x: point3.x - this.size / 6, y: point3.y + this.size / 6};
    var point5 = {x: point4.x - this.size / 6, y: point4.y - this.size / 6};
    var point6 = {x: point5.x - this.size / 6, y: point5.y + this.size / 6};
    var point7 = {x: point6.x - this.size / 6, y: point6.y - this.size / 6};
    var point8 = {x: point7.x - this.size / 6, y: point7.y + this.size / 6};
    this.points.push(point1, point2, point3, point4, point5, point6, point7, point8);
}

//updates the position of the invader
Invader.prototype.update = function() {
    this.y -= 0.5;
    if(this.y < 0) {
        this.isOffScreen = true;    
    }
    else {
        this.generatePoints();
    }
}

//traces the invader
Invader.prototype.draw  = function() {
    var color = this.color;
    var points = this.points.length > 0 ? this.points : this.generatePoints();
    function drawHandler(line) {
        var point1 = line[0], point2 = line[1];
        //uses context instance as 'this'
        this.beginPath();
        this.strokeStyle = color;
        this.moveTo(points[point1].x, points[point1].y);
        this.lineTo(points[point2].x, points[point2].y);
        this.closePath();
        this.stroke();
    }


    return function drawable() {
        var dh = drawHandler.bind(this); //binding to canvas context object
        for(var i = 0; i < invaderDrawPath.length; i++) {
            dh(invaderDrawPath[i]);
        }
    }
}

