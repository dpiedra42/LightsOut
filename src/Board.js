import React, {Component} from "react";
import Cell from "./Cell";
import './Board.css';

class Board extends Component {
  static defaultProps = {
    nrows: 5,
    ncols: 5,
    chanceLightStartsOn: 0.25
  };

  constructor(props) {
    super(props);
    this.state = {
      hasWon: false,
      board: this.createBoard()
    };
  };

  // Creates an array of arrays that have values true or false for each row.
  // These values determine which cells are on and off. y=rows, x=columns
  createBoard() {
    let board = [];
    for (let y = 0; y < this.props.nrows; y++)
    {
      let row = [];
      for (let x = 0; x < this.props.ncols; x++)
      {
        // If random is less than 0.25 the light will start on, pushes true of false
        row.push(Math.random() < this.props.chanceLightStartsOn);
      }
      board.push(row);
    }
    return board;
  }

  flipCellsAround(coord) {
    let {ncols, nrows} = this.props;
    let board = this.state.board;
    let [y, x] = coord.split("-").map(Number); // Number converts string->number
    // Going through every row and every cell to return true if everything is false
    let hasWon = board.every(row => row.every(cell => !cell));

    function flipCell(y, x) {
      // if this coord is actually on board, flip it by making it opposite of itself
      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    }
    flipCell(y, x); // flips the cell you clicked
    flipCell(y, x - 1); // flips the cell to the left
    flipCell(y, x + 1); // flips the cell to the right
    flipCell(y - 1, x); // flips the cell below
    flipCell(y + 1, x); // flips the cell above
    this.setState({board, hasWon});
  }

  render() {
    // Creating a new array to create a <Cell> and send in a isLit value
    let tblboard = [];

    for (let y = 0; y < this.props.nrows; y++)
    {
      let row = [];
      for (let x = 0; x < this.props.ncols; x++)
      {
        let coord = `${y}-${x}`;
        row.push(<Cell key={coord} isLit={this.state.board[y][x]} 
        flipCellsAroundMe={() => this.flipCellsAround(coord)} />); // () doesnt call the function right away. only when handleclick is called
      }
      tblboard.push(<tr key={y}>{row}</tr>);
    }

    return(
      <div>
        {this.state.hasWon ? (
          <div className="title-board">
            <div className="winner">
              <span className="neon-orange">YOU</span>
              <span className="neon-blue">WON</span>
            </div>
         </div>
      ) : (
        <div>
          <div className="title-board">
            <div className="neon-orange">Lights</div>
            <div className="neon-blue">Out</div>
          </div>
          <table className="Board">
            <tbody>{tblboard}</tbody>
          </table>
        </div>
      )}
      </div>
    );
  };
}


export default Board;
