const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver=new Solver();

suite('Unit Tests', () => {

    test('test1',(done)=>{
        let input='..839.7.575.....964..1.......16.29846.9.312.7..754.....62..5.78.8...3.2...492...1';
        let output='218396745753284196496157832531672984649831257827549613962415378185763429374928561';
        assert.equal(solver.solve(input),output);
        done();

    })
    test('test2',(done)=>{
        let input='..839.7.575.....964..1.......16.29846.9.312.7..754.....62..5.78.8...3.2...492...q';
        let output="Invalid characters in puzzle";
        assert.equal(solver.validate(input),output);
        done();

    })
    test('test3',(done)=>{
        let input='..839.7.575.....964..1.......16.29846.9.312.7..754.....62..5.78.8...3.2...492...';
        let output="Expected puzzle to be 81 characters long";
        assert.equal(solver.validate(input),output);
        done();

    })
    test('test4',(done)=>{
        let input='..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
        let row=0;
        let column=0
        let value=1
        
        assert.equal(solver.checkRowPlacement(input, row, column, value),false);
        done();

    })
    test('test5',(done)=>{
        let input='..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
        let row=0;
        let column=0
        let value=7
        
        assert.equal(solver.checkRowPlacement(input, row, column, value),true);
        done();

    })
    test('test6',(done)=>{
        let input='..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
        let row=0;
        let column=0;
        let value=7;
        
        assert.equal(solver.checkColPlacement(input, row, column, value),true);
        done();

    })
    test('test7',(done)=>{
        let input='..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
        let row=0;
        let column=0;
        let value=1;
        
        assert.equal(solver.checkColPlacement(input, row, column, value),false);
        done();

    })
    test('test8',(done)=>{
        let input='..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
        let row=0;
        let column=0;
        let value=2;
        
        assert.equal(solver.checkRegionPlacement(input, row, column, value),false);
        done();

    })
    test('test9',(done)=>{
        let input='..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
        let row=0;
        let column=0;
        let value=1;
        
        assert.equal(solver.checkRegionPlacement(input, row, column, value),true);
        done();

    })
    test('test10',(done)=>{
        let input='.7.89.....5....3.4.2..4..1.5689..472...6.....1.7.5.63873.1.2.8.6..47.1..2.9.387.6';
        let output='473891265851726394926345817568913472342687951197254638734162589685479123219538746';
        assert.equal(solver.solve(input),output);
        done();

    })
    test('test11',(done)=>{
        let input='.7.89.....5....3.4.2..4..1.5689..472...6.....1.7.5.63873.1.2.8.6..47.1..2.9.387.7';
        let output=false;
        assert.equal(solver.solve(input),output);
        done();

    })
    test('test12',(done)=>{
        let input='82..4..6...16..89...98315.749.157.............53..4...96.415..81..7632..3...28.51';
        let output='827549163531672894649831527496157382218396475753284916962415738185763249374928651';
        assert.equal(solver.solve(input),output);
        done();

    })
});
