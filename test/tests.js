import { Block, BlockGrid, COLOURS } from '../app/javascript/grid';
import { assert } from 'chai';

let { describe, it } = window;

describe('Block', () => {

    it('should be created with correctly', () => {
        let testCoords = [
            [1, 2],
            [4, 9],
            [0, 0]
        ];

        testCoords.forEach((testCoord) => {
            let block = new Block(...testCoord);
            assert.equal(block.x, testCoord[0], 'x is set correctly');
            assert.equal(block.y, testCoord[1], 'y is set correctly');
            assert.ok(COLOURS.indexOf(block.colour) > -1, 'colour is valid');
        });
    });

});

describe('BlockGrid', () => {
    
    describe('when the constructor is called', function() {
        let blockGrid = new BlockGrid();
        
        it('should generate a 10 x 10 grid', function () {          
            assert.equal(blockGrid.grid.length, 10, 'grid height is 10');
            assert.equal(blockGrid.grid[0].length, 10, 'grid width is 10');
        });
        
    });
    
    describe('when the get neighbours function is called', function () {
        let blockGrid = new BlockGrid();
        
        describe('with an edge', function() {
            
            it('should return three neighbours', function () {            
                assert.equal(blockGrid.getNeighbourTiles(5, 9).length, 3, 'top edge returns three');
                assert.equal(blockGrid.getNeighbourTiles(9, 5).length, 3, 'right edge returns three');
                assert.equal(blockGrid.getNeighbourTiles(5, 0).length, 3, 'bottom edge returns three');
                assert.equal(blockGrid.getNeighbourTiles(0, 5).length, 3, 'left edge returns three');                
            });           
            
        });
        
        describe('with a corner', function () {
            
            it('should return two neighbours', function () {                
                assert.equal(blockGrid.getNeighbourTiles(0, 9).length, 2, 'top-left corner returns two');
                assert.equal(blockGrid.getNeighbourTiles(9, 9).length, 2, 'top-right corner returns two');
                assert.equal(blockGrid.getNeighbourTiles(0, 0).length, 2, 'bottom-left corner returns two');
                assert.equal(blockGrid.getNeighbourTiles(9, 0).length, 2, 'bottom-right corner returns two');     
            });   
            
        });
        
        describe('away from edges or corners', function() {
            
            it('should return four neighbours', function () {              
                assert.equal(blockGrid.getNeighbourTiles(5, 5).length, 4, 'an edge away from corners returns four');
            });              
        });
        
    });

});
