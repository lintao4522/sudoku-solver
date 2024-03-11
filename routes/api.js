'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      const coordinate=req.body.coordinate;
      const puzzleString=req.body.puzzle;
      const value=req.body.value;
      const conflict=[];
     
      
      if (!coordinate||!puzzleString||!value) {return res.json({ error: 'Required field(s) missing' })}
      if (solver.validate(puzzleString)=='Invalid characters in puzzle')
      {return res.json({ error: 'Invalid characters in puzzle' })}
      if(puzzleString.length!=81)
      {return res.json({ error: 'Expected puzzle to be 81 characters long' })}

      
      
      const row=req.body.coordinate[0].charCodeAt(0)-'A'.charCodeAt(0);
      const col=req.body.coordinate[1]-1;
      if (!(/^[A-I][1-9]$/).test(coordinate)){
        return res.json({ error: 'Invalid coordinate'})
      }
      if (!(/^[1-9]$/).test(value.toString())){
        return res.json({ error: 'Invalid value' })
      }
      if (!solver.checkColPlacement(puzzleString,row,col,value)){conflict.push('column');}
      if (!solver.checkRegionPlacement(puzzleString,row,col,value)){conflict.push('region');}
      if (!solver.checkRowPlacement(puzzleString,row,col,value)){conflict.push('row');}
      if(conflict.length>0){res.json({valid:false,conflict})}
      else{res.json({valid:true})}

    });
    
  app.route('/api/solve')
    .post((req, res) => {
      const puzzleString=req.body.puzzle;
       
      
      
       if(!puzzleString){return res.json({ error: 'Required field missing' })}
      if (solver.validate(puzzleString)=='Invalid characters in puzzle')
      {return res.json({ error: 'Invalid characters in puzzle' })}
      if(puzzleString.length!=81)
      {return res.json({ error: 'Expected puzzle to be 81 characters long' })}
      const solution=solver.solve(puzzleString);
      if(!solution) {return res.json({ error: 'Puzzle cannot be solved' })}
      res.json({solution});
       
      

    });
};
