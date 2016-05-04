export const COLOURS = ['red', 'green', 'blue', 'yellow'];
const MAX_X = 10;
const MAX_Y = 10;

export class Block {
    constructor (x, y) {
        this.x = x;
        this.y = y;
        this.colour = COLOURS[Math.floor(Math.random() * COLOURS.length)];
    }
}

export class BlockGrid {
    constructor () {
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

    render (el = document.querySelector('#gridEl')) {
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

    blockClicked (e, block) {
        console.log(e, block);
        
        this.getNeighbourTiles(block.x, block.y);
        
        this.render();
    }
    
    getNeighbourTiles (x ,y) {
        let neighbours = [];
        
        // To the left
        if (x > 0) {
            neighbours.push(this.grid[x - 1][y]);
        }
        
        // To the right
        if(x + 1 < MAX_X) {
            neighbours.push(this.grid[x + 1][y]);
        }
        
        // Down below
        if (y > 0) {
            neighbours.push(this.grid[x][y - 1]);
        }
        
        // Up above
       if(y + 1 < MAX_Y) {
            neighbours.push(this.grid[x][y + 1]);
        }
        
        return neighbours;
    }
    
}

window.addEventListener('DOMContentLoaded', () => new BlockGrid().render());
