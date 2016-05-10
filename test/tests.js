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

    describe('when the constructor is called', function () {
        let blockGrid = new BlockGrid();

        it('should generate a 10 x 10 grid', function () {
            assert.equal(blockGrid.grid.length, 10, 'grid height is 10');
            assert.equal(blockGrid.grid[0].length, 10, 'grid width is 10');
        });

    });

    describe('when the get neighbours function is called', function () {
        let blockGrid = new BlockGrid();

        describe('and when there are four neighbours of the same colour', function () {
            beforeEach(function () {
                blockGrid.grid[0][0] = { x: 0, y: 0, colour: 'red' };
                blockGrid.grid[0][1] = { x: 0, y: 1, colour: 'red' };
                blockGrid.grid[0][2] = { x: 0, y: 2, colour: 'red' };

                blockGrid.grid[1][0] = { x: 0, y: 0, colour: 'red' };
                blockGrid.grid[1][1] = { x: 0, y: 1, colour: 'red' };
                blockGrid.grid[1][2] = { x: 0, y: 2, colour: 'red' };

                blockGrid.grid[2][0] = { x: 0, y: 0, colour: 'red' };
                blockGrid.grid[2][1] = { x: 0, y: 1, colour: 'red' };
                blockGrid.grid[2][2] = { x: 0, y: 2, colour: 'red' };

                for (var i = 0; i < 4; i++) {
                    blockGrid.grid[3][i] = { x: 3, y: i, colour: 'yellow' };
                    blockGrid.grid[i][3] = { x: i, y: 3, colour: 'yellow' };
                }

                console.log(blockGrid);
            });

            it('should return nine neighbours which have been coloured grey', function () {
                assert.equal(blockGrid.getAndMarkSameColouredNeighbours(1, 1, 'red').length, 9, 'top edge returns three');

                for (var i = 0; i < 3; i++) {
                    for (var j = 0; j < 3; j++) {
                        assert.equal(blockGrid.grid[i][j].colour, 'gray', i + ',' + j + 'should be grey');
                    }
                }
            });

            it('should not colour any of the other nine neighbours grey', function () {
                blockGrid.getAndMarkSameColouredNeighbours(1, 1, 'red');

                for (var i = 3; i < 9; i++) {
                    for (var j = 3; j < 9; j++) {
                        assert.notEqual(blockGrid.grid[i][j].colour, 'gray', i + ',' + j + 'should not be be grey');
                    }
                }
            });
        });

    });

    describe('compareBlocks', function () {
        let blockGrid = new BlockGrid();

        it('should evaluate more north-easternly blocks to be bigger', function () {
            assert.isAbove(blockGrid.compareBlocks(new Block(9, 9), new Block(1, 1)), 0);
        });

        it('should evaluate more easternly blocks to be bigger', function () {
            assert.isAbove(blockGrid.compareBlocks(new Block(5, 5), new Block(1, 5)), 0);
        });

        it('should evaluate more south-easternly blocks to be bigger', function () {
            assert.isAbove(blockGrid.compareBlocks(new Block(5, 3), new Block(1, 5)), 0);
        });

        it('should evaluate two blocks in the same locarion to be the same', function () {
            assert.equal(blockGrid.compareBlocks(new Block(5, 5), new Block(5, 5)), 0);
        });

        it('should evaluate more north-westernly blocks to be bigger', function () {
            assert.isBelow(blockGrid.compareBlocks(new Block(0, 9), new Block(5, 5)), 0);
        });

        it('should evaluate more western blocks to be bigger', function () {
            assert.isBelow(blockGrid.compareBlocks(new Block(0, 5), new Block(5, 5)), 0);
        });

        it('should evaluate more south-western blocks to be bigger', function () {
            assert.isBelow(blockGrid.compareBlocks(new Block(0, 1), new Block(5, 5)), 0);
        });

    });

});
