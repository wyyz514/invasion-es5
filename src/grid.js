function Grid(blockSize, color) {
    this.blocks = [];
    this.color = color;
    this.blockSize = blockSize;
    this.rows = Math.ceil((Constants.SCREEN_HEIGHT / this.blockSize));  //divide screen evenly vertically
    this.columns = Math.ceil((Constants.SCREEN_WIDTH  / this.blockSize)); //divide screen evenly horizontally
    this.gap = 0.5; //spacing between blocks
}

Grid.prototype.generateBlocks = function() {
    var startX = 0;
    var startY = 0;
    var index = 0;

    for(var row = 0; row < this.rows; row++) {
        var newRow = [];

        for(var col = 0; col < this.columns; col++) {

            var block = {
                x: startX,
                y: startY,
                occupied: false,
                index: index++
            };

            startX = startX + this.blockSize;
            newRow.push(block);
        } 

        this.blocks.push(newRow);
        startY = startY + this.blockSize;
        startX = 0;
    }
    return this.blocks;
}

Grid.prototype.getRandomBlock = function() {
    var rows = this.rows - 1;
    var columns = this.columns - 1;

    var x = Math.ceil(Math.random() * rows);
    var y = Math.ceil(Math.random() * columns);

    return this.blocks[x][y];
}

Grid.prototype.draw = function() {
    //grid context
    var blocks = this.blocks.length == 0 ? this.generateBlocks() : this.blocks;
    var size = this.blockSize;
    var gap = this.gap;
    var color = this.color;
    
    function drawRow(row, ctx) {
        for(var i = 0; i < row.length; i++) {
            ctx.strokeStyle = color;
            ctx.strokeRect(row[i].x + gap, row[i].y + gap, size, size);
        }
    }

    //applying canvas context
    return function() {
        var rows = blocks.length;
        for(var i = 0; i < rows; i++) {
            drawRow(blocks[i], this); 
        }
    }
}
