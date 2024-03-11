
class SudokuSolver {

  constructor() {  
    // 使用this关键字来访问和设置类的实例属性  
    this.solved = ''; }
  validate(puzzleString) {
    if(puzzleString.length!=81){return 'Expected puzzle to be 81 characters long'}
    const match=/[^1-9.]/g;
    if (match.test(puzzleString)){return "Invalid characters in puzzle"}
    return true;
  }

  checkRowPlacement(puzzleString, row, column, value) {
    
    
    
    
    for (let j=0;j<9;j++){
      if (column!=j) {
      let valueCompare=puzzleString[row*9+j];
      if(value==valueCompare){
        return false
      }
    }}
    return true;
    



  }

  checkColPlacement(puzzleString, row, column, value) {
    
    
    
    for (let j=0;j<=8;j++){
      if (row!=j) {
      let valueCompare=puzzleString[j*9+column];
      if(value==valueCompare){
        return false;
      }
    }}
    return true;

  }

  checkRegionPlacement(puzzleString, row, column, value) {
    const rowNumber=Math.floor(row/3);
    const rowMod=rowNumber%3;
    const columnNumber=Math.floor(column/3);
    const columnMod=columnNumber%3;
    for (let i=0;i<3;i++){
      for (let j=0;j<3;j++){
        if (!(row==i+rowNumber*3&&column==j+columnNumber*3)) {
        let valueCompare=puzzleString[(i+rowNumber*3)*9+j+columnNumber*3];
        if(value==valueCompare){
          return false
        }}
      }
    }
    
    
    
    return true;

  }

  

  solve1(puzzle) {
    
    let indexCurrent=puzzle.indexOf('.');
    let row=(indexCurrent/9)|0;
    let col=indexCurrent-row*9;
    if (indexCurrent==-1){this.solved=puzzle.join('');return true;}
    else{
      for(let guess=1;guess<10;guess++){
    
        if(this.checkRowPlacement(puzzle,row,col,guess)&&
        this.checkColPlacement(puzzle,row,col,guess)&&
        this.checkRegionPlacement(puzzle,row,col,guess)){
          puzzle[indexCurrent]=guess;
           
          if (this.solve1(puzzle)) {  
               
              return true
            }
            puzzle[indexCurrent]='.';
          
        }
      }  

    }
    return false;

  }
  solve(puzzleString){
    const puzzle=puzzleString.split(''); 
    
    if (this.solve1(puzzle)){
      return this.solved;
    }
    return false
  }
  
}

module.exports = SudokuSolver;

