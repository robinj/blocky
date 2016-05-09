export const COLOURS = ['red', 'green', 'blue', 'yellow'];
export const DELETED_COLOUR = 'gray';
const MAX_X = 10;
const MAX_Y = 10;

export class Block {
    constructor(x, y, deleted) {
        this.x = x;
        this.y = y;
        this.colour = deleted ? DELETED_COLOUR : COLOURS[Math.floor(Math.random() * COLOURS.length)];
    }
    
    getColour() {
        return this.colour;
    }
}

export class BlockGrid {
    constructor() {
        this.grid = [];

        for (let x = 0; x < MAX_X; x++) {
            let col = [];
            for (let y = 0; y < MAX_Y; y++) {
                col.push(new Block(x, y));
            }

            this.grid.push(col);
        }

        return this;
    }

    render(el = document.querySelector('#gridEl')) {
        for (let x = 0; x < MAX_X; x++) {
            let id = 'col_' + x;
            let colEl = document.createElement('div');
            colEl.className = 'col';
            colEl.id = id;
            el.appendChild(colEl);

            for (let y = MAX_Y - 1; y >= 0; y--) {
                let block = this.grid[x][y],
                    id = `block_${x}x${y}`,
                    blockEl = document.createElement('div');

                blockEl.id = id;
                blockEl.className = 'block';
                blockEl.style.background = block.colour;
                blockEl.addEventListener('click', (evt) => this.blockClicked(evt, block));
                colEl.appendChild(blockEl);
            }
        }
        return this;
    }

    blockClicked(e, block) {
        var self = this; 
        let neighbours = [];
        console.log(e, block);
        
        // Sinple guard to avoid wasting processing time on already deleted tiles
        if (block.colour === DELETED_COLOUR) {
            return;
        }
        
        neighbours = this.getSameColouredNeighbours(block.x, block.y, block.colour);
        neighbours.sort(this.sortBlocks);
        
        while(neighbours.length > 0) {
            let currentBlock = neighbours.shift();
            
            this.grid[currentBlock.x].splice(currentBlock.y, 1);
            
            for(var i = currentBlock.y ; i < MAX_Y - 1; i ++) {
                this.grid[currentBlock.x][i].y--;
            };
            this.grid[currentBlock.x].push(new Block(currentBlock.x, 9, true));
        }

        this.render();
        
        // Scroll to the bottom of the page
        window.scrollTo(0,document.body.scrollHeight);

    }
    
    sortBlocks(blockA, blockB) {
        return (blockA.x * MAX_X + blockA.y) - (blockB.x * MAX_X + blockB.y);
    };

    /**
     * This is basically a slightly modified version of the flood fill algorithm
     * which returns the "pixels" that have just been coloured. There is a risk 
     * that the max call stack will be reached, if the grid is ridiculously large.
     * Given the use case, I doubt that we will see that limit being reached.
     */
    getSameColouredNeighbours(x, y, colour) {
        var neighbours = [];
        
        if(this.grid[x][y].colour !== colour) {
            return neighbours;
        } else {
            this.grid[x][y].colour = DELETED_COLOUR;
            neighbours.push(this.grid[x][y]);
        }
        
        // West
        if(x > 0) {
            Array.prototype.push.apply(neighbours, this.getSameColouredNeighbours(x - 1, y, colour));
        };
        
        // South
        if(y > 0) {
            Array.prototype.push.apply(neighbours ,this.getSameColouredNeighbours(x, y - 1, colour));
        };
        
        // East
        if(x < MAX_X - 1) {
            Array.prototype.push.apply(neighbours, this.getSameColouredNeighbours(x + 1, y, colour));
        };
        
        // North
        if (y < MAX_Y -1) {
            Array.prototype.push.apply(neighbours, this.getSameColouredNeighbours(x, y + 1, colour));
        };

        return neighbours;
    }

}

window.addEventListener('DOMContentLoaded', () => new BlockGrid().render());
